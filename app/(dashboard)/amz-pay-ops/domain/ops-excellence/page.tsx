import Link from "next/link";
import { Activity, ArrowLeft } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";

export default function OpsExcellencePage() {
  const { methodologies, kpis } = domainData.opsExcellence;

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

          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="size-5 text-primary flex-shrink-0" />
              Operar = medir + corrigir
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">Priorize resultados antes de narrativas. KPIs conectados ao cliente.</CardDescription>
          </CardHeader>
        </Card>

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
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
