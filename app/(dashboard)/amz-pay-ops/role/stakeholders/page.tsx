import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roleData } from "@/data/amazon/role";

export default function StakeholdersPage() {
  const { stakeholders } = roleData;

  return (
    <DashboardPageLayout
      header={{
        title: "Stakeholder Management",
        description: "Influência sem autoridade.",
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
              <CardTitle className="text-base">Playbook de influência</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Releia antes das reuniões 1:1. Entre com dados (Andreia), visão (Sujash) e clareza técnica (Eng).
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stakeholders.map((person, i) => (
              <Card key={i} className="flex h-full flex-col border-border/70">
                <CardHeader className="flex flex-row items-center gap-3 pb-3">
                  <Avatar className="size-12 flex-shrink-0">
                    <AvatarImage src={`/avatars/${person.name.split(" ")[0].toLowerCase()}.png`} />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 flex-1">
                    <CardTitle className="text-sm font-semibold">{person.name}</CardTitle>
                    <CardDescription className="text-xs">{person.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Foco</span>
                    <p className="text-sm font-medium mt-1">{person.focus}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-xs leading-relaxed">
                    <span className="font-bold block mb-1.5">Estratégia:</span>
                    {person.strategy}
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
