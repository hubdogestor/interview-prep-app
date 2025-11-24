import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  ClipboardList,
  Cpu,
  Globe2,
  ShieldCheck,
  Star,
  Target,
  Users2,
} from "lucide-react";

export type ModuleTile = {
  id: string;
  title: string;
  description: string;
  focus: string;
  icon: LucideIcon;
  topics: number;
  status: string;
  href: string;
  gradient: string;
  accent: string;
};

export type LeadershipPrinciple = {
  id: number;
  title: string;
  description: string;
  color: string;
  relevance: string;
  keyPoints: string[];
  starExample: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
};

export const amazonHubData = {
  jobInfo: {
    title: "Program Manager, Payment Business Operation",
    company: "Amazon",
    location: "São Paulo, Brasil",
    jobId: "3059488",
    partnership: "Oakberry Strategic Partnership",
  },
  heroMeta: [
    { label: "Escopo", value: "LATAM Payment Ops" },
    { label: "Metodologias", value: "Lean · Six Sigma · Working Backwards" },
    { label: "Foco", value: "Onboarding + AI/ML" },
  ],
  healthCheck: {
    title: "Health Check",
    summary: "Contexto 65% · Sistemas 40% · Resultados 35%",
    detail:
      "Concluído discovery com stakeholders. Em andamento: fechamento dos alarmes críticos e primeira rodada de scorecards compartilhados.",
  },
  modules: [
    {
      id: "operating-rhythm",
      title: "Operating Rhythm",
      description:
        "Cadência semanal, 30·60·90 e rituais LIVE com Andreia/Sujash para manter o pulso da operação.",
      icon: Target,
      topics: 3,
      status: "Em curso",
      href: "/amazon-prep/operating-rhythm",
      focus: "30·60·90 · cadência",
      gradient: "from-indigo-500/25 via-indigo-500/5 to-transparent",
      accent: "text-indigo-200 border-indigo-400/30",
    },
    {
      id: "stakeholders",
      title: "Stakeholder Playbooks",
      description:
        "Expectativas, estilo de decisão e rotinas de comunicação para Andreia, Sujash e parceiros Oakberry.",
      icon: Users2,
      topics: 3,
      status: "Atualizado",
      href: "/amazon-prep/stakeholders",
      focus: "Andreia · Sujash · Oakberry",
      gradient: "from-amber-400/25 via-amber-400/5 to-transparent",
      accent: "text-amber-100 border-amber-300/30",
    },
    {
      id: "systems-tooling",
      title: "Systems & Tooling",
      description:
        "Arquitetura AWS, alarmes críticos, runbooks e padrões de integração para Payment Ops LATAM.",
      icon: Cpu,
      topics: 4,
      status: "Live",
      href: "/amazon-prep/technical-deep-dive",
      focus: "AWS · Resiliência",
      gradient: "from-sky-500/20 via-sky-500/5 to-transparent",
      accent: "text-sky-200 border-sky-400/30",
    },
    {
      id: "market-intelligence",
      title: "Market Intelligence",
      description:
        "Radar contínuo de PIX, cartões, fintechs e regulação para guiar roadmaps e narrativas de expansão.",
      icon: Globe2,
      topics: 4,
      status: "Atual",
      href: "/amazon-prep/market-knowledge",
      focus: "PIX · Open Finance",
      gradient: "from-emerald-400/20 via-emerald-500/5 to-transparent",
      accent: "text-emerald-200 border-emerald-400/30",
    },
    {
      id: "program-office",
      title: "Program Office",
      description:
        "Documentos, KPIs e governança: PR/FAQ, 6-pagers, scorecards e ciclos de decisão regionais.",
      icon: ClipboardList,
      topics: 4,
      status: "Em escrita",
      href: "/amazon-prep/program-management",
      focus: "Docs · KPIs",
      gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
      accent: "text-purple-200 border-purple-400/30",
    },
    {
      id: "leadership-playbook",
      title: "Leadership Playbook",
      description:
        "Como ativar cada Leadership Principle nos primeiros 90 dias, com sinais, riscos e métricas.",
      icon: Star,
      topics: 16,
      status: "Live",
      href: "/amazon-prep/leadership-principles",
      focus: "LPs · operações",
      gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
      accent: "text-rose-200 border-rose-400/30",
    },
  ] satisfies ModuleTile[],
  progressTracks: [
    {
      label: "Contexto & Pessoas",
      detail: "Stakeholders, narrativas e mapa de decisão",
      value: 65,
      tone: "from-emerald-400/30 via-transparent to-transparent",
    },
    {
      label: "Sistemas & Runbooks",
      detail: "Alarmes, integrações e playbooks",
      value: 40,
      tone: "from-sky-400/30 via-transparent to-transparent",
    },
    {
      label: "Resultados & Aprendizado",
      detail: "KPIs, cadência de review e PR/FAQ",
      value: 35,
      tone: "from-purple-500/30 via-transparent to-transparent",
    },
  ],
  runwayActions: [
    {
      title: "Planejar reviews com Andreia",
      description: "Fechar pauta dos rituais semanais e definir SLAs de resposta.",
      href: "/amazon-prep/stakeholders",
      tag: "People",
    },
    {
      title: "Publicar scorecard LATAM",
      description: "Conectar dashboards de approval rate e custo por transação.",
      href: "/amazon-prep/program-management",
      tag: "KPI",
    },
    {
      title: "Atualizar playbook PIX",
      description: "Adicionar PIX Automático, NFC e impactos de Open Finance.",
      href: "/amazon-prep/market-knowledge",
      tag: "Radar",
    },
    {
      title: "Testar alarmes críticos",
      description: "Rodar game day com runbooks de incidentes e failovers.",
      href: "/amazon-prep/technical-deep-dive",
      tag: "Ops",
    },
  ],
  timeline: [
    {
      label: "Semana 01-02",
      focus: "Imersão & relacionamentos",
      deliverable: "1:1s com Andreia, Sujash e parceiros Oakberry",
      status: "done",
    },
    {
      label: "Semana 03-06",
      focus: "Sistemas e KPIs",
      deliverable: "Auditar alarmes críticos + consolidar scorecard",
      status: "in-progress",
    },
    {
      label: "Semana 07-12",
      focus: "Roadmap & PR/FAQ",
      deliverable: "Publicar plano trimestral com narrativas aprovadas",
      status: "up-next",
    },
  ],
  statusTone: {
    done: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
    "in-progress": "text-sky-300 border-sky-400/30 bg-sky-400/10",
    "up-next": "text-zinc-300 border-white/20 bg-white/5",
  } as const,
  statusLabel: {
    done: "entregue",
    "in-progress": "em curso",
    "up-next": "próximo",
  } as const,
  stakeholders: [
    {
      name: "Andreia Guarino",
      title: "Sr. Manager · LATAM Payment Ops",
      signal: "Prioriza eficiência operacional, Six Sigma e ciclos semanais de decisão com dados.",
      anchor: "Andreia",
    },
    {
      name: "Sujash Biswas",
      title: "Head LATAM Payments",
      signal: "Olha para escala regional, replicabilidade e como LATAM influencia roadmaps globais.",
      anchor: "Sujash",
    },
    {
      name: "Equipe Oakberry",
      title: "Parceiro estratégico",
      signal: "Precisa de visibilidade sobre rollouts, SLAs e integrações conjuntas com Amazon Pay.",
      anchor: "Oak",
    },
  ],
  docsInFlight: [
    { name: "6-Pager Payment Ops", status: "Draft" },
    { name: "Plano 30·60·90", status: "Draft" },
    { name: "Mapa de riscos PCI", status: "Draft" },
  ],
  metaCards: [
    {
      label: "Ramp Plan",
      value: "30 · 60 · 90",
      icon: CalendarDays,
      footnote: "Semana 05 review com Andreia",
    },
    {
      label: "Stakeholders",
      value: "Andreia · Sujash · Oak",
      icon: Users2,
      footnote: "OKRs compartilhados por sprint",
    },
    {
      label: "Parceria",
      value: "Oakberry Strategic Partnership",
      icon: ShieldCheck,
      footnote: "Modelo Oakberry + Payment Ops",
    },
  ] satisfies Array<{ label: string; value: string; icon: LucideIcon; footnote?: string }>,
};

