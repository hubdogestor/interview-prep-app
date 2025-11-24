import { ArrowUpRight, CalendarDays, CheckCircle2, Clock4, ListChecks } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "../styles.css";

const cadenceRows = [
  {
    ritual: "Weekly Sync com Andreia",
    day: "Seg · 09h",
    focus: "Incidentes, automação e custo por transação",
    prep: "Enviar briefing até domingo 20h (Looker + notas Oakberry)",
    signal: "Decisões rápidas se dados estiverem claros",
  },
  {
    ritual: "WBR LATAM com Sujash",
    day: "Ter · 11h",
    focus: "Approval rate regional, rollouts e riscos",
    prep: "Narrativa de 1 página + anexos por país",
    signal: "Comparativos com Índia/EUA ajudam a ganhar contexto",
  },
  {
    ritual: "Oakberry Ops Review",
    day: "Qui · 15h",
    focus: "SLAs conjuntos, roadmap de integrações e novos pilotos",
    prep: "Atualizar tracker de integrações e itens de confiança",
    signal: "Expectativa de follow-up em até 24h",
  },
  {
    ritual: "Friday Reset",
    day: "Sex · 17h",
    focus: "Retrospectiva semanal, próximos experimentos e riscos",
    prep: "Checklist de alarmes e plano da semana seguinte",
    signal: "Documentar aprendizados para 6-pager do trimestre",
  },
];

const rampPlan = [
  {
    phase: "0-30 dias",
    theme: "Aprender & mapear",
    objectives: [
      "Listening tour com Andreia, Sujash, Oakberry e Data/Eng",
      "Inventário de alarmes críticos e runbooks",
      "Assumir ownership do scorecard LATAM",
    ],
    deliverables: [
      "Mapa de stakeholders + preferências de comunicação",
      "Log de riscos de integração PIX/Cartões",
      "Check-in 30d com Andreia (doc de 2 páginas)",
    ],
  },
  {
    phase: "31-60 dias",
    theme: "Sincronizar & executar",
    objectives: [
      "Rodar primeira rodada completa do WBR",
      "Testar game day dos principais serviços",
      "Publicar OKRs alinhados",
    ],
    deliverables: [
      "Scorecard LATAM v1 no Looker",
      "Relatório de testes de resiliência",
      "PR/FAQ draft do roadmap PIX Automático",
    ],
  },
  {
    phase: "61-90 dias",
    theme: "Escalar & comunicar",
    objectives: [
      "Executar plano de automação com AI/ML",
      "Integrar Oakberry e demais parceiros no pipeline",
      "Preparar narrativa para OP1",
    ],
    deliverables: [
      "6-pager consolidado + anexos técnicos",
      "Runbook de incidentes revisado",
      "Retro 90d com Andreia + plano do trimestre",
    ],
  },
];

const reviewKits = [
  {
    title: "Monday Metrics",
    window: "Seg · 08h",
    inputs: [
      "Dashboard de approval rate (Looker)",
      "Custo por transação & SLA PIX",
      "Logs de incidentes da semana anterior",
    ],
    outputs: [
      "Lista de desvios >0.5pp com owners",
      "Alertas para Andreia antes do sync",
    ],
  },
  {
    title: "Thursday Delivery Check",
    window: "Qui · 13h",
    inputs: [
      "Kanban dos programas",
      "Status de automações e integrações",
    ],
    outputs: [
      "Atualização para Oakberry",
      "Notas para PR/FAQ em edição",
    ],
  },
  {
    title: "Monthly Readout",
    window: "Última seg · 10h",
    inputs: [
      "Lookback de incidentes",
      "Análises financeiras",
      "Feedback dos parceiros",
    ],
    outputs: [
      "Narrativa de 4 páginas",
      "Atualização dos OKRs",
    ],
  },
];

const readinessList = [
  {
    title: "Scorecard LATAM v1",
    status: "in-progress",
    detail: "Faltando conectar dados de PIX Automático",
    owner: "Você + Data Eng",
  },
  {
    title: "Teste de failover Oakberry",
    status: "risk",
    detail: "Dependência de sandbox atualizada até 02/12",
    owner: "Platform Eng",
  },
  {
    title: "Runbook incidentes críticos",
    status: "done",
    detail: "Versão 1 validada na última retro",
    owner: "Você",
  },
];

const commitments = [
  {
    label: "Revisar incidentes pós-Black Friday",
    detail: "Conectar métricas de latência com alarmes de adquirentes e validar RCA com Andreia.",
  },
  {
    label: "Atualizar plano 30·60·90",
    detail: "Adicionar entregáveis confirmados e riscos novos para checkpoint da semana 6.",
  },
  {
    label: "Submeter PR/FAQ Oakberry",
    detail: "Revisar perguntas frequentes com Sujash e anexar estimativa de investimento.",
  },
];

