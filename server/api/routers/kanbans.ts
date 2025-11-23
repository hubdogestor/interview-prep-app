import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const kanbansRouter = createTRPCRouter({
  // Get kanban board by name
  get: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const board = await ctx.prisma.kanbanBoard.findFirst({
        where: {
          userId: ctx.userId,
          name: input.name,
        },
      });

      return board;
    }),

  // List all kanban boards for the user
  list: protectedProcedure.query(async ({ ctx }) => {
    const boards = await ctx.prisma.kanbanBoard.findMany({
      where: { userId: ctx.userId },
      orderBy: { updatedAt: "desc" },
    });

    return boards;
  }),

  // Save or update kanban board
  save: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        columns: z.array(z.any()), // BoardColumn[] serializado como JSON
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verificar se já existe board com esse nome para o userId
      const existing = await ctx.prisma.kanbanBoard.findFirst({
        where: {
          userId: ctx.userId,
          name: input.name,
        },
      });

      if (existing) {
        // Atualizar existente
        return ctx.prisma.kanbanBoard.update({
          where: { id: existing.id },
          data: {
            columns: input.columns,
            updatedAt: new Date(),
          },
        });
      } else {
        // Criar novo
        return ctx.prisma.kanbanBoard.create({
          data: {
            name: input.name,
            columns: input.columns,
            userId: ctx.userId,
          },
        });
      }
    }),

  // Delete kanban board
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.kanbanBoard.deleteMany({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      });
    }),
});