export const operatingRhythmData = {
  cadenceRows: [
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
  ],
  rampPlan: [
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
  ],
  reviewKits: [
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
  ],
  readinessList: [
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
  ],
  commitments: [
    {
      label: "Revisar incidentes pós-Black Friday",
      detail:
        "Conectar métricas de latência com alarmes de adquirentes e validar RCA com Andreia.",
    },
    {
      label: "Atualizar plano 30·60·90",
      detail: "Adicionar entregáveis confirmados e riscos novos para checkpoint da semana 6.",
    },
    {
      label: "Submeter PR/FAQ Oakberry",
      detail: "Revisar perguntas frequentes com Sujash e anexar estimativa de investimento.",
    },
  ],
  reviewChecklist: [
    "Validar métricas no Looker e anexar screenshots no doc de suporte.",
    "Atualizar riscos/decisões do log compartilhado com Andreia.",
    "Enviar agenda e materiais com antecedência mínima de 12h.",
    "Registrar decisões tomadas em até 2h pós-meeting.",
  ],
  readinessStatusTone: {
    done: "amazon-portal-status-done",
    "in-progress": "text-sky-300",
    risk: "amazon-portal-status-risk",
  } as Record<string, string>,
};

export const marketKnowledgeData = {
  marketSignals: [
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
  ],
  regulatoryWatch: [
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
  ],
  competitorMoves: [
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
  ],
  focusQuestions: [
    "Como cada movimento regulatório impacta o custo por transação em 2025?",
    "Qual parcela do GMV LATAM virá de PIX Automático e quando devemos ativar incentivos?",
    "Quais aprendizados do UPI (Índia) aplicaremos para aprovação de pagamentos instantâneos?",
    "Como Oakberry e demais parceiros enxergam o roadmap e quais métricas valorizam?",
  ],
};

