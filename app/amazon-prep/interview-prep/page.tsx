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
                  <div className="p-3 border rounded-lg">
                    Tell me about a time you had to make a decision with incomplete information.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe a calculated risk you took that didn't work out. What did you learn?
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">💡 Invent and Simplify</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    Tell me about a time you simplified a complex process.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe an innovation you introduced that others initially resisted.
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">📊 Deliver Results</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    Tell me about a time you had to deliver results despite significant obstacles.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe your most significant professional achievement. What made it challenging?
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">🤝 Earn Trust</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    Tell me about a time you had to admit a significant mistake.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe a situation where you had to give difficult feedback to someone more senior.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perguntas Técnicas - Payment Operations</CardTitle>
              <CardDescription>Demonstre conhecimento profundo do domínio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Arquitetura e Escalabilidade</h4>
                <div className="text-sm space-y-2">
                  <div className="p-2 bg-muted rounded">
                    "How would you design a payment system to handle 10x traffic during peak events?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "Explain the trade-offs between consistency and availability in payment processing."
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "How would you implement a circuit breaker pattern for payment gateway calls?"
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">KPIs e Métricas</h4>
                <div className="text-sm space-y-2">
                  <div className="p-2 bg-muted rounded">
                    "What are the top 5 KPIs you would track for payment operations? Why?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "Our approval rate dropped from 90% to 85%. How would you investigate?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "How do you calculate the ROI of a fraud detection system?"
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Mercado Brasileiro</h4>
                <div className="text-sm space-y-2">
                  <div className="p-2 bg-muted rounded">
                    "How does PIX differ from traditional payment methods? What are the implications for Amazon?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "Explain the payment flow for a PIX transaction end-to-end."
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "What are the key regulatory considerations for payment operations in Brazil?"
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Program Management</h4>
                <div className="text-sm space-y-2">
                  <div className="p-2 bg-muted rounded">
                    "Walk me through how you would use Six Sigma DMAIC to improve reconciliation process."
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "How would you write a PR/FAQ for a new payment method launch?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "Describe how you would prioritize between 5 competing initiatives with limited resources."
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Case Study - Live Problem Solving</CardTitle>
              <CardDescription>Exemplo de problema para resolver na entrevista</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-lg">
                <h3 className="font-semibold mb-3">📋 Cenário</h3>
                <p className="text-sm mb-4">
                  "A taxa de chargeback da Amazon Brasil aumentou de 0.5% para 0.8% no último mês, 
                  concentrada em São Paulo. Isso representa uma perda adicional de R$ 3M/mês. 
                  Como Program Manager, como você abordaria esse problema?"
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">💭 Framework de Resposta Sugerido</h4>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">1. Clarify</Badge>
                    <div className="text-sm text-muted-foreground">
                      Fazer perguntas de clarificação: "Isso afeta todos os métodos de pagamento ou específicos? 
                      Há algum padrão por categoria de produto? Mudou algo na nossa operação no último mês?"
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">2. Structure</Badge>
                    <div className="text-sm text-muted-foreground">
                      Estruturar hipóteses: Fraude aumentou? Problemas de entrega? Mudança em política de vendedores? 
                      Competidores incentivando chargebacks?
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">3. Analyze</Badge>
                    <div className="text-sm text-muted-foreground">
                      Análise de dados: Segmentar por produto/merchant/valor/hora/método de pagamento. 
                      Identificar 80/20 (onde está concentrado?). Comparar com período anterior.
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">4. Hypothesize</Badge>
                    <div className="text-sm text-muted-foreground">
                      Hipótese: "Dados mostram que 70% vem de categoria eletrônicos + novo seller específico. 
                      Sugere fraude de merchant ou produtos com problemas de qualidade."
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">5. Recommend</Badge>
                    <div className="text-sm text-muted-foreground">
                      <strong>Curto prazo:</strong> Pausar seller suspeito, revisar manualmente transações similares, alertar clientes.
                      <br />
                      <strong>Médio prazo:</strong> Implementar alertas automáticos, reforçar screening de sellers, melhorar tracking de entregas.
                      <br />
                      <strong>Longo prazo:</strong> ML para detectar padrões de fraude, revisão de política de sellers, partnership com bandeiras.
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">6. Metrics</Badge>
                    <div className="text-sm text-muted-foreground">
                      Métricas de sucesso: Taxa de chargeback volta para &lt;0.5% em 30 dias, 
                      redução de 80% em chargebacks de categoria eletrônicos, zero recorrência do mesmo seller.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold mb-2">💡 O que o Entrevistador Avalia</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Structured thinking (não pular para soluções)</li>
                  <li>Fazer boas perguntas antes de responder</li>
                  <li>Pensamento analítico e data-driven</li>
                  <li>Balance entre curto e longo prazo</li>
                  <li>Definição clara de métricas de sucesso</li>
                  <li>Considerar múltiplos stakeholders</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suas Perguntas para os Entrevistadores</CardTitle>
              <CardDescription>Perguntas inteligentes demonstram interesse genuíno e pesquisa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Por que fazer boas perguntas?</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Demonstra que você pesquisou sobre a empresa e o role</li>
                  <li>Mostra pensamento estratégico e curiosidade (Learn and Be Curious)</li>
                  <li>Ajuda você a avaliar se a posição é o fit certo</li>
                  <li>Oportunidade de construir rapport com entrevistador</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Para Andreia Guarino (Gestora Direta)</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Você liderou iniciativas que resultaram no prêmio 'Best Approval Rate' da Elo em 2021. 
                      Quais foram as principais alavancas que permitiram esse resultado?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Mostra que você pesquisou + foco em resultados</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Considerando sua experiência com otimização de processos usando Six Sigma, quais você vê como 
                      os maiores desafios operacionais para Payment Operations nos próximos 12 meses?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Conecta expertise dela + pensamento futuro</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Como você vê a evolução do PIX impactando nossa estratégia de parcerias com adquirentes e bandeiras?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Demonstra conhecimento de mercado + visão estratégica</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Quais KPIs você considera mais críticos para este role nos primeiros 90 dias?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Mostra foco em resultados + alinhamento de expectativas</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Como você equilibra iniciativas de transformação de longo prazo (AI/ML) com a necessidade de manter 
                      operações day-to-day com excelência?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Aborda desafio real do role</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Para Sujash Biswas (Head LATAM)</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Você tem experiência com UPI na Índia e agora com PIX no Brasil - dois dos sistemas de pagamento 
                      instantâneo mais bem-sucedidos do mundo. Quais lições da Índia são mais aplicáveis à estratégia da 
                      Amazon para LATAM?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Mostra pesquisa profunda + pensamento global</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Qual é a visão de longo prazo (3-5 anos) para Amazon Payments na América Latina? 
                      Como este role específico contribui para essa visão?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Think Big + alinhamento estratégico</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "A parceria com Oakberry é mencionada como estratégica. Como você vê a evolução do modelo de parcerias 
                      na região? Há planos de replicar esse tipo de partnership com outros players?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Demonstra atenção ao contexto + visão de ecosistema</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Quais são os maiores desafios únicos de escalar Payment Operations na LATAM comparado a outras regiões 
                      onde você já operou?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Aproveita experiência multi-regional dele</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Como a Amazon está se posicionando em relação a Open Finance no Brasil? Você vê isso como oportunidade 
                      ou desafio para nossa operação?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Tópico atual + visão de oportunidade</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Para Qualquer Entrevistador</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "O que você mais gosta de trabalhar na Amazon? O que te mantém aqui?"
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "Como o time de Payment Operations colabora com outras áreas como Product, Engineering e Finance?"
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "Qual é o maior desafio que o time está enfrentando atualmente?"
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "Como a Amazon mede sucesso para este role? Quais seriam os critérios de uma performance excepcional?"
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "Pode descrever como é um dia típico neste role?"
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg border-green-500/50 bg-green-500/5">
                  <h4 className="font-semibold mb-2 text-green-600">✓ Boas Perguntas</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Específicas, não genéricas</li>
                    <li>Baseadas em pesquisa</li>
                    <li>Sobre o futuro, não só o presente</li>
                    <li>Demonstram seu expertise</li>
                    <li>Genuinamente curiosas</li>
                  </ul>
                </div>
                <div className="p-3 border rounded-lg border-red-500/50 bg-red-500/5">
                  <h4 className="font-semibold mb-2 text-red-600">✗ Evite</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>"Qual é a cultura aqui?" (muito vago)</li>
                    <li>Perguntas sobre salário/benefícios cedo demais</li>
                    <li>"O que a empresa faz?" (falta de pesquisa)</li>
                    <li>Perguntas com resposta no site</li>
                    <li>Foco apenas em WLB sem contexto</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="30-60-90" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plano 30-60-90 Dias</CardTitle>
              <CardDescription>Seu roteiro para os primeiros 3 meses na Amazon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Por que ter um plano 30-60-90?</h3>
                <p className="text-sm text-muted-foreground">
                  Demonstra que você já está pensando estrategicamente sobre como ter sucesso no role. 
                  Mostra proatividade, estruturação e compreensão do que será esperado. Pode ser perguntado 
                  na entrevista: "Como você abordaria seus primeiros 90 dias?"
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-blue-500">Primeiros 30 Dias</Badge>
                    <h3 className="text-xl font-semibold">Aprender e Conectar</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Foco: Absorver contexto, construir relacionamentos, entender o estado atual
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Semana 1-2: Onboarding e Imersão</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Completar onboarding corporativo e técnico (AWS, ferramentas internas)</li>
                        <li>Agendar 1:1s com todos membros do time direto (entender histórias, desafios)</li>
                        <li>Reuniões de conhecimento com Andreia: contexto de programas atuais, prioridades, expectativas</li>
                        <li>Shadowing: acompanhar rituais existentes (standups, business reviews, incident reviews)</li>
                        <li>Ler documentação: 6-Pagers recentes, post-mortems, roadmap, OKRs do time</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Semana 3-4: Mapeamento de Stakeholders</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>1:1s com stakeholders-chave: Engineering, Product, Finance, Legal, parceiros (adquirentes/bandeiras)</li>
                        <li>Entender pain points de cada área em relação a payments</li>
                        <li>Revisar dashboards principais: KPIs, alertas, relatórios</li>
                        <li>Identificar one quick win: pequena melhoria de alto impacto para executar em 30-45 dias</li>
                        <li>Começar a construir conhecimento sobre mercado brasileiro (se ainda não tiver base completa)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">🎯 Entregáveis dos 30 dias</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Documento de síntese: "O que aprendi" (contexto atual, oportunidades, riscos)</li>
                        <li>Mapa de stakeholders atualizado com contatos e contextos</li>
                        <li>Lista priorizada de "quick wins" potenciais</li>
                        <li>Plano revisado para 60-90 dias com feedback de Andreia</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-green-500">Dias 31-60</Badge>
                    <h3 className="text-xl font-semibold">Contribuir e Alinhar</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Foco: Assumir responsabilidades, contribuir ativamente, começar a adicionar valor
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Ownership de Programa</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Assumir responsabilidade completa por 1-2 programas/iniciativas em andamento</li>
                        <li>Conduzir first weekly business review apresentando status, blockers, decisões necessárias</li>
                        <li>Começar a construir relacionamento direto com parceiros externos (se aplicável)</li>
                        <li>Participar ativamente de incident response (se houver)</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Documentação e Processos</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Escrever primeiro 6-Pager ou PR/FAQ (pode ser para "quick win" identificado)</li>
                        <li>Documentar processo ou runbook que estava missing (contribuição de valor)</li>
                        <li>Propor melhorias em rituais ou processos existentes (baseado em observação de 30 dias)</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Análise e Insights</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Deep dive em 1-2 KPIs críticos: análise de tendências, root causes, oportunidades</li>
                        <li>Apresentar primeiros insights baseados em dados para o time/Andreia</li>
                        <li>Identificar gaps em instrumentação ou dashboards e propor melhorias</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">🎯 Entregáveis dos 60 dias</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Quick win executado e mensurado (resultado quantificado)</li>
                        <li>Primeiro 6-Pager completo apresentado e discutido</li>
                        <li>Weekly business review estabelecido como ritual</li>
                        <li>Pelo menos 1 melhoria de processo implementada</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-purple-500">Dias 61-90</Badge>
                    <h3 className="text-xl font-semibold">Liderar e Impactar</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Foco: Ownership completo, liderança de iniciativas, impacto mensurável
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Visão e Roadmap</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Definir roadmap detalhado para próximos 2-3 trimestres dos programas sob sua responsabilidade</li>
                        <li>Alinhar prioridades e sequenciamento com stakeholders (engineering, product, business)</li>
                        <li>Apresentar visão em monthly business review ou QBR (Quarterly Business Review)</li>
                        <li>Obter buy-in de Andreia e Sujash para iniciativas maiores</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Iniciativa Estratégica</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Liderar kickoff de uma iniciativa estratégica de médio prazo (3-6 meses)</li>
                        <li>Pode ser relacionada a AI/ML, otimização de processos, ou parceria estratégica</li>
                        <li>Montar squad ou working group, definir objetivos claros (OKRs)</li>
                        <li>Estabelecer métricas de sucesso e cadência de reporting</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Relacionamentos e Influência</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Expandir network: conectar com PgMs de outras regiões, participar de forums globais</li>
                        <li>Posicionar-se como subject matter expert em 1-2 áreas específicas</li>
                        <li>Mentorar ou onboardar novo membro do time (se houver hiring)</li>
                        <li>Contribuir para comunidade interna (tech talks, brown bags, documentação)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">🎯 Entregáveis dos 90 dias</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Roadmap de 2-3 trimestres aprovado e socializado</li>
                        <li>Pelo menos 1 iniciativa estratégica em execução com milestones claros</li>
                        <li>Impacto mensurável em pelo menos 2 KPIs principais do time</li>
                        <li>Ritmo de reporting e comunicação estabelecido e funcionando</li>
                        <li>Feedback formal de 90 dias de Andreia solicitado e incorporado</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">🎯 Metas de Sucesso por Período</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <Badge className="w-fit bg-blue-500 mb-2">30 Dias</Badge>
                      <CardTitle className="text-base">Aprender</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Contexto completo absorvido</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Relacionamentos estabelecidos</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Quick wins identificados</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <Badge className="w-fit bg-green-500 mb-2">60 Dias</Badge>
                      <CardTitle className="text-base">Contribuir</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Programas sob ownership</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Primeiro valor entregue</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Confiança do time conquistada</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <Badge className="w-fit bg-purple-500 mb-2">90 Dias</Badge>
                      <CardTitle className="text-base">Liderar</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Impacto em KPIs mensurado</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Iniciativa estratégica liderada</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Reconhecido como líder</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h4 className="font-semibold mb-2">⚠️ Red Flags para Evitar</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li><strong>Dia 30:</strong> Ainda não ter clareza sobre prioridades ou não ter conectado com stakeholders-chave</li>
                  <li><strong>Dia 60:</strong> Não ter assumido ownership de nenhum programa ou não ter entregue nenhum valor</li>
                  <li><strong>Dia 90:</strong> Não ter impacto mensurável em KPIs ou não ter plano claro para próximo trimestre</li>
                  <li><strong>Geral:</strong> Ficar muito tempo "apenas observando" sem contribuir ativamente</li>
                  <li><strong>Geral:</strong> Não pedir feedback regularmente ou esperar a review formal de 90 dias</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
