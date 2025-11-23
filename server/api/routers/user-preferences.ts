import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userPreferencesRouter = createTRPCRouter({
  // Obter preferências do usuário
  get: protectedProcedure.query(async ({ ctx }) => {
    const prefs = await ctx.prisma.userPreferences.findUnique({
      where: { userId: ctx.userId },
    });

    // Retorna preferências padrão se não existir
    if (!prefs) {
      return {
        leftPanelWidth: 300,
        rightPanelWidth: 300,
        theme: "system",
      };
    }

    return prefs;
  }),

  // Atualizar largura do painel esquerdo
  updateLeftPanelWidth: protectedProcedure
    .input(z.object({ width: z.number().min(200).max(600) }))
    .mutation(async ({ ctx, input }) => {
      const prefs = await ctx.prisma.userPreferences.upsert({
        where: { userId: ctx.userId },
        update: { leftPanelWidth: input.width },
        create: {
          userId: ctx.userId,
          leftPanelWidth: input.width,
        },
      });
      return prefs;
    }),

  // Atualizar largura do painel direito
  updateRightPanelWidth: protectedProcedure
    .input(z.object({ width: z.number().min(200).max(600) }))
    .mutation(async ({ ctx, input }) => {
      const prefs = await ctx.prisma.userPreferences.upsert({
        where: { userId: ctx.userId },
        update: { rightPanelWidth: input.width },
        create: {
          userId: ctx.userId,
          rightPanelWidth: input.width,
        },
      });
      return prefs;
    }),

  // Atualizar tema
  updateTheme: protectedProcedure
    .input(z.object({ theme: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const prefs = await ctx.prisma.userPreferences.upsert({
        where: { userId: ctx.userId },
        update: { theme: input.theme },
        create: {
          userId: ctx.userId,
          theme: input.theme,
        },
      });
      return prefs;
    }),
});
