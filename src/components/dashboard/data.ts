// src/components/dashboard/data.ts
export const primaryNav = [
  { label: "Dashboard", key: "dashboard", active: true },
  { label: "Perfil", key: "profile", active: false },
  { label: "Perguntas", key: "questions", active: false },
  { label: "Experiencias", key: "experiences", active: false },
  { label: "Competencias", key: "skills", active: false },
  { label: "Speech", key: "speech", active: false },
  { label: "Analytics", key: "analytics", active: false },
];

export const secondaryNav = [
  { label: "Configuracoes", key: "settings" },
  { label: "Suporte", key: "support" },
  { label: "Sair", key: "logout" },
];

export const statCards = [
  {
    label: "Mock interviews",
    amount: "12 sessoes",
    change: "+11.94%",
    trend: "positive" as const,
    path: "M4 52L32 44L60 58L88 38L116 46L144 30L172 56L200 34L228 40L256 30L284 42L312 28",
    gradientId: "balanceGradient",
    gradientStops: [
      { offset: "0%", color: "rgba(154, 193, 240, 0.5)" },
      { offset: "100%", color: "rgba(114, 250, 147, 0.2)" },
    ],
  },
  {
    label: "Perguntas respondidas",
    amount: "148 respostas",
    change: "+8.20%",
    trend: "positive" as const,
    path: "M4 60L32 48L60 56L88 30L116 38L144 26L172 34L200 22L228 42L256 26L284 32L312 18",
    gradientId: "responseGradient",
    gradientStops: [
      { offset: "0%", color: "rgba(114, 250, 147, 0.55)" },
      { offset: "100%", color: "rgba(160, 229, 72, 0.25)" },
    ],
  },
  {
    label: "Feedbacks coach",
    amount: "5 novos",
    change: "-2.10%",
    trend: "negative" as const,
    path: "M4 40L32 44L60 30L88 46L116 34L144 50L172 36L200 48L228 28L256 38L284 24L312 30",
    gradientId: "feedbackGradient",
    gradientStops: [
      { offset: "0%", color: "rgba(228, 95, 43, 0.5)" },
      { offset: "100%", color: "rgba(154, 193, 240, 0.2)" },
    ],
  },
];

export const reviewChecklist = [
  { title: "Mock interview agendado", type: "voice" as const },
  { title: "Rever perguntas comportamentais", type: "todo" as const },
  { title: "Atualizar portfolio", type: "todo" as const },
  { title: "Treinar pitch de apresentacao", type: "voice" as const },
];

export const transactions = [
  { name: "Mock interview com mentor", date: "27 Jul 2025", amount: "-$199.00" },
  { name: "Aula intensiva de casos", date: "26 Jul 2025", amount: "-$149.00" },
  { name: "Reembolso evento tech", date: "20 Jul 2025", amount: "+$89.00" },
  { name: "Mensalidade Interview Prep", date: "15 Jul 2025", amount: "-$39.00" },
];

export const analytics = [
  { label: "Apresentacao", value: 86, color: "bg-brand-green" },
  { label: "Tecnico", value: 72, color: "bg-brand-blue" },
  { label: "Comportamental", value: 64, color: "bg-brand-orange" },
  { label: "Cultura da empresa", value: 58, color: "bg-brand-yellow" },
  { label: "Perguntas invertidas", value: 44, color: "bg-brand-lime" },
];

export const timeline = [
  { label: "Pitch pessoal", value: 92, tone: "positive" as const },
  { label: "Projetos recentes", value: 76, tone: "positive" as const },
  { label: "Framework STAR", value: 63, tone: "positive" as const },
  { label: "Feedbacks anteriores", value: 41, tone: "warning" as const },
];
