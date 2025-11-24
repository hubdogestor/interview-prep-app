import { Globe2, Map, Newspaper, TrendingUp } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { marketKnowledgeData } from "@/data/amazon/onboarding";

import "../styles.css";
const { marketSignals, regulatoryWatch, competitorMoves, focusQuestions } = marketKnowledgeData;

export default function MarketIntelligencePage() {
  return (
    <AmazonPortalSection
      title="Market Intelligence Radar"
      description="Radar vivo de sinais de mercado, concorrência e regulação que influencia pagamentos no Brasil e LATAM. Atualizado semanalmente para alimentar narrativas com Andreia e Sujash."
      kicker="Brasil + LATAM"
      updatedAt="23·11·2025"
    >
      <section className="grid gap-4 md:grid-cols-2">
        {marketSignals.map((signal) => (
          <Card key={signal.title} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="text-primary" />
                <CardTitle className="text-base">{signal.title}</CardTitle>
              </div>
              <CardDescription>{signal.data}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">Implicação: {signal.implication}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Map className="text-primary" />
          <h3 className="amazon-prep-section-title">Monitor regulatório</h3>
        </div>
        <div className="space-y-4">
          {regulatoryWatch.map((rule) => (
            <div key={rule.item} className="amazon-portal-card">
              <p className="amazon-portal-card-title">{rule.item}</p>
              <p className="text-sm text-muted-foreground">{rule.detail}</p>
              <p className="text-xs text-muted-foreground">Próxima ação: {rule.action}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {competitorMoves.map((competitor) => (
          <Card key={competitor.name} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Newspaper className="text-primary" />
                <CardTitle className="text-base">{competitor.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="amazon-portal-card-title">Movimentos</p>
                <ul className="amazon-portal-list list-disc list-inside">
                  {competitor.moves.map((move) => (
                    <li key={move}>{move}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="amazon-portal-card-title">Como responder</p>
                <p className="text-sm text-muted-foreground">{competitor.mitigation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Globe2 className="text-primary" />
          <div>
            <h3 className="amazon-prep-section-title">Perguntas norteadoras</h3>
            <p className="text-sm text-muted-foreground">Use em WBRs, PR/FAQ e conversas com parceiros.</p>
          </div>
        </div>
        <ul className="amazon-portal-list list-disc list-inside">
          {focusQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>
    </AmazonPortalSection>
  );
}
