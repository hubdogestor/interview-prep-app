import { Prisma, type Competencia, type Experiencia, type Icebreaker, type Question, type Speech } from "@prisma/client";
import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/server/api/root";

export type DashboardOverviewData = inferRouterOutputs<AppRouter>["dashboard"]["overview"];

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000);
const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000);
const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

const icebreakers: Icebreaker[] = [
  {
    id: "mock-icebreaker-1",
    tipo: "apresentacao",
    titulo: "Pitch pessoal para a comunidade tech paulistana",
    versoes: [
      {
        idioma: "pt-BR",
        conteudo:
          "Oi, eu sou o Leonardo e transformo produtos complexos em experiências simples aqui em São Paulo.",
      } as Prisma.JsonValue,
    ],
    favorite: true,
    archived: false,
    createdAt: daysAgo(5),
    updatedAt: minutesAgo(45),
    userId: null,
  },
  {
    id: "mock-icebreaker-2",
    tipo: "apresentacao",
    titulo: "Elevator pitch mobile banking",
    versoes: [
      {
        idioma: "pt-BR",
        conteudo:
          "Há dez anos lidero squads de produto financeiro conectando pessoas e serviços digitais.",
      } as Prisma.JsonValue,
    ],
    favorite: false,
    archived: false,
    createdAt: daysAgo(3),
    updatedAt: hoursAgo(5),
    userId: null,
  },
  {
    id: "mock-icebreaker-3",
    tipo: "apresentacao",
    titulo: "História rápida com IA aplicada",
    versoes: [
      {
        idioma: "pt-BR",
        conteudo: "Conduzi a adoção de copilotos internos reduzindo em 30% o tempo de discovery.",
      } as Prisma.JsonValue,
    ],
    favorite: true,
    archived: false,
    createdAt: daysAgo(2),
    updatedAt: hoursAgo(2),
    userId: null,
  },
];

const speeches: Speech[] = [
  {
    id: "mock-speech-1",
    tipoVaga: "Head de Produto",
    titulo: "Transformação digital na avenida Paulista",
    versao: "v1",
    conteudo: {
      abertura: "Conectamos 12 hospitais em um prontuário único com foco em acessibilidade.",
      destaque: "Liderança de squads híbridos em São Paulo/SP e Campinas/SP.",
      resultados: ["+35% de eficiência operacional", "NPS 68 com pacientes"],
    } as Prisma.JsonValue,
    duracaoEstimada: 3,
    foco: ["Saúde", "Data Design"],
    favorite: true,
    archived: false,
    createdAt: daysAgo(10),
    updatedAt: hoursAgo(8),
    userId: null,
  },
  {
    id: "mock-speech-2",
    tipoVaga: "Principal Product Designer",
    titulo: "Escalando design ops para fintechs brasileiras",
    versao: "v2",
    conteudo: {
      abertura: "Organizei um design system multi-marcas em apenas oito semanas.",
      destaque: "Integração com squads de crédito em Osasco e São Paulo.",
      resultados: ["-25% no tempo de handoff", "+18% de conversão mobile"],
    } as Prisma.JsonValue,
    duracaoEstimada: 4,
    foco: ["Fintech", "Ops"],
    favorite: false,
    archived: false,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(1),
    userId: null,
  },
];

const questions: Question[] = [
  {
    id: "mock-question-1",
    categoria: "Estratégia",
    pergunta: {
      pt: "Como a liderança de produto apoia squads distribuídos entre São Paulo e outras regiões?",
    } as Prisma.JsonValue,
    contexto: "Avaliar alinhamento entre hubs locais.",
    prioridade: "alta",
    favorite: true,
    createdAt: daysAgo(7),
    updatedAt: hoursAgo(6),
    userId: null,
  },
  {
    id: "mock-question-2",
    categoria: "Cultura",
    pergunta: {
      pt: "Quais práticas vocês utilizam para garantir bem-estar das equipes híbridas?",
    } as Prisma.JsonValue,
    contexto: "Aprofundar fit com cultura remota-first.",
    prioridade: "media",
    favorite: false,
    createdAt: daysAgo(4),
    updatedAt: hoursAgo(3),
    userId: null,
  },
  {
    id: "mock-question-3",
    categoria: "Tecnologia",
    pergunta: {
      pt: "Como vocês avaliam o impacto de IA generativa nos fluxos de discovery?",
    } as Prisma.JsonValue,
    contexto: "Entender maturidade em IA aplicada.",
    prioridade: "media",
    favorite: true,
    createdAt: daysAgo(9),
    updatedAt: hoursAgo(12),
    userId: null,
  },
];

