import { z } from "zod";

import { editSpeech,generateSpeech } from "@/lib/ai/gemini";
import { prismaSpeechToApp } from "@/lib/type-guards";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Schema para criar speech
const createSpeechSchema = z.object({
  tipoVaga: z.string().min(1, "Tipo de vaga é obrigatório"),
  titulo: z.string().min(1, "Título é obrigatório"),
  versao: z.string().default("1.0"),
  conteudo: z.object({
    pt: z.string().min(1, "Conteúdo em português é obrigatório"),
    en: z.string().default(""),
  }),
  duracaoEstimada: z.number().positive("Duração deve ser maior que zero"),
  foco: z.array(z.string()).default([]),
});

// Schema para atualizar speech
const updateSpeechSchema = z.object({
  id: z.string(),
  tipoVaga: z.string().min(1, "Tipo de vaga é obrigatório").optional(),
  titulo: z.string().min(1, "Título é obrigatório").optional(),
  versao: z.string().optional(),
  conteudo: z
    .object({
      pt: z.string().min(1, "Conteúdo em português é obrigatório"),
      en: z.string().default(""),
    })
    .optional(),
  duracaoEstimada: z.number().positive("Duração deve ser maior que zero").optional(),
  foco: z.array(z.string()).optional(),
});

export const speechesRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const speeches = await ctx.prisma.speech.findMany({
      where: { userId: ctx.userId },
      orderBy: {
        createdAt: "desc",
      },
    });
    return speeches.map(prismaSpeechToApp);
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const speech = await ctx.prisma.speech.findFirst({
        where: { id: input.id, userId: ctx.userId },
      });
      return speech ? prismaSpeechToApp(speech) : null;
    }),

  create: protectedProcedure
    .input(createSpeechSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.speech.create({
        data: {
          tipoVaga: input.tipoVaga,
          titulo: input.titulo,
          versao: input.versao,
          conteudo: input.conteudo as any,
          duracaoEstimada: input.duracaoEstimada,
          foco: input.foco,
          userId: ctx.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(updateSpeechSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.speech.updateMany({
        where: { id, userId: ctx.userId },
        data: {
          ...(data.tipoVaga && { tipoVaga: data.tipoVaga }),
          ...(data.titulo && { titulo: data.titulo }),
          ...(data.versao && { versao: data.versao }),
          ...(data.conteudo && { conteudo: data.conteudo as any }),
          ...(data.duracaoEstimada && { duracaoEstimada: data.duracaoEstimada }),
          ...(data.foco && { foco: data.foco }),
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.speech.deleteMany({
        where: { id: input.id, userId: ctx.userId },
      });
    }),

  toggleFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const speech = await ctx.prisma.speech.findFirst({
        where: { id: input.id, userId: ctx.userId },
      });

      if (!speech) {
        throw new Error("Speech não encontrado");
      }

      return ctx.prisma.speech.updateMany({
        where: { id: input.id, userId: ctx.userId },
        data: { favorite: !speech.favorite },
      });
    }),

  toggleArchive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const speech = await ctx.prisma.speech.findFirst({
        where: { id: input.id, userId: ctx.userId },
      });

      if (!speech) {
        throw new Error("Speech não encontrado");
      }

      return ctx.prisma.speech.updateMany({
        where: { id: input.id, userId: ctx.userId },
        data: { archived: !speech.archived },
      });
    }),

  generateWithAI: protectedProcedure
    .input(
      z.object({
        tipoVaga: z.string().min(1, "Tipo de vaga é obrigatório"),
        foco: z.array(z.string()).default([]),
        duracaoDesejada: z.number().positive().default(3),
        nomeEmpresa: z.string().optional(),
        descricaoVaga: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Busca o perfil do usuário logado
      const profile = await ctx.prisma.profile.findFirst({
        where: { userId: ctx.userId },
      });

      if (!profile) {
        throw new Error(
          "Perfil não encontrado. Crie um perfil antes de gerar speeches."
        );
      }

      // Gera speech com IA
      const result = await generateSpeech(
        {
          nome: profile.nome,
          titulo: profile.titulo,
          resumo: profile.resumo as { pt: string; en: string },
          anosExperiencia: profile.anosExperiencia,
        },
        input.tipoVaga,
        input.foco,
        input.duracaoDesejada,
        profile.id,
        input.nomeEmpresa,
        input.descricaoVaga
      );

      return {
        conteudo: result.conteudo,
        duracaoEstimada: result.duracaoEstimada,
      };
    }),

  editWithAI: protectedProcedure
    .input(
      z.object({
        conteudoAtual: z.string().min(1, "Conteúdo atual é obrigatório"),
        instrucoes: z.string().min(1, "Instruções são obrigatórias"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const conteudoEditado = await editSpeech(
        input.conteudoAtual,
        input.instrucoes,
        ctx.userId
      );

      return { conteudoEditado };
    }),
});
