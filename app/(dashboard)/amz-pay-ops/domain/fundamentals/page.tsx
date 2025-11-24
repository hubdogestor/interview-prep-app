import Link from "next/link";
import { ArrowLeft, Gauge } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";

export default function FundamentalsPage() {
  const { flow, players } = domainData.fundamentals;

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
        </Card>

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
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
