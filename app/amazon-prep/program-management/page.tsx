import { ArrowUpRight, ClipboardList, LineChart, NotebookPen } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "../styles.css";

const docPipelines = [
  {
    name: "PR/FAQ · PIX Automático",
    status: "Em edição",
    nextStep: "Inserir respostas de Oakberry até 27/11",
    owner: "Você",
  },
  {
    name: "6-Pager · Scorecard LATAM",
    status: "Outline aprovado",
    nextStep: "Consolidar métricas Q4 com Data Eng",
    owner: "Você + Data",
  },
  {
    name: "Narrativa · Game Day",
    status: "Rascunho",
    nextStep: "Adicionar resultados do teste de failover",
    owner: "Platform Eng",
  },
];

const governance = [
  {
    title: "WBR (Weekly Business Review)",
    detail: "Documento de 6 páginas lido em silêncio, atualiza KPIs e riscos.",
    cadence: "Semanal | Liderado por você",
    inputs: ["Scorecard LATAM", "Runbook de incidentes", "Plano Oakberry"],
  },
  {
    title: "OBR (Operational Business Review)",
    detail: "Foco em processos e automações, envolve Eng, Finance e CX.",
    cadence: "Mensal | Co-liderado com Andreia",
    inputs: ["Lista de automações", "KPIs de eficiência", "Pipeline AI/ML"],
  },
  {
    title: "Quarterly Readout",
    detail: "Documento consolidando OKRs, decisões e investimentos.",
    cadence: "Trimestral | Liderado por Sujash",
    inputs: ["Resultados financeiros", "Roadmap LATAM", "Riscos regulatórios"],
  },
];

const kpiStacks = [
  {
    category: "Performance",
    metrics: [
      { label: "Approval rate", target: ">= 94%", tool: "Looker" },
      { label: "Sucesso PIX", target: ">= 99.8%", tool: "CloudWatch" },
    ],
  },
  {
    category: "Custo & Eficiência",
    metrics: [
      { label: "Custo por transação", target: "-12% YoY", tool: "Finance DW" },
      { label: "Automação de reconciliação", target: "90%", tool: "Ops Tracker" },
    ],
  },
  {
    category: "Risco",
    metrics: [
      { label: "Chargeback", target: "<0.5%", tool: "Fraud BI" },
      { label: "Incidentes P1", target: "zero por trimestre", tool: "PagerDuty" },
    ],
  },
];

const reportingCadence = [
  {
    name: "Daily Pulse",
    what: "Slack/Chime com desvios e incidentes.",
    audience: "Andreia + Squad",
  },
  {
    name: "Weekly Snapshot",
    what: "Resumo em Notion + links para dashboards.",
    audience: "Stakeholders LATAM",
  },
  {
    name: "Monthly Narrative",
    what: "Documento de 4 páginas com decisões, riscos e próximos passos.",
    audience: "Sujash + parceiros globais",
  },
];

export default function ProgramOfficePage() {
  return (
    <AmazonPortalSection
      title="Program Office & Governance"
      description="Sistema de documentação, KPIs e cadências que sustentam o Payment Business Operation. Serve como motor das decisões com Andreia e Sujash."
      kicker="Docs > Slides"
      updatedAt="23·11·2025"
    >
      <Tabs defaultValue="docs" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 amazon-prep-tabs-list">
          <TabsTrigger value="docs" className="amazon-prep-tabs-trigger">
            Documentos
          </TabsTrigger>
          <TabsTrigger value="governance" className="amazon-prep-tabs-trigger">
            Governança
          </TabsTrigger>
          <TabsTrigger value="kpis" className="amazon-prep-tabs-trigger">
            KPIs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="docs" className="amazon-prep-tabs-content">
          <Card className="border-white/10 bg-pop/40">
            <CardHeader>
              <CardTitle>Pipeline de documentos</CardTitle>
              <CardDescription>Priorizar o que alimenta as próximas decisões.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {docPipelines.map((doc) => (
                <div key={doc.name} className="amazon-portal-card">
                  <div className="flex items-center justify-between">
                    <p className="amazon-portal-card-title">{doc.name}</p>
                    <span className="amazon-portal-chip">{doc.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Próximo passo: {doc.nextStep}</p>
                  <p className="text-xs text-muted-foreground">Owner: {doc.owner}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="amazon-prep-tabs-content">
          <div className="grid gap-4 md:grid-cols-3">
            {governance.map((ritual) => (
              <Card key={ritual.title} className="border-white/10 bg-pop/40">
                <CardHeader>
                  <CardTitle>{ritual.title}</CardTitle>
                  <CardDescription>{ritual.cadence}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{ritual.detail}</p>
                  <div>
                    <p className="amazon-portal-card-title">Inputs obrigatórios</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {ritual.inputs.map((input) => (
                        <li key={input}>{input}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="amazon-prep-tabs-content">
          <div className="grid gap-4 md:grid-cols-3">
            {kpiStacks.map((stack) => (
              <Card key={stack.category} className="border-white/10 bg-pop/40">
                <CardHeader>
                  <CardTitle>{stack.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stack.metrics.map((metric) => (
                    <div key={metric.label} className="amazon-portal-card">
                      <p className="amazon-portal-card-title">{metric.label}</p>
                      <p className="text-sm text-muted-foreground">Meta: {metric.target}</p>
                      <p className="text-xs text-muted-foreground">Fonte: {metric.tool}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-white/10 bg-pop/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <LineChart className="text-primary" />
              <div>
                <CardTitle>Cadência de reporting</CardTitle>
                <CardDescription>Quem recebe o quê e quando.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportingCadence.map((item) => (
              <div key={item.name} className="amazon-portal-card">
                <p className="amazon-portal-card-title">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.what}</p>
                <p className="text-xs text-muted-foreground">Audiência: {item.audience}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-pop/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <NotebookPen className="text-primary" />
              <div>
                <CardTitle>Checklist antes de escrever</CardTitle>
                <CardDescription>Aplicar em qualquer PR/FAQ ou 6-pager.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Começar com o cliente (qual dor resolvemos?).</li>
              <li>Listar métricas e fontes que comprovam o problema.</li>
              <li>Descrever solução simples + trade-offs.</li>
              <li>Incluir riscos, investimentos e plano de rollout.</li>
              <li>Validar com Andreia antes de enviar para Sujash.</li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <ClipboardList className="text-primary" />
          <h3 className="amazon-prep-section-title">Links rápidos</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <Badge asChild variant="outline">
            <a href="/amazon-prep/interview-prep" className="inline-flex items-center gap-2 text-sm">
              Plano 30·60·90
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Badge>
          <Badge asChild variant="outline">
            <a href="/amazon-prep/technical-deep-dive" className="inline-flex items-center gap-2 text-sm">
              Runbooks técnicos
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Badge>
          <Badge asChild variant="outline">
            <a href="/amazon-prep/market-knowledge" className="inline-flex items-center gap-2 text-sm">
              Radar de mercado
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Badge>
        </div>
      </section>
    </AmazonPortalSection>
  );
}