export const programOfficeData = {
  docPipelines: [
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
  ],
  governance: [
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
  ],
  kpiStacks: [
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
  ],
  reportingCadence: [
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
  ],
  writingChecklist: [
    "Começar com o cliente (qual dor resolvemos?).",
    "Listar métricas e fontes que comprovam o problema.",
    "Descrever solução simples + trade-offs.",
    "Incluir riscos, investimentos e plano de rollout.",
    "Validar com Andreia antes de enviar para Sujash.",
  ],
  quickLinks: [
    { label: "Plano 30·60·90", href: "/amazon-prep/operating-rhythm" },
    { label: "Runbooks técnicos", href: "/amazon-prep/technical-deep-dive" },
    { label: "Radar de mercado", href: "/amazon-prep/market-knowledge" },
  ],
};

export const stakeholdersData = {
  stakeholderProfiles: [
    {
      id: "andreia",
      name: "Andreia Guarino",
      title: "Sr. Manager · LATAM Payment Ops",
      style: "Data-driven, Lean/Six Sigma e foco em execução semanal.",
      expectations: [
        "Atualizações objetivas com métricas antes das reuniões.",
        "Planos de mitigação claros e owners designados.",
        "Transparência sobre riscos de compliance e custo.",
      ],
      cadence: [
        { label: "Weekly Sync", detail: "Seg · 09h (45min)" },
        { label: "Slack", detail: "Respostas em até 2h para incidentes" },
        { label: "Docs", detail: "2 páginas para decisões >R$250k" },
      ],
      focusAreas: [
        "Automação e redução de custo por transação.",
        "Runbooks auditáveis para PCI/SOX.",
        "Desempenho das integrações PIX e cartões.",
      ],
      watchouts: [
        "Chegar sem dados ou hipóteses validadas.",
        "Escalonar problemas sem plano de contenção.",
      ],
    },
    {
      id: "sujash",
      name: "Sujash Biswas",
      title: "Head LATAM Payments",
      style: "Visão regional, replicabilidade e Think Big.",
      expectations: [
        "Narrativas conectando Brasil com LATAM e UPI (Índia).",
        "Roadmaps escaláveis com premissas financeiras claras.",
        "Insights sobre parcerias estratégicas (Oakberry, adquirentes).",
      ],
      cadence: [
        { label: "WBR LATAM", detail: "Ter · 11h (60min)" },
        { label: "Mensal", detail: "Readout escrito + deep dive" },
        { label: "Ad-hoc", detail: "Pings curtos no Chime com dados" },
      ],
      focusAreas: [
        "Escalar práticas do Brasil para Argentina/México.",
        "Roadmap de AI/ML aplicado a Payments.",
        "Integração com programas globais (Prime, Retail, Ads).",
      ],
      watchouts: [
        "Apresentar iniciativas muito locais sem plano de réplica.",
        "Discussões longas sem ligação com métricas regionais.",
      ],
    },
    {
      id: "oakberry",
      name: "Equipe Oakberry",
      title: "Parceiro estratégico",
      style: "Operating partner exigindo visibilidade total do roadmap.",
      expectations: [
        "Transparência sobre SLAs e status de integrações.",
        "Acesso rápido a owners e timelines.",
        "Modelos de co-inovação com métricas de sucesso compartilhadas.",
      ],
      cadence: [
        { label: "Ops Review", detail: "Qui · 15h" },
        { label: "Canal compartilhado", detail: "Atualizações diárias no Chime" },
        { label: "QBR", detail: "Narrativa + demonstração" },
      ],
      focusAreas: [
        "Integração PIX + wallet proprietária.",
        "Planos de expansão para novos países.",
        "Planos de contingência e auditoria.",
      ],
      watchouts: [
        "Alterar prioridades sem comunicar contrapartidas.",
        "Falta de visibilidade sobre bugs/erros.",
      ],
    },
  ],
  alignmentChecklist: [
    {
      title: "Antes de reuniões com Andreia",
      items: [
        "Enviar métricas + narrativa 12h antes.",
        "Destacar top 3 riscos e mitigação.",
        "Trazer próximos passos com donos e datas.",
      ],
    },
    {
      title: "Antes de reuniões com Sujash",
      items: [
        "Conectar impacto LATAM e oportunidades de replicação.",
        "Mapear dependências cross-região (Data, Finance, Legal).",
        "Preparar perguntas abertas para feedback estratégico.",
      ],
    },
    {
      title: "Antes de reuniões com Oakberry",
      items: [
        "Atualizar tracker de integrações e SLAs.",
        "Confirmar status das ações conjuntas (marketing, tech).",
        "Registrar compromissos e enviar follow-up em 24h.",
      ],
    },
  ],
  escalationMatrix: [
    { signal: "Risco de SLA ou incidente crítico", path: "Andreia imediatamente + PagerDuty + nota pós incidente." },
    { signal: "Mudança estratégica ou investimento", path: "Draft 6-pager → revisão com Sujash → fórum executivo." },
    { signal: "Dependência Oakberry", path: "Canal compartilhado + resumo diário até resolução." },
  ],
  relationshipSignals: [
    "Andreia pergunta pelo próximo passo antes mesmo de você apresentar → confiança alta.",
    "Sujash faz paralelos com outros países e pede replicação → mensagem escalável.",
    "Oakberry compartilha dados de maneira proativa → parceria equilibrada.",
  ],
};