const competencias: Competencia[] = [
  {
    id: "mock-competencia-1",
    nome: "Product Strategy",
    categoria: "Estratégia",
    nivel: "Avançado",
    descricao: {
      resumo: "Planejo roadmaps colaborativos para healthtechs brasileiras.",
      indicadores: ["Aumento de MRR", "Velocidade de squads"],
    } as Prisma.JsonValue,
    ferramentas: ["Notion", "Looker", "Productboard"],
    evidencias: [
      "Liderança de programas de discovery e delivery simultâneos",
      "Mentoria para PMs em comunidades paulistas",
    ],
    trackRecord: [
      {
        empresa: "Saude+",
        impacto: "+22% receita recorrente anual",
      },
    ] as Prisma.JsonValue[],
    createdAt: daysAgo(120),
    updatedAt: daysAgo(3),
    userId: null,
  },
  {
    id: "mock-competencia-2",
    nome: "Design Ops",
    categoria: "Operações",
    nivel: "Avançado",
    descricao: {
      resumo: "Implanto sistemas de design e métricas de qualidade ponta a ponta.",
    } as Prisma.JsonValue,
    ferramentas: ["Figma", "Storybook", "Mode"],
    evidencias: ["Responsável por governança de design system em 3 países"],
    trackRecord: [
      {
        empresa: "Fintech SP",
        impacto: "-25% tempo de handoff",
      },
    ] as Prisma.JsonValue[],
    createdAt: daysAgo(90),
    updatedAt: daysAgo(8),
    userId: null,
  },
];

const experiencias: Experiencia[] = [
  {
    id: "mock-experiencia-1",
    empresa: "LEOMDS Studio",
    cargo: "Head de Produto",
    periodo: {
      inicio: "2021",
      fim: "Atual",
      local: "São Paulo, Brasil",
    } as Prisma.JsonValue,
    pitchElevator: {
      mensagem: "Conecto estratégia e execução para acelerar lançamentos digitais.",
    } as Prisma.JsonValue,
    speechCompleto: {
      topicos: ["Contexto", "Desafio", "Solução", "Resultados"],
    } as Prisma.JsonValue,
    starCases: [
      {
        id: "star-case-1",
        titulo: "Plataforma Omni Saúde",
        competencia: "Product Strategy",
        resultado: "Aumento de 35% na retenção anual",
      },
    ] as Prisma.JsonValue[],
    tecnologias: ["Next.js", "Prisma", "GCP", "Vertex AI"],
    createdAt: daysAgo(400),
    updatedAt: daysAgo(1),
    userId: null,
  },
  {
    id: "mock-experiencia-2",
    empresa: "Inovador Bank",
    cargo: "Principal Product Designer",
    periodo: {
      inicio: "2018",
      fim: "2021",
      local: "Barueri, Brasil",
    } as Prisma.JsonValue,
    pitchElevator: {
      mensagem: "Escalamos o app para 8 milhões de contas com foco em acessibilidade.",
    } as Prisma.JsonValue,
    speechCompleto: {
      topicos: ["Pesquisa", "Métricas", "Execução"],
    } as Prisma.JsonValue,
    starCases: [
      {
        id: "star-case-2",
        titulo: "Onboarding 48h",
        competencia: "Design Ops",
        resultado: "-40% no tempo de aprovação",
      },
    ] as Prisma.JsonValue[],
    tecnologias: ["React Native", "Segment", "Datadog"],
    createdAt: daysAgo(600),
    updatedAt: daysAgo(30),
    userId: null,
  },
];

const totals = {
  competencias: competencias.length,
  experiencias: experiencias.length,
  speeches: speeches.length,
  questions: questions.length,
  icebreakers: icebreakers.length,
};

const recentItems: DashboardOverviewData["recentItems"] = [...icebreakers, ...speeches, ...questions]
  .map((item) => {
    if ("versoes" in item) {
      return {
        id: item.id,
        type: "icebreaker" as const,
        title: item.titulo,
        updatedAt: item.updatedAt,
        favorite: item.favorite,
      };
    }

    if ("conteudo" in item) {
      return {
        id: item.id,
        type: "speech" as const,
        title: item.titulo,
        updatedAt: item.updatedAt,
        favorite: item.favorite,
      };
    }

    const title =
      typeof item.pergunta === "string"
        ? item.pergunta
        : (item.pergunta as { pt?: string }).pt ?? "Pergunta";

    return {
      id: item.id,
      type: "question" as const,
      title,
      updatedAt: item.updatedAt,
      favorite: item.favorite,
    };
  })
  .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  .slice(0, 10);

const favoriteItems: DashboardOverviewData["favoriteItems"] = [
  ...icebreakers
    .filter((item) => item.favorite)
    .map((item) => ({
      id: item.id,
      type: "icebreaker" as const,
      title: item.titulo,
      description: "Apresentação rápida para networking em São Paulo",
    })),
  ...speeches
    .filter((item) => item.favorite)
    .map((item) => ({
      id: item.id,
      type: "speech" as const,
      title: item.titulo,
      description: "Discurso focado em resultados recentes no Brasil",
    })),
  ...questions
    .filter((item) => item.favorite)
    .map((item) => ({
      id: item.id,
      type: "question" as const,
      title:
        typeof item.pergunta === "string"
          ? item.pergunta
          : (item.pergunta as { pt?: string }).pt ?? "Pergunta",
      description: "Pergunta marcada como favorita para entrevistas-chave",
    })),
].slice(0, 10);

export const dashboardOverviewFallback: DashboardOverviewData = {
  profile: null,
  totals,
  recentItems,
  favoriteItems,
  featured: {
    experiencia: experiencias[0] ?? null,
    competencia: competencias[0] ?? null,
    speech: speeches[0] ?? null,
  },
  recent: {
    icebreakers: icebreakers.slice(0, 3),
    questions: questions.slice(0, 3),
  },
};
