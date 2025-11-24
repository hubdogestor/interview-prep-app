import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.practiceSession.deleteMany();
  await prisma.question.deleteMany();
  await prisma.speech.deleteMany();
  await prisma.experiencia.deleteMany();
  await prisma.competencia.deleteMany();
  await prisma.icebreaker.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const defaultUser = await prisma.user.create({
    data: {
      email: "default@leomds-app.local",
      name: "Usuário Default",
      emailVerified: new Date(),
    },
  });

  await prisma.profile.create({
    data: {
      nome: "Leonardo Menezes",
      titulo: "Senior Full-Stack Engineer",
      foto: "/placeholder-user.jpg",
      email: "leonardo@example.com",
      telefone: "+55 11 99999-9999",
      linkedin: "https://www.linkedin.com/in/leonardo",
      github: "https://github.com/leonardo",
      resumo: {
        pt: "Engenheiro de software com foco em produtos digitais, atuando com times de alta performance.",
        en: "Software engineer focused on digital products, collaborating with high performance teams.",
      },
      anosExperiencia: 10,
      userId: defaultUser.id,
    },
  });

  await prisma.icebreaker.createMany({
    data: [
      {
        tipo: "elevator_pitch",
        titulo: "Elevator Pitch 45s",
        versoes: [
          {
            nome: "Direct",
            conteudo: {
              pt: "Sou engenheiro full-stack, lidero squads para entregar produtos com foco em métricas de negócio.",
              en: "I am a full-stack engineer leading squads to ship products focused on business metrics.",
            },
            duracao: 45,
            tags: ["full-stack", "leadership"],
          },
        ],
        userId: defaultUser.id,
      },
      {
        tipo: "personal_story",
        titulo: "Minha transição para liderança técnica",
        versoes: [
          {
            nome: "Storytelling",
            conteudo: {
              pt: "Comecei em front-end e evoluí para liderar iniciativas multiplataforma, conectando tecnologia a objetivos de negócio.",
              en: "I started in front-end and grew into leading cross-platform initiatives that connect engineering to business outcomes.",
            },
            duracao: 90,
            tags: ["leadership", "career"],
          },
        ],
        userId: defaultUser.id,
      },
    ],
  });

  await prisma.competencia.createMany({
    data: [
      {
        nome: "Arquitetura de Sistemas",
        categoria: "technical",
        nivel: "expert",
        descricao: {
          pt: "Definição de arquiteturas escaláveis com foco em dados e observabilidade.",
          en: "Designing scalable architectures with emphasis on data and observability.",
        },
        ferramentas: ["Next.js", "Node.js", "Prisma", "MongoDB", "AWS"],
        evidencias: ["https://example.com/caso-microservicos"],
        trackRecord: [
          {
            projeto: "Migração para microserviços",
            resultado: "Redução de 60% no tempo de resposta",
            ano: 2023,
          },
        ],
        userId: defaultUser.id,
      },
      {
        nome: "Comunicação com Stakeholders",
        categoria: "leadership",
        nivel: "advanced",
        descricao: {
          pt: "Traduz requisitos de negócio em planos de execução e métricas acompanháveis.",
          en: "Translates business requirements into execution plans and measurable outcomes.",
        },
        ferramentas: ["Miro", "Linear", "Notion"],
        evidencias: ["https://example.com/roadmap-quarter"],
        trackRecord: [
          {
            projeto: "Lançamento de feature de pagamentos",
            resultado: "Aumento de 35% no NPS",
            ano: 2022,
          },
        ],
        userId: defaultUser.id,
      },
    ],
  });

  await prisma.experiencia.createMany({
    data: [
      {
        empresa: "Buser",
        cargo: "Senior Full-Stack Engineer",
        periodo: { inicio: "2023-01", fim: null },
        pitchElevator: {
          pt: "Lidero iniciativas para acelerar o roadmap digital, conectando squads e stakeholders.",
          en: "I lead initiatives to accelerate the digital roadmap, aligning squads and stakeholders.",
        },
        speechCompleto: {
          pt: "Responsável por definir a visão técnica e garantir execução com foco em métricas de negócio.",
          en: "Responsible for defining technical vision and ensuring execution focused on business metrics.",
        },
        starCases: [
          {
            titulo: "Redução de custos operacionais",
            situation: "Custos de infraestrutura em crescimento",
            task: "Mapear gargalos e propor otimizações",
            action: "Implementação de arquitetura serverless para workloads sazonais",
            result: "Economia de 25% em custos no primeiro trimestre",
            idioma: "pt",
          },
        ],
        tecnologias: ["React", "Node.js", "AWS", "PostgreSQL"],
        userId: defaultUser.id,
      },
      {
        empresa: "Neon",
        cargo: "Full-Stack Developer",
        periodo: { inicio: "2021-02", fim: "2022-12" },
        pitchElevator: {
          pt: "Combinei dados e UX para lançar features bancárias com foco em retenção.",
          en: "Combined data and UX to ship banking features focused on retention.",
        },
        speechCompleto: {
          pt: "Trabalhei com squads multidisciplinares lançando produtos de pagamentos em tempo recorde.",
          en: "Worked with cross-functional squads delivering payment products in record time.",
        },
        starCases: [
          {
            titulo: "Motor de prevenção a fraude",
            situation: "Aumento de chargebacks em novos produtos",
            task: "Criar sistema de detecção em tempo real",
            action: "Desenvolvimento de microsserviço com machine learning",
            result: "Redução de 40% em fraudes em 6 meses",
            idioma: "pt",
          },
        ],
        tecnologias: ["TypeScript", "React", "GraphQL", "MongoDB"],
        userId: defaultUser.id,
      },
    ],
  });

  await prisma.speech.createMany({
    data: [
      {
        tipoVaga: "tech_lead",
        titulo: "Visão técnica orientada a produto",
        versao: "v1",
        conteudo: {
          pt: "Discurso estruturado em abertura, diagnóstico, proposta e fechamento.",
          en: "Structured speech covering opening, diagnosis, proposal and closing.",
        },
        duracaoEstimada: 6,
        foco: ["produto", "lideranca"],
        userId: defaultUser.id,
      },
      {
        tipoVaga: "engineering_manager",
        titulo: "Estratégia para escalar time",
        versao: "v1",
        conteudo: {
          pt: "Como construir time de alta performance com foco em autonomia.",
          en: "How to build high performing teams with autonomy as a core principle.",
        },
        duracaoEstimada: 8,
        foco: ["people", "process"],
        userId: defaultUser.id,
      },
    ],
  });

  await prisma.question.createMany({
    data: [
      {
        categoria: "time",
        pergunta: {
          pt: "Como o time define prioridades quando existem conflitos entre squads?",
          en: "How does the team define priorities when squads have conflicting goals?",
        },
        contexto: "Perguntar ao manager no final da entrevista tecnica.",
        prioridade: "alta",
        userId: defaultUser.id,
      },
      {
        categoria: "produto",
        pergunta: {
          pt: "Quais metricas definem sucesso para esta feature nos proximos 6 meses?",
          en: "Which metrics define success for this feature over the next 6 months?",
        },
        contexto: "Ideal para entrevistas com product managers.",
        prioridade: "media",
        userId: defaultUser.id,
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
