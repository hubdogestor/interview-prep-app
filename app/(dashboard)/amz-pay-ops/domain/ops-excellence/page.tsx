import Link from "next/link";
import { Activity, ArrowLeft, BarChart3, CalendarCheck2 } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";

export default function OpsExcellencePage() {
  const { methodologies, kpis } = domainData.opsExcellence;
  const cadence = [
    {
      title: "Daily Ops Pulse",
      owner: "PgM + Vendor Mgmt",
      focus: "Monitor Latência, Auth Rate e incidentes",
    },
    {
      title: "Weekly Optimization",
      owner: "PgM + Tech",
      focus: "COEs, débitos técnicos e esperimentos",
    },
    {
      title: "Monthly Review",
      owner: "Leadership",
      focus: "KPIs x Meta e roadmap de automações",
    },
  ];
  const scorecard = [
    { label: "Auth Rate", value: "97.1%", delta: "+0.6" },
    { label: "CoP", value: "2.09%", delta: "-0.03" },
    { label: "Latency P99", value: "420 ms", delta: "-15" },
    { label: "Chargebacks", value: "0.21%", delta: "-0.04" },
  ];
  const runway = [
    { step: "Detect", detail: "Alertas automáticos e triagem" },
    { step: "Diagnose", detail: "COE + owners claros por etapa" },
    { step: "Deploy", detail: "Runbooks + validação com clientes" },
    { step: "Document", detail: "Atualize wiki + métricas" },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Operational Excellence",
        description: "A arte de fazer mais com menos (Frugality).",
      }}
    >
      <AmazonHubShell>
        <div className="space-y-8">
          <Button asChild variant="ghost" className="pl-0 text-sm">
            <Link href="/amz-pay-ops/domain">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Domain
            </Link>
          </Button>

          <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="size-5 text-primary flex-shrink-0" />
                  Operar = medir + corrigir
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">Priorize resultados antes de narrativas. KPIs conectados ao cliente.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {scorecard.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-primary/30 bg-background/70 p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{metric.label}</p>
                    <p className="text-2xl font-semibold">{metric.value}</p>
                    <p className="text-[11px] text-emerald-500">{metric.delta}% vs LW</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarCheck2 className="size-5 text-primary" />
                  Ops cadence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {cadence.map((item) => (
                  <div key={item.title} className="rounded-lg border bg-muted/40 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.title}</p>
                    <p className="font-medium">{item.owner}</p>
                    <p className="text-sm leading-relaxed">{item.focus}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Metodologias</CardTitle>
              <CardDescription className="text-sm">Ferramentas para melhoria contínua.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {methodologies.map((method, i) => (
                <div key={i} className="border-b last:border-0 pb-3 last:pb-0">
                  <h4 className="font-semibold text-sm mb-1">{method.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{method.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">KPIs Críticos</CardTitle>
              <CardDescription className="text-sm">O que você vai medir no Day 1.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {kpis.map((kpi, i) => (
                <div key={i} className="rounded-xl border bg-muted/40 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold">{kpi.name}</h4>
                    <Badge variant="outline" className="rounded-full text-[10px] px-2 py-0.5">Monitor</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{kpi.desc}</p>
                </div>
              ))}
            </CardContent>
            </Card>
          </div>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Incident Runway</h2>
              <p className="text-sm text-muted-foreground">Passos práticos para qualquer correção de rota.</p>
            </div>
            <Card className="border-border/70">
              <CardContent className="grid gap-4 md:grid-cols-4 p-4">
                {runway.map((phase, index) => (
                  <div key={phase.step} className="rounded-lg border bg-muted/40 p-3 text-sm">
                    <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                      <span>Passo {index + 1}</span>
                      <BarChart3 className="size-4 text-primary" />
                    </div>
                    <p className="font-semibold">{phase.step}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{phase.detail}</p>
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
