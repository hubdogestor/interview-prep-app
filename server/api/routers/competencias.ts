import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateCompetencia } from "@/lib/ai/gemini";
import { assertOwnership } from "@/lib/auth/authorization";
import {
  BilingualContentSchema,
  TrackRecordItemSchema,
} from "@/types/prisma-json";
import { sanitizeText, sanitizeForAIPrompt } from "@/lib/security/input-sanitizer";
import type { Prisma } from "@prisma/client";

// Schema para criar competência
const createCompetenciaSchema = z.object({
  nome: z.string().min(1, "Nome da competência é obrigatório").max(200),
  categoria: z.enum(["technical", "soft_skills", "leadership"]),
  nivel: z.enum(["basic", "intermediate", "advanced", "expert"]),
  descricao: BilingualContentSchema,
  ferramentas: z.array(z.string().max(100)).max(50).default([]),
  evidencias: z.array(z.string().max(500)).max(20).default([]),
  trackRecord: z.array(TrackRecordItemSchema).max(20).default([]),
});

// Schema para atualizar competência
const updateCompetenciaSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, "Nome da competência é obrigatório").max(200).optional(),
  categoria: z.enum(["technical", "soft_skills", "leadership"]).optional(),
  nivel: z.enum(["basic", "intermediate", "advanced", "expert"]).optional(),
  descricao: BilingualContentSchema.optional(),
  ferramentas: z.array(z.string().max(100)).max(50).optional(),
  evidencias: z.array(z.string().max(500)).max(20).optional(),
  trackRecord: z.array(TrackRecordItemSchema).max(20).optional(),
});

export const competenciasRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(50),
          cursor: z.string().optional(),
          categoria: z.enum(["technical", "soft_skills", "leadership", "all"]).default("all"),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { limit = 50, cursor, categoria = "all" } = input ?? {};

      const where: Prisma.CompetenciaWhereInput = {
        userId,
      };
      if (categoria !== "all") {
        where.categoria = categoria;
      }

      const items = await ctx.prisma.competencia.findMany({
        take: limit + 1,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: [{ nivel: "desc" }, { updatedAt: "desc" }],
      });

      let nextCursor: string | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.competencia.findUnique({
        where: {
          id: input.id,
          userId,
        },
      });
    }),

  create: protectedProcedure
    .input(createCompetenciaSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const nomeSanitizado = sanitizeText(input.nome, 200);

      return ctx.prisma.competencia.create({
        data: {
          nome: nomeSanitizado,
          categoria: input.categoria,
          nivel: input.nivel,
          descricao: input.descricao as unknown as Prisma.InputJsonValue,
          ferramentas: input.ferramentas,
          evidencias: input.evidencias,
          trackRecord: input.trackRecord as unknown as Prisma.InputJsonValue,
          userId,
        },
      });
    }),

  update: protectedProcedure
    .input(updateCompetenciaSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...data } = input;

      await assertOwnership("competencia", id, userId);

      const existing = await ctx.prisma.competencia.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new Error("Competência não encontrada");
      }

      const updateData: Prisma.CompetenciaUpdateInput = {};

      if (data.nome) {
        updateData.nome = sanitizeText(data.nome, 200);
      }
      if (data.categoria) {
        updateData.categoria = data.categoria;
      }
      if (data.nivel) {
        updateData.nivel = data.nivel;
      }
      if (data.descricao) {
        updateData.descricao = data.descricao as unknown as Prisma.InputJsonValue;
      }
      if (data.ferramentas) {
        updateData.ferramentas = data.ferramentas;
      }
      if (data.evidencias) {
        updateData.evidencias = data.evidencias;
      }
      if (data.trackRecord) {
        updateData.trackRecord = data.trackRecord as unknown as Prisma.InputJsonValue;
      }

      return ctx.prisma.competencia.update({
        where: { id },
        data: updateData,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await assertOwnership("competencia", input.id, userId);

      const existing = await ctx.prisma.competencia.findUnique({
        where: { id: input.id },
      });

      if (!existing) {
        throw new Error("Competência não encontrada");
      }

      return ctx.prisma.competencia.delete({
        where: { id: input.id },
      });
    }),

  generateCompetenciaWithAI: protectedProcedure
    .input(
      z.object({
        mode: z.enum(["auto", "guided", "rewrite"]),
        // Guided mode
        nome: z.string().max(200).optional(),
        categoria: z.enum(["technical", "soft_skills", "leadership"]).optional(),
        nivel: z.enum(["basic", "intermediate", "advanced", "expert"]).optional(),
        contexto: z.string().max(2000).optional(),
        // Rewrite mode
        existingCompetencia: z
          .object({
            nome: z.string(),
            categoria: z.enum(["technical", "soft_skills", "leadership"]),
            nivel: z.enum(["basic", "intermediate", "advanced", "expert"]),
            descricao: BilingualContentSchema,
            ferramentas: z.array(z.string()),
            evidencias: z.array(z.string()),
            trackRecord: z.array(TrackRecordItemSchema),
          })
          .optional(),
        rewriteInstructions: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      // Sanitizar inputs
      const contextoSanitizado = input.contexto
        ? sanitizeForAIPrompt(input.contexto, 2000)
        : undefined;
      const rewriteInstructionsSanitizadas = input.rewriteInstructions
        ? sanitizeForAIPrompt(input.rewriteInstructions, 1000)
        : undefined;

      return generateCompetencia(
        input.mode,
        input.nome && input.categoria && input.nivel
          ? {
              nome: sanitizeText(input.nome, 200),
              categoria: input.categoria,
              nivel: input.nivel,
              contexto: contextoSanitizado,
            }
          : undefined,
        input.existingCompetencia,
        rewriteInstructionsSanitizadas
      );
    }),

  generateTrackRecordWithAI: protectedProcedure
    .input(
      z.object({
        competenciaNome: z.string().max(200),
        competenciaCategoria: z.enum(["technical", "soft_skills", "leadership"]),
        existingTrackRecord: TrackRecordItemSchema.optional(),
        instructions: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { generateTrackRecord } = await import("@/lib/ai/gemini");

      const competenciaNomeSanitizado = sanitizeText(input.competenciaNome, 200);
      const instructionsSanitizadas = input.instructions
        ? sanitizeForAIPrompt(input.instructions, 1000)
        : undefined;

      return generateTrackRecord(
        competenciaNomeSanitizado,
        input.competenciaCategoria,
        input.existingTrackRecord,
        instructionsSanitizadas
      );
    }),
});
