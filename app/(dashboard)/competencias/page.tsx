"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ClipboardList, Link2, NotebookPen, Plus, Sparkles, Target, Trophy, Wand2, Wrench } from "lucide-react";

import { ExportCompetenciaButton } from "@/components/competencias/export-button";
import DashboardPageLayout from "@/components/dashboard/layout";
import StarIcon from "@/components/icons/star";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchBar, type SearchFilters } from "@/components/ui/search-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trpc } from "@/lib/trpc/react";
import type { CompetenciaCategoria, CompetenciaNivel } from "@/types";

const categoryConfig: Record<CompetenciaCategoria, { label: string; badgeClass: string }> = {
  technical: {
    label: "Technical",
    badgeClass: "border-chart-1/40 text-chart-1 bg-chart-1/10",
  },
  soft_skills: {
    label: "Soft Skills",
    badgeClass: "border-chart-2/40 text-chart-2 bg-chart-2/10",
  },
  leadership: {
    label: "Leadership",
    badgeClass: "border-chart-3/40 text-chart-3 bg-chart-3/10",
  },
};

const levelLabels: Record<CompetenciaNivel, string> = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
  basic: "Basic",
};

const levelBadgeClass: Record<CompetenciaNivel, string> = {
  expert: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  advanced: "bg-sky-500/10 text-sky-500 border-sky-500/30",
  intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  basic: "bg-slate-500/10 text-slate-500 border-slate-500/30",
};

const levelRank: Record<CompetenciaNivel, number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  basic: 1,
};

