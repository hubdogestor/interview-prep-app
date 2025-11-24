import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";

export default function AmazonPayPage() {
  const { products } = domainData.amazonPay;

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

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={product.status === "Global" ? "default" : "secondary"}>
                    {product.status}
                  </Badge>
                </div>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{product.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardPageLayout>
  );
}
