import { analytics, reviewChecklist, statCards, timeline } from "@/components/dashboard/data";
import BracketsIcon from "@/components/icons/brackets";
import GearIcon from "@/components/icons/gear";
import MicrophoneIcon from "@/components/icons/microphone";
import type {
  DashboardNotification,
  DashboardStat,
  FocusRankingItem,
  FocusWidgetData,
  PerformanceChartData,
  PreparationStatus,
  TimePeriod,
} from "@/types/dashboard";
import type { ProfileSummary } from "@/types/profile";
import { parseISO } from "date-fns";

type DashboardV0Data = {
  stats: DashboardStat[];
  chart: PerformanceChartData;
  ranking: FocusRankingItem[];
  statuses: PreparationStatus[];
  notifications: DashboardNotification[];
  widget: FocusWidgetData;
};

const avatarPool = [
  "/avatars/user_krimson.png",
  "/avatars/user_mati.png",
  "/avatars/user_joyboy.png",
  "/avatars/user_pek.png",
];

const formatRelativeDate = (value?: string | null) => {
  if (!value) return "Sem atualização registrada";

  try {
    const date = typeof value === "string" ? parseISO(value) : value;
    if (Number.isNaN(date.getTime())) return "Atualização recente";

    const diffHours = Math.abs(Date.now() - date.getTime()) / (1000 * 60 * 60);

    if (diffHours < 2) return "Atualizado há pouco";
    if (diffHours < 24) return `Atualizado há ${Math.round(diffHours)}h`;

    const diffDays = Math.round(diffHours / 24);
    return `Atualizado há ${diffDays}d`;
  } catch {
    return "Atualização recente";
  }
};

const intentFromTrend = (trend?: "positive" | "warning" | "negative") => {
  if (trend === "warning" || trend === "negative") {
    return trend === "negative" ? "negative" : "neutral";
  }
  return "positive";
};

const directionFromTrend = (trend?: "positive" | "warning" | "negative") => {
  if (!trend) return undefined;
  if (trend === "positive") return "up" as const;
  if (trend === "negative") return "down" as const;
  return undefined;
};

const clampScore = (value: number) => Math.max(30, Math.min(100, Math.round(value)));

const buildPerformanceTrack = <T extends TimePeriod>(labels: string[], offset = 0) =>
  labels.map((label, index) => {
    const reference = timeline[index % timeline.length]?.value ?? 60;
    const secondary = analytics[index % analytics.length]?.value ?? 55;

    return {
      label,
      preparation: clampScore(reference - offset + index * 3),
      confidence: clampScore(secondary - offset / 2 + index * 2),
      consistency: clampScore(reference * 0.85 + secondary * 0.1),
    };
  });

export const buildDashboardV0Data = (profile?: ProfileSummary | null): DashboardV0Data => {
  const stats: DashboardStat[] = statCards.slice(0, 3).map((card, index) => {
    const icon = [BracketsIcon, MicrophoneIcon, GearIcon][index] ?? BracketsIcon;

    return {
      label: card.label,
      value: card.amount,
      description: card.change,
      intent: intentFromTrend(card.trend),
      direction: directionFromTrend(card.trend),
      icon,
      tag: card.trend === "positive" ? "em alta" : undefined,
    };
  });

  const chart: PerformanceChartData = {
    week: buildPerformanceTrack(
      timeline.slice(0, 6).map((item) => item.label),
      4,
    ),
    month: buildPerformanceTrack(
      analytics.map((item) => item.label),
      2,
    ),
    year: buildPerformanceTrack(["Q1", "Q2", "Q3", "Q4"], 0),
  };

  const ranking: FocusRankingItem[] = analytics
    .slice()
    .sort((a, b) => b.value - a.value)
    .map((skill, index) => ({
      id: index + 1,
      area: skill.label,
      description: `Foco em ${skill.label.toLowerCase()}`,
      score: clampScore(skill.value),
      avatar: avatarPool[index % avatarPool.length],
      featured: index === 0,
      highlight: index === 0 ? "Prioridade da semana" : undefined,
    }));

  const questionsMetric = profile?.metrics.find((metric) => metric.key === "questions");
  const experiencesMetric = profile?.metrics.find((metric) => metric.key === "experiencias");

  const statuses: PreparationStatus[] = [
    {
      title: "Perfil principal",
      value: profile?.name ?? "Perfil em construção",
      status: profile?.status === "ready" ? "Detalhes completos" : "Dados parciais",
      variant: profile?.status === "ready" ? "success" : "warning",
    },
    {
      title: "Experiências registradas",
      value: experiencesMetric?.value ?? "0",
      status: experiencesMetric?.hint ?? "Mapeie exemplos relevantes",
      variant: experiencesMetric && Number(experiencesMetric.value) > 0 ? "success" : "warning",
    },
    {
      title: "Perguntas para o entrevistador",
      value: questionsMetric?.value ?? "0",
      status:
        Number(questionsMetric?.value ?? 0) >= 5
          ? "Rotina consolidada"
          : "Alimente com novas perguntas",
      variant: Number(questionsMetric?.value ?? 0) >= 5 ? "success" : "warning",
    },
  ];

  const notifications: DashboardNotification[] = reviewChecklist.map((item, index) => ({
    id: `checklist-${index}`,
    title: item.title,
    message:
      item.type === "voice"
        ? "Pratique sua resposta em voz alta para ganhar confiança."
        : "Reserve 15 minutos hoje para evoluir este ponto.",
    timestamp: new Date(Date.now() - index * 45 * 60 * 1000).toISOString(),
    type: item.type === "voice" ? "info" : "warning",
    read: index > 1,
    priority: index === 0 ? "high" : "medium",
  }));

  notifications.push({
    id: "profile-update",
    title: "Resumo atualizado",
    message: formatRelativeDate(profile?.updatedAt),
    timestamp: new Date().toISOString(),
    type: profile?.status === "ready" ? "success" : "info",
    read: false,
    priority: "low",
  });

  const now = new Date();
  const widget: FocusWidgetData = {
    location: profile?.title ? `Foco: ${profile.title}` : "Modo estudo ativo",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    temperature: `${55 + clampScore((timeline[0]?.value ?? 50) / 2)}%`,
    weather: "Índice de confiança",
    dateLabel: now.toLocaleDateString("pt-BR", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
  };

  return {
    stats,
    chart,
    ranking,
    statuses,
    notifications,
    widget,
  };
};

export type { DashboardV0Data };
