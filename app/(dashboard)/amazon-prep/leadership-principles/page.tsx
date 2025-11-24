import AmazonPortalSection from "@/components/amazon/portal-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { firstQuarterFocus, leadershipPrinciples } from "@/data/amazon/onboarding";

import "../styles.css";

const principles = leadershipPrinciples;

export default function LeadershipPrinciplesPage() {
  return (
    <AmazonPortalSection
      title="Leadership Playbook"
      description="Guia para aplicar os 16 Leadership Principles durante o onboarding no Payment Business Operation. Cada princípio vem com exemplos reais, sinais e como ativá-lo nas primeiras 12 semanas."
      kicker="LPs em operação"
      updatedAt="23·11·2025"
    >
      <Card className="amazon-portal-card">
        <div className="flex flex-col gap-2">
          <h3 className="amazon-prep-section-title">Como usar</h3>
          <p className="text-sm text-muted-foreground">
            Antes de cada decisão ou ritual, valide quais princípios estão em jogo, quais métricas provam o impacto e o que precisa ser documentado para Andreia e Sujash.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Badge variant="outline">1 · Preparar contexto</Badge>
              <p className="text-sm text-muted-foreground mt-2">Use dados e sinais de cliente para ancorar a conversa.</p>
            </div>
            <div>
              <Badge variant="outline">2 · Aplicar princípio</Badge>
              <p className="text-sm text-muted-foreground mt-2">Escolha o comportamento dominante e detalhe ações concretas.</p>
            </div>
            <div>
              <Badge variant="outline">3 · Registrar impacto</Badge>
              <p className="text-sm text-muted-foreground mt-2">Documente o resultado no log de decisões e conecte ao scorecard.</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {principles.map((principle) => (
          <Card key={principle.id} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={`${principle.color} text-white`}>{principle.title}</Badge>
                <span className="text-sm text-muted-foreground">{principle.relevance}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{principle.description}</p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="amazon-portal-card">
                  <p className="amazon-portal-card-title">Como aparece no dia a dia</p>
                  <ul className="amazon-portal-list list-disc list-inside">
                    {principle.keyPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="amazon-portal-card">
                  <p className="amazon-portal-card-title">Foco nos primeiros 90 dias</p>
                  <p className="text-sm text-muted-foreground">{firstQuarterFocus[principle.id]}</p>
                </div>
                <div className="amazon-portal-card">
                  <p className="amazon-portal-card-title">Exemplo operacional (STAR)</p>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`example-${principle.id}`}>
                      <AccordionTrigger className="amazon-prep-accordion-trigger">
                        Ver detalhes
                      </AccordionTrigger>
                      <AccordionContent className="amazon-prep-accordion-content text-sm space-y-2 text-muted-foreground">
                        <p>
                          <strong>Situation:</strong> {principle.starExample.situation}
                        </p>
                        <p>
                          <strong>Task:</strong> {principle.starExample.task}
                        </p>
                        <p>
                          <strong>Action:</strong> {principle.starExample.action}
                        </p>
                        <p>
                          <strong>Result:</strong> {principle.starExample.result}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AmazonPortalSection>
  );
}
