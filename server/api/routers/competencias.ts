import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.competencia.findMany({
      orderBy: [{ nivel: "desc" }, { createdAt: "desc" }],
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.competencia.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
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
        },
      });
    }),

  update: publicProcedure
    .input(updateCompetenciaSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.competencia.update({
        where: { id },
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

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.competencia.delete({
        where: { id: input.id },
      });
    }),
});
