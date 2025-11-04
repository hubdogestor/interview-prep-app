import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateStarCase } from "@/lib/ai/gemini";
import { assertOwnership } from "@/lib/auth/authorization";
import {
  StarCaseSchema,
  BilingualContentSchema,
  DateRangeSchema,
} from "@/types/prisma-json";
import { sanitizeText, sanitizeForAIPrompt } from "@/lib/security/input-sanitizer";
import type { Prisma } from "@prisma/client";

// Schema para criar experiência
const createExperienciaSchema = z.object({
  empresa: z.string().min(1, "Nome da empresa é obrigatório").max(200),
  cargo: z.string().min(1, "Cargo é obrigatório").max(200),
  periodo: DateRangeSchema,
  pitchElevator: BilingualContentSchema,
  speechCompleto: BilingualContentSchema,
  starCases: z.array(StarCaseSchema).max(30).default([]),
  tecnologias: z.array(z.string().max(100)).max(50).default([]),
});

// Schema para atualizar experiência
const updateExperienciaSchema = z.object({
  id: z.string(),
  empresa: z.string().min(1, "Nome da empresa é obrigatório").max(200).optional(),
  cargo: z.string().min(1, "Cargo é obrigatório").max(200).optional(),
  periodo: DateRangeSchema.optional(),
  pitchElevator: BilingualContentSchema.optional(),
  speechCompleto: BilingualContentSchema.optional(),
  starCases: z.array(StarCaseSchema).max(30).optional(),
  tecnologias: z.array(z.string().max(100)).max(50).optional(),
});

export const experienciasRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(20),
          cursor: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { limit = 20, cursor } = input ?? {};

      const items = await ctx.prisma.experiencia.findMany({
        where: { userId },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
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
      return ctx.prisma.experiencia.findFirst({
        where: { id: input.id, userId },
      });
    }),

  create: protectedProcedure
    .input(createExperienciaSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const empresaSanitizada = sanitizeText(input.empresa, 200);
      const cargoSanitizado = sanitizeText(input.cargo, 200);

      return ctx.prisma.experiencia.create({
        data: {
          empresa: empresaSanitizada,
          cargo: cargoSanitizado,
          periodo: input.periodo as unknown as Prisma.InputJsonValue,
          pitchElevator: input.pitchElevator as unknown as Prisma.InputJsonValue,
          speechCompleto: input.speechCompleto as unknown as Prisma.InputJsonValue,
          starCases: input.starCases as unknown as Prisma.InputJsonValue,
          tecnologias: input.tecnologias,
          userId,
        },
      });
    }),

  update: protectedProcedure
    .input(updateExperienciaSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...data } = input;

      await assertOwnership("experiencia", id, userId);

      const existing = await ctx.prisma.experiencia.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new Error("Experiência não encontrada");
      }

      const updateData: Prisma.ExperienciaUpdateInput = {};

      if (data.empresa) {
        updateData.empresa = sanitizeText(data.empresa, 200);
      }
      if (data.cargo) {
        updateData.cargo = sanitizeText(data.cargo, 200);
      }
      if (data.periodo) {
        updateData.periodo = data.periodo as unknown as Prisma.InputJsonValue;
      }
      if (data.pitchElevator) {
        updateData.pitchElevator = data.pitchElevator as unknown as Prisma.InputJsonValue;
      }
      if (data.speechCompleto) {
        updateData.speechCompleto = data.speechCompleto as unknown as Prisma.InputJsonValue;
      }
      if (data.starCases) {
        updateData.starCases = data.starCases as unknown as Prisma.InputJsonValue;
      }
      if (data.tecnologias) {
        updateData.tecnologias = data.tecnologias;
      }

      return ctx.prisma.experiencia.update({
        where: { id },
        data: updateData,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await assertOwnership("experiencia", input.id, userId);

      const existing = await ctx.prisma.experiencia.findUnique({
        where: { id: input.id },
      });

      if (!existing) {
        throw new Error("Experiência não encontrada");
      }

      return ctx.prisma.experiencia.delete({
        where: { id: input.id },
      });
    }),

  generateStarCaseWithAI: protectedProcedure
    .input(
      z.object({
        mode: z.enum(["auto", "guided", "rewrite"]),
        idioma: z.enum(["pt", "en"]),
        experienciaId: z.string().optional(),
        empresaNome: z.string().max(200).optional(),
        cargoNome: z.string().max(200).optional(),
        // Guided mode
        titulo: z.string().max(200).optional(),
        contexto: z.string().max(2000).optional(),
        competenciaFoco: z.string().max(200).optional(),
        // Rewrite mode
        existingCase: StarCaseSchema.optional(),
        rewriteInstructions: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      // Sanitizar inputs
      const empresaNomeSanitizada = input.empresaNome
        ? sanitizeText(input.empresaNome, 200)
        : undefined;
      const cargoNomeSanitizado = input.cargoNome
        ? sanitizeText(input.cargoNome, 200)
        : undefined;
      const tituloSanitizado = input.titulo
        ? sanitizeText(input.titulo, 200)
        : undefined;
      const contextoSanitizado = input.contexto
        ? sanitizeForAIPrompt(input.contexto, 2000)
        : undefined;
      const competenciaFocoSanitizada = input.competenciaFoco
        ? sanitizeText(input.competenciaFoco, 200)
        : undefined;
      const rewriteInstructionsSanitizadas = input.rewriteInstructions
        ? sanitizeForAIPrompt(input.rewriteInstructions, 1000)
        : undefined;

      return generateStarCase(
        input.mode,
        input.idioma,
        {
          empresa: empresaNomeSanitizada,
          cargo: cargoNomeSanitizado,
        },
        tituloSanitizado && contextoSanitizado
          ? {
              titulo: tituloSanitizado,
              contexto: contextoSanitizado,
              competenciaFoco: competenciaFocoSanitizada,
            }
          : undefined,
        input.existingCase,
        rewriteInstructionsSanitizadas
      );
    }),
});
