import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cultureData } from "@/data/amazon/culture";

export default function LPsPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Leadership Principles",
        description: "O DNA da Amazon aplicado a Operations.",
      }}
    >
      <div className="space-y-8">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/culture">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Cultura
          </Link>
        </Button>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="size-5 text-primary" />
              Como usar este painel
            </CardTitle>
            <CardDescription>
              Escolha 4 LPs para serem seu &quot;core&quot; e mapeie histórias recentes. Releia semanalmente antes de entrevistas internas, WBR e mecanismos.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {cultureData.lps.map((lp, index) => (
            <Card key={index} className="flex h-full flex-col border-border/70 transition-all hover:-translate-y-1 hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Princípio #{index + 1}</span>
                  <Badge variant="secondary" className="rounded-full">Ops Lens</Badge>
                </div>
                <CardTitle className="text-lg">{lp.title}</CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed">
                  &quot;{lp.description}&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <div className="rounded-xl border bg-muted/40 p-4 text-sm leading-relaxed">
                  <span className="font-semibold text-primary block mb-1">Aplicação em Ops</span>
                  {lp.opsApplication}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardPageLayout>
  );
}
