import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";

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
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/role">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Toolkit
          </Link>
        </Button>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stakeholders.map((person, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="size-12">
                  <AvatarImage src={`/avatars/${person.name.split(" ")[0].toLowerCase()}.png`} />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <CardTitle className="text-base">{person.name}</CardTitle>
                  <CardDescription>{person.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Foco</span>
                  <p className="font-medium">{person.focus}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-sm">
                  <span className="font-bold block mb-1">Estratégia:</span>
                  {person.strategy}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardPageLayout>
  );
}
