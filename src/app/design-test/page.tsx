// src/app/design-test/page.tsx
import Image from "next/image";

const primaryNav = [
  { label: "Dashboard", active: true },
  { label: "User Profiles", active: false },
  { label: "Messages", active: false },
  { label: "Transactions", active: false },
  { label: "My Wallet", active: false },
  { label: "Payment", active: false },
  { label: "Investment", active: false },
  { label: "Reports", active: false },
];

const secondaryNav = [
  { label: "Settings" },
  { label: "Support" },
  { label: "Log out" },
];

const statCards = [
  {
    label: "Total Balance",
    amount: "$19,750",
    change: "+11.94%",
    trend: "positive",
    path: "M4 52L32 44L60 58L88 38L116 46L144 30L172 56L200 34L228 40L256 30L284 42L312 28",
    gradientId: "balanceGradient",
    gradientStops: [
      { offset: "0%", color: "rgba(154, 193, 240, 0.5)" },
      { offset: "100%", color: "rgba(114, 250, 147, 0.2)" },
    ],
  },
  {
    label: "Total Expense",
    amount: "$11,375",
    change: "-20.91%",
    trend: "negative",
    path: "M4 40L32 44L60 30L88 46L116 34L144 50L172 36L200 48L228 28L256 38L284 24L312 30",
    gradientId: "expenseGradient",
    gradientStops: [
      { offset: "0%", color: "rgba(228, 95, 43, 0.5)" },
      { offset: "100%", color: "rgba(154, 193, 240, 0.2)" },
    ],
  },
  {
    label: "Total Savings",
    amount: "$100,000",
    change: "+21.17%",
    trend: "positive",
    path: "M4 60L32 48L60 56L88 30L116 38L144 26L172 34L200 22L228 42L256 26L284 32L312 18",
    gradientId: "savingsGradient",
    gradientStops: [
      { offset: "0%", color: "rgba(114, 250, 147, 0.55)" },
      { offset: "100%", color: "rgba(160, 229, 72, 0.25)" },
    ],
  },
];

const reviewChecklist = [
  { title: "Mock interview agendado", type: "voice" },
  { title: "Rever perguntas comportamentais", type: "todo" },
  { title: "Atualizar portfolio", type: "todo" },
  { title: "Treinar pitch de apresentacao", type: "voice" },
];

const transactions = [
  { name: "Mock interview com mentor", date: "27 Jul 2025", amount: "-$199.00" },
  { name: "Aula intensiva de casos", date: "26 Jul 2025", amount: "-$149.00" },
  { name: "Reembolso evento tech", date: "20 Jul 2025", amount: "+$89.00" },
  { name: "Mensalidade Interview Prep", date: "15 Jul 2025", amount: "-$39.00" },
];

const analytics = [
  { label: "Apresentacao", value: 86, color: "bg-brand-green" },
  { label: "Tecnico", value: 72, color: "bg-brand-blue" },
  { label: "Comportamental", value: 64, color: "bg-brand-orange" },
  { label: "Cultura da empresa", value: 58, color: "bg-brand-yellow" },
  { label: "Perguntas invertidas", value: 44, color: "bg-brand-lime" },
];

const timeline = [
  { label: "Pitch pessoal", value: 92, tone: "positive" },
  { label: "Projetos recentes", value: 76, tone: "positive" },
  { label: "Framework STAR", value: 63, tone: "positive" },
  { label: "Feedbacks anteriores", value: 41, tone: "warning" },
];

