import dynamic from "next/dynamic";
import Link from "next/link";
import { Link2, RefreshCw, Sparkles } from "lucide-react";

import { AIStatsWidget } from "@/components/dashboard/ai-stats-widget";
import DashboardChart from "@/components/dashboard/chart";
import { ExportPortfolioButton } from "@/components/dashboard/export-portfolio-button";
import { FavoritesList } from "@/components/dashboard/favorites-list";
import DashboardPageLayout from "@/components/dashboard/layout";
import { NeedsReviewWidget } from "@/components/dashboard/needs-review-widget";
import { PracticeHeatmap } from "@/components/dashboard/practice-heatmap";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentItems } from "@/components/dashboard/recent-items";
import { SmartSuggestions } from "@/components/dashboard/smart-suggestions";
import DashboardStat from "@/components/dashboard/stat";
import BracketsIcon from "@/components/icons/brackets";
import BriefcaseIcon from "@/components/icons/briefcase";
import MessageIcon from "@/components/icons/message";
import MicrophoneIcon from "@/components/icons/microphone";
import ProcessorIcon from "@/components/icons/proccesor";
import StarIcon from "@/components/icons/star";
import { ChartSkeleton } from "@/components/loading/widget-skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import {
  type DashboardOverviewData,
  dashboardOverviewFallback,
} from "@/data/dashboard-overview-fallback";
import { api } from "@/lib/trpc/server";

const PracticeEvolutionChart = dynamic(
  () =>
    import("@/components/dashboard/practice-evolution-chart").then(
      (mod) => mod.PracticeEvolutionChart
    ),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

const formatDate = (value?: Date | string) => {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date?.getTime())) return "—";
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default async function DashboardOverview() {
  let dashboard: DashboardOverviewData = dashboardOverviewFallback;

  try {
    const caller = await api();
    dashboard = await caller.dashboard.overview();
  } catch (error) {
    console.error(
      "[dashboard] Failed to load data from Prisma. Using fallback dataset instead.",
      error,
    );
  }

  const isDemoData = dashboard === dashboardOverviewFallback;
  const totalAssets = Object.values(dashboard.totals).reduce((sum, value) => sum + (value ?? 0), 0);
  const favoritesCount = dashboard.favoriteItems.length;
  const lastUpdatedItem = dashboard.recentItems[0] ?? dashboard.favoriteItems[0];
  const lastUpdated = formatDate(lastUpdatedItem?.updatedAt);

  const operatingSignals = [
    {
      label: "Assets ativos",
      value: totalAssets,
      meta: "Icebreakers · Speeches · Questions · Cases",
    },
    {
      label: "Favoritos",
      value: favoritesCount,
      meta: "Priorize revisão semanal",
    },
    {
      label: "Último update",
      value: lastUpdated,
      meta: lastUpdatedItem?.title ?? "—",
    },
  ];

  const cadenceLoops = [
    {
      title: "Segunda · Scoreboard",
      cadence: "08h",
      description: "Revise totais e abra Practice para planejar gravações da semana.",
    },
    {
      title: "Quarta · Story stack",
      cadence: "14h",
      description: "Atualize speeches e perguntas a partir das últimas experiências.",
    },
    {
      title: "Sexta · Portfolio drop",
      cadence: "17h",
      description: "Exporte o pacote e compartilhe highlights com mentor/stakeholders.",
    },
  ];

  const bridgeLinks = [
    {
      label: "Practice HQ",
      description: "Sincronize métricas de prática antes de atualizar perguntas e speeches.",
      href: "/practice",
    },
    {
      label: "Experiências",
      description: "Garanta que cada caso recente esteja conectado a um track record.",
      href: "/experiencias",
    },
    {
      label: "Competências",
      description: "Traduza métricas recentes em skills prontas para entrevistas.",
      href: "/competencias",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Overview",
        description: `Last updated ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
        icon: BracketsIcon,
      }}
    >
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="size-5 text-primary" />
                Operating system
              </CardTitle>
              <CardDescription>
                Use os sinais abaixo e os quick actions para abrir os hubs certos antes de cada review.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {operatingSignals.map((signal) => (
                  <div key={signal.label} className="rounded-xl border bg-muted/40 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                    <p className="text-lg font-semibold">{signal.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{signal.meta}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-dashed p-4">
                <QuickActions />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <RefreshCw className="size-5 text-primary" />
                Cadência semanal
              </CardTitle>
              <CardDescription>
                Checkpoints curtos para manter storytelling, prática e portfólio alinhados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {cadenceLoops.map((loop) => (
                <div key={loop.title} className="rounded-lg border border-primary/30 bg-background/70 p-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                    <span>{loop.title}</span>
                    <span className="rounded-full border px-2 py-0.5 text-[10px]">{loop.cadence}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{loop.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Performance snapshot</h2>
              <p className="text-sm text-muted-foreground">Revise estes totais e ajuste os rituais da semana.</p>
            </div>
            {isDemoData && (
              <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
                Demo data
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <DashboardStat
              label="ICEBREAKERS"
              value={String(dashboard.totals.icebreakers)}
              description="INTRODUCTIONS"
              icon={MicrophoneIcon}
              intent="positive"
            />
            <DashboardStat
              label="SPEECHES"
              value={String(dashboard.totals.speeches)}
              description="NARRATIVES"
              icon={MessageIcon}
              intent="positive"
            />
            <DashboardStat
              label="QUESTIONS"
              value={String(dashboard.totals.questions)}
              description="STAKEHOLDERS"
              icon={StarIcon}
              intent="neutral"
            />
            <DashboardStat
              label="EXPERIENCES"
              value={String(dashboard.totals.experiencias)}
              description="JOURNEY"
              icon={BriefcaseIcon}
              intent="positive"
            />
            <DashboardStat
              label="COMPETENCIES"
              value={String(dashboard.totals.competencias)}
              description="SKILLS"
              icon={ProcessorIcon}
              intent="positive"
            />
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Hubs conectados</h2>
            <p className="text-sm text-muted-foreground">Abra rapidamente os hubs que alimentam o scoreboard.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {bridgeLinks.map((link) => (
              <Card key={link.label} className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Link2 className="size-4 text-primary" />
                    {link.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p className="leading-relaxed">{link.description}</p>
                  <Button asChild variant="secondary" size="sm">
                    <Link href={link.href}>Abrir hub</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Observabilidade</h2>
              <p className="text-sm text-muted-foreground">Mantenha o gráfico atualizado antes de exportar o portfólio.</p>
            </div>
            <ExportPortfolioButton />
          </div>
          <DashboardChart />
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ErrorBoundary>
            <NeedsReviewWidget />
          </ErrorBoundary>
          <ErrorBoundary>
            <AIStatsWidget />
          </ErrorBoundary>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ErrorBoundary>
            <PracticeEvolutionChart />
          </ErrorBoundary>
          <ErrorBoundary>
            <PracticeHeatmap />
          </ErrorBoundary>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ErrorBoundary>
            <SmartSuggestions />
          </ErrorBoundary>
          <ErrorBoundary>
            <RecentItems items={dashboard.recentItems} />
          </ErrorBoundary>
          <ErrorBoundary>
            <FavoritesList items={dashboard.favoriteItems} />
          </ErrorBoundary>
        </section>
      </div>
    </DashboardPageLayout>
  );
}
