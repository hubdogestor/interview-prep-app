import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { suggestQuestions } from "@/lib/ai/gemini";
import { BilingualContentSchema } from "@/types/prisma-json";
import { sanitizeText, sanitizeForAIPrompt } from "@/lib/security/input-sanitizer";
import { assertOwnership } from "@/lib/auth/authorization";
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
  list: protectedProcedure
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
      const userId = ctx.session.user.id;
      const { limit = 50, cursor, categoria = "all", onlyFavorites = false } = input ?? {};

      const where: Prisma.QuestionWhereInput = {
        userId,
      };
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

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.question.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });
    }),

  create: protectedProcedure
    .input(createQuestionSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.question.create({
        data: {
          categoria: input.categoria,
          pergunta: input.pergunta as unknown as Prisma.InputJsonValue,
          contexto: input.contexto ? sanitizeText(input.contexto, 1000) : undefined,
          prioridade: input.prioridade,
          userId,
        },
      });
    }),

  update: protectedProcedure
    .input(updateQuestionSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...data } = input;

      await assertOwnership("question", id, userId);

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

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await assertOwnership("question", input.id, userId);

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

  toggleFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await assertOwnership("question", input.id, userId);

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

  suggestWithAI: protectedProcedure
    .input(
      z.object({
        tipoVaga: z.string().max(200).optional(),
        empresaAlvo: z.string().max(200).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const profile = await ctx.prisma.profile.findFirst({
        where: { userId },
      });

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
