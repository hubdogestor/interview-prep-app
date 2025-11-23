import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const contextSyncRouter = createTRPCRouter({
  // Obter status de sincronização
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const status = await ctx.prisma.contextSyncStatus.findUnique({
      where: { userId: ctx.userId },
    });

    if (!status) {
      return {
        lastSyncAt: new Date(0), // Epoch = nunca sincronizado
        dismissedFiles: [],
      };
    }

    return {
      lastSyncAt: status.lastSyncAt,
      dismissedFiles: status.dismissedFiles as Array<{ filename: string; dismissedAt: string }>,
    };
  }),

  // Atualizar timestamp de última sincronização
  updateLastSync: protectedProcedure.mutation(async ({ ctx }) => {
    const status = await ctx.prisma.contextSyncStatus.upsert({
      where: { userId: ctx.userId },
      update: { lastSyncAt: new Date() },
      create: {
        userId: ctx.userId,
        lastSyncAt: new Date(),
      },
    });
    return status;
  }),

  // Dismissar arquivos desatualizados
  dismissFiles: protectedProcedure
    .input(
      z.object({
        files: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currentStatus = await ctx.prisma.contextSyncStatus.findUnique({
        where: { userId: ctx.userId },
      });

      const dismissedFiles = [
        ...(currentStatus?.dismissedFiles as Array<{ filename: string; dismissedAt: string }> || []),
        ...input.files.map((filename) => ({
          filename,
          dismissedAt: new Date().toISOString(),
        })),
      ];

      const status = await ctx.prisma.contextSyncStatus.upsert({
        where: { userId: ctx.userId },
        update: { dismissedFiles },
        create: {
          userId: ctx.userId,
          dismissedFiles,
        },
      });

      return status;
    }),

  // Limpar arquivos dismissados
  clearDismissed: protectedProcedure.mutation(async ({ ctx }) => {
    const status = await ctx.prisma.contextSyncStatus.upsert({
      where: { userId: ctx.userId },
      update: { dismissedFiles: [] },
      create: {
        userId: ctx.userId,
        dismissedFiles: [],
      },
    });
    return status;
  }),
});
