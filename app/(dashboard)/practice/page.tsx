"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  Link2,
  MessageSquare,
  Mic,
  NotebookPen,
  Target,
  TrendingUp,
} from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trpc } from "@/lib/trpc/react";
import { isAvaliacaoIA } from "@/lib/type-guards";

const tipoConfig = {
  icebreaker: {
    icon: Mic,
    label: "Icebreaker",
    color: "text-chart-1",
    bgColor: "bg-chart-1/20",
  },
  speech: {
    icon: MessageSquare,
    label: "Speech",
    color: "text-chart-2",
    bgColor: "bg-chart-2/20",
  },
  star_case: {
    icon: Briefcase,
    label: "STAR Case",
    color: "text-chart-3",
    bgColor: "bg-chart-3/20",
  },
};

const formatTempoTotal = (segundos: number) => {
  if (!segundos) return "0 min";
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  if (!horas) return `${minutosRestantes} min`;
  return `${horas}h ${minutosRestantes.toString().padStart(2, "0")}min`;
};

export default function PracticeHistoryPage() {
  const router = useRouter();
  const { data: sessions = [], isLoading: sessionsLoading } = trpc.practice.list.useQuery();
  const { data: stats, isLoading: statsLoading } = trpc.practice.stats.useQuery();

  const formatDuracao = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}min ${secs}s`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (sessionsLoading || statsLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Practice HQ",
          description: "Cadência diária para icebreakers, speeches e STAR cases.",
          icon: Target,
        }}
      >
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card className="p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="grid gap-3 sm:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="space-y-2 rounded-xl border p-3">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="rounded-lg border p-3 space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-8 w-16 my-2" />
                <Skeleton className="h-3 w-32" />
              </Card>
            ))}
          </div>
          <Card className="p-6">
            <Skeleton className="h-5 w-40 mb-4" />
            <Skeleton className="h-40 w-full" />
          </Card>
        </div>
      </DashboardPageLayout>
    );
  }

  const totalDaysActive = stats?.practicesByDay?.filter((d) => d.count > 0).length ?? 0;
  const sessionsWithIA = sessions.filter((session) => isAvaliacaoIA(session.avaliacaoIA));
  const lastPracticeDate = sessions[0]?.createdAt ? formatDate(sessions[0].createdAt) : "—";

  const practiceSignals = [
    {
      label: "Sessões logadas",
      value: stats?.totalSessions?.toString() ?? "0",
      meta: "Objetivo: 5/semana",
    },
    {
      label: "Feedback IA",
      value: sessionsWithIA.length.toString(),
      meta: "Clareza · Fluência · Completude",
    },
    {
      label: "Última prática",
      value: lastPracticeDate,
      meta: lastPracticeDate === "—" ? "Comece hoje" : "Mantenha o ritmo",
    },
  ];

  const cadenceLoops = [
    {
      title: "Daily Warm-up",
      cadence: "Manhã",
      description: "Grave 1 minuto de icebreaker e marque o sentimento dominante.",
    },
    {
      title: "Weekly Scrimmage",
      cadence: "Quarta",
      description: "Execute um STAR case completo (8 min) e revise com IA.",
    },
    {
      title: "Monthly Playback",
      cadence: "Última sexta",
      description: "Escolha a melhor sessão do mês e compartilhe com mentor.",
    },
  ];

  const practiceStats = [
    {
      label: "Sessões gravadas",
      value: stats?.totalSessions?.toString() ?? "0",
      meta: "Desde o início",
      icon: Target,
    },
    {
      label: "Tempo concentrado",
      value: formatTempoTotal(stats?.totalDuracao || 0),
      meta: "Áudio registrado",
      icon: Clock,
    },
    {
      label: "Score médio IA",
      value: stats?.avgScore ? Number(stats.avgScore).toFixed(1) : "—",
      meta: "Clareza · Fluência · Completude",
      icon: TrendingUp,
    },
    {
      label: "Dias ativos",
      value: totalDaysActive.toString(),
      meta: "Últimos 30 dias",
      icon: Calendar,
    },
  ];

  const focusStacks = [
    {
      title: "Icebreaker Burst",
      duration: "5 min diário",
      description: "Ritual rápido para destravar storytelling em 60 segundos.",
      steps: ["Escolha 1 prompt do hub", "Grave no modo áudio", "Marque insight no OneNote"],
      href: "/icebreakers",
    },
    {
      title: "Speech Lab",
      duration: "2x por semana",
      description: "Transforme ideias em falas com tempo real e métricas.",
      steps: ["Revise outline", "Grave com cronômetro", "Anote ajustes de ritmo"],
      href: "/speeches",
    },
    {
      title: "STAR Case Deep Dive",
      duration: "1x por semana",
      description: "Documente vitórias e converta em casos reutilizáveis.",
      steps: ["Atualize evidências", "Rode IA para feedback", "Envie para mentor"],
      href: "/practice/new",
    },
  ];

  const bridgeLinks = [
    {
      label: "Perguntas-chave",
      description: "Use o banco de perguntas para aquecer antes das sessões.",
      href: "/questions",
    },
    {
      label: "Writing Culture",
      description: "Converta aprendizados em narrativas de 2 ou 6 páginas.",
      href: "/amz-pay-ops/culture/writing",
    },
    {
      label: "PgM Toolkit",
      description: "Sincronize práticas com artefatos de status e mecanismos.",
      href: "/amz-pay-ops/role",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Practice HQ",
        description: "Cadência diária para icebreakers, speeches e STAR cases.",
        icon: Target,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
      }}
    >
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Sistema de prática</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Escolha um formato por dia, capture métricas e compartilhe aprendizados a cada sexta-feira.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {practiceSignals.map((signal) => (
                <div key={signal.label} className="rounded-xl border bg-muted/40 p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                  <p className="text-lg font-semibold">{signal.value}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{signal.meta}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <NotebookPen className="size-5 text-primary flex-shrink-0" />
                Cadência semanal
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Mantenha loops curtos para garantir consistência e feedback.
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
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Practice Scoreboard</h2>
            <p className="text-sm text-muted-foreground">Revise estes números toda segunda-feira antes do Sprint.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {practiceStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="border-border/70">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-display">{stat.value}</p>
                      <p className="text-[11px] text-muted-foreground">{stat.meta}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Rotinas de foco</h2>
            <p className="text-sm text-muted-foreground">Selecione uma rotina por dia para garantir volume e profundidade.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {focusStacks.map((stack) => (
              <Card key={stack.title} className="flex h-full flex-col border-border/70">
                <CardHeader className="pb-3">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
                      {stack.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{stack.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{stack.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
                  {stack.steps.map((step) => (
                    <div key={step} className="rounded-lg border bg-muted/40 px-3 py-2 text-xs leading-relaxed">
                      {step}
                    </div>
                  ))}
                </CardContent>
                <CardContent className="pt-0 pb-4">
                  <Button asChild variant="secondary" size="sm" className="w-full">
                    <Link href={stack.href}>Abrir rotina</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Histórico de sessões</h2>
              <p className="text-sm text-muted-foreground">Use o log para encontrar padrões e definir os próximos experimentos.</p>
            </div>
            <Button size="sm" onClick={() => router.push("/practice/new")}>
              Iniciar sessão
            </Button>
          </div>
          <Card className="border-border/70">
            {sessions.length === 0 ? (
              <CardContent className="text-center py-12 text-muted-foreground">
                <Target className="mx-auto mb-4 h-12 w-12 opacity-20" />
                <p className="uppercase">Nenhuma prática registrada</p>
                <p className="text-sm mt-2">Comece com um icebreaker ou STAR case e registre aqui.</p>
              </CardContent>
            ) : (
              <CardContent>
                <motion.div
                  className="space-y-3"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {sessions.map((session, index) => {
                    const config =
                      tipoConfig[session.tipo as keyof typeof tipoConfig] ?? tipoConfig.icebreaker;
                    const Icon = config.icon;

                    return (
                      <motion.div key={session.id} variants={fadeInUp} custom={index}>
                        <Card className="p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`size-12 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                              <Icon className={`h-6 w-6 ${config.color}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium truncate">{session.itemTitle}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {config.label}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDuracao(session.duracao)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(session.createdAt)}
                                </span>
                              </div>
                            </div>

                            {session.score && (
                              <div className="text-right">
                                <div className="text-2xl font-display text-chart-1">{session.score}</div>
                                <div className="text-xs text-muted-foreground">Score</div>
                              </div>
                            )}
                          </div>

                          {isAvaliacaoIA(session.avaliacaoIA) && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <div className="grid grid-cols-3 gap-3">
                                <div className="text-center">
                                  <div className="text-lg font-display text-chart-1">
                                    {session.avaliacaoIA.clareza}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Clareza</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-display text-chart-2">
                                    {session.avaliacaoIA.fluencia}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Fluência</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-display text-chart-3">
                                    {session.avaliacaoIA.completude}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Completude</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </CardContent>
            )}
          </Card>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Conecte com outros hubs</h2>
            <p className="text-sm text-muted-foreground">Leve seus insights para perguntas, escrita e toolkit.</p>
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
      </div>
    </DashboardPageLayout>
  );
}
