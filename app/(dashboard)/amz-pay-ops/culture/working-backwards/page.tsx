import { ArrowLeft, Target } from "lucide-react";
import Link from "next/link";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkingBackwardsPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Working Backwards",
        description: "O mecanismo de inovação da Amazon.",
      }}
    >
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/culture">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Cultura
          </Link>
        </Button>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5 text-primary" />
                O Conceito
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                A maioria das empresas segue o fluxo: Ideia &gt; Produto &gt; Marketing &gt; Cliente.
              </p>
              <p>
                Na Amazon, invertemos isso: <strong>Cliente &gt; Press Release &gt; Produto.</strong>
              </p>
              <p>
                Se você não consegue escrever um Press Release convincente que explique por que o cliente vai amar o produto, então o produto não deve ser construído.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>As 5 Perguntas do Cliente</CardTitle>
              <CardDescription>Antes de começar qualquer projeto, responda:</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3 text-sm font-medium">
                <li>Quem é o cliente?</li>
                <li>Qual é o problema ou oportunidade do cliente?</li>
                <li>Qual é o benefício mais importante para o cliente?</li>
                <li>Como você sabe o que o cliente precisa ou quer?</li>
                <li>Como é a experiência do cliente?</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
