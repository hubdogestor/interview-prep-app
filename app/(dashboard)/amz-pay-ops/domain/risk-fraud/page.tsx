import Link from "next/link";
import { Activity, AlertTriangle, ArrowLeft, ShieldCheck, ShieldPlus } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RiskFraudPage() {
  const riskRadar = [
    {
      title: "Account Takeover",
      severity: "Alta",
      action: "Ative MFA push + monitore logins anômalos",
    },
    {
      title: "Friendly Fraud",
      severity: "Média",
      action: "Analise clusters pós-promoções e ajuste thresholds",
    },
    {
      title: "Chargeback Spike",
      severity: "Alta",
      action: "Abra COE em 24h e envolva Finance",
    },
  ];
  const playbooks = [
    {
      name: "COE Express",
      detail: "Modelo 5W2H + aprendizados para incidentes < 48h",
    },
    {
      name: "Guardrails Tech",
      detail: "Checklist de deploy seguro (feature flags + rollbacks)",
    },
    {
      name: "Escalada Regulatório",
      detail: "Fluxo de comunicação com Legal/PR para eventos críticos",
    },
  ];
  const opsAlerts = [
    "Monitore dif entre tentativas e aprovações por emissor",
    "Compare chargebacks vs fulfillment delays semanalmente",
    "Valide se novas regras impactam P95 de latência",
  ];
  return (
    <DashboardPageLayout
      header={{
        title: "Risk & Fraud",
        description: "Protegendo a confiança do cliente.",
      }}
    >
      <AmazonHubShell>
        <div className="space-y-8">
          <Button asChild variant="ghost" className="pl-0 text-sm">
            <Link href="/amz-pay-ops/domain">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Domain
            </Link>
          </Button>

          <section className="space-y-6">
            <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-background">
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
                  Em vez de regras estáticas, ele lê padrões comportamentais complexos.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {["New Account Fraud", "Guest Checkout", "Account Takeover"].map((useCase) => (
                    <div key={useCase} className="rounded-lg border bg-background p-3 text-xs text-muted-foreground leading-relaxed">
                      <p className="font-bold mb-1.5 text-[11px] uppercase tracking-wide">{useCase}</p>
                      <p>Defina métricas de sucesso e thresholds antes do go-live.</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-5 lg:grid-cols-3">
              <Card className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldPlus className="size-5 text-primary" />
                    Chargeback Playbook
                  </CardTitle>
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
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Activity className="size-5 text-primary" />
                    False Positives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    O pesadelo de Ops. Bloquear um cliente legítimo achando que é fraude.
                  </p>
                  <p className="text-sm font-medium mb-4">
                    Impacto: Perda de receita + Dano à reputação + Custo de suporte.
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    {["Monitore latência das regras antes do go-live", "Configure alertas de variação de Auth Rate", "Use COE para cada falso positivo crítico"].map((tip) => (
                      <div key={tip} className="flex items-start gap-2">
                        <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[10px] flex-shrink-0">Tip</Badge>
                        <span className="flex-1 leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle className="size-5 text-primary" />
                  Risk Radar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {riskRadar.map((risk) => (
                  <div key={risk.title} className="rounded-lg border bg-muted/30 p-3 text-sm">
                    <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                      <span>{risk.title}</span>
                      <Badge variant="secondary" className="text-[10px] px-2 py-0.5">{risk.severity}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{risk.action}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Ops Alerts</CardTitle>
                <CardDescription className="text-sm">Checklist diário para Run Ops.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {opsAlerts.map((alert) => (
                  <div key={alert} className="rounded-lg border bg-muted/40 px-3 py-2 leading-relaxed">
                    {alert}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Fraud Playbooks</h2>
              <p className="text-sm text-muted-foreground">Selecione conforme o tipo de incidente.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {playbooks.map((playbook) => (
                <Card key={playbook.name} className="border-border/70">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{playbook.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {playbook.detail}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
