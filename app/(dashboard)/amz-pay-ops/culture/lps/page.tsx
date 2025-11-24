import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import DashboardPageLayout from "@/components/dashboard/layout";
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
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/culture">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Cultura
          </Link>
        </Button>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cultureData.lps.map((lp, index) => (
            <Card key={index} className="flex flex-col h-full hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="mb-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Princípio #{index + 1}
                </div>
                <CardTitle className="text-xl">{lp.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  "{lp.description}"
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <div className="rounded-lg bg-muted/50 p-4 text-sm">
                  <span className="font-semibold text-primary block mb-1">Aplicação em Ops:</span>
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
