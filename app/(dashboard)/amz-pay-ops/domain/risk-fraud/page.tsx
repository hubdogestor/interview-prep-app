import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RiskFraudPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Risk & Fraud",
        description: "Protegendo a confiança do cliente.",
      }}
    >
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/domain">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Domain
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-3 border-red-500/20 bg-gradient-to-br from-red-500/5 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-red-500" />
                Amazon Fraud Detector
              </CardTitle>
              <CardDescription>
                Serviço de ML totalmente gerenciado que detecta transações potencialmente fraudulentas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Utiliza mais de 20 anos de dados históricos da Amazon para treinar modelos personalizados.
                Em vez de regras estáticas (&quot;bloquear IPs da Nigéria&quot;), ele analisa padrões comportamentais complexos.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg bg-background border">
                  <h4 className="font-bold text-sm mb-1">New Account Fraud</h4>
                  <p className="text-xs text-muted-foreground">Detecta contas falsas no momento do cadastro.</p>
                </div>
                <div className="p-4 rounded-lg bg-background border">
                  <h4 className="font-bold text-sm mb-1">Guest Checkout</h4>
                  <p className="text-xs text-muted-foreground">Avalia risco em transações sem login.</p>
                </div>
                <div className="p-4 rounded-lg bg-background border">
                  <h4 className="font-bold text-sm mb-1">Account Takeover</h4>
                  <p className="text-xs text-muted-foreground">Identifica logins suspeitos em contas legítimas.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Chargeback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Ocorre quando o cliente contesta uma compra junto ao emissor do cartão.
              </p>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li><strong>Fraude:</strong> &quot;Não fui eu que comprei.&quot;</li>
                <li><strong>Serviço:</strong> &quot;O produto não chegou.&quot;</li>
                <li><strong>Técnico:</strong> &quot;Fui cobrado duas vezes.&quot;</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>False Positives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                O pesadelo de Ops. Bloquear um cliente legítimo achando que é fraude.
              </p>
              <p className="text-sm font-medium">
                Impacto: Perda de receita + Dano à reputação + Custo de suporte.
              </p>
              <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                {[
                  "Monitore latência das regras antes do go-live",
                  "Configure alertas de variação de Auth Rate",
                  "Use COE para cada falso positivo crítico",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2">
                    <Badge variant="outline" className="rounded-full px-2 py-0 text-[10px]">Tip</Badge>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
