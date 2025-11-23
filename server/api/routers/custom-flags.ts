import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const customFlagsRouter = createTRPCRouter({
  // Listar todas as flags customizadas do usuário
  list: protectedProcedure.query(async ({ ctx }) => {
    const flags = await ctx.prisma.customFlag.findMany({
      where: { userId: ctx.userId },
      orderBy: { createdAt: "asc" },
    });
    return flags;
  }),

  // Criar uma nova flag customizada
  create: protectedProcedure
    .input(
      z.object({
        label: z.string().min(1).max(50),
        colorClass: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const flag = await ctx.prisma.customFlag.create({
        data: {
          label: input.label,
          colorClass: input.colorClass,
          userId: ctx.userId,
        },
      });
      return flag;
    }),

  // Deletar uma flag customizada
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.customFlag.delete({
        where: {
          id: input.id,
          userId: ctx.userId, // Garantir que só deleta suas próprias flags
        },
      });
      return { success: true };
    }),
});
