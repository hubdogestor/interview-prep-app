import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roleData } from "@/data/amazon/role";

export default function RoleClarityPage() {
  const { comparison } = roleData.clarity;

  return (
    <DashboardPageLayout
      header={{
        title: "Role Clarity",
        description: "Entendendo seu papel no tabuleiro.",
      }}
    >
      <AmazonHubShell>
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
                <Info className="size-5 text-primary flex-shrink-0" />
                Mandato do PgM
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                PgM conecta estratégia ao chão da fábrica. Pense em riscos, dependências e narrativa única para todas as equipes.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comparison.map((role, i) => (
              <Card key={i} className={role.role.includes("Program") ? "border-primary shadow-md" : "border-border/70"}>
                <CardHeader className="pb-3">
                  <div className="mb-2">
                    <Badge variant={role.role.includes("Program") ? "default" : "outline"} className="text-xs px-2 py-0.5">
                      {role.focus}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{role.role}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {role.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.keywords.map((kw, j) => (
                      <span key={j} className="text-[10px] font-medium bg-muted px-2 py-1 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