const formatDate = (value?: Date | string) => {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date?.getTime())) return "—";
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function CompetenciasPage() {
  const router = useRouter();
  const { data: competencias = [], isLoading } = trpc.competencias.list.useQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  const filteredCompetencias = useMemo(() => {
    let filtered = [...competencias];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (comp) =>
          comp.nome.toLowerCase().includes(query) ||
          comp.ferramentas?.some((tool) => tool.toLowerCase().includes(query))
      );
    }

    if (searchFilters.category && searchFilters.category !== "all") {
      filtered = filtered.filter((comp) => comp.categoria === searchFilters.category);
    }

    if (searchFilters.sortBy === "alphabetical") {
      filtered.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (searchFilters.sortBy === "nivel") {
      filtered.sort((a, b) => levelRank[b.nivel] - levelRank[a.nivel]);
    }

    return filtered;
  }, [competencias, searchQuery, searchFilters]);

  const totalCompetencias = competencias.length;
  const uniqueCategories = new Set<CompetenciaCategoria>(competencias.map((comp) => comp.categoria));
  const lastUpdatedRaw = competencias[0]?.updatedAt ?? competencias[0]?.createdAt;
  const lastUpdated = formatDate(lastUpdatedRaw);
  const ferramentasUniverse = Array.from(new Set(competencias.flatMap((comp) => comp.ferramentas ?? [])));
  const evidenciasTotal = competencias.reduce((sum, comp) => sum + (comp.evidencias?.length ?? 0), 0);
  const trackRecordsTotal = competencias.reduce((sum, comp) => sum + (comp.trackRecord?.length ?? 0), 0);
  const competenciasComTrackRecord = competencias.filter((comp) => (comp.trackRecord?.length ?? 0) > 0).length;
  const levelCounters = competencias.reduce<Record<CompetenciaNivel, number>>(
    (acc, comp) => {
      acc[comp.nivel] += 1;
      return acc;
    },
    { expert: 0, advanced: 0, intermediate: 0, basic: 0 }
  );

  const capabilitySignals = [
    {
      label: "Skills ativas",
      value: totalCompetencias ? `${totalCompetencias}` : "0",
      meta: "Meta base: 12",
    },
    {
      label: "Cobertura",
      value: `${uniqueCategories.size}/3`,
      meta: uniqueCategories.size
        ? Array.from(uniqueCategories)
            .map((cat) => categoryConfig[cat].label)
            .join(" · ")
        : "Mapeie categorias",
    },
    {
      label: "Track records",
      value: totalCompetencias ? `${competenciasComTrackRecord}/${totalCompetencias}` : "0",
      meta: trackRecordsTotal ? `${trackRecordsTotal} registros` : "Adicione evidências",
    },
  ];

  const cadenceLoops = [
    {
      title: "Refresh semanal",
      cadence: "Segunda",
      description: "Escolha 1 skill por categoria e revise descrição + ferramentas.",
    },
    {
      title: "Track Record Friday",
      cadence: "Sexta",
      description: "Capture 1 evidência quantificada direto das experiências ou OKRs.",
    },
    {
      title: "Promotion review",
      cadence: "Mensal",
      description: "Envie top 3 skills para mentor e alinhe gaps vs. role target.",
    },
  ];

  const scoreboardCards = [
    {
      label: "Expert tier",
      value: levelCounters.expert,
      meta: "Meta: 3 skills",
      icon: Trophy,
    },
    {
      label: "Advanced tier",
      value: levelCounters.advanced,
      meta: "Meta: 5 skills",
      icon: Target,
    },
    {
      label: "Ferramentas",
      value: ferramentasUniverse.length || "—",
      meta: ferramentasUniverse.slice(0, 3).join(" · ") || "Mapeie stacks",
      icon: Wrench,
    },
    {
      label: "Evidências",
      value: evidenciasTotal || "—",
      meta: "Track records + bullets",
      icon: ClipboardList,
    },
  ];

  const bridgeLinks = [
    {
      label: "Practice HQ",
      description: "Teste cada skill com sessões gravadas e feedback de IA.",
      href: "/practice",
    },
    {
      label: "Experiências",
      description: "Use track records como fonte única para novos cases.",
      href: "/experiencias",
    },
    {
      label: "Questions",
      description: "Transforme skills fortes em respostas para FAQs.",
      href: "/questions",
    },
  ];

  const focusStacks = [
    {
      title: "Skill Sprint",
      duration: "45 min | Semanal",
      description: "Aprofunde 1 competência com foco em métricas e LP dominante.",
      steps: ["Releia descrição", "Atualize ferramentas-chave", "Registre 1 novo impacto"],
      href: "/competencias/novo",
    },
    {
      title: "Bridge to Practice",
      duration: "25 min | Antes da sessão",
      description: "Escolha uma skill e conecte com icebreakers ou speeches.",
      steps: ["Selecione skill", "Define pitch de 60s", "Capture insight pós-gravação"],
      href: "/practice",
    },
    {
      title: "Promotion Packet",
      duration: "Mensal",
      description: "Compile skills críticas + track records para enviar ao manager.",
      steps: ["Escolha top 5", "Garanta evidências", "Compartilhe resumo"],
      href: "/amz-pay-ops/role",
    },
  ];

  const searchOptions = {
    categories: [
      { value: "technical", label: "Technical" },
      { value: "soft_skills", label: "Soft Skills" },
      { value: "leadership", label: "Leadership" },
    ],
    sortOptions: [
      { value: "recent", label: "Mais recentes" },
      { value: "alphabetical", label: "Alfabética (A-Z)" },
      { value: "nivel", label: "Nível (Expert → Basic)" },
    ],
  } as const;

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Competências",
          description: "Your skills arsenal",
          icon: StarIcon,
        }}
      >
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <Card className="p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="grid gap-3 sm:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="space-y-2 rounded-xl border p-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-3 w-24" />
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
                    <Skeleton className="h-3 w-36" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="p-4">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-6 w-16 my-2" />
                <Skeleton className="h-3 w-24" />
              </Card>
            ))}
          </div>
          <Card className="p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-40 w-full" />
          </Card>
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      header={{
        title: "Competências",
        description: "Your skills arsenal",
        icon: StarIcon,
        action: (
          <div className="flex gap-2">
            <ExportCompetenciaButton competencias={competencias} />
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        ),
        search: (
          <SearchBar
            placeholder="Buscar por competência ou ferramenta..."
            onSearch={(query, filters) => {
              setSearchQuery(query);
              setSearchFilters(filters);
            }}
            filterOptions={searchOptions}
          />
        ),
      }}
    >
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Skill system</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Centralize descrições, ferramentas e evidências conectadas aos hubs de prática e experiência.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {capabilitySignals.map((signal) => (
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
                <Wand2 className="size-5 text-primary flex-shrink-0" />
                Cadência mínima
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Rituais para manter skills atualizadas e acionáveis durante o mês.
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
            <p className="text-sm text-muted-foreground">Reveja toda segunda antes de atualizar Practice e Experiências.</p>
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
            <h2 className="text-xl font-semibold tracking-tight">Stacks táticos</h2>
            <p className="text-sm text-muted-foreground">Combine hubs para tirar skills do papel e gerar novas evidências.</p>
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
                    <Link href={stack.href}>Abrir ritual</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Conecte com outros hubs</h2>
            <p className="text-sm text-muted-foreground">Skills fortes alimentam prática, narrativas e perguntas-chave.</p>
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
              <h2 className="text-xl font-semibold tracking-tight">Biblioteca de competências</h2>
              <p className="text-sm text-muted-foreground">Use tags, track records e cadência para manter o inventário vivo.</p>
            </div>
            <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
              Atualizado {lastUpdated}
            </Badge>
          </div>

          {competencias.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="Nenhuma competência ainda"
              description="Cadastre as skills críticas e conecte com experiências e practice."
              action={{ label: "Criar competência", href: "/competencias/novo" }}
            />
          ) : (
            <>
              {filteredCompetencias.length === 0 ? (
                <Card className="border-dashed border-2 p-12 text-center text-sm text-muted-foreground uppercase">
                  Nenhum resultado com os filtros atuais
                </Card>
              ) : (
                <motion.div className="grid gap-4" variants={staggerContainer} initial="hidden" animate="visible">
                  {filteredCompetencias.map((comp, index) => (
                    <motion.div key={comp.id} variants={fadeInUp} custom={index}>
                      <Card className="p-6 hover:bg-accent/40 transition-colors">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-xl font-display uppercase tracking-tight">{comp.nome}</h3>
                              <Badge variant="outline" className={`text-xs uppercase ${categoryConfig[comp.categoria]?.badgeClass ?? ""}`}>
                                {categoryConfig[comp.categoria]?.label ?? comp.categoria}
                              </Badge>
                              <Badge variant="outline" className={`text-[11px] uppercase ${levelBadgeClass[comp.nivel]}`}>
                                {levelLabels[comp.nivel]}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
                              {comp.descricao?.pt || "Adicione uma descrição para contextualizar."}
                            </p>
                          </div>
                        </div>

                        {comp.ferramentas && comp.ferramentas.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {comp.ferramentas.slice(0, 6).map((ferramenta) => (
                              <Badge key={ferramenta} variant="secondary" className="text-xs uppercase">
                                #{ferramenta}
                              </Badge>
                            ))}
                            {comp.ferramentas.length > 6 && (
                              <Badge variant="outline" className="text-xs">
                                +{comp.ferramentas.length - 6}
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-6 text-xs uppercase text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <NotebookPen className="size-4" />
                            <span>{comp.trackRecord?.length || 0} track records</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ClipboardList className="size-4" />
                            <span>{comp.evidencias?.length || 0} evidências</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-border">
                          <Button variant="default" size="sm" onClick={() => router.push(`/competencias/${comp.id}`)}>
                            Ver detalhes
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/competencias/${comp.id}`)}>
                            Editar
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </section>

        <div className="grid grid-cols-1 gap-4 border-t border-border pt-6 md:grid-cols-2">
          <Button asChild variant="outline" className="h-full w-full border-dashed p-4 uppercase">
            <Link href="/competencias/novo">
              <Plus className="mr-2 size-4" />
              Nova competência
            </Link>
          </Button>
          <Button asChild variant="secondary" className="h-full w-full p-4 uppercase">
            <Link href="/experiencias">
              Sincronizar com experiências
            </Link>
          </Button>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
