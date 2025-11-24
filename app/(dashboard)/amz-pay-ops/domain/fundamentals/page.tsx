import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import DashboardPageLayout from "@/components/dashboard/layout";
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

        {/* Transaction Flow */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">The Four-Party Model Flow</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {flow.map((step, i) => (
              <Card key={i} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{step.step}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {step.actors.map((actor, j) => (
                      <span key={j} className="text-[10px] uppercase tracking-wider font-bold bg-muted px-2 py-1 rounded">
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
          <div className="grid gap-4 md:grid-cols-2">
            {players.map((player, i) => {
              const Icon = player.icon;
              return (
                <Card key={i} className="flex items-center p-4 gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
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
