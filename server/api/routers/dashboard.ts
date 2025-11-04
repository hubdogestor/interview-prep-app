import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { analyzeJobFit } from "@/lib/ai/gemini";
import { sanitizeForAIPrompt } from "@/lib/security/input-sanitizer";

export const dashboardRouter = createTRPCRouter({
  /**
   * Overview otimizado - usa counts e select para minimizar dados transferidos
   */
  overview: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Buscar perfil e counts em paralelo
    const [profile, totals, recentIcebreakers, recentSpeeches, recentQuestions] =
      await Promise.all([
        // Perfil com campos selecionados
        ctx.prisma.profile.findFirst({
          where: { userId },
          select: {
            id: true,
            nome: true,
            titulo: true,
            foto: true,
            anosExperiencia: true,
            updatedAt: true,
          },
        }),

        // Counts em paralelo
        ctx.prisma.$transaction([
          ctx.prisma.competencia.count({ where: { userId } }),
          ctx.prisma.experiencia.count({ where: { userId } }),
          ctx.prisma.speech.count({ where: { userId } }),
          ctx.prisma.question.count({ where: { userId } }),
          ctx.prisma.icebreaker.count({ where: { userId } }),
          ctx.prisma.practiceSession.count({ where: { userId } }),
        ]),

        // Buscar apenas campos necessários para items recentes
        ctx.prisma.icebreaker.findMany({
          take: 10,
          where: { archived: false, userId },
          select: {
            id: true,
            titulo: true,
            tipo: true,
            updatedAt: true,
            favorite: true,
          },
          orderBy: { updatedAt: "desc" },
        }),

        ctx.prisma.speech.findMany({
          take: 10,
          where: { archived: false, userId },
          select: {
            id: true,
            titulo: true,
            tipoVaga: true,
            updatedAt: true,
            favorite: true,
          },
          orderBy: { updatedAt: "desc" },
        }),

        ctx.prisma.question.findMany({
          take: 10,
          where: { userId },
          select: {
            id: true,
            pergunta: true,
            categoria: true,
            updatedAt: true,
            favorite: true,
          },
          orderBy: { updatedAt: "desc" },
        }),
      ]);

    const [
      competenciasCount,
      experienciasCount,
      speechesCount,
      questionsCount,
      icebreakersCount,
      practiceSessionsCount,
    ] = totals;

    // Merge e ordenar items para timeline
    const allItems = [
      ...recentIcebreakers.map((item) => ({
        id: item.id,
        type: "icebreaker" as const,
        title: item.titulo,
        subtitle: item.tipo,
        updatedAt: item.updatedAt,
        favorite: item.favorite,
      })),
      ...recentSpeeches.map((item) => ({
        id: item.id,
        type: "speech" as const,
        title: item.titulo,
        subtitle: item.tipoVaga,
        updatedAt: item.updatedAt,
        favorite: item.favorite,
      })),
      ...recentQuestions.map((item) => ({
        id: item.id,
        type: "question" as const,
        title:
          typeof item.pergunta === "string"
            ? item.pergunta
            : (item.pergunta as { pt: string }).pt,
        subtitle: item.categoria,
        updatedAt: item.updatedAt,
        favorite: item.favorite,
      })),
    ];

    // Ordenar por data e pegar os 10 mais recentes
    const recentItems = allItems
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 10);

    // Filtrar favoritos
    const favoriteItems = allItems
      .filter((item) => item.favorite)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 10);

    return {
      profile,
      totals: {
        competencias: competenciasCount,
        experiencias: experienciasCount,
        speeches: speechesCount,
        questions: questionsCount,
        icebreakers: icebreakersCount,
        practiceSessions: practiceSessionsCount,
      },
      recentItems,
      favoriteItems,
    };
  }),

  /**
   * Items que precisam de revisão (não praticados há 7+ dias)
   */
  needsReview: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Buscar sessões de prática recentes (últimos 7 dias)
    const recentPracticeSessions = await ctx.prisma.practiceSession.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        userId,
      },
      select: {
        itemId: true,
        tipo: true,
      },
    });

    // Criar set de items praticados recentemente
    const recentlyPracticedIds = new Set(
      recentPracticeSessions.map((s) => `${s.tipo}-${s.itemId}`)
    );

    // Buscar todos os items (apenas campos necessários)
    const [icebreakers, speeches] = await Promise.all([
      ctx.prisma.icebreaker.findMany({
        where: { archived: false, userId },
        select: { id: true, titulo: true, createdAt: true },
      }),
      ctx.prisma.speech.findMany({
        where: { archived: false, userId },
        select: { id: true, titulo: true, createdAt: true },
      }),
    ]);

    // Identificar items que precisam revisão
    const needsReview: Array<{
      id: string;
      tipo: string;
      titulo: string;
      diasSemPraticar: number;
    }> = [];

    const now = Date.now();
    const oneDayMs = 1000 * 60 * 60 * 24;

    // Check icebreakers
    for (const item of icebreakers) {
      if (!recentlyPracticedIds.has(`icebreaker-${item.id}`)) {
        needsReview.push({
          id: item.id,
          tipo: "icebreaker",
          titulo: item.titulo,
          diasSemPraticar: Math.floor((now - item.createdAt.getTime()) / oneDayMs),
        });
      }
    }

    // Check speeches
    for (const item of speeches) {
      if (!recentlyPracticedIds.has(`speech-${item.id}`)) {
        needsReview.push({
          id: item.id,
          tipo: "speech",
          titulo: item.titulo,
          diasSemPraticar: Math.floor((now - item.createdAt.getTime()) / oneDayMs),
        });
      }
    }

    // Retornar apenas items com 7+ dias, ordenados por dias sem praticar
    return needsReview
      .filter((item) => item.diasSemPraticar >= 7)
      .sort((a, b) => b.diasSemPraticar - a.diasSemPraticar)
      .slice(0, 20);
  }),

  /**
   * Estatísticas de práticas
   */
  practiceStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalSessions, weekSessions, monthSessions, avgScore] = await Promise.all([
      ctx.prisma.practiceSession.count({ where: { userId } }),
      ctx.prisma.practiceSession.count({
        where: { createdAt: { gte: lastWeek }, userId },
      }),
      ctx.prisma.practiceSession.count({
        where: { createdAt: { gte: lastMonth }, userId },
      }),
      ctx.prisma.practiceSession.aggregate({
        _avg: { score: true },
        where: { score: { not: null }, userId },
      }),
    ]);

    // Buscar distribuição por tipo
    const sessionsByType = await ctx.prisma.practiceSession.groupBy({
      by: ["tipo"],
      where: { userId },
      _count: { tipo: true },
    });

    return {
      total: totalSessions,
      thisWeek: weekSessions,
      thisMonth: monthSessions,
      avgScore: avgScore._avg.score ?? 0,
      byType: sessionsByType.reduce(
        (acc, item) => {
          acc[item.tipo] = item._count.tipo;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  }),

  /**
   * AI Statistics (placeholder - requires AI usage logging table)
   */
  aiStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    // TODO: Implementar tabela de logs de AI para rastrear uso real
    // Por enquanto, retorna dados zerados
    return {
      thisWeek: 0,
      thisMonth: 0,
      total: 0,
      byType: {
        competencias: 0,
        experiencias: 0,
        starCases: 0,
        icebreakers: 0,
        speeches: 0,
        questions: 0,
      },
    };
  }),

  /**
   * Analisar fit com vaga usando IA
   */
  analyzeJobFit: protectedProcedure
    .input(
      z.object({
        jobDescription: z.string().min(50, "Descrição da vaga muito curta").max(10000),
        jobTitle: z.string().max(200).optional(),
        company: z.string().max(200).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      // Sanitizar input
      const descricaoSanitizada = sanitizeForAIPrompt(input.jobDescription, 10000);

      if (!descricaoSanitizada) {
        throw new Error("Descrição contém caracteres inválidos");
      }

      const result = await analyzeJobFit(descricaoSanitizada);
      return result;
    }),
});
