import { AlertTriangle, Cpu, Plug, ShieldCheck, Workflow } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import "../styles.css";

const architectureLayers = [
  {
    name: "Entrada & Autorização",
    details: "Amazon API Gateway + Lambda validam requests e fazem throttling por merchant.",
    signals: "Latência <120ms, taxonomia correta por método de pagamento.",
  },
  {
    name: "Fraude & Decisão",
    details: "Amazon Fraud Detector + Step Functions orquestram regras e modelos customizados.",
    signals: "Precisão >97%, falsos positivos <1.2%.",
  },
  {
    name: "Processamento & Liquidação",
    details: "EventBridge transmite eventos para serviços de captura, conciliação e ledger.",
    signals: "Falhas <0.05% e reconciliação automática >92%.",
  },
  {
    name: "Notificações & Insights",
    details: "S3 + Athena + QuickSight alimentam dashboards e alertas de negócio.",
    signals: "Dashboards atualizados a cada 15min, sem gaps de dados.",
  },
];

const awsServices = [
  { name: "Lambda", use: "Orquestra validações, cálculo de taxas e enrichment de eventos." },
  { name: "EventBridge", use: "Barramento para PaymentInitiated, PaymentAuthorized, Settlement." },
  { name: "DynamoDB", use: "Estados de transação e locks de idempotência." },
  { name: "Step Functions", use: "Refunds, chargebacks e fluxos com rollback controlado." },
  { name: "KMS / Payment Cryptography", use: "Gestão de chaves e HSM compliant com PCI." },
  { name: "CloudWatch & X-Ray", use: "Observabilidade, dashboards e tracing de chamadas." },
];

const resiliencePlaybooks = [
  {
    title: "PIX Gateway",
    steps: [
      "Monitorar fila de autorização no EventBridge (lag >30s).",
      "Acionar fallback para gateway secundário (Lambda switch).",
      "Registrar incidente no PagerDuty e atualizar Andreia em 15min.",
      "Rodar post-mortem em 24h com métricas e recomendações.",
    ],
  },
  {
    title: "Adquirente Cartões",
    steps: [
      "Verificar alarmes de latência no CloudWatch (p95 >500ms).",
      "Habilitar roteamento dinâmico por approval histórica.",
      "Comunicar merchants impactados via template pronto.",
      "Atualizar dashboard de custo/approval após normalização.",
    ],
  },
];

const observability = [
  {
    category: "Alarmes críticos",
    items: [
      "Approval rate <92% (Looker + PagerDuty)",
      "Latência PIX >200ms",
      "Fila de reconciliação >15min",
      "Erros 5xx API >0.2%",
    ],
  },
  {
    category: "Dashboards",
    items: [
      "Scorecard LATAM (Looker)",
      "Operational Health (CloudWatch)",
      "AI/ML Experiments (SageMaker Studio)",
    ],
  },
];

const integrationChecklist = [
  "Confirmar contratos e chaves no AWS Secrets Manager.",
  "Configurar alarmes de SLA específicos por parceiro.",
  "Adicionar fluxos ao runbook compartilhado.",
  "Realizar sandbox test + game day antes do rollout.",
];

export default function SystemsToolingPage() {
  return (
    <AmazonPortalSection
      title="Systems & Tooling"
      description="Mapa tático da pilha AWS + integrações de pagamento usadas no LATAM. Serve como referência para incidentes, game days e revisões com Auditores/Andreia."
      kicker="Arquitetura viva"
      updatedAt="23·11·2025"
    >
      <section className="grid gap-4 md:grid-cols-2">
        {architectureLayers.map((layer) => (
          <Card key={layer.name} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cpu className="text-primary" />
                <CardTitle className="text-base">{layer.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{layer.details}</p>
              <Badge variant="outline">Sinal saudável: {layer.signals}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Workflow className="text-primary" />
          <h3 className="amazon-prep-section-title">Serviços AWS essenciais</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {awsServices.map((service) => (
            <div key={service.name} className="amazon-portal-card">
              <p className="amazon-portal-card-title">{service.name}</p>
              <p className="text-sm text-muted-foreground">{service.use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {resiliencePlaybooks.map((playbook) => (
          <Card key={playbook.title} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-primary" />
                <CardTitle className="text-base">{playbook.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                {playbook.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-primary" />
          <div>
            <h3 className="amazon-prep-section-title">Observabilidade e alarmes</h3>
            <p className="text-sm text-muted-foreground">O que precisa estar verde antes do WBR.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {observability.map((block) => (
            <div key={block.category} className="amazon-portal-card">
              <p className="amazon-portal-card-title">{block.category}</p>
              <ul className="amazon-portal-list list-disc list-inside">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Plug className="text-primary" />
          <h3 className="amazon-prep-section-title">Checklist para novas integrações</h3>
        </div>
        <ul className="amazon-portal-list list-disc list-inside">
          {integrationChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </AmazonPortalSection>
  );
}
