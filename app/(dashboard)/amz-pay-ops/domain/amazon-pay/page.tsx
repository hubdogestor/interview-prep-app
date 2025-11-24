import Link from "next/link";
import { ArrowLeft, Link2, MapPin, Rocket } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";

export default function AmazonPayPage() {
  const { products } = domainData.amazonPay;
  const expansionAgenda = [
    {
      region: "Brasil",
      focus: "Pix + Wallet",
      action: "Piloto com adquirente local e SLA D+0",
    },
    {
      region: "México",
      focus: "BNPL",
      action: "Ajustar underwriting com parceiros regionais",
    },
    {
      region: "Chile",
      focus: "Amazon One",
      action: "Validar infraestrutura física e parceiros retail",
    },
  ];
  const partnerOps = [
    "Garanta owners de integração por parceiro",
    "Mapeie métricas obrigatórias (Auth, CoP, Latência)",
    "Tenha FAQs prontas para Regulatório/Legal",
  ];
  const nextLaunchSteps = [
    {
      label: "Discovery",
      detail: "Cliente-alvo + métricas de sucesso",
    },
    {
      label: "Press Release",
      detail: "1 parágrafo + 3 FAQs difíceis",
    },
    {
      label: "Mechanisms",
      detail: "Defina WBR + donos para Ops",
    },
  ];
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
      <AmazonHubShell>
        <div className="space-y-8">
          <Button asChild variant="ghost" className="pl-0 text-sm">
            <Link href="/amz-pay-ops/domain">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Domain
            </Link>
          </Button>

          <section className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <Card className="border-border/70">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Portfolio snapshot</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Como Amazon Pay se conecta às prioridades LATAM.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product, i) => (
                    <Card key={i} className="flex h-full flex-col border border-dashed border-border/60">
                      <CardHeader className="pb-3">
                        <div className="mb-3 flex justify-between">
                          <Badge variant={badgeVariant[product.status] ?? "secondary"} className="rounded-full text-xs px-2 py-0.5">
                            {product.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-base">{product.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <CardDescription className="text-sm leading-relaxed">{product.desc}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Rocket className="size-5 text-primary flex-shrink-0" />
                  Launch Checklist
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Use antes de apresentar novas apostas de Amazon Pay.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {nextLaunchSteps.map((step) => (
                  <div key={step.label} className="rounded-lg border border-primary/30 bg-background/70 px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{step.label}</p>
                    <p className="text-sm leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Expansion Agenda</h2>
              <p className="text-sm text-muted-foreground">Combine dados locais + playbook Amazon para priorizar.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {expansionAgenda.map((item) => (
                <Card key={item.region} className="border-border/70">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin className="size-4 text-primary" />
                      {item.region}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-medium">Foco: {item.focus}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.action}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Partner Ops Playbook</h2>
              <p className="text-sm text-muted-foreground">Checklist rápido antes de escalar integrações.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <Card className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Link2 className="size-5 text-primary" />
                    Integrações e SLAs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {partnerOps.map((tip) => (
                    <div key={tip} className="rounded-lg border bg-muted/40 px-3 py-2 leading-relaxed">
                      {tip}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Próximos passos</CardTitle>
                  <CardDescription className="text-sm">Link direto com as trilhas do domínio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { label: "Fundamentals", href: "/amz-pay-ops/domain/fundamentals" },
                    { label: "Risk & Fraud", href: "/amz-pay-ops/domain/risk-fraud" },
                    { label: "Ops Excellence", href: "/amz-pay-ops/domain/ops-excellence" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {link.label}
                      <ArrowLeft className="rotate-180 size-4" />
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
