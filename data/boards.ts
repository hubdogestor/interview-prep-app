import type { BoardColumn, BoardCard } from "@/types/boards"

export const okr2026Columns: BoardColumn[] = [
  {
    id: "okr-q1",
    title: "Q1 · Fundamentos",
    subtitle: "JAN — MAR",
    highlight: "Kickoff",
    accentColor: "from-emerald-400/60 via-lime-400/40 to-transparent",
    cards: [
      {
        id: "okr-q1-evangelizar",
        title: "Lançar plataforma LEOMDS para comunidades em SP",
        description: "Reforçar presença na cena de produto e entrevistas brasileiras.",
        owner: "Leonardo",
        ownerLabel: "Responsável",
        dueDate: "Mar/26",
        metric: "Meta: +3 hubs",
        progress: 45,
        chips: [
          { label: "GO-TO-MARKET", colorClass: "bg-emerald-500/10 text-emerald-200 border-transparent" },
          { label: "COMUNIDADE", colorClass: "bg-sky-500/10 text-sky-200 border-transparent" },
        ],
        items: [
          "KR1: ativar 3 hubs presenciais em coworkings de São Paulo",
          "KR2: consolidar 500 usuários ativos na ferramenta",
          "KR3: publicar kit de entrevista traduzido para pt-BR",
        ],
        highlight: "Depende da curadoria de conteúdos em português",
      },
      {
        id: "okr-q1-ai",
        title: "Provar valor dos copilotos de prep. em português",
        description: "Aprimorar roteiros e bibliotecas com sotaque e recortes locais.",
        owner: "Time IA",
        metric: "CSAT ≥ 4.6",
        progress: 32,
        chips: [{ label: "AI", colorClass: "bg-fuchsia-500/15 text-fuchsia-100 border-transparent" }],
        items: [
          "KR1: treinar 50 casos reais com feedback humano",
          "KR2: liberar voz neural pt-BR no desktop",
          "KR3: medir NPS específico do copiloto",
        ],
      },
    ],
  },
  {
    id: "okr-q2",
    title: "Q2 · Escala Regional",
    subtitle: "ABR — JUN",
    highlight: "Expansão",
    accentColor: "from-cyan-400/60 via-blue-400/30 to-transparent",
    cards: [
      {
        id: "okr-q2-enterprise",
        title: "Fechar 2 programas enterprise (AMZ + health)",
        description: "Customizar jornadas para squads internos com plano trimestral.",
        owner: "Leonardo",
        ownerLabel: "Sponsor",
        metric: "MRR 80k",
        progress: 55,
        chips: [
          { label: "ENTERPRISE", colorClass: "bg-cyan-500/10 text-cyan-100 border-transparent" },
          { label: "B2B", colorClass: "bg-white/5 text-white border-white/10" },
        ],
        items: [
          "KR1: AMZ com turmas quinzenais",
          "KR2: Health mega clinic com coaches residentes",
          "KR3: 90% dos alunos entregando portfólio até a semana 5",
        ],
      },
      {
        id: "okr-q2-experiencia",
        title: "Reduzir tempo para montar dossiês de entrevistas",
        description: "Automatizar coleta de métricas e STAR cases.",
        owner: "Ops",
        metric: "-40% tempo",
        progress: 20,
        chips: [{ label: "EXPERIÊNCIA", colorClass: "bg-indigo-500/10 text-indigo-100 border-transparent" }],
        items: [
          "KR1: agregar dados do LinkedIn automaticamente",
          "KR2: liberar builder de portfólio com exportação",
        ],
      },
    ],
  },
  {
    id: "okr-q3",
    title: "Q3 · Produtos Digitais",
    subtitle: "JUL — SET",
    highlight: "OPERAÇÃO",
    accentColor: "from-amber-400/60 via-orange-400/30 to-transparent",
    cards: [
      {
        id: "okr-q3-ops",
        title: "Escalar programa de mentores residentes",
        description: "Transformar parceiros em squad de conteúdo distribuído.",
        owner: "People",
        metric: "40 mentores",
        progress: 64,
        chips: [
          { label: "PEOPLE", colorClass: "bg-amber-500/15 text-amber-100 border-transparent" },
          { label: "OPS", colorClass: "bg-rose-500/10 text-rose-100 border-transparent" },
        ],
        items: [
          "KR1: formar 12 mentores certificados em SP",
          "KR2: programa de revenue share com contratos trimestrais",
          "KR3: disponibilizar agenda integrada ao app",
        ],
      },
      {
        id: "okr-q3-content",
        title: "Lançar biblioteca viva de cases brasileiros",
        description: "Conteúdo audiovisual e roteiros editáveis.",
        owner: "Conteúdo",
        metric: "60 cases",
        progress: 48,
        chips: [{ label: "CONTEÚDO", colorClass: "bg-purple-500/10 text-purple-100 border-transparent" }],
        items: [
          "KR1: sessões filmadas com legendas automáticas",
          "KR2: indexação por setor/região",
          "KR3: 1 hub aberto para a comunidade",
        ],
      },
    ],
  },
  {
    id: "okr-q4",
    title: "Q4 · Consolidação",
    subtitle: "OUT — DEZ",
    highlight: "Impacto",
    accentColor: "from-pink-400/60 via-red-400/30 to-transparent",
    cards: [
      {
        id: "okr-q4-revenue",
        title: "Fechar o ano com 95% dos OKRs entregues",
        description: "Garantir previsibilidade e storytelling de impacto.",
        owner: "Leonardo",
        ownerLabel: "Chief Builder",
        metric: "95% entrega",
        progress: 15,
        chips: [
          { label: "FINANCEIRO", colorClass: "bg-rose-500/15 text-rose-50 border-transparent" },
          { label: "SUSTENTABILIDADE", colorClass: "bg-lime-500/10 text-lime-100 border-transparent" },
        ],
        items: [
          "KR1: reservar runway para 2027",
          "KR2: publicar relatório anual com cases SP",
        ],
      },
      {
        id: "okr-q4-research",
        title: "Pesquisa 2026 jobs-to-be-done",
        description: "Mapear necessidades reais de entrevistas latino-americanas.",
        owner: "Research",
        metric: "150 entrevistas",
        progress: 5,
        chips: [{ label: "RESEARCH", colorClass: "bg-slate-500/10 text-slate-100 border-transparent" }],
        items: [
          "KR1: 50 empresas enterprise",
          "KR2: 100 talentos independentes",
          "KR3: relatório em multilínguas",
        ],
        highlight: "Ativar rede de parceiros locais",
      },
    ],
  },
]

