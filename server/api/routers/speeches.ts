import { z } from "zod";

import { editSpeech,generateSpeech } from "@/lib/ai/gemini";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.speech.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.speech.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
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
        },
      });
    }),

  update: publicProcedure
    .input(updateSpeechSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.speech.update({
        where: { id },
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

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.speech.delete({
        where: { id: input.id },
      });
    }),

  toggleFavorite: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
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

  toggleArchive: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
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

  generateWithAI: publicProcedure
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
      // Busca o perfil do usuário
      const profile = await ctx.prisma.profile.findFirst();

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

  editWithAI: publicProcedure
    .input(
      z.object({
        conteudoAtual: z.string().min(1, "Conteúdo atual é obrigatório"),
        instrucoes: z.string().min(1, "Instruções são obrigatórias"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Busca o perfil do usuário para usar como userId
      const profile = await ctx.prisma.profile.findFirst();
      const userId = profile?.id || "default";

      const conteudoEditado = await editSpeech(
        input.conteudoAtual,
        input.instrucoes,
        userId
      );

      return { conteudoEditado };
    }),
});
