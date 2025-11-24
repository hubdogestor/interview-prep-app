import Link from "next/link";
import { Activity, ArrowLeft } from "lucide-react";

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
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/domain">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Domain
          </Link>
        </Button>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5 text-primary" />
              Operar = medir + corrigir
            </CardTitle>
            <CardDescription>Priorize resultados antes de narrativas. KPIs conectados ao cliente.</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Metodologias</CardTitle>
              <CardDescription>Ferramentas para melhoria contínua.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {methodologies.map((method, i) => (
                <div key={i} className="border-b last:border-0 pb-4 last:pb-0">
                  <h4 className="font-semibold">{method.title}</h4>
                  <p className="text-sm text-muted-foreground">{method.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>KPIs Críticos</CardTitle>
              <CardDescription>O que você vai medir no Day 1.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {kpis.map((kpi, i) => (
                <div key={i} className="rounded-xl border bg-muted/40 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{kpi.name}</h4>
                    <Badge variant="outline" className="rounded-full text-[10px]">Monitor</Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{kpi.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