const baseKanbanColumns: Omit<BoardColumn, "cards">[] = [
  {
    id: "backlog",
    title: "Backlog",
    subtitle: "Ideias & Insights",
    highlight: "Explorar",
    accentColor: "from-slate-500/40 via-slate-400/20 to-transparent",
  },
  {
    id: "todo",
    title: "To-Do",
    subtitle: "Prioridade ativa",
    highlight: "Focar",
    accentColor: "from-sky-500/40 via-blue-400/20 to-transparent",
  },
  {
    id: "doing",
    title: "Doing",
    subtitle: "Execução",
    highlight: "Em andamento",
    accentColor: "from-amber-500/40 via-orange-400/20 to-transparent",
  },
  {
    id: "done",
    title: "Done",
    subtitle: "Impactos reais",
    highlight: "Entregue",
    accentColor: "from-emerald-500/40 via-lime-400/20 to-transparent",
  },
]

const buildKanbanColumns = (cardsByColumn: Record<string, BoardCard[]>): BoardColumn[] =>
  baseKanbanColumns.map((column) => ({
    ...column,
    cards: cardsByColumn[column.id] ?? [],
  }))

export const kanbanBoards: Record<string, BoardColumn[]> = {
  leo: buildKanbanColumns({
    backlog: [
      {
        id: "leo-backlog-1",
        title: "Toolkit de entrevistas mobile",
        description: "Versão offline para workshops em coworkings.",
        chips: [{ label: "Produto", colorClass: "bg-sky-500/10 text-sky-100 border-transparent" }],
        meta: "Ideia validada com 12 usuários",
      },
      {
        id: "leo-backlog-2",
        title: "Pacote de templates para squads SP",
        description: "Quadros prontos para guildas com foco em discovery.",
        chips: [{ label: "Conteúdo", colorClass: "bg-purple-500/10 text-purple-100 border-transparent" }],
      },
    ],
    todo: [
      {
        id: "leo-todo-1",
        title: "Landing page LEOMDS 2.0",
        description: "Storytelling com cases e demo interativa.",
        owner: "Leonardo",
        dueDate: "15/Jan",
        chips: [{ label: "Web", colorClass: "bg-emerald-500/10 text-emerald-100 border-transparent" }],
      },
    ],
    doing: [
      {
        id: "leo-doing-1",
        title: "Guia avançado de perguntas difíceis",
        description: "Conteúdo baseado em entrevistas AMZ/Meta.",
        owner: "Leonardo",
        metric: "60% pronto",
        progress: 60,
        chips: [{ label: "Conteúdo", colorClass: "bg-amber-500/10 text-amber-100 border-transparent" }],
      },
    ],
    done: [
      {
        id: "leo-done-1",
        title: "Rebranding LEOMDS",
        description: "Sidebar, widgets e identidade alinhada.",
        meta: "Publicado Nov/25",
        chips: [{ label: "Branding", colorClass: "bg-pink-500/10 text-pink-100 border-transparent" }],
      },
    ],
  }),
  amz: buildKanbanColumns({
    backlog: [
      {
        id: "amz-backlog-1",
        title: "Discovery com líderes LATAM",
        description: "Mapear requisitos específicos para entrevistas bar raiser.",
        chips: [{ label: "Pesquisa", colorClass: "bg-indigo-500/10 text-indigo-100 border-transparent" }],
      },
    ],
    todo: [
      {
        id: "amz-todo-1",
        title: "Pacote AMZ | storytelling",
        description: "Scripts alinhados com princípios de liderança.",
        owner: "Squad AMZ",
        dueDate: "30/Jan",
        chips: [{ label: "Programa", colorClass: "bg-orange-500/10 text-orange-100 border-transparent" }],
      },
    ],
    doing: [
      {
        id: "amz-doing-1",
        title: "Módulo intensivo STAR Cases",
        description: "Templates traduzidos + rubricas de avaliação.",
        progress: 35,
        metric: "Release beta",
        chips: [{ label: "Conteúdo", colorClass: "bg-green-500/10 text-green-100 border-transparent" }],
      },
      {
        id: "amz-doing-2",
        title: "Portal com reports automatizados",
        description: "Entrega de progresso semanal para managers.",
        chips: [{ label: "Produto", colorClass: "bg-slate-500/10 text-slate-100 border-transparent" }],
        owner: "Time Produtos",
      },
    ],
    done: [
      {
        id: "amz-done-1",
        title: "Treinamento sobre bar raisers",
        description: "Sessão piloto com 20 participantes no Brasil.",
        meta: "NPS 82",
      },
    ],
  }),
  olb: buildKanbanColumns({
    backlog: [
      {
        id: "olb-backlog-1",
        title: "Integração com calendários corporativos",
        description: "Sincronizar ensaios com agendas Outlook.",
        chips: [{ label: "Integração", colorClass: "bg-cyan-500/10 text-cyan-100 border-transparent" }],
      },
    ],
    todo: [
      {
        id: "olb-todo-1",
        title: "Conteúdo focado em logística/OLB",
        description: "Casos reais de operações e supply chain.",
        owner: "Leonardo",
        chips: [{ label: "Conteúdo", colorClass: "bg-yellow-500/10 text-yellow-100 border-transparent" }],
      },
    ],
    doing: [
      {
        id: "olb-doing-1",
        title: "Painel de métricas de prática",
        description: "Comparar desempenho por capítulo (OLB).",
        progress: 70,
        metric: "Beta interno",
        chips: [{ label: "Analytics", colorClass: "bg-blue-500/10 text-blue-100 border-transparent" }],
      },
    ],
    done: [
      {
        id: "olb-done-1",
        title: "Playbook de entrevistas logísticas",
        description: "Publicado para 4 países.",
        meta: "Release Out/25",
      },
    ],
  }),
  hdg: buildKanbanColumns({
    backlog: [
      {
        id: "hdg-backlog-1",
        title: "Explorar IA para curadoria de perguntas",
        description: "Comportamentos de líderes HDG.",
        chips: [{ label: "Pesquisa", colorClass: "bg-fuchsia-500/10 text-fuchsia-100 border-transparent" }],
      },
    ],
    todo: [
      {
        id: "hdg-todo-1",
        title: "Sprint de branding com HDG",
        description: "Assets alinhados ao time global.",
        owner: "Studio",
        dueDate: "08/Fev",
        chips: [{ label: "Branding", colorClass: "bg-pink-500/10 text-pink-100 border-transparent" }],
      },
    ],
    doing: [
      {
        id: "hdg-doing-1",
        title: "Checklist de entrevistas híbridas",
        description: "Fluxo remoto/presencial com sinais verdes/vermelhos.",
        progress: 52,
        chips: [{ label: "Operação", colorClass: "bg-emerald-500/10 text-emerald-100 border-transparent" }],
      },
      {
        id: "hdg-doing-2",
        title: "Mentorias com squads HDG",
        description: "3 trilhas paralelas (PM, Design, Tech).",
        chips: [{ label: "Mentoria", colorClass: "bg-indigo-500/10 text-indigo-100 border-transparent" }],
      },
    ],
    done: [
      {
        id: "hdg-done-1",
        title: "Treinamento inicial com diretores",
        description: "Sessão presencial realizada em SP.",
        meta: "Feedback 4,9/5",
        chips: [{ label: "Treinamento", colorClass: "bg-sky-500/10 text-sky-100 border-transparent" }],
      },
    ],
  }),
}
