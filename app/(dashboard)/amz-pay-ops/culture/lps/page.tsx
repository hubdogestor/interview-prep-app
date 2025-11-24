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
        <Button asChild variant="ghost" className="pl-0 text-sm">
          <Link href="/amz-pay-ops/culture">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Cultura
          </Link>
        </Button>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="size-5 text-primary flex-shrink-0" />
              Como usar este painel
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Escolha 4 LPs para serem seu &quot;core&quot; e mapeie histórias recentes. Releia semanalmente antes de entrevistas internas, WBR e mecanismos.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cultureData.lps.map((lp, index) => (
            <Card key={index} className="flex h-full flex-col border-border/70 transition-all hover:-translate-y-1 hover:border-primary/50">
              <CardHeader className="pb-4">
                <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Princípio #{index + 1}</span>
                  <Badge variant="secondary" className="rounded-full text-[10px] px-2 py-0.5">Ops Lens</Badge>
                </div>
                <CardTitle className="text-base mb-2">{lp.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  &quot;{lp.description}&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0 pb-4">
                <div className="rounded-xl border bg-muted/40 p-3 text-sm leading-relaxed">
                  <span className="font-semibold text-primary block mb-1.5 text-xs">Aplicação em Ops</span>
                  <span className="text-xs">{lp.opsApplication}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardPageLayout>
  );
}
