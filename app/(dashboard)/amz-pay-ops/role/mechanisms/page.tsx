import Link from "next/link";
import { ArrowLeft, FileText, Timer } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roleData } from "@/data/amazon/role";

export default function MechanismsPage() {
  const { mechanisms } = roleData;
  const cadence: Record<string, string> = {
    "WBR (Weekly Business Review)": "Weekly",
    "OP1 / OP2 (Operational Plan)": "Yearly",
    "QBR (Quarterly Business Review)": "Quarterly",
  };

  return (
    <DashboardPageLayout
      header={{
        title: "Mechanisms",
        description: "Rituais de gestão e controle.",
      }}
    >
      <div className="space-y-8">
        <Button asChild variant="ghost" className="pl-0 text-sm">
          <Link href="/amz-pay-ops/role">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Toolkit
          </Link>
        </Button>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Timer className="size-5 text-primary flex-shrink-0" />
              Ritmo operacional
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Adicione todos os mecanismos ao seu calendário e defina checklist (inputs/outputs) antes de aceitar convites.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-5">
          {mechanisms.map((mech, i) => (
            <Card key={i} className="border-border/70">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="size-5 text-primary flex-shrink-0" />
                    {mech.name}
                  </CardTitle>
                  <Badge variant="outline" className="rounded-full text-[10px] px-2 py-0.5 flex-shrink-0">
                    {cadence[mech.name] ?? ""}
                  </Badge>
                </div>
                <CardDescription className="text-sm">{mech.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <span className="mb-1.5 block text-xs font-semibold text-primary">Dica prática</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{mech.tip}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardPageLayout>
  );
}
