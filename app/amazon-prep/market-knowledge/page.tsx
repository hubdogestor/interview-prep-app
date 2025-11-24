import { Globe2, Map, Newspaper, TrendingUp } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import "../styles.css";

const marketSignals = [
  {
    title: "PIX Automático",
    data: "Lançado em out/2024, meta BCB: 20M contratos recorrentes até 2026.",
    implication: "Necessário suporte nativo para Prime, assinaturas e parceiros Oakberry.",
  },
  {
    title: "PIX por Aproximação",
    data: "Pilotos com NFC iniciam em 2025; varejo físico é prioridade.",
    implication: "Preparar stack de hardware e roteamento híbrido PIX/cartão.",
  },
  {
    title: "Cartões contactless",
    data: ">60% das transações presenciais já usam NFC.",
    implication: "Alavancar experiência Amazon One + Oakberry para diferenciação.",
  },
  {
    title: "Open Finance",
    data: "Fase de iniciação de pagamentos amadurecendo; 1.3B consentimentos.",
    implication: "Explorar iniciação direta e scoring alternativo para BNPL/Prime.",
  },
];

const regulatoryWatch = [
  {
    item: "Resolução BCB 315",
    detail: "Regras para Instituições de Pagamento com foco em capital mínimo.",
    action: "Validar impacto no modelo de parceria com Oakberry e novos merchants.",
  },
  {
    item: "Open Finance Fase 4",
    detail: "Compartilhamento de serviços agregados (seguros, investimentos).",
    action: "Mapear oportunidades de cross-sell para Amazon Pay.",
  },
  {
    item: "Regulação de IA",
    detail: "PL brasileiro em debate (2025) exigindo transparência em modelos de crédito/fraude.",
    action: "Documentar modelos usados em approval para auditorias futuras.",
  },
];

const competitorMoves = [
  {
    name: "Mercado Pago",
    moves: [
      "Expansão de PIX parcelado em 5 países.",
      "Oferta de SaaS antifraude para terceiros.",
    ],
    mitigation: "Destacar vantagem AWS + AI/ML e integrar PIX Automático mais cedo.",
  },
  {
    name: "Nubank",
    moves: [
      "109M de clientes e forte penetração em PIX com cashback.",
      "Investimentos em plataforma própria de adquirência.",
    ],
    mitigation: "Usar Prime + parceria Oakberry para oferecer benefícios exclusivos.",
  },
  {
    name: "Stone/TON",
    moves: [
      "Novos POS com suporte PIX offline.",
      "Oferta de capital de giro atrelada ao fluxo PIX.",
    ],
    mitigation: "Explorar soluções de working capital via Amazon Capital Services.",
  },
];

const focusQuestions = [
  "Como cada movimento regulatório impacta o custo por transação em 2025?",
  "Qual parcela do GMV LATAM virá de PIX Automático e quando devemos ativar incentivos?",
  "Quais aprendizados do UPI (Índia) aplicaremos para aprovação de pagamentos instantâneos?",
  "Como Oakberry e demais parceiros enxergam o roadmap e quais métricas valorizam?",
];

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
