import Link from "next/link";
import { ArrowRight, Layers, Radar, Target } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";
import { cn } from "@/lib/utils";

const referenceHighlights = [
  "Fluxo Auth → Capture explicado ponta a ponta",
  "Glossário de Amazon Pay LATAM e principais métricas",
  "Runbooks permanentes para incidentes e risk reviews",
  "Perguntas críticas para reviews com Tech e Finance",
];

const referenceCollections = [
  {
    title: "Risk Radar",
    description: "Resumo permanente dos produtos mais sensíveis e seus pontos de atenção.",
    bullets: [
      "Wallet: monitore queda noturna de aprovação e paths de fallback.",
      "BNPL: acompanhe acordos locais e liquidação D+1 com parceiros.",
      "Amazon One: documentação de redundância de sensores e suporte LAM.",
    ],
  },
  {
    title: "Insights de domínio",
    description: "Notas rápidas para levar a WBR/MBR sem depender de dashboards.",
    bullets: [
      "Auth Rate precisa sempre de contexto de emissor e device.",
      "CoP conversa com design de experiência e parceiros de acquiring.",
      "Chargebacks conectam Risk + CS: registre owners e mecanismos claros.",
    ],
  },
  {
    title: "Playbooks em destaque",
    description: "Capsulas com os tópicos mais consultados.",
    bullets: [
      "Pix + Amazon Pay: arquitetura do piloto híbrido.",
      "LATAM Auth Deep Dive: checklist de comparação por emissor.",
      "Fraud Guardrails: thresholds e gatilhos de COE.",
    ],
  },
];

export default function DomainPage() {
  const { hero, sections } = domainData;

  return (
    <DashboardPageLayout
      header={{
        title: hero.title,
        description: hero.subtitle,
      }}
    >
      <AmazonHubShell>
        <div className="space-y-8">
          <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <Card className="border-border/70">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Playbook de domínio</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{hero.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {referenceHighlights.map((signal) => (
                    <div
                      key={signal}
                      className="rounded-lg border bg-muted/40 px-3 py-3 text-sm font-medium text-muted-foreground leading-relaxed"
                    >
                      {signal}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-5">
              {referenceCollections.map((collection, index) => {
                const icons = [Radar, Layers, Target];
                const Icon = icons[index] ?? Layers;
                return (
                  <Card key={collection.title} className="border-border/70">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Icon className="size-5 text-primary flex-shrink-0" />
                        {collection.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{collection.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      {collection.bullets.map((bullet) => (
                        <div key={bullet} className="rounded-lg border bg-muted/40 px-3 py-2 leading-relaxed">
                          {bullet}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card
                    key={section.id}
                    className="flex flex-col overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className={cn("h-1.5 w-full", section.bgColor.replace("/10", ""))}></div>
                    <CardHeader className="flex-1 pb-4">
                      <div
                        className={cn(
                          "mb-3 flex size-12 items-center justify-center rounded-xl flex-shrink-0",
                          section.bgColor,
                          section.color,
                        )}
                      >
                        <Icon className="size-6" />
                      </div>
                      <CardTitle className="mb-2 text-sm font-semibold">{section.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{section.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-0 pb-4">
                      <Button asChild variant="secondary" className="group w-full text-sm">
                        <Link href={section.href}>
                          Acessar trilha
                          <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="size-5 text-primary" />
                  Perguntas para levar aos reviews
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Use como checklist mental ao navegar pelas trilhas acima.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-muted-foreground">
                {["Qual métrica depende diretamente deste fluxo?", "Quais partners ou squads têm o maior impacto neste tema?", "Qual runbook ou documento preciso abrir antes de responder?"] .map((question) => (
                  <div key={question} className="rounded-lg border bg-muted/30 px-3 py-2 leading-relaxed">
                    {question}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
