import Link from "next/link";
import { ArrowLeft, Compass, GitBranch, Info, Users2 } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roleData } from "@/data/amazon/role";

export default function RoleClarityPage() {
  const { comparison } = roleData.clarity;
  const mandateSignals = [
    {
      label: "Stakeholder Grid",
      value: "Atualizado semanalmente",
      meta: "Andreia · Sujash · Tech Pods",
    },
    {
      label: "Runway de riscos",
      value: "3 COEs ativos",
      meta: "Documentar aprendizados em 24h",
    },
    {
      label: "Toolkit",
      value: "Status · Roadmap · Mechanisms",
      meta: "Revisar cadência Segunda/Quarta/Sexta",
    },
  ];
  const collaborationLoops = [
    {
      title: "Tech Sync",
      cadence: "Quarta",
      focus: "Latência, débitos técnicos e blockers",
    },
    {
      title: "Business Pulse",
      cadence: "Sexta",
      focus: "KPIs x meta + planos de correção",
    },
    {
      title: "Leadership Update",
      cadence: "Mensal",
      focus: "Narrativa única para mecanismos (WBR/QBR)",
    },
  ];
  const laneHighlights = [
    {
      title: "PgM Lane",
      detail: "Conecta cliente ↔ execuções. Define cadência, owners e riscos.",
      icon: Compass,
    },
    {
      title: "PM Lane",
      detail: "Traduz visão em requisitos. Foca no \"what\" & customer obsession.",
      icon: GitBranch,
    },
    {
      title: "Tech Lane",
      detail: "Garante viabilidade. Define soluções e SLAs técnicos.",
      icon: Users2,
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Role Clarity",
        description: "Entendendo seu papel no tabuleiro.",
      }}
    >
      <AmazonHubShell>
        <div className="space-y-8">
          <Button asChild variant="ghost" className="pl-0 text-sm">
            <Link href="/amz-pay-ops/role">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Toolkit
            </Link>
          </Button>

          <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Info className="size-5 text-primary flex-shrink-0" />
                  Mandato do PgM
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  PgM conecta estratégia ao chão da fábrica. Pense em riscos, dependências e narrativa única para todas as equipes.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {mandateSignals.map((signal) => (
                  <div key={signal.label} className="rounded-xl border border-primary/30 bg-background/70 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                    <p className="text-sm font-semibold">{signal.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{signal.meta}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Operating lanes</CardTitle>
                <CardDescription className="text-sm">Entenda a fronteira entre PgM, PM e Tech.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {laneHighlights.map((lane) => {
                  const Icon = lane.icon;
                  return (
                    <div key={lane.title} className="flex items-start gap-3 rounded-lg border bg-muted/40 p-3 text-sm">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="font-semibold">{lane.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{lane.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </section>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comparison.map((role, i) => (
              <Card key={i} className={role.role.includes("Program") ? "border-primary shadow-md" : "border-border/70"}>
                <CardHeader className="pb-3">
                  <div className="mb-2">
                    <Badge variant={role.role.includes("Program") ? "default" : "outline"} className="text-xs px-2 py-0.5">
                      {role.focus}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{role.role}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {role.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.keywords.map((kw, j) => (
                      <span key={j} className="text-[10px] font-medium bg-muted px-2 py-1 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Collaboration loops</h2>
              <p className="text-sm text-muted-foreground">Mantenha liderança e Tech alinhados em cadência fixa.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {collaborationLoops.map((loop) => (
                <Card key={loop.title} className="border-border/70">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wide">
                      <span>{loop.title}</span>
                      <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[10px]">{loop.cadence}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {loop.focus}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
