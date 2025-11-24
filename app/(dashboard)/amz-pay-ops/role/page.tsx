import Link from "next/link";
import { ArrowRight, ClipboardList, Compass, Layers, MessageSquare, Target } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { roleData } from "@/data/amazon/role";
import { cn } from "@/lib/utils";

export default function RolePage() {
  const { hero, sections } = roleData;
  const toolkitFocus = [
    "Clarificar fronteiras entre PgM/PM/Tech",
    "Mapear stakeholders críticos e estratégia",
    "Preparar artefatos (WBR, Roadmap, OP1)",
  ];
  const operatingSignals = [
    {
      label: "Status docs",
      value: "Seg · 09h",
      meta: "WBR pronto (Andreia)",
      icon: ClipboardList,
    },
    {
      label: "Stakeholder loops",
      value: "3 cadências",
      meta: "Andreia · Sujash · Tech Pods",
      icon: MessageSquare,
    },
    {
      label: "Mechanism kit",
      value: "WBR / QBR",
      meta: "Inputs e owners alinhados",
      icon: Layers,
    },
  ];
  const influenceLoops = [
    {
      title: "Weekly Sync Grid",
      cadence: "Segunda",
      description: "Atualize status do trio (Andreia, Sujash, Tech) com BLUF e riscos.",
      actions: ["Envie sumário de 3 bullets", "Antecipe blockers com COE draft"],
    },
    {
      title: "Mechanism Prep",
      cadence: "Quarta",
      description: "Reserve 45 min para inputs do WBR/MBR.",
      actions: ["Atualize métricas", "Checar owners + follow-ups"],
    },
    {
      title: "Stakeholder Retro",
      cadence: "Mensal",
      description: "Reveja mapa de influência e ajuste narrativas.",
      actions: ["Revise objetivos", "Mapeie novas alianças"],
    },
  ];
  const quickKits = [
    {
      title: "Influence Brief",
      description: "Template BLUF com métricas + asks para conversas difíceis.",
      href: "/amz-pay-ops/role/stakeholders",
      icon: MessageSquare,
    },
    {
      title: "Mechanism Checklist",
      description: "Passo-a-passo para preparar WBR/QBR sem depender de planilhas.",
      href: "/amz-pay-ops/role/mechanisms",
      icon: Layers,
    },
    {
      title: "30-60-90 Ops Plan",
      description: "Rascunho enxuto para amarrar entregas, métricas e parceiros.",
      href: "/amz-pay-ops/role/clarity",
      icon: Compass,
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: hero.title,
        description: hero.subtitle,
      }}
    >
      <AmazonHubShell>
        <div className="space-y-8">
          <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <Card className="border-border/70">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Como operar como PgM</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{hero.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {toolkitFocus.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border bg-muted/40 px-3 py-2.5 text-xs font-medium text-muted-foreground leading-relaxed"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-5">
              <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ClipboardList className="size-5 text-primary flex-shrink-0" />
                    Toolkit Sprint
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    Escolha um artefato por semana para refinar (Status Report, Roadmap, Mechanism doc) e peça feedback para Andreia.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Target className="size-4" />
                    Operating Signals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {operatingSignals.map((signal) => {
                    const Icon = signal.icon;
                    return (
                      <div key={signal.label} className="flex items-start gap-3 rounded-xl border bg-muted/30 p-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                          <Icon className="size-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                          <p className="text-base font-semibold">{signal.value}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{signal.meta}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </section>
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Toolkit Library</h2>
              <p className="text-sm text-muted-foreground">Escolha uma trilha para aprofundar artefatos, stakeholders e mecanismos.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card
                    key={section.id}
                    className="flex flex-col overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className={cn("h-1.5 w-full", section.bgColor.replace("/10", ""))}></div>
                    <CardHeader className="flex-1 pb-4">
                      <div className={cn("mb-3 flex size-12 items-center justify-center rounded-xl flex-shrink-0", section.bgColor, section.color)}>
                        <Icon className="size-6" />
                      </div>
                      <CardTitle className="text-sm font-semibold mb-2">{section.title}</CardTitle>
                      <CardDescription className="text-xs leading-relaxed line-clamp-3">{section.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-0 pb-4">
                      <Button asChild variant="secondary" className="w-full group text-sm">
                        <Link href={section.href}>
                          Abrir toolkit
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Influence Loops</h2>
              <p className="text-sm text-muted-foreground">Cadências que garantem alinhamento contínuo com liderança e tech.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {influenceLoops.map((loop) => (
                <Card key={loop.title} className="flex h-full flex-col border-border/70">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold uppercase tracking-wide">{loop.title}</span>
                      <span className="rounded-full border px-2 py-0.5 text-[10px]">{loop.cadence}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs text-muted-foreground">
                    <p className="leading-relaxed">{loop.description}</p>
                    <div className="space-y-1.5">
                      {loop.actions.map((action) => (
                        <div key={action} className="rounded-lg border bg-muted/40 px-2.5 py-1.5 leading-snug">
                          {action}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl">Quick Kits</h2>
              <p className="text-sm text-muted-foreground">Links rápidos para acionar o toolkit certo antes de cada mecanismo.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {quickKits.map((kit) => {
                const Icon = kit.icon;
                return (
                  <Card key={kit.title} className="flex h-full flex-col border-border/70">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                          <Icon className="size-5" />
                        </div>
                        <CardTitle className="text-base">{kit.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 text-sm text-muted-foreground">
                      <p className="leading-relaxed">{kit.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0 pb-4">
                      <Button asChild variant="ghost" className="justify-start px-0 text-sm text-primary">
                        <Link href={kit.href}>Abrir toolkit</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
