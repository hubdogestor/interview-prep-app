import { router, publicProcedure } from "../trpc";
import type { ProfileSummary, ProfileMetric } from "@/types/profile";
import { placeholderProfileSummary } from "@/types/profile";

export const profileRouter = router({
  summary: publicProcedure.query(async ({ ctx }) => {
    try {
      const [profile, icebreakers, competencias, experiencias, speeches, questions] = await Promise.all([
        ctx.prisma.profile.findFirst({
          orderBy: { updatedAt: "desc" },
        }),
        ctx.prisma.icebreaker.count().catch(() => 0),
        ctx.prisma.competencia.count().catch(() => 0),
        ctx.prisma.experiencia.count().catch(() => 0),
        ctx.prisma.speech.count().catch(() => 0),
        ctx.prisma.question.count().catch(() => 0),
      ]);

      if (!profile) {
        return placeholderProfileSummary;
      }

      const resumo = (profile.resumo as { pt?: string | null; en?: string | null } | null) ?? null;

      const metrics: ProfileMetric[] = [
        {
          key: "experience",
          label: "Experiência",
          value: `${profile.anosExperiencia}+ anos`,
          hint: "Tempo total de mercado cadastrado",
        },
        {
          key: "icebreakers",
          label: "Icebreakers",
          value: icebreakers.toString(),
        },
        {
          key: "competencias",
          label: "Competências",
          value: competencias.toString(),
        },
        {
          key: "experiencias",
          label: "Experiências",
          value: experiencias.toString(),
        },
        {
          key: "speeches",
          label: "Speeches",
          value: speeches.toString(),
        },
        {
          key: "questions",
          label: "Perguntas",
          value: questions.toString(),
        },
      ];

      const links = [
        profile.email && { type: "email", label: "E-mail", value: profile.email },
        profile.telefone && { type: "phone", label: "Telefone", value: profile.telefone },
        profile.linkedin && { type: "linkedin", label: "LinkedIn", value: profile.linkedin },
        profile.github && { type: "github", label: "GitHub", value: profile.github },
      ].filter(Boolean) as ProfileSummary["links"];

      const summary: ProfileSummary = {
        id: profile.id,
        status: "ready",
        name: profile.nome,
        title: profile.titulo,
        avatarUrl: profile.foto ?? `https://avatar.vercel.sh/${encodeURIComponent(profile.nome)}.svg`,
        yearsExperience: profile.anosExperiencia,
        summaryPt: resumo?.pt ?? null,
        summaryEn: resumo?.en ?? null,
        updatedAt: profile.updatedAt?.toISOString() ?? null,
        links,
        metrics,
      };

      return summary;
    } catch (error) {
      console.error("profile.summary", error);
      return placeholderProfileSummary;
    }
  }),
});
