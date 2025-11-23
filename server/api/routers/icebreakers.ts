import { z } from "zod";

import { editIcebreaker,generateIcebreaker } from "@/lib/ai/gemini";
import { prismaIcebreakerToApp } from "@/lib/type-guards";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Schema para versão individual de icebreaker
const versaoSchema = z.object({
  nome: z.string().min(1, "Nome da versão é obrigatório"),
  conteudo: z.object({
    pt: z.string().min(1, "Conteúdo em português é obrigatório"),
    en: z.string().default(""),
  }),
  duracao: z.number().positive("Duração deve ser maior que zero"),
  tags: z.array(z.string()).default([]),
});

// Schema para criar icebreaker
const createIcebrekerSchema = z.object({
  tipo: z.enum(["elevator_pitch", "quick_intro", "personal_story"]),
  titulo: z.string().min(1, "Título é obrigatório"),
  versoes: z.array(versaoSchema).min(1, "Adicione pelo menos uma versão"),
});

// Schema para atualizar icebreaker
const updateIcebrekerSchema = z.object({
  id: z.string(),
  tipo: z.enum(["elevator_pitch", "quick_intro", "personal_story"]).optional(),
  titulo: z.string().min(1, "Título é obrigatório").optional(),
  versoes: z.array(versaoSchema).optional(),
});

export const icebreakersRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const icebreakers = await ctx.prisma.icebreaker.findMany({
      where: { userId: ctx.userId },
      orderBy: {
        createdAt: "desc",
      },
    });
    return icebreakers.map(prismaIcebreakerToApp);
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const icebreaker = await ctx.prisma.icebreaker.findFirst({
        where: { id: input.id, userId: ctx.userId },
      });
      return icebreaker ? prismaIcebreakerToApp(icebreaker) : null;
    }),

  create: protectedProcedure
    .input(createIcebrekerSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.icebreaker.create({
        data: {
          tipo: input.tipo,
          titulo: input.titulo,
          versoes: input.versoes as any,
          userId: ctx.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(updateIcebrekerSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.icebreaker.updateMany({
        where: { id, userId: ctx.userId },
        data: {
          ...(data.tipo && { tipo: data.tipo }),
          ...(data.titulo && { titulo: data.titulo }),
          ...(data.versoes && { versoes: data.versoes as any }),
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.icebreaker.deleteMany({
        where: { id: input.id, userId: ctx.userId },
      });
    }),

  toggleFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const icebreaker = await ctx.prisma.icebreaker.findFirst({
        where: { id: input.id, userId: ctx.userId },
      });

      if (!icebreaker) {
        throw new Error("Icebreaker não encontrado");
      }

      return ctx.prisma.icebreaker.updateMany({
        where: { id: input.id, userId: ctx.userId },
        data: { favorite: !icebreaker.favorite },
      });
    }),

  toggleArchive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const icebreaker = await ctx.prisma.icebreaker.findFirst({
        where: { id: input.id, userId: ctx.userId },
      });

      if (!icebreaker) {
        throw new Error("Icebreaker não encontrado");
      }

      return ctx.prisma.icebreaker.updateMany({
        where: { id: input.id, userId: ctx.userId },
        data: { archived: !icebreaker.archived },
      });
    }),

  generateWithAI: protectedProcedure
    .input(
      z.object({
        tipo: z.enum(["elevator_pitch", "quick_intro", "personal_story"]),
        categoria: z.string().optional(),
        orientacoesCustomizadas: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Busca o perfil do usuário logado
      const profile = await ctx.prisma.profile.findFirst({
        where: { userId: ctx.userId },
      });

      if (!profile) {
        throw new Error(
          "Perfil não encontrado. Crie um perfil antes de gerar icebreakers."
        );
      }

      // Gera versões com IA
      const versoes = await generateIcebreaker(
        {
          nome: profile.nome,
          titulo: profile.titulo,
          resumo: profile.resumo as { pt: string; en: string },
          anosExperiencia: profile.anosExperiencia,
        },
        input.tipo,
        profile.id,
        input.categoria,
        input.orientacoesCustomizadas
      );

      return { versoes };
    }),

  editWithAI: protectedProcedure
    .input(
      z.object({
        conteudoAtual: z.string().min(1, "Conteúdo atual é obrigatório"),
        instrucoes: z.string().min(1, "Instruções são obrigatórias"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const conteudoEditado = await editIcebreaker(
        input.conteudoAtual,
        input.instrucoes,
        ctx.userId
      );

      return { conteudoEditado };
    }),
});
