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
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/role">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Toolkit
          </Link>
        </Button>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="size-5 text-primary" />
              Ritmo operacional
            </CardTitle>
            <CardDescription>
              Adicione todos os mecanismos ao seu calendário e defina checklist (inputs/outputs) antes de aceitar convites.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {mechanisms.map((mech, i) => (
            <Card key={i} className="border-border/70">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    {mech.name}
                  </CardTitle>
                  <Badge variant="outline" className="rounded-full text-[10px]">
                    {cadence[mech.name] ?? ""}
                  </Badge>
                </div>
                <CardDescription>{mech.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <span className="mb-1 block text-sm font-semibold text-primary">Dica prática</span>
                  <p className="text-sm text-muted-foreground">{mech.tip}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardPageLayout>
  );
}
