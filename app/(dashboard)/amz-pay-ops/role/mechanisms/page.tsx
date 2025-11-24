import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roleData } from "@/data/amazon/role";

export default function MechanismsPage() {
  const { mechanisms } = roleData;

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

        <div className="grid gap-6">
          {mechanisms.map((mech, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5 text-primary" />
                  {mech.name}
                </CardTitle>
                <CardDescription>{mech.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
                  <span className="font-bold text-primary block mb-1">Dica Prática:</span>
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
