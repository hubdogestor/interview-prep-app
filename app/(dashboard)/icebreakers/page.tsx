import Link from "next/link";
import { BookOpen, Clock, Link2, Mic, Sparkles, Star } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { ExportButton } from "@/components/export/export-button";
import { GenerateAIButton } from "@/components/icebreakers/generate-ai-button";
import { IcebreakerCard } from "@/components/icebreakers/icebreaker-card";
import { IcebreakersPageSuggestions } from "@/components/icebreakers/page-suggestions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { api } from "@/lib/trpc/server";

export default async function IcebreakersPage() {
  const caller = await api();
  const icebreakers = await caller.icebreakers.list();

  // Prepare export data
  const exportItems = icebreakers.flatMap((icebreaker) =>
    icebreaker.versoes.map((versao: { nome: string; conteudo: { pt: string }; duracao: number; tags?: string[] }) => ({
      title: `${icebreaker.titulo} - ${versao.nome}`,
      content: versao.conteudo.pt,
      metadata: {
        Tipo: icebreaker.tipo,
        "Duração": `${versao.duracao}s`,
        Tags: versao.tags?.join(", ") || "",
      },
    }))
  );

  const totalIcebreakers = icebreakers.length;
  const totalVersions = icebreakers.reduce((sum, item) => sum + item.versoes.length, 0);
  const versionDurations = icebreakers.flatMap((item) => item.versoes.map((versao: { duracao: number }) => versao.duracao || 0));
  const avgDuration = versionDurations.length
    ? `${Math.round(versionDurations.reduce((sum, value) => sum + value, 0) / versionDurations.length)}s`
    : "—";
  const favoriteCount = icebreakers.filter((item) => item.favorite).length;
  const tagUniverse = Array.from(
    new Set(
      icebreakers.flatMap((item) =>
        item.versoes.flatMap((versao: { tags?: string[] }) => versao.tags ?? [])
      )
    )
  );
  const lastUpdatedRaw = icebreakers[0]?.updatedAt ?? icebreakers[0]?.createdAt;
  const formatDate = (value?: Date | string) => {
    if (!value) return "—";
    const date = typeof value === "string" ? new Date(value) : value;
    if (Number.isNaN(date?.getTime())) return "—";
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  };
  const lastUpdated = formatDate(lastUpdatedRaw as Date | string | undefined);

  const icebreakerSignals = [
    { label: "Scripts ativos", value: `${totalIcebreakers}`, meta: "Mantenha 3 versões" },
    { label: "Versões", value: `${totalVersions}`, meta: "30 · 60 · 90s" },
    { label: "Tags", value: tagUniverse.length ? `${tagUniverse.length}` : "—", meta: tagUniverse.slice(0, 3).join(" · ") || "Adicione tags" },
  ];

  const cadenceLoops = [
    {
      title: "Warm-up diário",
      cadence: "Manhã",
      description: "Grave 30s focando em tom, respiração e sorriso audível.",
    },
    {
      title: "Remix semanal",
      cadence: "Quinta",
      description: "Atualize métricas e ângulos para 60s e 90s.",
    },
    {
      title: "Playback mensal",
      cadence: "Última sexta",
      description: "Envie a melhor versão para mentor/manager e colete feedback.",
    },
  ];

  const scoreboardCards = [
    {
      label: "Speeches curtos",
      value: totalIcebreakers,
      meta: "Scripts cadastrados",
      icon: Mic,
    },
    {
      label: "Versões",
      value: totalVersions,
      meta: "Varie contextos",
      icon: BookOpen,
    },
    {
      label: "Duração média",
      value: avgDuration,
      meta: "Ideal 45-75s",
      icon: Clock,
    },
    {
      label: "Favoritos",
      value: favoriteCount,
      meta: "Use nas entrevistas",
      icon: Star,
    },
  ];

  const bridgeLinks = [
    {
      label: "Practice HQ",
      description: "Grave diariamente e capture métricas de clareza/fluência.",
      href: "/practice",
    },
    {
      label: "Speeches",
      description: "Promova icebreakers de alta performance para narrativas longas.",
      href: "/speeches",
    },
    {
      label: "Perguntas-chave",
      description: "Transforme icebreakers em respostas rápidas para FAQs.",
      href: "/questions",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Icebreakers",
        description: "Your introduction arsenal",
        action: <ExportButton items={exportItems} filename="icebreakers" />,
      }}
    >
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Pitch system</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Scripts curtos, atualizados e conectados aos rituais de prática e narrativa longa.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {icebreakerSignals.map((signal) => (
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
                <Sparkles className="size-5 text-primary flex-shrink-0" />
                Cadência mínima
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Loops curtos para manter storytelling e presença sempre prontos.
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
            <p className="text-sm text-muted-foreground">Revise segunda-feira antes de atualizar Practice e Speeches.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {scoreboardCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.label} className="border-border/70">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{card.label}</p>
                      <p className="text-2xl font-display">{card.value}</p>
                      <p className="text-[11px] text-muted-foreground">{card.meta}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Conecte com outros hubs</h2>
            <p className="text-sm text-muted-foreground">Os melhores icebreakers viram sessões gravadas, speeches e FAQs.</p>
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

        {/* AI Contextual Suggestions */}
        <IcebreakersPageSuggestions itemCount={icebreakers.length} hasEmptyState={icebreakers.length === 0} />

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Biblioteca de icebreakers</h2>
              <p className="text-sm text-muted-foreground">Atualize versões por duração e mantenha tags consistentes.</p>
            </div>
            <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
              Atualizado {lastUpdated}
            </Badge>
          </div>

          {icebreakers.length === 0 ? (
            <EmptyState
              icon={Mic}
              title="Nenhum Icebreaker ainda"
              description="Crie sua primeira apresentação de 30-60 segundos ou gere automaticamente com IA"
              action={{
                label: "Criar Icebreaker",
                href: "/icebreakers/novo",
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {icebreakers.map((icebreaker) => (
                <IcebreakerCard key={icebreaker.id} icebreaker={icebreaker} />
              ))}
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 gap-4 border-t border-border pt-6 md:grid-cols-2">
          <Link href="/icebreakers/novo">
            <Button variant="outline" className="h-full w-full border-dashed p-4 uppercase">
              + Criar Novo Icebreaker
            </Button>
          </Link>
          <GenerateAIButton />
        </div>
      </div>
    </DashboardPageLayout>
  );
}
