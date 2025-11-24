"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, CalendarClock, Download, Link2, NotebookPen, Play, Plus } from "lucide-react";
import { toast } from "sonner";

import DashboardPageLayout from "@/components/dashboard/layout";
import BriefcaseIcon from "@/components/icons/briefcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar, SearchFilters } from "@/components/ui/search-bar";
import { Skeleton } from "@/components/ui/skeleton";
import {fadeInUp, staggerContainer } from "@/lib/animations";
import { downloadMarkdown,exportExperiencias } from "@/lib/export/markdown";
import { trpc } from "@/lib/trpc/react";

export default function ExperienciasPage() {
  const router = useRouter();
  const { data: experiencias = [], isLoading } = trpc.experiencias.list.useQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  const filteredExperiencias = useMemo(() => {
    let filtered = [...experiencias];

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (exp) =>
          exp.empresa.toLowerCase().includes(query) ||
          exp.cargo.toLowerCase().includes(query) ||
          exp.tecnologias?.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    // Sort
    if (searchFilters.sortBy === "alphabetical") {
      filtered.sort((a, b) => a.empresa.localeCompare(b.empresa));
    } else if (searchFilters.sortBy === "starCases") {
      filtered.sort((a, b) => b.starCases.length - a.starCases.length);
    }
    // Default is already by createdAt desc from the query

    return filtered;
  }, [experiencias, searchQuery, searchFilters]);

  const handleExport = () => {
    if (experiencias.length === 0) {
      toast.error("Não há experiências para exportar");
      return;
    }

    const markdown = exportExperiencias(experiencias);
    const filename = `experiencias-${new Date().toISOString().split("T")[0]}`;
    downloadMarkdown(markdown, filename);
    toast.success("Experiências exportadas com sucesso!");
  };

  const totalExperiencias = experiencias.length;
  const totalStarCases = experiencias.reduce((sum, exp) => sum + exp.starCases.length, 0);
  const activeExperiencias = experiencias.filter((exp) => !exp.periodo?.fim).length;
  const techUniverse = Array.from(new Set(experiencias.flatMap((exp) => exp.tecnologias ?? [])));
  const lastUpdatedRaw = experiencias[0]?.updatedAt ?? experiencias[0]?.createdAt;
  const formatDate = (value?: Date | string) => {
    if (!value) return "—";
    const date = typeof value === "string" ? new Date(value) : value;
    if (Number.isNaN(date?.getTime())) return "—";
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  };
  const lastUpdated = formatDate(lastUpdatedRaw);

  const experienceSignals = [
    {
      label: "Experiências",
      value: `${totalExperiencias}`,
      meta: "Atualize pitch 1x/trim",
    },
    {
      label: "STAR cases",
      value: `${totalStarCases}`,
      meta: "1 por frente crítica",
    },
    {
      label: "Stacks",
      value: techUniverse.length ? techUniverse.length : "—",
      meta: techUniverse.slice(0, 3).join(" · ") || "Adicione tags",
    },
  ];

  const cadenceLoops = [
    {
      title: "Win Snapshot",
      cadence: "Segunda",
      description: "Capture 3 bullets de impacto, risco e próxima aposta por experiência ativa.",
    },
    {
      title: "Case Polish",
      cadence: "Quarta",
      description: "Reescreva 1 STAR case focando em métricas e LP dominante.",
    },
    {
      title: "Narrativa Longa",
      cadence: "Última sexta",
      description: "Atualize speech completo com aprendizados do mês.",
    },
  ];

  const scoreboardCards = [
    {
      label: "Ativas",
      value: activeExperiencias,
      meta: "Sem data de fim",
      icon: BarChart3,
    },
    {
      label: "STAR cases",
      value: totalStarCases,
      meta: "Documentados",
      icon: NotebookPen,
    },
    {
      label: "Última revisão",
      value: lastUpdated,
      meta: "Evite >90 dias",
      icon: CalendarClock,
    },
  ];

  const bridgeLinks = [
    {
      label: "Practice HQ",
      description: "Transforme cada experiência em sessão gravada e capture métricas.",
      href: "/practice",
    },
    {
      label: "Speeches",
      description: "Leve os highlights direto para as narrativas longas.",
      href: "/speeches",
    },
    {
      label: "Perguntas-chave",
      description: "Use os cases como resposta pronta para stakeholders.",
      href: "/questions",
    },
  ];

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Experiências",
          description: "Your professional journey",
          icon: BriefcaseIcon,
        }}
      >
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-16" />
              </div>
            </Card>
          ))}
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      header={{
        title: "Experiências",
        description: "Your professional journey",
        icon: BriefcaseIcon,
        action: (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={experiencias.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        ),
        search: (
          <SearchBar
            placeholder="Buscar por empresa, cargo ou tecnologia..."
            onSearch={(query, filters) => {
              setSearchQuery(query);
              setSearchFilters(filters);
            }}
            filterOptions={{
              sortOptions: [
                { value: "recent", label: "Mais recentes" },
                { value: "alphabetical", label: "Alfabética (A-Z)" },
                { value: "starCases", label: "Mais STAR Cases" },
              ],
            }}
          />
        ),
      }}
    >
      <div className="space-y-10">
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Win library</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Transforme experiências em ativos vivos conectados a Practice, Speeches e perguntas.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {experienceSignals.map((signal) => (
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
                Cadência de manutenção
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Ritmo mínimo para manter STAR cases auditáveis.
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
            <p className="text-sm text-muted-foreground">Revise toda segunda antes de atualizar Practice e Speeches.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
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
            <p className="text-sm text-muted-foreground">Use seus wins para ensaios, narrativas e FAQs.</p>
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
              <h2 className="text-xl font-semibold tracking-tight">Linha do tempo de impacto</h2>
              <p className="text-sm text-muted-foreground">Organize vitórias por empresa e mantenha STAR cases prontos.</p>
            </div>
            <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
              Atualizado {lastUpdated}
            </Badge>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-border md:block" />

            <motion.div className="space-y-8" variants={staggerContainer} initial="hidden" animate="visible">
              {filteredExperiencias.map((exp, index) => (
                <motion.div key={exp.id} className="relative" variants={fadeInUp} custom={index}>
                  <div className="absolute left-6 top-6 hidden size-3 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:block" />

                  <Card className="p-6 transition-colors hover:bg-accent/50 md:ml-12">
                    <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                      <div>
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <h3 className="text-2xl font-display uppercase">{exp.empresa}</h3>
                            </div>
                            <p className="mb-1 text-lg uppercase text-muted-foreground">{exp.cargo}</p>
                          </div>
                          <BriefcaseIcon className="size-8 text-primary opacity-50 md:hidden" />
                        </div>

                        {exp.tecnologias && exp.tecnologias.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {exp.tecnologias.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                #{tech}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2 border-t border-border pt-4">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => router.push(`/experiencias/${exp.id}/practice`)}
                            disabled={exp.starCases.length === 0}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            PRACTICE
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/experiencias/${exp.id}`)}>
                            EDIT
                          </Button>
                        </div>
                      </div>

                      <div className="flex min-w-[120px] flex-col items-center justify-center md:border-l md:border-border md:pl-6">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex size-16 items-center justify-center rounded-lg bg-chart-1/20">
                            <span className="text-2xl font-display text-chart-1">{exp.starCases.length}</span>
                          </div>
                          <span className="text-xs uppercase text-muted-foreground">STAR Cases</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {filteredExperiencias.length === 0 && experiencias.length > 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  <p className="uppercase">Nenhuma experiência encontrada com os filtros aplicados</p>
                </div>
              )}
              {experiencias.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  <p className="uppercase">Nenhuma experiência cadastrada ainda</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <section>
          <button
            onClick={() => router.push("/experiencias/novo")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border p-4 font-display text-sm uppercase transition-colors hover:border-primary hover:bg-accent/50"
          >
            <Plus className="h-5 w-5" />
            ADD NEW EXPERIENCE
          </button>
        </section>
      </div>
    </DashboardPageLayout>
  );
}
