import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const dismissedSuggestionsRouter = createTRPCRouter({
  // Listar sugestões dismissadas para um contexto específico
  list: protectedProcedure
    .input(z.object({ pageContext: z.string() }))
    .query(async ({ ctx, input }) => {
      const dismissed = await ctx.prisma.dismissedSuggestion.findMany({
        where: {
          userId: ctx.userId,
          pageContext: input.pageContext,
        },
        select: {
          suggestionId: true,
        },
      });
      return dismissed.map((d) => d.suggestionId);
    }),

  // Dismissar uma sugestão
  dismiss: protectedProcedure
    .input(
      z.object({
        suggestionId: z.string(),
        pageContext: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dismissed = await ctx.prisma.dismissedSuggestion.upsert({
        where: {
          suggestionId_userId: {
            suggestionId: input.suggestionId,
            userId: ctx.userId,
          },
        },
        update: {},
        create: {
          suggestionId: input.suggestionId,
          pageContext: input.pageContext,
          userId: ctx.userId,
        },
      });
      return dismissed;
    }),

  // Limpar sugestões dismissadas de um contexto
  clear: protectedProcedure
    .input(z.object({ pageContext: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.dismissedSuggestion.deleteMany({
        where: {
          userId: ctx.userId,
          pageContext: input.pageContext,
        },
      });
      return { success: true };
    }),
});
