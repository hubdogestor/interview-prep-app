import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { assertOwnership } from "@/lib/auth/authorization";

export const practiceRouter = createTRPCRouter({
  // Listar todas as sessões de prática
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.practiceSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Buscar uma sessão específica
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.practiceSession.findUnique({
        where: { id: input.id, userId },
      });
    }),

  // Buscar sessões por tipo de item
  listByType: protectedProcedure
    .input(
      z.object({
        tipo: z.enum(["icebreaker", "speech", "star_case"]),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.practiceSession.findMany({
        where: { tipo: input.tipo, userId },
        orderBy: { createdAt: "desc" },
      });
    }),

  // Buscar sessões por item específico
  listByItem: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.practiceSession.findMany({
        where: { itemId: input.itemId, userId },
        orderBy: { createdAt: "desc" },
      });
    }),

  // Criar nova sessão de prática
  create: protectedProcedure
    .input(
      z.object({
        tipo: z.enum(["icebreaker", "speech", "star_case"]),
        itemId: z.string(),
        itemTitle: z.string(),
        duracao: z.number(),
        transcricao: z.string().optional(),
        audioUrl: z.string().optional(),
        avaliacaoIA: z
          .object({
            clareza: z.number(),
            fluencia: z.number(),
            completude: z.number(),
            pontosFortesw: z.array(z.string()),
            areasAMelhorar: z.array(z.string()),
            feedback: z.string(),
          })
          .optional(),
        notas: z.string().optional(),
        score: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.practiceSession.create({
        data: { ...input, userId },
      });
    }),

  // Atualizar sessão de prática
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        transcricao: z.string().optional(),
        avaliacaoIA: z
          .object({
            clareza: z.number(),
            fluencia: z.number(),
            completude: z.number(),
            pontosFortesw: z.array(z.string()),
            areasAMelhorar: z.array(z.string()),
            feedback: z.string(),
          })
          .optional(),
        notas: z.string().optional(),
        score: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...data } = input;
      await assertOwnership("practice", id, userId);
      return ctx.prisma.practiceSession.update({
        where: { id },
        data,
      });
    }),

  // Deletar sessão de prática
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await assertOwnership("practice", input.id, userId);
      return ctx.prisma.practiceSession.delete({
        where: { id: input.id },
      });
    }),

  // Estatísticas de práticas
  stats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const sessions = await ctx.prisma.practiceSession.findMany({
      where: { userId },
    });

    const totalSessions = sessions.length;
    const totalDuracao = sessions.reduce((sum, s) => sum + s.duracao, 0);
    const avgScore = sessions.filter((s) => s.score).length > 0
      ? sessions.reduce((sum, s) => sum + (s.score || 0), 0) /
        sessions.filter((s) => s.score).length
      : 0;

    const porTipo = {
      icebreaker: sessions.filter((s) => s.tipo === "icebreaker").length,
      speech: sessions.filter((s) => s.tipo === "speech").length,
      star_case: sessions.filter((s) => s.tipo === "star_case").length,
    };

    // Últimas 7 práticas para gráfico
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const practicesByDay = last7Days.map((day) => ({
      date: day,
      count: sessions.filter(
        (s) => s.createdAt.toISOString().split("T")[0] === day
      ).length,
    }));

    return {
      totalSessions,
      totalDuracao,
      avgScore: Math.round(avgScore),
      porTipo,
      practicesByDay,
    };
  }),
});
