import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

import DashboardPageLayout from "@/components/dashboard/layout";
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2 bg-gradient-to-br from-red-500/5 to-background border-red-500/20">
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
                Em vez de regras estáticas ("bloquear IPs da Nigéria"), ele analisa padrões comportamentais complexos.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
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

          <Card>
            <CardHeader>
              <CardTitle>Chargeback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Ocorre quando o cliente contesta uma compra junto ao emissor do cartão.
              </p>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li><strong>Fraude:</strong> "Não fui eu que comprei."</li>
                <li><strong>Serviço:</strong> "O produto não chegou."</li>
                <li><strong>Técnico:</strong> "Fui cobrado duas vezes."</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