export const systemsToolingData = {
  architectureLayers: [
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
  ],
  awsServices: [
    { name: "Lambda", use: "Orquestra validações, cálculo de taxas e enrichment de eventos." },
    { name: "EventBridge", use: "Barramento para PaymentInitiated, PaymentAuthorized, Settlement." },
    { name: "DynamoDB", use: "Estados de transação e locks de idempotência." },
    { name: "Step Functions", use: "Refunds, chargebacks e fluxos com rollback controlado." },
    { name: "KMS / Payment Cryptography", use: "Gestão de chaves e HSM compliant com PCI." },
    { name: "CloudWatch & X-Ray", use: "Observabilidade, dashboards e tracing de chamadas." },
  ],
  resiliencePlaybooks: [
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
  ],
  observability: [
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
  ],
  integrationChecklist: [
    "Confirmar contratos e chaves no AWS Secrets Manager.",
    "Configurar alarmes de SLA específicos por parceiro.",
    "Adicionar fluxos ao runbook compartilhado.",
    "Realizar sandbox test + game day antes do rollout.",
  ],
};

export const leadershipPrinciples: LeadershipPrinciple[] = [
  {
    id: 1,
    title: "Customer Obsession",
    description:
      "Comece por Andreia, Sujash e merchants: métricas de aprovação, NPS e segurança ancoram cada priorização.",
    color: "bg-amber-500",
    relevance: "North Star do Payment Ops",
    keyPoints: [
      "Transformar feedback do cliente em backlog acionável",
      "Observar sinais de Oakberry e sellers antes de indicadores internos",
      "Documentar aprendizados em WBR/PRFAQ",
    ],
    starExample: {
      situation: "Oakberry reportou queda de 6pp em aprovação PIX durante almoço.",
      task: "Isolar impacto real para evitar perda de receita.",
      action:
        "Escutei o merchant ao vivo, coletei logs, montei task-force com Eng + Science e criei workaround temporário.",
      result:
        "Recuperamos aprovação em 8h, reduzimos churn potencial de R$ 1.4M e adicionamos métricas de cliente no scorecard.",
    },
  },
  {
    id: 2,
    title: "Ownership",
    description:
      "Assuma scorecard LATAM end-to-end, mesmo quando depende de Engenharia, Finance ou parceiros externos.",
    color: "bg-slate-600",
    relevance: "Responsabilidade total",
    keyPoints: [
      "Resolver gaps sem esperar direcionamento",
      "Conectar decisões locais a impactos globais",
      "Registrar compromissos e follow-ups no log",
    ],
    starExample: {
      situation: "Monitoramento de reconciliação estava com alertas falsos e ninguém era owner claro.",
      task: "Tomar posse do processo e estabilizar em 2 semanas.",
      action:
        "Mapeei fluxo ponta a ponta, reescrevi playbook, alinhei SLO com Finance e institui on-call compartilhado.",
      result:
        "Alertas falsos caíram 78%, reconciliação diária passou de 86% para 99% e Andreia delegou o domínio oficialmente.",
    },
  },
  {
    id: 3,
    title: "Invent and Simplify",
    description: "Automatize rotinas (approval review, alarmes, status Oakberry) para liberar tempo estratégico.",
    color: "bg-purple-500",
    relevance: "Escala com menos atrito",
    keyPoints: [
      "Eliminar passos manuais no runbook",
      "Usar IA/LLMs apenas onde há dados confiáveis",
      "Compartilhar templates com outras regiões",
    ],
    starExample: {
      situation: "Processo de RCA levava 5 dias e 12 stakeholders.",
      task: "Criar mecanismo simples que coubesse no Friday Reset.",
      action: "Desenhei formulário único com automação no Quip + webhook para Jira e dashboards no Looker.",
      result: "Tempo médio caiu para 36h, Andreia usa o template em toda LATAM e India adotou igual.",
    },
  },
  {
    id: 4,
    title: "Are Right, A Lot",
    description: "Decisões sobre rollouts, mitigação e investimentos precisam equilibrar dados, faro e intuição técnica.",
    color: "bg-blue-500",
    relevance: "Credibilidade com VP",
    keyPoints: [
      "Testar hipóteses antes do WBR",
      "Buscar disconfirming evidence",
      "Atualizar narrativa quando fatos mudam",
    ],
    starExample: {
      situation: "Discussão sobre investir em antifraude third-party vs. solução interna.",
      task: "Emitir recomendação em 48h.",
      action: "Rodamos análise de custo total, simulamos impacto no approval e entrevistei 3 parceiros.",
      result: "Escolhemos modelo híbrido que economizou US$ 2.2M/ano e ganhou elogio do diretor financeiro.",
    },
  },
  {
    id: 5,
    title: "Learn and Be Curious",
    description: "Dedique horas semanais a AI/ML, Open Finance e regulações brasileiras para antecipar riscos.",
    color: "bg-emerald-500",
    relevance: "Atualização constante",
    keyPoints: [
      "Rodar deep dives mensais com Tech/Legal",
      "Documentar aprendizados no Confluence",
      "Trazer referências de Índia/EUA para LATAM",
    ],
    starExample: {
      situation: "Time precisava de visão sobre algoritmos anti-fricção em PIX.",
      task: "Aprender rápido e orientar Engenharia.",
      action: "Estudei papers do BCB, conversei com India Payments e criei doc com 3 padrões arquiteturais.",
      result: "Time implementou solução baseada em fecho criptográfico, reduzindo latência média em 14%.",
    },
  },
  {
    id: 6,
    title: "Hire and Develop the Best",
    description: "Elevar a barra em contratações e formalizar planos de desenvolvimento desde o onboarding.",
    color: "bg-pink-500",
    relevance: "Escala sustentável",
    keyPoints: [
      "Definir rubrica específica para Payment Ops",
      "Promover mentoring cruzado com Andreia e Science",
      "Criar pipeline para contractors críticos",
    ],
    starExample: {
      situation: "Precisávamos dobrar headcount em 6 meses sem perder qualidade.",
      task: "Conduzir hiring bar-raiser e plano de crescimento.",
      action: "Atualizei rubrica, treinei entrevistadores e criei onboarding de 60 dias com buddy técnico.",
      result: "Contratamos 5 PMs, retention 100% em 12 meses, dois promovidos a Senior.",
    },
  },
  {
    id: 7,
    title: "Insist on the Highest Standards",
    description: "Runbooks, PR/FAQ e alarmes precisam estar auditáveis e prontos para OP1 a qualquer momento.",
    color: "bg-indigo-500",
    relevance: "Qualidade operacional",
    keyPoints: [
      "Auditar documentação a cada sprint",
      "Medir SLAs e corrigir desvios imediatamente",
      "Evitar atalhos que criem dívida",
    ],
    starExample: {
      situation: "SLA de disponibilidade era 99.5% e atendia contrato, mas caía em picos.",
      task: "Elevar padrão para 99.95% antes da Black Friday.",
      action: "Liderei revisão arquitetural, ativei multi-região e institui chaos game mensal.",
      result: "BF passou com 0 incidentes críticos e uptime 99.97%.",
    },
  },
  {
    id: 8,
    title: "Think Big",
    description: "Desenhe visão LATAM para PIX automático, Oakberry e futura carteira Amazon",
    color: "bg-cyan-500",
    relevance: "Direção de 3 anos",
    keyPoints: [
      "Traduzir ambição em roadmap trimestral",
      "Criar mecanismos replicáveis para outros países",
      "Narrar a visão em docs curtos",
    ],
    starExample: {
      situation: "Operação era reativa a incidentes.",
      task: "Criar plataforma preditiva em 18 meses.",
      action: "Desenhei roadmap trienal, garanti budget com Sujash e formei squad dedicado.",
      result: "82% das rotinas automatizadas e 91% dos incidentes previstos antes de impactar clientes.",
    },
  },
  {
    id: 9,
    title: "Bias for Action",
    description: "Decisões reversíveis (roteamento, incentivos, limites) devem sair em <24h com telemetria.",
    color: "bg-orange-500",
    relevance: "Velocidade controlada",
    keyPoints: [
      "Definir guardrails de risco",
      "Executar pilotos limitados",
      "Medir impacto e reverter rápido",
    ],
    starExample: {
      situation: "Nova regra do BCB precisava ser implementada em 45 dias.",
      task: "Adequar stack sem parar o checkout.",
      action: "Modelei MVP compliant, criei war room diário e lancei rollout progressivo (1→10→50→100%).",
      result: "Regra ativa 7 dias antes do deadline, zero downtime e evitamos multa potencial.",
    },
  },
  {
    id: 10,
    title: "Frugality",
    description: "Cada melhoria precisa reduzir COGS ou liberar capacidade sem inflar headcount.",
    color: "bg-lime-500",
    relevance: "Custo por transação",
    keyPoints: [
      "Comparar build vs. buy continuamente",
      "Reaproveitar assets da Índia/EUA",
      "Criar métricas de payback",
    ],
    starExample: {
      situation: "Ferramenta de analytics custaria R$ 450K/ano.",
      task: "Criar alternativa 70% mais barata.",
      action: "Combinei stack open-source + AWS gerenciado, com squad part-time.",
      result: "Economia de 85% e dashboards customizados para Andreia.",
    },
  },
  {
    id: 11,
    title: "Earn Trust",
    description: "Transparência radical em riscos, erros e decisões fortalece relação com Andreia/Sujash.",
    color: "bg-teal-500",
    relevance: "Relacionamentos sólidos",
    keyPoints: [
      "Compartilhar planos de mitigação junto com problemas",
      "Pedir feedback mensalmente",
      "Fechar loops em até 24h",
    ],
    starExample: {
      situation: "Migração de gateway atrasou 3 semanas e extrapolou budget.",
      task: "Comunicar e recuperar confiança.",
      action: "Montei doc franco com root causes, plano revisado e cadência semanal aberta.",
      result: "Projeto recuperado, excesso de custo caiu para 8% e recebi elogio público do VP.",
    },
  },
  {
    id: 12,
    title: "Dive Deep",
    description: "Operar em múltiplos níveis — do PR/FAQ ao log de transação — para destravar investigações.",
    color: "bg-rose-500",
    relevance: "Diagnóstico rápido",
    keyPoints: [
      "Auditar métricas vs. anedotas",
      "Ler dashboards e logs pessoalmente",
      "Questionar suposições do time",
    ],
    starExample: {
      situation: "Approval rate global parecia saudável, mas sellers reclamavam.",
      task: "Encontrar discrepância real.",
      action: "Analisei dados brutos, incluí timeouts e identifiquei bandeira específica às sextas.",
      result: "Fix elevou aprovação real de 78% para 94% e evitou perda de R$ 2.8M/mês.",
    },
  },
  {
    id: 13,
    title: "Have Backbone; Disagree and Commit",
    description: "Desafie decisões com dados, documente trade-offs e comprometa-se totalmente pós-alinhamento.",
    color: "bg-violet-500",
    relevance: "Coragem + execução",
    keyPoints: [
      "Registrar discordâncias no decision log",
      "Trazer alternativas concretas",
      "Executar com excelência mesmo quando não era sua opção preferida",
    ],
    starExample: {
      situation: "Marketing queria lançar parcelado em 4 semanas com alto risco.",
      task: "Defender soft launch sem atrasar meta.",
      action:
        "Escrevi doc com riscos quantificados e proposta híbrida; fui overruled e liderei o launch mesmo assim.",
      result:
        "Feature saiu no prazo e riscos previstos foram mitigados em 72h graças aos planos preparados.",
    },
  },
  {
    id: 14,
    title: "Deliver Results",
    description: "Conectar inputs críticos (approval, custo, SLA) a entregas trimestrais mesmo com ruído de mercado.",
    color: "bg-emerald-500",
    relevance: "Expectativa básica",
    keyPoints: [
      "Desdobrar metas em iniciativas",
      "Monitorar progresso semanalmente",
      "Remover bloqueios rápido",
    ],
    starExample: {
      situation: "Meta Q4 exigia -15% custo/txn e +3pp approval em meio à recessão.",
      task: "Entregar ambos resultados.",
      action: "Renegociei MDR, implementei roteamento inteligente e reduzi falsos positivos.",
      result: "Custo caiu 17.3%, approval +3.3pp e evitamos R$ 4.2M em despesas.",
    },
  },
  {
    id: 15,
    title: "Strive to be Earth's Best Employer",
    description: "Manter o squad saudável, com rituais de energia e plano de crescimento claro.",
    color: "bg-sky-500",
    relevance: "Time sustentável",
    keyPoints: [
      "Monitorar carga e eNPS",
      "Criar mecanismos de reconhecimento",
      "Garantir espaço para aprendizado",
    ],
    starExample: {
      situation: "Burnout elevado após ciclo de incidentes.",
      task: "Recuperar moral sem perder entrega.",
      action:
        "Implementei no-meeting Friday, rotação de guardas e programa de reconhecimento trimestral.",
      result: "eNPS subiu de 3.2 para 8.4 e produtividade +35%.",
    },
  },
  {
    id: 16,
    title: "Success and Scale Bring Broad Responsibility",
    description:
      "Considerar impactos secundários (inclusão financeira, compliance, dados) antes de automatizar.",
    color: "bg-yellow-600",
    relevance: "Responsabilidade regional",
    keyPoints: [
      "Medir fairness e impacto social",
      "Criar salvaguardas de IA",
      "Compartilhar aprendizados com o ecossistema",
    ],
    starExample: {
      situation: "Modelo antifraude reduziu perdas mas penalizou clientes de baixa renda.",
      task: "Corrigir viés sem abrir brechas.",
      action: "Adicionei features alternativas, human-in-loop e métricas de fairness por região.",
      result: "Falsos positivos -67% e aprovação de novos clientes +28% mantendo segurança.",
    },
  },
];

