import { Briefcase, FileSpreadsheet, Users, Workflow } from "lucide-react";

export const roleData = {
  hero: {
    title: "Program Manager Toolkit",
    subtitle: "Execution & Influence",
    description: "Ferramentas, templates e estratégias para navegar na complexidade da Amazon e entregar resultados.",
  },
  sections: [
    {
      id: "role-clarity",
      title: "Role Clarity",
      description: "PgM vs PM vs ProdM. O que é esperado de você?",
      icon: Briefcase,
      href: "/amz-pay-ops/role/clarity",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: "stakeholders",
      title: "Stakeholder Management",
      description: "Quem é quem e como influenciar sem autoridade.",
      icon: Users,
      href: "/amz-pay-ops/role/stakeholders",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      id: "artifacts",
      title: "Key Artifacts",
      description: "Templates para Roadmaps, Status Reports e OP1.",
      icon: FileSpreadsheet,
      href: "/amz-pay-ops/role/artifacts",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      id: "mechanisms",
      title: "Mechanisms",
      description: "Rituais de gestão: WBR, MBR e QBR.",
      icon: Workflow,
      href: "/amz-pay-ops/role/mechanisms",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ],
  clarity: {
    comparison: [
      {
        role: "Program Manager (PgM)",
        focus: "HOW & WHEN",
        desc: "Dono da execução cross-funcional. Gerencia riscos, dependências e cronogramas de múltiplos projetos interligados.",
        keywords: ["Orquestração", "Riscos", "Entrega", "Stakeholders"],
      },
      {
        role: "Product Manager (PM-T)",
        focus: "WHAT & WHY",
        desc: "Dono da visão do produto e roadmap. Define os requisitos e prioridades baseados no cliente.",
        keywords: ["Visão", "Cliente", "Requisitos", "Priorização"],
      },
      {
        role: "Project Manager",
        focus: "TASK EXECUTION",
        desc: "Foca em um escopo específico com início, meio e fim definidos. Menos estratégico que o PgM.",
        keywords: ["Tarefas", "Escopo", "Cronograma", "Recursos"],
      },
    ],
  },
  stakeholders: [
    {
      name: "Andreia Guarino Souza",
      role: "Sr. Program Manager (Manager)",
      focus: "Excelência Operacional & Dados",
      strategy: "Traga dados, não opiniões. Mostre proatividade na resolução de problemas antes de escalar. Alinhe-se aos princípios Lean/Six Sigma.",
    },
    {
      name: "Sujash Biswas",
      role: "Head of Payments LATAM",
      focus: "Escalabilidade & Estratégia",
      strategy: "Think Big. Mostre como suas iniciativas locais podem ser replicadas na LATAM. Seja conciso e direto (BLUF - Bottom Line Up Front).",
    },
    {
      name: "Tech Teams",
      role: "Engenharia & Dev",
      focus: "Viabilidade & Débito Técnico",
      strategy: "Respeite o tempo deles. Traga requisitos claros. Entenda as limitações técnicas antes de prometer prazos.",
    },
  ],
  mechanisms: [
    {
      name: "WBR (Weekly Business Review)",
      desc: "Reunião semanal tática. Foco em métricas que desviaram do esperado (vermelho/amarelo).",
      tip: "Conheça seus números. Se uma métrica caiu, saiba o porquê e o plano de ação (Correction of Error - COE).",
    },
    {
      name: "OP1 / OP2 (Operational Plan)",
      desc: "Planejamento anual (e revisão semestral). Define orçamento, headcount e grandes iniciativas.",
      tip: "É aqui que você pede recursos. Precisa de um 6-pager sólido justificando o ROI.",
    },
    {
      name: "QBR (Quarterly Business Review)",
      desc: "Revisão trimestral de estratégia e resultados.",
      tip: "Momento de celebrar vitórias e recalibrar a rota.",
    },
  ],
};
