import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { suggestQuestions } from "@/lib/ai/gemini";
import { BilingualContentSchema } from "@/types/prisma-json";
import { sanitizeText, sanitizeForAIPrompt } from "@/lib/security/input-sanitizer";
import type { Prisma } from "@prisma/client";

const createQuestionSchema = z.object({
  categoria: z.enum(["tecnica", "comportamental", "cultura", "carreira"]),
  pergunta: BilingualContentSchema,
  contexto: z.string().max(1000).optional(),
  prioridade: z.enum(["alta", "media", "baixa"]).default("media"),
});

const updateQuestionSchema = z.object({
  id: z.string(),
  categoria: z.enum(["tecnica", "comportamental", "cultura", "carreira"]).optional(),
  pergunta: BilingualContentSchema.optional(),
  contexto: z.string().max(1000).optional(),
  prioridade: z.enum(["alta", "media", "baixa"]).optional(),
});

export const questionsRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(50),
          cursor: z.string().optional(),
          categoria: z.enum(["tecnica", "comportamental", "cultura", "carreira", "all"]).default("all"),
          onlyFavorites: z.boolean().default(false),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const { limit = 50, cursor, categoria = "all", onlyFavorites = false } = input ?? {};

      const where: Prisma.QuestionWhereInput = {};
      if (categoria !== "all") {
        where.categoria = categoria;
      }
      if (onlyFavorites) {
        where.favorite = true;
      }

      const items = await ctx.prisma.question.findMany({
        take: limit + 1,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: [
          { favorite: "desc" },
          { prioridade: "asc" },
          { createdAt: "desc" },
        ],
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

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.question.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
    .input(createQuestionSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.question.create({
        data: {
          categoria: input.categoria,
          pergunta: input.pergunta as unknown as Prisma.InputJsonValue,
          contexto: input.contexto ? sanitizeText(input.contexto, 1000) : undefined,
          prioridade: input.prioridade,
        },
      });
    }),

  update: publicProcedure
    .input(updateQuestionSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const existing = await ctx.prisma.question.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new Error("Pergunta não encontrada");
      }

      const updateData: Prisma.QuestionUpdateInput = {};

      if (data.categoria) {
        updateData.categoria = data.categoria;
      }
      if (data.pergunta) {
        updateData.pergunta = data.pergunta as unknown as Prisma.InputJsonValue;
      }
      if (data.contexto !== undefined) {
        updateData.contexto = data.contexto ? sanitizeText(data.contexto, 1000) : null;
      }
      if (data.prioridade) {
        updateData.prioridade = data.prioridade;
      }

      return ctx.prisma.question.update({
        where: { id },
        data: updateData,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.question.findUnique({
        where: { id: input.id },
      });

      if (!existing) {
        throw new Error("Pergunta não encontrada");
      }

      return ctx.prisma.question.delete({
        where: { id: input.id },
      });
    }),

  toggleFavorite: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.findUnique({
        where: { id: input.id },
      });

      if (!question) {
        throw new Error("Pergunta não encontrada");
      }

      return ctx.prisma.question.update({
        where: { id: input.id },
        data: { favorite: !question.favorite },
      });
    }),

  suggestWithAI: publicProcedure
    .input(
      z.object({
        tipoVaga: z.string().max(200).optional(),
        empresaAlvo: z.string().max(200).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profile.findFirst();

      if (!profile) {
        throw new Error(
          "Perfil não encontrado. Crie um perfil antes de gerar perguntas."
        );
      }

      // Sanitizar inputs
      const tipoVagaSanitizado = input.tipoVaga
        ? sanitizeText(input.tipoVaga, 200)
        : undefined;
      const empresaAlvoSanitizada = input.empresaAlvo
        ? sanitizeText(input.empresaAlvo, 200)
        : undefined;

      const suggestions = await suggestQuestions(
        {
          nome: profile.nome,
          titulo: profile.titulo,
          resumo: profile.resumo as { pt: string; en: string },
          anosExperiencia: profile.anosExperiencia,
        },
        tipoVagaSanitizado,
        empresaAlvoSanitizada
      );

      return suggestions;
    }),
});