function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="flex items-center gap-3">
        <Image
          src="/favicon-32x32.png"
          alt="Interview Prep logo"
          width={32}
          height={32}
          className="rounded-lg ring-2 ring-brand-green/40"
        />
        <div>
          <span className="card-title text-brand-green">Interview Prep</span>
          <p className="font-grotesk text-lg font-semibold text-text-primary">Interview Prep App</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {primaryNav.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`sidebar-link ${item.active ? "sidebar-link-active" : ""}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                item.active ? "bg-brand-green" : "bg-border-default"
              }`}
            />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="rounded-2xl border border-brand-blue/40 bg-brand-blue/10 p-4 text-sm text-brand-blue">
          <p className="font-sans font-semibold">Pronto para a proxima entrevista?</p>
          <p className="mt-2 text-xs text-text-secondary">
            Revise perguntas, pratique respostas e acompanhe seus indicadores.
          </p>
          <button className="mt-4 btn btn-primary w-full">Iniciar simulacao</button>
        </div>

        <div className="grid gap-2">
          {secondaryNav.map((item) => (
            <a key={item.label} href="#" className="sidebar-link">
              <span className="h-2 w-2 rounded-full bg-border-default" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

function DashboardHeader() {
  return (
    <header className="flex flex-wrap justify-between gap-6">
      <div>
        <p className="text-sm text-text-secondary">Ola, Maaz</p>
        <h1>Seu painel Interview Prep</h1>
        <p className="mt-2 max-w-xl text-sm text-text-muted">
          Visao geral da semana com destaque para treinos, acompanhamento de metricas e
          recomendacoes personalizadas.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn btn-ghost">Ver agenda</button>
        <button className="btn btn-secondary">Nova nota</button>
        <button className="btn btn-primary">Adicionar sessao</button>
      </div>
    </header>
  );
}

function StatOverview() {
  return (
    <section className="panel-grid">
      {statCards.map((card) => (
        <div key={card.label} className="card overflow-hidden">
          <div className="card-title">{card.label}</div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="metric-value">{card.amount}</p>
              <p
                className={`mt-1 text-sm font-semibold ${
                  card.trend === "positive" ? "trend-positive" : "trend-negative"
                }`}
              >
                {card.change} vs ultimo mes
              </p>
            </div>
            <span className="rounded-full bg-brand-blue/15 px-3 py-1 text-xs font-medium text-brand-blue">
              meta 2025
            </span>
          </div>
          <svg className="mt-6 h-24 w-full" viewBox="0 0 320 120" fill="none">
            <defs>
              <linearGradient id={card.gradientId} x1="0" y1="120" x2="320" y2="0">
                {card.gradientStops.map((stop) => (
                  <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>
            <path d={`${card.path} V120 H4 Z`} fill={`url(#${card.gradientId})`} opacity={0.35} />
            <path
              d={card.path}
              stroke={card.trend === "positive" ? "#72FA93" : "#E45F2B"}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}

      <div className="card col-span-full md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="card-title">Visa virtual</div>
            <p className="mt-2 text-2xl font-semibold text-text-primary">Saldo atual</p>
          </div>
          <span className="rounded-full bg-brand-yellow/20 px-4 py-1 text-xs font-semibold text-brand-yellow">
            Proxima renovacao: 06/2025
          </span>
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-brand-yellow/25 via-brand-orange/15 to-brand-orange/25 p-6 text-bg-primary shadow-inner">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.35em]">Interview Prep App</p>
            <span className="text-sm font-semibold">Visa Infinite</span>
          </div>
          <p className="text-3xl font-mono font-semibold tracking-widest">20 0023 45</p>
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="uppercase tracking-[0.3em] text-brand-orange/80">Titular</p>
              <p className="font-semibold">Maaz Founder</p>
            </div>
            <div className="text-right">
              <p className="uppercase tracking-[0.3em] text-brand-orange/80">Validade</p>
              <p className="font-semibold">06/2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PerformanceSummary() {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="card-title">Performance geral</div>
          <h2 className="mt-2 text-text-primary">Semana de simulacoes</h2>
        </div>
        <span className="rounded-full bg-brand-blue/15 px-3 py-1 text-xs font-semibold text-brand-blue">
          Ultimos 30 dias
        </span>
      </div>

      <svg className="mt-6 h-48 w-full" viewBox="0 0 400 200" fill="none">
        <defs>
          <linearGradient id="linePositive" x1="0" y1="200" x2="400" y2="0">
            <stop offset="0%" stopColor="rgba(154,193,240,0.2)" />
            <stop offset="100%" stopColor="rgba(114,250,147,0.2)" />
          </linearGradient>
          <linearGradient id="lineFocus" x1="0" y1="200" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(14,15,26,0.0)" />
            <stop offset="100%" stopColor="rgba(114,250,147,0.15)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="400" height="200" fill="url(#lineFocus)" />
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <line
            key={index}
            x1={index * 80 + 20}
            y1={20}
            x2={index * 80 + 20}
            y2={180}
            stroke="rgba(63,64,86,0.55)"
            strokeDasharray="4 12"
          />
        ))}
        <path d="M20 152L100 120L180 140L260 78L340 110" stroke="#F6C445" strokeWidth={3} strokeLinecap="round" />
        <path
          d="M20 130L100 90L180 110L260 60L340 90"
          stroke="url(#linePositive)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="260" cy="60" r="6" fill="#72FA93" />
      </svg>

      <div className="mt-6 grid grid-cols-2 gap-6">
        {timeline.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border-subtle bg-bg-tertiary/70 p-4">
            <p className="text-sm font-sans text-text-secondary">{item.label}</p>
            <p className="mt-2 text-2xl font-mono font-semibold text-text-primary">{item.value}%</p>
            <p className={`text-xs font-medium ${item.tone === "positive" ? "trend-positive" : "text-brand-yellow"}`}>
              Evolucao continua
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyChecklist() {
  return (
    <div className="card">
      <div className="card-title">Checklist da semana</div>
      <h2 className="mt-2 text-text-primary">Foque nos proximos passos</h2>
      <ul className="mt-6 space-y-4">
        {reviewChecklist.map((item) => (
          <li
            key={item.title}
            className="flex items-start justify-between gap-4 rounded-2xl border border-border-subtle/60 bg-bg-tertiary/60 p-4"
          >
            <div>
              <p className="font-sans text-sm text-text-primary">{item.title}</p>
              <p className="text-xs text-text-muted">
                {item.type === "voice" ? "Sessao guiada por voz" : "Tarefa de estudo"}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                item.type === "voice" ? "bg-brand-green/20 text-brand-green" : "bg-brand-blue/20 text-brand-blue"
              }`}
            >
              {item.type === "voice" ? "Voice AI" : "Deep dive"}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-blue/20 via-brand-green/15 to-brand-lime/20 p-6 text-sm text-text-primary">
        <p className="font-sans font-semibold">Insight do Coach virtual</p>
        <p className="mt-2 text-text-secondary">
          Explore respostas narrativas com o framework STAR e destaque um resultado mensuravel por historia.
        </p>
      </div>
    </div>
  );
}

function TransactionsPanel() {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="card-title">Fluxo financeiro</div>
          <h2 className="mt-2 text-text-primary">Transacoes recentes</h2>
        </div>
        <button className="btn btn-ghost px-4 text-xs">Ver tudo</button>
      </div>
      <div className="mt-6 grid gap-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.name}
            className="flex items-center justify-between rounded-2xl border border-border-subtle/70 bg-bg-tertiary/60 px-4 py-3"
          >
            <div>
              <p className="font-sans text-sm text-text-primary">{transaction.name}</p>
              <p className="text-xs text-text-muted">{transaction.date}</p>
            </div>
            <span
              className={`font-mono text-sm font-semibold ${
                transaction.amount.startsWith("+") ? "trend-positive" : "trend-negative"
              }`}
            >
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetencyAnalysis() {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="card-title">Analise de competencias</div>
          <h2 className="mt-2 text-text-primary">Trilha Interview Prep</h2>
        </div>
        <span className="rounded-full bg-brand-green/15 px-3 py-1 text-xs font-semibold text-brand-green">
          Atualizado hoje
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {analytics.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <p>{item.label}</p>
              <p>{item.value}%</p>
            </div>
            <div className="mt-2 h-2 rounded-full bg-border-subtle">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-5">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-blue">Insight</p>
        <p className="mt-3 text-sm text-text-secondary">
          Foque em tecnicas de storytelling para reforcar respostas de cultura da empresa.
        </p>
      </div>
    </div>
  );
}

function AnalyticsGrid() {
  return (
    <section className="analytics-grid">
      <PerformanceSummary />
      <WeeklyChecklist />
      <TransactionsPanel />
      <CompetencyAnalysis />
    </section>
  );
}

function DashboardMain() {
  return (
    <main className="dashboard-content">
      <DashboardHeader />
      <StatOverview />
      <AnalyticsGrid />
    </main>
  );
}

export default function DesignTest() {
  return (
    <div className="min-h-screen px-10 py-12">
      <div className="dashboard-shell animate-fade-in">
        <DashboardSidebar />
        <DashboardMain />
      </div>
    </div>
  );
}
