import Link from "next/link";
import { BookOpen, Clock, Link2, MessageSquare, Mic, NotebookPen, Target } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { ExportButton } from "@/components/export/export-button";
import { GenerateAIButton } from "@/components/speeches/generate-ai-button";
import { SpeechCard } from "@/components/speeches/speech-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { api } from "@/lib/trpc/server";

export default async function SpeechesPage() {
  const caller = await api();
  const speeches = await caller.speeches.list();

  // Prepare export data
  const exportItems = speeches.map((speech) => ({
    title: speech.titulo,
    content: speech.conteudo.pt,
    metadata: {
      "Tipo de Vaga": speech.tipoVaga,
      Versão: speech.versao,
      "Duração": `${speech.duracaoEstimada} min`,
      Foco: speech.foco?.join(", ") || "",
    },
  }));

  const totalSpeeches = speeches.length;
  const favoriteCount = speeches.filter((speech) => speech.favorite).length;
  const archivedCount = speeches.filter((speech) => speech.archived).length;
  const avgDuration = totalSpeeches
    ? `${(speeches.reduce((acc, speech) => acc + speech.duracaoEstimada, 0) / totalSpeeches).toFixed(1)} min`
    : "—";
  const focusTags = Array.from(new Set(speeches.flatMap((speech) => speech.foco || []))).slice(0, 4);
  const latestUpdateRaw = speeches[0]?.updatedAt ?? speeches[0]?.createdAt;
  const formatDate = (value: Date | string | undefined) => {
    if (!value) return "—";
    const date = typeof value === "string" ? new Date(value) : value;
    return isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  };
  const lastUpdated = formatDate(latestUpdateRaw as Date | string | undefined);

  const speechSignals = [
    {
      label: "Biblioteca ativa",
      value: `${totalSpeeches} speeches`,
      meta: "Mantenha 3 versões por foco",
    },
    {
      label: "Favoritos",
      value: `${favoriteCount}`,
      meta: "Use no WBR/entrevistas",
    },
    {
      label: "Última revisão",
      value: lastUpdated,
      meta: lastUpdated === "—" ? "Crie sua primeira versão" : "Atualize antes do próximo loop",
    },
  ];

  const cadenceLoops = [
    {
      title: "Hook Lab",
      cadence: "Diário",
      description: "Reescreva a abertura em 3 estilos (dados, cliente, história).",
    },
    {
      title: "Mid Pulse",
      cadence: "Quarta",
      description: "Ensaiar o corpo (Problema → Movimento → Prova) em 4 min.",
    },
    {
      title: "Close Sprint",
      cadence: "Sexta",
      description: "Ajustar final com call-to-action claro e métricas atuais.",
    },
  ];

  const rinseRoutines = [
    {
      title: "Speech Canvas",
      time: "15 min",
      description: "Mapeie Hook, Problema, Movimento e Prova antes de abrir o editor.",
      steps: ["Capture prato principal em 2 frases", "Liste métricas obrigatórias", "Associe 1 LP dominante"],
    },
    {
      title: "Delivery Drill",
      time: "8 min",
      description: "Ensaiar frente ao espelho ou Practice HQ com checkpoints de respiração.",
      steps: ["Cronometre cada parte", "Sublime palavras difíceis", "Marque pausas"],
    },
    {
      title: "Retro rápido",
      time: "5 min",
      description: "Logo após o ensaio, capture 1 melhoria e 1 evidência adicionada.",
      steps: ["Atualize doc", "Ping mentor", "Marque próxima rodada"],
    },
  ];

  const bridgeLinks = [
    {
      label: "Practice HQ",
      description: "Grave a versão final e capture métricas de clareza e fluência.",
      href: "/practice",
    },
    {
      label: "Writing Culture",
      description: "Transforme o speech em 2-pager/6-pager com dados consistentes.",
      href: "/amz-pay-ops/culture/writing",
    },
    {
      label: "Experiências",
      description: "Atualize STAR cases com os highlights usados no speech.",
      href: "/experiencias",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Speeches",
        description: "Your complete narratives",
        action: <ExportButton items={exportItems} filename="speeches" />,
      }}
    >
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Speech system</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Garanta que cada narrativa tenha Hook → Problema → Movimento → Prova com métricas auditáveis.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {speechSignals.map((signal) => (
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
                <Mic className="size-5 text-primary flex-shrink-0" />
                Cadência de ensaio
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Loops curtos garantem memória muscular antes de entrevistas ou WBR.
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
            <h2 className="text-xl font-semibold tracking-tight">Scoreboard</h2>
            <p className="text-sm text-muted-foreground">Revise toda segunda-feira para decidir quais narrativas atualizar.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[{
              label: "Speeches ativos",
              value: totalSpeeches,
              meta: "Mantenha 3–5 na prateleira",
              icon: Target,
            },
            {
              label: "Duração média",
              value: avgDuration,
              meta: "Ideal 3–5 min",
              icon: Clock,
            },
            {
              label: "Focos",
              value: focusTags.length || "—",
              meta: focusTags.length ? focusTags.join(" · ") : "Adicione tags de foco",
              icon: BookOpen,
            },
            {
              label: "Arquivados",
              value: archivedCount,
              meta: "Revise antes de descartar",
              icon: NotebookPen,
            }].map((stat) => {
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
            <h2 className="text-xl font-semibold tracking-tight">Story routines</h2>
            <p className="text-sm text-muted-foreground">Use estes loops para ir do rascunho à entrega em menos de 30 minutos.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {rinseRoutines.map((routine) => (
              <Card key={routine.title} className="flex h-full flex-col border-border/70">
                <CardHeader className="pb-3">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
                      {routine.time}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{routine.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{routine.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-2 text-xs text-muted-foreground">
                  {routine.steps.map((step) => (
                    <div key={step} className="rounded-lg border bg-muted/40 px-3 py-2 leading-relaxed">
                      {step}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Conecte com outros hubs</h2>
            <p className="text-sm text-muted-foreground">Leve o speech para prática, escrita e registro de experiências.</p>
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
              <h2 className="text-xl font-semibold tracking-tight">Biblioteca de speeches</h2>
              <p className="text-sm text-muted-foreground">Centralize versões, marque favoritas e acompanhe evolução.</p>
            </div>
            <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
              Atualizado {lastUpdated}
            </Badge>
          </div>

          {speeches.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="Nenhum Speech ainda"
              description="Prepare sua narrativa profissional estruturada ou gere automaticamente com IA baseada no seu perfil"
              action={{
                label: "Criar Speech",
                href: "/speeches/novo",
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {speeches.map((speech) => (
                <SpeechCard key={speech.id} speech={speech} />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link href="/speeches/novo">
              <Button variant="outline" className="w-full h-full p-4 border-dashed uppercase">
                + Criar Novo Speech
              </Button>
            </Link>
            <div className="w-full">
              <GenerateAIButton />
            </div>
          </div>
        </section>
      </div>
    </DashboardPageLayout>
  );
}