const statusTone: Record<string, string> = {
  done: "amazon-portal-status-done",
  "in-progress": "text-sky-300",
  risk: "amazon-portal-status-risk",
};

export default function OperatingRhythmPage() {
  return (
    <AmazonPortalSection
      title="Operating Rhythm & Ramp Plan"
      description="Plano vivo para conduzir as primeiras 12 semanas no Payment Business Operation. Usa cadência Amazon (WBR, PR/FAQ, 6-pagers) e integra os parceiros Oakberry desde o dia 1."
      kicker="Runbook vivo"
      updatedAt="23·11·2025"
    >
      <Tabs defaultValue="cadence" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 amazon-prep-tabs-list">
          <TabsTrigger value="cadence" className="amazon-prep-tabs-trigger">
            Cadência semanal
          </TabsTrigger>
          <TabsTrigger value="ramp" className="amazon-prep-tabs-trigger">
            Plano 30·60·90
          </TabsTrigger>
          <TabsTrigger value="reviews" className="amazon-prep-tabs-trigger">
            Kits de review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cadence" className="amazon-prep-tabs-content">
          <Card className="amazon-prep-card">
            <CardHeader>
              <CardTitle>Rituais confirmados</CardTitle>
              <CardDescription>Todos os horários já combinados com Andreia, Sujash e Oakberry.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="amazon-portal-table min-w-full">
                  <thead>
                    <tr>
                      <th>Ritual</th>
                      <th>Janela</th>
                      <th>Foco</th>
                      <th>Preparação</th>
                      <th>Sinal crítico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cadenceRows.map((row) => (
                      <tr key={row.ritual}>
                        <td className="font-medium pr-4">{row.ritual}</td>
                        <td className="pr-4">{row.day}</td>
                        <td className="pr-4">{row.focus}</td>
                        <td className="pr-4">{row.prep}</td>
                        <td>{row.signal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ramp" className="amazon-prep-tabs-content">
          <div className="grid gap-4 md:grid-cols-3">
            {rampPlan.map((phase) => (
              <Card key={phase.phase} className="border-white/10 bg-pop/40">
                <CardHeader className="space-y-2">
                  <Badge variant="outline">{phase.phase}</Badge>
                  <CardTitle>{phase.theme}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="amazon-prep-subsection-title">Objetivos</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {phase.objectives.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="amazon-prep-subsection-title">Entregáveis</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {phase.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="amazon-prep-tabs-content">
          <div className="grid gap-4 md:grid-cols-3">
            {reviewKits.map((kit) => (
              <Card key={kit.title} className="border-white/10 bg-pop/40">
                <CardHeader>
                  <CardTitle>{kit.title}</CardTitle>
                  <CardDescription>{kit.window}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="amazon-prep-subsection-title">Inputs</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {kit.inputs.map((input) => (
                        <li key={input}>{input}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="amazon-prep-subsection-title">Outputs</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {kit.outputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </div>
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
              <ListChecks className="text-primary" />
              <div>
                <CardTitle>Status das readiness items</CardTitle>
                <CardDescription>Atualizado após o Friday Reset.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {readinessList.map((item) => (
              <div key={item.title} className="amazon-portal-card">
                <div className="flex items-center justify-between">
                  <p className="amazon-portal-card-title">{item.title}</p>
                  <span className={`amazon-portal-chip ${statusTone[item.status] ?? "text-white"}`}>
                    {item.status === "done" && <CheckCircle2 className="mr-2 h-4 w-4" />}
                    {item.status === "risk" && <Clock4 className="mr-2 h-4 w-4" />}
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
                <p className="text-xs text-muted-foreground">Owner: {item.owner}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-pop/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CalendarDays className="text-primary" />
              <div>
                <CardTitle>Compromissos da semana</CardTitle>
                <CardDescription>Itens que desbloqueiam as próximas entregas.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {commitments.map((item) => (
              <div key={item.label} className="amazon-portal-card">
                <p className="amazon-portal-card-title">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
            <Badge asChild variant="outline">
              <a href="/amazon-prep/program-management" className="inline-flex items-center gap-2 text-sm">
                Ver detalhamento completo
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Badge>
          </CardContent>
        </Card>
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3">
          <Clock4 className="text-primary" />
          <h3 className="amazon-prep-section-title">Checklist antes de cada review</h3>
        </div>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Validar métricas no Looker e anexar screenshots no doc de suporte.</li>
          <li>Atualizar riscos/decisões do log compartilhado com Andreia.</li>
          <li>Enviar agenda e materiais com antecedência mínima de 12h.</li>
          <li>Registrar decisões tomadas em até 2h pós-meeting.</li>
        </ol>
      </section>
    </AmazonPortalSection>
  );
}
