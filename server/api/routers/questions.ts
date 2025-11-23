import { z } from "zod";

import { suggestQuestions } from "@/lib/ai/gemini";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.question.findMany({
      where: { userId: ctx.userId },
      orderBy: [
        { favorite: "desc" },
        { prioridade: "asc" },
        { createdAt: "desc" },
      ],
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.question.findFirst({
        where: { id: input.id, userId: ctx.userId },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        categoria: z.enum(["tecnica", "comportamental", "cultura", "carreira"]),
        pergunta: z.object({
          pt: z.string().min(1, "Pergunta em português é obrigatória"),
          en: z.string().default(""),
        }),
        contexto: z.string().optional(),
        prioridade: z.enum(["alta", "media", "baixa"]).default("media"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.question.create({
        data: {
          categoria: input.categoria,
          pergunta: input.pergunta,
          contexto: input.contexto,
          prioridade: input.prioridade,
          userId: ctx.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        categoria: z.enum(["tecnica", "comportamental", "cultura", "carreira"]),
        pergunta: z.object({
          pt: z.string().min(1, "Pergunta em português é obrigatória"),
          en: z.string().default(""),
        }),
        contexto: z.string().optional(),
        prioridade: z.enum(["alta", "media", "baixa"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.question.updateMany({
        where: { id, userId: ctx.userId },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.question.deleteMany({
        where: { id: input.id, userId: ctx.userId },
      });
    }),

  toggleFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.findFirst({
        where: { id: input.id, userId: ctx.userId },
      });

      if (!question) {
        throw new Error("Question not found");
      }

      return ctx.prisma.question.updateMany({
        where: { id: input.id, userId: ctx.userId },
        data: { favorite: !question.favorite },
      });
    }),

  suggestWithAI: protectedProcedure
    .input(
      z.object({
        tipoVaga: z.string().optional(),
        empresaAlvo: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Buscar perfil do usuário logado
      const profile = await ctx.prisma.profile.findFirst({
        where: { userId: ctx.userId },
      });

      if (!profile) {
        throw new Error(
          "Perfil não encontrado. Crie um perfil antes de gerar perguntas."
        );
      }

      // Gerar perguntas com IA
      const suggestions = await suggestQuestions(
        {
          nome: profile.nome,
          titulo: profile.titulo,
          resumo: profile.resumo as { pt: string; en: string },
          anosExperiencia: profile.anosExperiencia,
        },
        input.tipoVaga,
        input.empresaAlvo
      );

      return suggestions;
    }),
});
