import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/role">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Toolkit
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {comparison.map((role, i) => (
            <Card key={i} className={role.role.includes("Program") ? "border-primary shadow-md" : ""}>
              <CardHeader>
                <div className="mb-2">
                  <Badge variant={role.role.includes("Program") ? "default" : "outline"}>
                    {role.focus}
                  </Badge>
                </div>
                <CardTitle>{role.role}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm min-h-[60px]">
                  {role.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {role.keywords.map((kw, j) => (
                    <span key={j} className="text-xs font-medium bg-muted px-2 py-1 rounded">
                      {kw}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardPageLayout>
  );
}
