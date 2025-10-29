import { router, publicProcedure } from "../trpc";
import type { Prisma } from "@prisma/client";
import type { ProfileSummary, ProfileMetric, ProfileLink } from "@/types/profile";
import { placeholderProfileSummary } from "@/types/profile";

type ProfileRecord = Awaited<ReturnType<Prisma["profile"]["findFirst"]>>;
type MetricsSnapshot = Awaited<ReturnType<typeof getProfileMetrics>>;

async function getProfileMetrics(prisma: Prisma.TransactionClient) {
  const [icebreakers, competencias, experiencias, speeches, questions] = await Promise.all([
    prisma.icebreaker.count().catch(() => 0),
    prisma.competencia.count().catch(() => 0),
    prisma.experiencia.count().catch(() => 0),
    prisma.speech.count().catch(() => 0),
    prisma.question.count().catch(() => 0),
  ]);

  return {
    icebreakers,
    competencias,
    experiencias,
    speeches,
    questions,
  };
}

function buildProfileSummary(profile: ProfileRecord, metrics: MetricsSnapshot): ProfileSummary {
  if (!profile) {
    return placeholderProfileSummary;
  }

  const resumo = (profile.resumo as { pt?: string | null; en?: string | null } | null) ?? null;

  const metricItems: ProfileMetric[] = [
    {
      key: "experience",
      label: "Experiência",
      value: `${profile.anosExperiencia}+ anos`,
      hint: "Tempo total de mercado cadastrado",
    },
    { key: "icebreakers", label: "Icebreakers", value: metrics.icebreakers.toString() },
    { key: "competencias", label: "Competências", value: metrics.competencias.toString() },
    { key: "experiencias", label: "Experiências", value: metrics.experiencias.toString() },
    { key: "speeches", label: "Speeches", value: metrics.speeches.toString() },
    { key: "questions", label: "Perguntas", value: metrics.questions.toString() },
  ];

  const links: ProfileLink[] = [];
  if (profile.email) links.push({ type: "email", label: "E-mail", value: profile.email });
  if (profile.telefone) links.push({ type: "phone", label: "Telefone", value: profile.telefone });
  if (profile.linkedin) links.push({ type: "linkedin", label: "LinkedIn", value: profile.linkedin });
  if (profile.github) links.push({ type: "github", label: "GitHub", value: profile.github });

  return {
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
    metrics: metricItems,
  };
}

export const profileRouter = router({
  summary: publicProcedure.query(async ({ ctx }) => {
    try {
      const profile = await ctx.prisma.profile.findFirst({
        orderBy: { updatedAt: "desc" },
      });

      if (!profile) {
        return placeholderProfileSummary;
      }

      const metrics = await getProfileMetrics(ctx.prisma);
      return buildProfileSummary(profile, metrics);
    } catch (error) {
      console.error("profile.summary", error);
      return placeholderProfileSummary;
    }
  }),
});
