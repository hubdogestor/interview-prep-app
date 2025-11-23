import { z } from "zod";

import { generateCompetencia } from "@/lib/ai/gemini";
import { prismaCompetenciaToApp } from "@/lib/type-guards";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Schema para track record individual
const trackRecordSchema = z.object({
  projeto: z.string().min(1, "Nome do projeto é obrigatório"),
  resultado: z.string().min(1, "Resultado é obrigatório"),
  ano: z.number().int().positive("Ano deve ser válido"),
});

// Schema para criar competência
const createCompetenciaSchema = z.object({
  nome: z.string().min(1, "Nome da competência é obrigatório"),
  categoria: z.enum(["technical", "soft_skills", "leadership"]),
  nivel: z.enum(["basic", "intermediate", "advanced", "expert"]),
  descricao: z.object({
    pt: z.string().min(1, "Descrição em português é obrigatória"),
    en: z.string().default(""),
  }),
  ferramentas: z.array(z.string()).default([]),
  evidencias: z.array(z.string()).default([]),
  trackRecord: z.array(trackRecordSchema).default([]),
});

// Schema para atualizar competência
const updateCompetenciaSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, "Nome da competência é obrigatório").optional(),
  categoria: z
    .enum(["technical", "soft_skills", "leadership"])
    .optional(),
  nivel: z
    .enum(["basic", "intermediate", "advanced", "expert"])
    .optional(),
  descricao: z
    .object({
      pt: z.string().min(1, "Descrição em português é obrigatória"),
      en: z.string().default(""),
    })
    .optional(),
  ferramentas: z.array(z.string()).optional(),
  evidencias: z.array(z.string()).optional(),
  trackRecord: z.array(trackRecordSchema).optional(),
});

export const competenciasRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const competencias = await ctx.prisma.competencia.findMany({
      where: { userId: ctx.userId },
      orderBy: [{ nivel: "desc" }, { createdAt: "desc" }],
    });
    return competencias.map(prismaCompetenciaToApp);
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const competencia = await ctx.prisma.competencia.findFirst({
        where: { id: input.id, userId: ctx.userId },
      });
      return competencia ? prismaCompetenciaToApp(competencia) : null;
    }),

  create: protectedProcedure
    .input(createCompetenciaSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.competencia.create({
        data: {
          nome: input.nome,
          categoria: input.categoria,
          nivel: input.nivel,
          descricao: input.descricao as any,
          ferramentas: input.ferramentas,
          evidencias: input.evidencias,
          trackRecord: input.trackRecord as any,
          userId: ctx.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(updateCompetenciaSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.competencia.updateMany({
        where: { id, userId: ctx.userId },
        data: {
          ...(data.nome && { nome: data.nome }),
          ...(data.categoria && { categoria: data.categoria }),
          ...(data.nivel && { nivel: data.nivel }),
          ...(data.descricao && { descricao: data.descricao as any }),
          ...(data.ferramentas && { ferramentas: data.ferramentas }),
          ...(data.evidencias && { evidencias: data.evidencias }),
          ...(data.trackRecord && { trackRecord: data.trackRecord as any }),
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.competencia.deleteMany({
        where: { id: input.id, userId: ctx.userId },
      });
    }),

  generateCompetenciaWithAI: publicProcedure
    .input(
      z.object({
        mode: z.enum(["auto", "guided", "rewrite"]),
        // Guided mode
        nome: z.string().optional(),
        categoria: z.enum(["technical", "soft_skills", "leadership"]).optional(),
        nivel: z.enum(["basic", "intermediate", "advanced", "expert"]).optional(),
        contexto: z.string().optional(),
        // Rewrite mode
        existingCompetencia: z
          .object({
            nome: z.string(),
            categoria: z.enum(["technical", "soft_skills", "leadership"]),
            nivel: z.enum(["basic", "intermediate", "advanced", "expert"]),
            descricao: z.object({
              pt: z.string(),
              en: z.string(),
            }),
            ferramentas: z.array(z.string()),
            evidencias: z.array(z.string()),
            trackRecord: z.array(trackRecordSchema),
          })
          .optional(),
        rewriteInstructions: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return generateCompetencia(
        input.mode,
        input.nome && input.categoria && input.nivel
          ? {
              nome: input.nome,
              categoria: input.categoria,
              nivel: input.nivel,
              contexto: input.contexto,
            }
          : undefined,
        input.existingCompetencia,
        input.rewriteInstructions
      );
    }),

  // Generate or improve a single Track Record with AI
  generateTrackRecordWithAI: publicProcedure
    .input(
      z.object({
        competenciaNome: z.string(),
        competenciaCategoria: z.enum(["technical", "soft_skills", "leadership"]),
        existingTrackRecord: z
          .object({
            projeto: z.string(),
            resultado: z.string(),
            ano: z.number(),
          })
          .optional(),
        instructions: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { generateTrackRecord } = await import("@/lib/ai/gemini");
      return generateTrackRecord(
        input.competenciaNome,
        input.competenciaCategoria,
        input.existingTrackRecord,
        input.instructions
      );
    }),
});
