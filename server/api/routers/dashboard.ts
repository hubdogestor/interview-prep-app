import { z } from "zod";

import { analyzeJobFit } from "@/lib/ai/gemini";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  overview: protectedProcedure.query(async ({ ctx }) => {
    const [profile, competencias, experiencias, speeches, questions, icebreakers] =
      await Promise.all([
        ctx.prisma.profile.findFirst({ where: { userId: ctx.userId } }),
        ctx.prisma.competencia.findMany({ where: { userId: ctx.userId }, orderBy: { createdAt: "desc" } }),
        ctx.prisma.experiencia.findMany({ where: { userId: ctx.userId }, orderBy: { createdAt: "desc" } }),
        ctx.prisma.speech.findMany({ where: { userId: ctx.userId }, orderBy: { createdAt: "desc" } }),
        ctx.prisma.question.findMany({ where: { userId: ctx.userId }, orderBy: { createdAt: "desc" } }),
        ctx.prisma.icebreaker.findMany({ where: { userId: ctx.userId }, orderBy: { createdAt: "desc" } }),
      ]);

    const totals = {
      competencias: competencias.length,
      experiencias: experiencias.length,
      speeches: speeches.length,
      questions: questions.length,
      icebreakers: icebreakers.length,
    };

    // Merge and sort all items by updatedAt for recent activities
    const allItems = [
      ...icebreakers.map((item) => ({
        id: item.id,
        type: "icebreaker" as const,
        title: item.titulo,
        updatedAt: item.updatedAt,
        favorite: item.favorite,
      })),
      ...speeches.map((item) => ({
        id: item.id,
        type: "speech" as const,
        title: item.titulo,
        updatedAt: item.updatedAt,
        favorite: item.favorite,
      })),
      ...questions.map((item) => ({
        id: item.id,
        type: "question" as const,
        title:
          typeof item.pergunta === "string"
            ? item.pergunta
            : (item.pergunta as { pt: string }).pt,
        updatedAt: item.updatedAt,
        favorite: item.favorite,
      })),
    ];

    // Sort by updatedAt descending
    const recentItems = allItems
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 10);

    // Get favorites
    const favoriteItems = allItems
      .filter((item) => item.favorite)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 10);

    return {
      profile,
      totals,
      recentItems,
      favoriteItems,
      featured: {
        experiencia: experiencias.at(0) ?? null,
        competencia: competencias.at(0) ?? null,
        speech: speeches.at(0) ?? null,
      },
      recent: {
        icebreakers: icebreakers.slice(0, 3),
        questions: questions.slice(0, 3),
      },
    };
  }),

  // Get items that need review (no practice in 7+ days)
  needsReview: protectedProcedure.query(async ({ ctx }) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get all STAR Cases from experiences
    const experiencias = await ctx.prisma.experiencia.findMany({
      where: { userId: ctx.userId },
    });

    const starCases = experiencias.flatMap((exp) =>
      (exp.starCases as Array<{ id?: string; titulo?: string; competencia?: string; createdAt?: Date }>).map((starCase) => ({
        id: starCase.id,
        experienciaId: exp.id,
        titulo: starCase.titulo,
        competencia: starCase.competencia,
        createdAt: starCase.createdAt || exp.createdAt,
      }))
    );

    // Get recent practice sessions
    const practiceSessions = await ctx.prisma.practiceSession.findMany({
      where: {
        userId: ctx.userId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        itemId: true,
        tipo: true,
        createdAt: true,
      },
    });

    // Get all icebreakers and speeches
    const [icebreakers, speeches] = await Promise.all([
      ctx.prisma.icebreaker.findMany({
        where: { userId: ctx.userId },
        select: { id: true, titulo: true, createdAt: true },
      }),
      ctx.prisma.speech.findMany({
        where: { userId: ctx.userId },
        select: { id: true, titulo: true, createdAt: true },
      }),
    ]);

    // Create a map of recently practiced items
    const recentlyPracticed = new Set(
      practiceSessions.map((session) => `${session.tipo}-${session.itemId}`)
    );

    // Filter items that haven't been practiced in 7 days
    const needsReview = [];

    // Check icebreakers
    for (const icebreaker of icebreakers) {
      const key = `icebreaker-${icebreaker.id}`;
      if (!recentlyPracticed.has(key)) {
        needsReview.push({
          id: icebreaker.id,
          tipo: "icebreaker" as const,
          titulo: icebreaker.titulo,
          diasSemPraticar: Math.floor(
            (Date.now() - icebreaker.createdAt.getTime()) / (1000 * 60 * 60 * 24)
          ),
        });
      }
    }

    // Check speeches
    for (const speech of speeches) {
      const key = `speech-${speech.id}`;
      if (!recentlyPracticed.has(key)) {
        needsReview.push({
          id: speech.id,
          tipo: "speech" as const,
          titulo: speech.titulo,
          diasSemPraticar: Math.floor(
            (Date.now() - speech.createdAt.getTime()) / (1000 * 60 * 60 * 24)
          ),
        });
      }
    }

    // Check STAR Cases
    for (const starCase of starCases) {
      const key = `star_case-${starCase.id}`;
      if (!recentlyPracticed.has(key)) {
        needsReview.push({
          id: starCase.id,
          experienciaId: starCase.experienciaId,
          tipo: "star_case" as const,
          titulo: starCase.titulo,
          competencia: starCase.competencia,
          diasSemPraticar: Math.floor(
            (Date.now() - starCase.createdAt.getTime()) / (1000 * 60 * 60 * 24)
          ),
        });
      }
    }

    // Filter only items with 7+ days without practice and sort by days
    return needsReview
      .filter((item) => item.diasSemPraticar >= 7)
      .sort((a, b) => b.diasSemPraticar - a.diasSemPraticar)
      .slice(0, 10);
  }),

  // Get AI usage statistics
  aiStats: protectedProcedure.query(async () => {
    // For now, return mock data since we don't track AI usage in DB yet
    // In production, you'd add an AIGenerationLog table to track this

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
      },
    };
  }),

  // Analyze job fit with AI
  analyzeJobFit: protectedProcedure
    .input(
      z.object({
        jobDescription: z.string().min(50, "Descrição da vaga muito curta"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await analyzeJobFit(input.jobDescription, ctx.userId);
      return result;
    }),
});
