import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import DashboardPageLayout from "@/components/dashboard/layout";
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
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

          <Card>
            <CardHeader>
              <CardTitle>KPIs Críticos</CardTitle>
              <CardDescription>O que você vai medir no Day 1.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {kpis.map((kpi, i) => (
                <div key={i} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted/50">
                  <div>
                    <h4 className="font-bold text-sm">{kpi.name}</h4>
                    <p className="text-xs text-muted-foreground">{kpi.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
