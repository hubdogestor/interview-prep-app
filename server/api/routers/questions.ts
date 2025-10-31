import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const questionsRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.question.findMany({
      orderBy: [
        { favorite: "desc" },
        { prioridade: "asc" },
        { createdAt: "desc" },
      ],
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.question.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        categoria: z.enum(["tecnica", "comportamental", "cultura", "carreira"]),
        pergunta: z.object({
          pt: z.string().min(1, "Pergunta em português é obrigatória"),
          en: z.string().default(""),
        }),
        contexto: z.string().optional(),
        prioridade: z.enum(["alta", "media", "baixa"]).default("media"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.question.create({
        data: {
          categoria: input.categoria,
          pergunta: input.pergunta,
          contexto: input.contexto,
          prioridade: input.prioridade,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        categoria: z.enum(["tecnica", "comportamental", "cultura", "carreira"]),
        pergunta: z.object({
          pt: z.string().min(1, "Pergunta em português é obrigatória"),
          en: z.string().default(""),
        }),
        contexto: z.string().optional(),
        prioridade: z.enum(["alta", "media", "baixa"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.question.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.question.delete({
        where: { id: input.id },
      });
    }),

  toggleFavorite: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.findUnique({
        where: { id: input.id },
      });

      if (!question) {
        throw new Error("Question not found");
      }

      return ctx.prisma.question.update({
        where: { id: input.id },
        data: { favorite: !question.favorite },
      });
    }),
});
