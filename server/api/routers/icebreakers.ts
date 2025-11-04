import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateIcebreaker, editIcebreaker } from "@/lib/ai/gemini";
import { IcebreakerVersionSchema } from "@/types/prisma-json";
import { sanitizeForAIPrompt, sanitizeText } from "@/lib/security/input-sanitizer";
import { assertOwnership } from "@/lib/auth/authorization";
import type { Prisma } from "@prisma/client";

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

      // Construir filtro com userId
      const where: Prisma.IcebreakerWhereInput = {
        userId, // ⭐ Filtrar por usuário autenticado
      };

      if (filter === "favorites") {
        where.favorite = true;
        where.archived = false;
      } else if (filter === "archived") {
        where.archived = true;
      } else {
        where.archived = false;
      }

      // Buscar com paginação
      const items = await ctx.prisma.icebreaker.findMany({
        take: limit + 1,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { updatedAt: "desc" },
      });

      // Calcular next cursor
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

      // Buscar apenas icebreakers do usuário autenticado
      return ctx.prisma.icebreaker.findFirst({
        where: {
          id: input.id,
          userId, // ⭐ Garantir que pertence ao usuário
        },
      });
    }),

  create: protectedProcedure
    .input(createIcebrekerSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Sanitizar título
      const tituloSanitizado = sanitizeText(input.titulo, 200);

      // Validar cada versão com schema Zod
      const versoesValidadas = input.versoes.map((v, idx) => {
        try {
          return IcebreakerVersionSchema.parse(v);
        } catch (error) {
          throw new Error(`Versão ${idx + 1} inválida: ${error}`);
        }
      });

      return ctx.prisma.icebreaker.create({
        data: {
          userId, // ⭐ Associar ao usuário autenticado
          tipo: input.tipo,
          titulo: tituloSanitizado,
          versoes: versoesValidadas as unknown as Prisma.InputJsonValue,
        },
      });
    }),

  update: protectedProcedure
    .input(updateIcebrekerSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...data } = input;

      // ⭐ Verificar ownership
      await assertOwnership("icebreaker", id, userId);

      // Preparar dados atualizados
      const updateData: Prisma.IcebreakerUpdateInput = {};

      if (data.tipo) {
        updateData.tipo = data.tipo;
      }

      if (data.titulo) {
        updateData.titulo = sanitizeText(data.titulo, 200);
      }

      if (data.versoes) {
        // Validar cada versão
        const versoesValidadas = data.versoes.map((v, idx) => {
          try {
            return IcebreakerVersionSchema.parse(v);
          } catch (error) {
            throw new Error(`Versão ${idx + 1} inválida: ${error}`);
          }
        });
        updateData.versoes = versoesValidadas as unknown as Prisma.InputJsonValue;
      }

      return ctx.prisma.icebreaker.update({
        where: { id },
        data: updateData,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // ⭐ Verificar ownership antes de deletar
      await assertOwnership("icebreaker", input.id, userId);

      return ctx.prisma.icebreaker.delete({
        where: { id: input.id },
      });
    }),

  toggleFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // ⭐ Verificar ownership
      await assertOwnership("icebreaker", input.id, userId);

      const icebreaker = await ctx.prisma.icebreaker.findUnique({
        where: { id: input.id },
      });

      if (!icebreaker) {
        throw new Error("Icebreaker não encontrado");
      }

      return ctx.prisma.icebreaker.update({
        where: { id: input.id },
        data: { favorite: !icebreaker.favorite },
      });
    }),

  toggleArchive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // ⭐ Verificar ownership
      await assertOwnership("icebreaker", input.id, userId);

      const icebreaker = await ctx.prisma.icebreaker.findUnique({
        where: { id: input.id },
      });

      if (!icebreaker) {
        throw new Error("Icebreaker não encontrado");
      }

      return ctx.prisma.icebreaker.update({
        where: { id: input.id },
        data: { archived: !icebreaker.archived },
      });
    }),

  generateWithAI: protectedProcedure
    .input(
      z.object({
        tipo: z.enum(["elevator_pitch", "quick_intro", "personal_story"]),
        categoria: z.string().max(100).optional(),
        orientacoesCustomizadas: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // ⭐ Busca o perfil do usuário autenticado
      const profile = await ctx.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error(
          "Perfil não encontrado. Crie um perfil antes de gerar icebreakers."
        );
      }

      // Sanitizar inputs do usuário para prevenir prompt injection
      const categoriaSanitizada = input.categoria
        ? sanitizeText(input.categoria, 100)
        : undefined;

      const orientacoesSanitizadas = input.orientacoesCustomizadas
        ? sanitizeForAIPrompt(input.orientacoesCustomizadas, 2000)
        : undefined;

      // Gera versões com IA
      const versoes = await generateIcebreaker(
        {
          nome: profile.nome,
          titulo: profile.titulo,
          resumo: profile.resumo as { pt: string; en: string },
          anosExperiencia: profile.anosExperiencia,
        },
        input.tipo,
        userId,
        categoriaSanitizada,
        orientacoesSanitizadas
      );

      return { versoes };
    }),

  editWithAI: protectedProcedure
    .input(
      z.object({
        conteudoAtual: z.string().min(1, "Conteúdo atual é obrigatório").max(5000),
        instrucoes: z.string().min(1, "Instruções são obrigatórias").max(1000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Sanitizar inputs para prevenir prompt injection
      const conteudoSanitizado = sanitizeForAIPrompt(input.conteudoAtual, 5000);
      const instrucoesSanitizadas = sanitizeForAIPrompt(input.instrucoes, 1000);

      if (!conteudoSanitizado || !instrucoesSanitizadas) {
        throw new Error("Conteúdo ou instruções contêm caracteres inválidos");
      }

      const conteudoEditado = await editIcebreaker(
        conteudoSanitizado,
        instrucoesSanitizadas,
        userId
      );

      return { conteudoEditado };
    }),
});
