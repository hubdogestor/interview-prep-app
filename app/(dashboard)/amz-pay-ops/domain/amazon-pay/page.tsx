import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";

export default function AmazonPayPage() {
  const { products } = domainData.amazonPay;
  const badgeVariant: Record<string, "default" | "secondary" | "outline"> = {
    Global: "default",
    "Strategic Growth": "secondary",
    Innovation: "secondary",
    Localization: "outline",
  };

  return (
    <DashboardPageLayout
      header={{
        title: "Amazon Pay Ecosystem",
        description: "Muito além do checkout.",
      }}
    >
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/domain">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Domain
          </Link>
        </Button>

        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
          {products.map((product, i) => (
            <Card key={i} className="flex h-full flex-col border-border/70">
              <CardHeader>
                <div className="mb-3 flex justify-between">
                  <Badge variant={badgeVariant[product.status] ?? "secondary"} className="rounded-full">
                    {product.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm leading-relaxed">{product.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardPageLayout>
  );
}
