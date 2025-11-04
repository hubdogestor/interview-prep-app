import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateSpeech, editSpeech } from "@/lib/ai/gemini";
import { BilingualContentSchema } from "@/types/prisma-json";
import { sanitizeForAIPrompt, sanitizeText } from "@/lib/security/input-sanitizer";
import { assertOwnership } from "@/lib/auth/authorization";
import type { Prisma } from "@prisma/client";

// Schema para criar speech
const createSpeechSchema = z.object({
  tipoVaga: z.string().min(1, "Tipo de vaga é obrigatório").max(100),
  titulo: z.string().min(1, "Título é obrigatório").max(200),
  versao: z.string().max(20).default("1.0"),
  conteudo: BilingualContentSchema,
  duracaoEstimada: z.number().positive("Duração deve ser maior que zero").max(60),
  foco: z.array(z.string().max(100)).max(20).default([]),
});

// Schema para atualizar speech
const updateSpeechSchema = z.object({
  id: z.string(),
  tipoVaga: z.string().min(1, "Tipo de vaga é obrigatório").max(100).optional(),
  titulo: z.string().min(1, "Título é obrigatório").max(200).optional(),
  versao: z.string().max(20).optional(),
  conteudo: BilingualContentSchema.optional(),
  duracaoEstimada: z.number().positive("Duração deve ser maior que zero").max(60).optional(),
  foco: z.array(z.string().max(100)).max(20).optional(),
});

export const speechesRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(20),
          cursor: z.string().optional(),
          filter: z.enum(["all", "favorites", "archived"]).default("all"),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { limit = 20, cursor, filter = "all" } = input ?? {};

      const where: Prisma.SpeechWhereInput = {
        userId, // ⭐ Filtrar por usuário
      };

      if (filter === "favorites") {
        where.favorite = true;
        where.archived = false;
      } else if (filter === "archived") {
        where.archived = true;
      } else {
        where.archived = false;
      }

      const items = await ctx.prisma.speech.findMany({
        take: limit + 1,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { updatedAt: "desc" },
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

      return ctx.prisma.speech.findFirst({
        where: {
          id: input.id,
          userId, // ⭐ Garantir que pertence ao usuário
        },
      });
    }),

  create: protectedProcedure
    .input(createSpeechSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const tipoVagaSanitizado = sanitizeText(input.tipoVaga, 100);
      const tituloSanitizado = sanitizeText(input.titulo, 200);

      return ctx.prisma.speech.create({
        data: {
          userId, // ⭐ Associar ao usuário
          tipoVaga: tipoVagaSanitizado,
          titulo: tituloSanitizado,
          versao: input.versao,
          conteudo: input.conteudo as unknown as Prisma.InputJsonValue,
          duracaoEstimada: input.duracaoEstimada,
          foco: input.foco,
        },
      });
    }),

  update: protectedProcedure
    .input(updateSpeechSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...data } = input;

      // ⭐ Verificar ownership
      await assertOwnership("speech", id, userId);

      const updateData: Prisma.SpeechUpdateInput = {};

      if (data.tipoVaga) {
        updateData.tipoVaga = sanitizeText(data.tipoVaga, 100);
      }
      if (data.titulo) {
        updateData.titulo = sanitizeText(data.titulo, 200);
      }
      if (data.versao) {
        updateData.versao = data.versao;
      }
      if (data.conteudo) {
        updateData.conteudo = data.conteudo as unknown as Prisma.InputJsonValue;
      }
      if (data.duracaoEstimada) {
        updateData.duracaoEstimada = data.duracaoEstimada;
      }
      if (data.foco) {
        updateData.foco = data.foco;
      }

      return ctx.prisma.speech.update({
        where: { id },
        data: updateData,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // ⭐ Verificar ownership
      await assertOwnership("speech", input.id, userId);

      return ctx.prisma.speech.delete({
        where: { id: input.id },
      });
    }),

  toggleFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // ⭐ Verificar ownership
      await assertOwnership("speech", input.id, userId);

      const speech = await ctx.prisma.speech.findUnique({
        where: { id: input.id },
      });

      if (!speech) {
        throw new Error("Speech não encontrado");
      }

      return ctx.prisma.speech.update({
        where: { id: input.id },
        data: { favorite: !speech.favorite },
      });
    }),

  toggleArchive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // ⭐ Verificar ownership
      await assertOwnership("speech", input.id, userId);

      const speech = await ctx.prisma.speech.findUnique({
        where: { id: input.id },
      });

      if (!speech) {
        throw new Error("Speech não encontrado");
      }

      return ctx.prisma.speech.update({
        where: { id: input.id },
        data: { archived: !speech.archived },
      });
    }),

  generateWithAI: protectedProcedure
    .input(
      z.object({
        tipoVaga: z.string().min(1, "Tipo de vaga é obrigatório").max(100),
        foco: z.array(z.string().max(100)).max(20).default([]),
        duracaoDesejada: z.number().positive().min(1).max(10).default(3),
        nomeEmpresa: z.string().max(200).optional(),
        descricaoVaga: z.string().max(5000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const profile = await ctx.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error(
          "Perfil não encontrado. Crie um perfil antes de gerar speeches."
        );
      }

      // Sanitizar inputs
      const tipoVagaSanitizado = sanitizeText(input.tipoVaga, 100);
      const nomeEmpresaSanitizado = input.nomeEmpresa
        ? sanitizeText(input.nomeEmpresa, 200)
        : undefined;
      const descricaoVagaSanitizada = input.descricaoVaga
        ? sanitizeForAIPrompt(input.descricaoVaga, 5000)
        : undefined;

      const result = await generateSpeech(
        {
          nome: profile.nome,
          titulo: profile.titulo,
          resumo: profile.resumo as { pt: string; en: string },
          anosExperiencia: profile.anosExperiencia,
        },
        tipoVagaSanitizado,
        input.foco,
        input.duracaoDesejada,
        userId,
        nomeEmpresaSanitizado,
        descricaoVagaSanitizada
      );

      return {
        conteudo: result.conteudo,
        duracaoEstimada: result.duracaoEstimada,
      };
    }),

  editWithAI: protectedProcedure
    .input(
      z.object({
        conteudoAtual: z.string().min(1, "Conteúdo atual é obrigatório").max(10000),
        instrucoes: z.string().min(1, "Instruções são obrigatórias").max(1000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const conteudoSanitizado = sanitizeForAIPrompt(input.conteudoAtual, 10000);
      const instrucoesSanitizadas = sanitizeForAIPrompt(input.instrucoes, 1000);

      if (!conteudoSanitizado || !instrucoesSanitizadas) {
        throw new Error("Conteúdo ou instruções contêm caracteres inválidos");
      }

      const conteudoEditado = await editSpeech(
        conteudoSanitizado,
        instrucoesSanitizadas,
        userId
      );

      return { conteudoEditado };
    }),
});
