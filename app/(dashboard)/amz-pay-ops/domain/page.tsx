import Link from "next/link";
import { ArrowRight, Radar, Target, TrendingUp } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";
import { cn } from "@/lib/utils";

const domainSignals = [
  "Conectar Auth Rate às alavancas de CoP",
  "Mapear dependências com Tech e Risk",
  "Preparar perguntas para a rotina WBR",
  "Revisar runbooks para incidentes P1",
];

const radarEntries = [
  {
    title: "Wallet",
    impact: "Alta",
    action: "Mitigar quedas de aprovação no período noturno",
  },
  {
    title: "BNPL",
    impact: "Média",
    action: "Lock-in com parceiros locais para liquidação D+1",
  },
  {
    title: "Amazon One",
    impact: "Alta",
    action: "Garantir redundância dos sensores em LAM",
  },
];

const scorecardMetrics = [
  { label: "Auth Rate", value: "97.1%", delta: "+0.6" },
  { label: "CoP", value: "2.09%", delta: "-0.03" },
  { label: "Chargebacks", value: "0.21%", delta: "-0.04" },
];

const focusInitiatives = [
  {
    title: "Pix + Amazon Pay",
    detail: "Desenhar piloto com adquirentes locais para checkout híbrido.",
  },
  {
    title: "LATAM Auth Deep Dive",
    detail: "Comparar performance por emissor e criar plano de experimentos.",
  },
  {
    title: "Fraud Guardrails",
    detail: "Sincronizar thresholds com Risk semanalmente e revisar SLAs.",
  },
];

export default function DomainPage() {
  const { hero, sections } = domainData;

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
                <CardTitle className="text-xl">Playbook de domínio</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{hero.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {domainSignals.map((signal) => (
                    <div
                      key={signal}
                      className="rounded-lg border bg-muted/40 px-3 py-2.5 text-xs font-medium text-muted-foreground leading-relaxed"
                    >
                      {signal}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-5">
              <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Radar className="size-5 text-primary flex-shrink-0" />
                    Radar de riscos
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    Atualize semanalmente os riscos por produto e vincule cada ação ao owner correto.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {radarEntries.map((entry) => (
                    <div key={entry.title} className="rounded-lg border border-primary/30 px-3 py-2 text-xs">
                      <div className="flex items-center justify-between text-[13px] font-semibold">
                        <span>{entry.title}</span>
                        <span className="text-primary">{entry.impact}</span>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">{entry.action}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <TrendingUp className="size-4" />
                    Scorecard
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    KPIs base usados nos reviews quinzenais (apresente sempre relação com Auth Rate).
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                  {scorecardMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-md bg-muted/40 p-3 text-center">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                      <p className="text-xl font-semibold">{metric.value}</p>
                      <p className="text-[11px] text-emerald-500">{metric.delta}% vs LW</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
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
                      <div
                        className={cn(
                          "mb-3 flex size-12 items-center justify-center rounded-xl flex-shrink-0",
                          section.bgColor,
                          section.color,
                        )}
                      >
                        <Icon className="size-6" />
                      </div>
                      <CardTitle className="mb-2 text-sm font-semibold">{section.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{section.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-0 pb-4">
                      <Button asChild variant="secondary" className="group w-full text-sm">
                        <Link href={section.href}>
                          Acessar trilha
                          <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="size-5 text-primary" />
                  Iniciativas em foco
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Liste sempre o objetivo, o payoff estimado e quem são os stakeholders chave.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                {focusInitiatives.map((initiative) => (
                  <div key={initiative.title} className="rounded-lg border bg-muted/40 p-4 text-sm">
                    <p className="font-semibold">{initiative.title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{initiative.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
