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
      <div className="space-y-8">
        <Button asChild variant="ghost" className="pl-0 text-sm">
          <Link href="/amz-pay-ops/domain">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Domain
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-3 border-red-500/20 bg-gradient-to-br from-red-500/5 to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-5 text-red-500 flex-shrink-0" />
                Amazon Fraud Detector
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Serviço de ML totalmente gerenciado que detecta transações potencialmente fraudulentas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                Utiliza mais de 20 anos de dados históricos da Amazon para treinar modelos personalizados.
                Em vez de regras estáticas (&quot;bloquear IPs da Nigéria&quot;), ele analisa padrões comportamentais complexos.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-3 rounded-lg bg-background border">
                  <h4 className="font-bold text-xs mb-1.5">New Account Fraud</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Detecta contas falsas no momento do cadastro.</p>
                </div>
                <div className="p-3 rounded-lg bg-background border">
                  <h4 className="font-bold text-xs mb-1.5">Guest Checkout</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Avalia risco em transações sem login.</p>
                </div>
                <div className="p-3 rounded-lg bg-background border">
                  <h4 className="font-bold text-xs mb-1.5">Account Takeover</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Identifica logins suspeitos em contas legítimas.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Chargeback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Ocorre quando o cliente contesta uma compra junto ao emissor do cartão.
              </p>
              <ul className="list-disc list-inside text-xs space-y-2 leading-relaxed">
                <li><strong>Fraude:</strong> &quot;Não fui eu que comprei.&quot;</li>
                <li><strong>Serviço:</strong> &quot;O produto não chegou.&quot;</li>
                <li><strong>Técnico:</strong> &quot;Fui cobrado duas vezes.&quot;</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/70 lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">False Positives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                O pesadelo de Ops. Bloquear um cliente legítimo achando que é fraude.
              </p>
              <p className="text-sm font-medium mb-4">
                Impacto: Perda de receita + Dano à reputação + Custo de suporte.
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                {[
                  "Monitore latência das regras antes do go-live",
                  "Configure alertas de variação de Auth Rate",
                  "Use COE para cada falso positivo crítico",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2">
                    <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[10px] flex-shrink-0">Tip</Badge>
                    <span className="flex-1 leading-relaxed">{tip}</span>
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
