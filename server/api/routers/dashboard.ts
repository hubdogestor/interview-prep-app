import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  overview: publicProcedure.query(async ({ ctx }) => {
    const [profile, competencias, experiencias, speeches, questions, icebreakers] =
      await Promise.all([
        ctx.prisma.profile.findFirst(),
        ctx.prisma.competencia.findMany({ orderBy: { createdAt: "desc" } }),
        ctx.prisma.experiencia.findMany({ orderBy: { createdAt: "desc" } }),
        ctx.prisma.speech.findMany({ orderBy: { createdAt: "desc" } }),
        ctx.prisma.question.findMany({ orderBy: { createdAt: "desc" } }),
        ctx.prisma.icebreaker.findMany({ orderBy: { createdAt: "desc" } }),
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
});
