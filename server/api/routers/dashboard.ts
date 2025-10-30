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

    return {
      profile,
      totals,
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
