import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const okrsRouter = createTRPCRouter({
  // Get OKRs for the current user
  get: protectedProcedure.query(async ({ ctx }) => {
    const okr = await ctx.prisma.oKR.findFirst({
      where: { userId: ctx.userId },
      orderBy: { updatedAt: "desc" },
    });

    return okr;
  }),

  // Get OKRs by quarter
  getByQuarter: protectedProcedure
    .input(z.object({ quarter: z.string() }))
    .query(async ({ ctx, input }) => {
      const okr = await ctx.prisma.oKR.findFirst({
        where: {
          userId: ctx.userId,
          quarter: input.quarter,
        },
      });

      return okr;
    }),

  // Save or update OKRs
  save: protectedProcedure
    .input(
      z.object({
        quarter: z.string(),
        columns: z.array(z.any()), // BoardColumn[] serializado como JSON
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verificar se já existe OKR para esse quarter e userId
      const existing = await ctx.prisma.oKR.findFirst({
        where: {
          userId: ctx.userId,
          quarter: input.quarter,
        },
      });

      if (existing) {
        // Atualizar existente
        return ctx.prisma.oKR.update({
          where: { id: existing.id },
          data: {
            columns: input.columns,
            updatedAt: new Date(),
          },
        });
      } else {
        // Criar novo
        return ctx.prisma.oKR.create({
          data: {
            quarter: input.quarter,
            columns: input.columns,
            userId: ctx.userId,
          },
        });
      }
    }),

  // Delete OKR
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.oKR.deleteMany({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      });
    }),

  // List all quarters with OKRs for the user
  listQuarters: protectedProcedure.query(async ({ ctx }) => {
    const okrs = await ctx.prisma.oKR.findMany({
      where: { userId: ctx.userId },
      select: {
        id: true,
        quarter: true,
        updatedAt: true,
      },
      orderBy: { quarter: "desc" },
    });

    return okrs;
  }),
});
