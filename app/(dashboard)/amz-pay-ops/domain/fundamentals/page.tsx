import Link from "next/link";
import { ArrowLeft, Gauge } from "lucide-react";

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
      <div className="space-y-8">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/domain">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Domain
          </Link>
        </Button>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="size-5 text-primary" />
              Latência importa
            </CardTitle>
            <CardDescription>
              Cada etapa abaixo tem proprietários distintos. Documente quem aciona quem e qual SLA deve ser medido.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Transaction Flow */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">The Four-Party Model Flow</h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
            {flow.map((step, i) => (
              <Card key={i} className="relative flex h-full flex-col overflow-hidden border-border/70">
                <div className="absolute inset-y-0 left-0 w-1 bg-primary/40" />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{step.step}</CardTitle>
                    <Badge variant="outline" className="rounded-full text-[11px]">Etapa {i + 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between">
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {step.actors.map((actor, j) => (
                      <span
                        key={j}
                        className="rounded-full bg-muted px-2 py-1 text-[11px] font-semibold uppercase tracking-wide"
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
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Key Players</h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {players.map((player, i) => {
              const Icon = player.icon;
              return (
                <Card key={i} className="flex items-center gap-4 p-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{player.name}</h3>
                    <p className="text-sm text-muted-foreground">{player.role}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardPageLayout>
  );
}
