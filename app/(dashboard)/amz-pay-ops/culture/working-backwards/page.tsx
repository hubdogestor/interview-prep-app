import Link from "next/link";
import { ArrowLeft, Compass, Target } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
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

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5 text-primary" />
                O Conceito
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-muted-foreground">
              <p>
                A maioria das empresas segue o fluxo: Ideia &gt; Produto &gt; Marketing &gt; Cliente.
              </p>
              <p>
                Na Amazon, invertemos isso: <strong>Cliente &gt; Press Release &gt; Produto.</strong>
              </p>
              <p>
                Se você não consegue escrever um Press Release convincente que explique por que o cliente vai amar o produto, então o produto não deve ser construído.
              </p>
              <div className="rounded-xl border bg-muted/40 p-4">
                <p className="text-sm font-semibold text-primary">Uso prático</p>
                <p className="text-sm">
                  Antes de qualquer iniciativa em Payments, escreva um parágrafo de PR/FAQ focado no cliente final e compartilhe com o time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
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

        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="size-5 text-primary" />
              Roteiro rápido
            </CardTitle>
            <CardDescription>Checklist para conduzir uma sessão de Working Backwards.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {[
              "Defina o cliente-alvo e escreva o parágrafo de abertura",
              "Liste métricas/benefícios tangíveis",
              "Prepare 3 FAQs difíceis (risco, custo, operação)",
            ].map((item, i) => (
              <div key={item} className="rounded-lg border bg-muted/30 p-3 text-sm leading-relaxed">
                <Badge variant="secondary" className="mb-2 rounded-full text-xs">Passo {i + 1}</Badge>
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
