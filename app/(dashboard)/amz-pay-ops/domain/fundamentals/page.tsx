import Link from "next/link";
import { ArrowLeft, Gauge, Radar } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";

export default function FundamentalsPage() {
  const { flow, players } = domainData.fundamentals;
  const criticalSignals = [
    {
      label: "Auth Rate",
      value: "97.1%",
      meta: "Meta 98% · Priorizar emissores críticos",
    },
    {
      label: "Latency P99",
      value: "420 ms",
      meta: "Monitorar variação em horários de pico",
    },
    {
      label: "Chargebacks",
      value: "0.21%",
      meta: "Acima de 0.25% dispara COE imediato",
    },
  ];
  const primerNotes = [
    "Documente qual player aciona cada etapa e os SLAs",
    "Mapeie quais adquirentes suportam fallback",
    "Liste perguntas padrão para Tech (latência, retries)",
  ];
  const ownershipMap = [
    { label: "Gateway", owner: "Tech Pods", focus: "Latency & retries" },
    { label: "Adquirente", owner: "Vendor Mgmt", focus: "Rates & incidentes" },
    { label: "Bandeira", owner: "Payments Strategy", focus: "Regulatórios" },
    { label: "Emissor", owner: "Partner Ops", focus: "Playbooks por banco" },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Payment Fundamentals",
        description: "O ciclo de vida de uma transação.",
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

        <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Gauge className="size-5 text-primary flex-shrink-0" />
                Latência importa
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Cada etapa abaixo tem proprietários distintos. Documente quem aciona quem e qual SLA deve ser medido.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {criticalSignals.map((signal) => (
                <div key={signal.label} className="rounded-xl border border-primary/30 bg-background/80 p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{signal.label}</p>
                  <p className="text-lg font-semibold">{signal.value}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{signal.meta}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Radar className="size-4" />
                Primer rápido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              {primerNotes.map((note) => (
                <div key={note} className="rounded-lg border bg-muted/40 px-3 py-2 leading-relaxed">
                  {note}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Transaction Flow */}
          <section className="space-y-5">
          <h2 className="text-xl font-bold tracking-tight">The Four-Party Model Flow</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((step, i) => (
              <Card key={i} className="relative flex h-full flex-col overflow-hidden border-border/70">
                <div className="absolute inset-y-0 left-0 w-1 bg-primary/40" />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm font-semibold">{step.step}</CardTitle>
                    <Badge variant="outline" className="rounded-full text-[10px] px-2 py-0.5 flex-shrink-0">Etapa {i + 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between pt-0">
                  <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {step.actors.map((actor, j) => (
                      <span
                        key={j}
                        className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-wide"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </section>

          {/* Key Players */}
          <section className="space-y-5">
          <h2 className="text-xl font-bold tracking-tight">Key Players</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {players.map((player, i) => {
              const Icon = player.icon;
              return (
                <Card key={i} className="flex items-center gap-3 p-4 border-border/70">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm line-clamp-1">{player.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{player.role}</p>
                  </div>
                </Card>
              );
            })}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-bold tracking-tight">Ownership Map</h2>
            <Card className="border-border/70">
              <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 p-4">
                {ownershipMap.map((row) => (
                  <div key={row.label} className="rounded-lg border bg-muted/40 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{row.label}</p>
                    <p className="text-sm font-medium">{row.owner}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{row.focus}</p>
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