export const firstQuarterFocus: Record<number, string> = {
  1: "Mapear três jornadas prioritárias (Prime, Oakberry, Marketplace) e converter feedback em melhorias mensuráveis.",
  2: "Assumir ownership do scorecard LATAM e liderar comunicações mesmo quando o tema cruza outras áreas.",
  3: "Entregar pelo menos uma automação que reduza esforço operacional com métricas claras de impacto.",
  4: "Criar doc semanal com hipóteses e dados para decisões rápidas sobre incidentes ou investimentos.",
  5: "Reservar horas recorrentes para estudos de AI/ML e compartilhar aprendizados com o time.",
  6: "Montar plano de desenvolvimento para cada membro do squad e preparar pipeline de talentos.",
  7: "Atualizar runbooks e SLAs garantindo auditoria impecável e zero dívida operacional escondida.",
  8: "Desenhar visão LATAM para pagamentos instantâneos e conectar com OKRs regionais.",
  9: "Estabelecer mecanismo de decisão rápida (<24h) para incidentes reversíveis, com métricas pós-ação.",
  10: "Revisar contratos/processos e propor pelo menos um ajuste que reduza custo por transação.",
  11: "Implementar rituais de transparência (logs de decisões, follow-ups rápidos) e pedir feedback ativo.",
  12: "Rodar auditorias surpresa em métricas críticas (approval, reconciliação) para evitar gaps.",
  13: "Documentar desacordos relevantes, alinhar trade-offs e registrar compromissos após decisão.",
  14: "Vincular cada iniciativa a inputs-chave e reportar progresso semanalmente com métricas.",
  15: "Configurar rituais de energia do time (retros, office hours) e monitorar carga de trabalho.",
  16: "Mapear impactos secundários de automações/AI e criar métricas de fairness e compliance.",
};
