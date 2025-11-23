import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  LineChart,
  Shield,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import ProcessorIcon from "@/components/icons/proccesor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const jobInfo = {
  title: "Program Manager, Payment Business Operation",
  company: "Amazon",
  location: "São Paulo, Brasil",
  jobId: "3059488",
  partnership: "Oakberry Strategic Partnership",
};

const modules = [
  {
    id: "technical-deep-dive",
    title: "Technical Deep Dive",
    description:
      "Domine a arquitetura de sistemas de pagamento, AWS services essenciais, segurança PCI-DSS e integração de APIs.",
    icon: "⚙️",
    topics: 4,
    status: "Completo",
    href: "/amazon-prep/technical-deep-dive",
    focus: "Sistemas · AWS · PCI",
    accent: "text-sky-200 border-sky-500/30 bg-sky-500/10",
    glow: "from-sky-500/25 via-transparent to-transparent",
  },
  {
    id: "market-knowledge",
    title: "Market Knowledge",
    description:
      "Entenda o ecossistema completo de pagamentos no Brasil e LATAM: PIX, cartões, fintechs e regulamentação.",
    icon: "📊",
    topics: 4,
    status: "Completo",
    href: "/amazon-prep/market-knowledge",
    focus: "PIX · fintechs · regulação",
    accent: "text-emerald-200 border-emerald-400/30 bg-emerald-400/10",
    glow: "from-emerald-500/25 via-transparent to-transparent",
  },
  {
    id: "program-management",
    title: "Program Management",
    description:
      "Aprenda as metodologias Amazon, KPIs críticos de pagamentos e frameworks Lean/Six Sigma para excelência operacional.",
    icon: "📋",
    topics: 3,
    status: "Completo",
    href: "/amazon-prep/program-management",
    focus: "Working Backwards · KPIs",
    accent: "text-purple-200 border-purple-400/30 bg-purple-500/10",
    glow: "from-purple-500/25 via-transparent to-transparent",
  },
  {
    id: "stakeholders",
    title: "Stakeholders",
    description:
      "Conheça profundamente seus futuros gestores: Andreia Guarino e Sujash Biswas. Background, estilo de liderança e perguntas estratégicas.",
    icon: "👥",
    topics: 2,
    status: "Completo",
    href: "/amazon-prep/stakeholders",
    focus: "Andreia · Sujash",
    accent: "text-amber-200 border-amber-400/30 bg-amber-400/10",
    glow: "from-amber-500/25 via-transparent to-transparent",
  },
  {
    id: "leadership-principles",
    title: "Leadership Principles",
    description:
      "Os 16 princípios que definem a cultura Amazon. Cada um com exemplos STAR estruturados e perguntas típicas de entrevista.",
    icon: "⭐",
    topics: 16,
    status: "Completo",
    href: "/amazon-prep/leadership-principles",
    focus: "LPs · narrativas",
    accent: "text-rose-200 border-rose-400/30 bg-rose-400/10",
    glow: "from-rose-500/25 via-transparent to-transparent",
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    description:
      "Preparação final com mock interviews por Leadership Principle, perguntas técnicas de payment ops e plano para os primeiros 90 dias.",
    icon: "🎯",
    topics: 3,
    status: "Completo",
    href: "/amazon-prep/interview-prep",
    focus: "Mock · 90 days",
    accent: "text-indigo-200 border-indigo-400/30 bg-indigo-400/10",
    glow: "from-indigo-500/25 via-transparent to-transparent",
  },
];

const progressTracks = [
  {
    label: "Estrutura Base",
    detail: "Roteiro, frameworks e arquitetura do material",
    value: 100,
    tone: "from-emerald-400/30 via-transparent to-transparent",
  },
  {
    label: "Conteúdo Principal",
    detail: "Narrativas, docs de apoio e métricas",
    value: 0,
    tone: "from-sky-400/30 via-transparent to-transparent",
  },
  {
    label: "Preparação Prática",
    detail: "Mock interviews, drills e simulações",
    value: 0,
    tone: "from-purple-500/30 via-transparent to-transparent",
  },
];

const quickWins = [
  {
    title: "Leadership Principles Review",
    description: "Atualizar as 16 narrativas STAR com métricas frescas",
    href: "/amazon-prep/leadership-principles",
    tag: "LP",
  },
  {
    title: "Mock Interview · Payment Ops",
    description: "Simular perguntas técnicas sobre SLAs, PCI e automações",
    href: "/amazon-prep/interview-prep",
    tag: "Mock",
  },
  {
    title: "Stakeholder Profiles",
    description: "Refinar discovery questions para Andreia e Sujash",
    href: "/amazon-prep/stakeholders",
    tag: "People",
  },
  {
    title: "Technical Deep Dive",
    description: "Revisar diagramas e playbooks de resiliência",
    href: "/amazon-prep/technical-deep-dive",
    tag: "Tech",
  },
];

const timeline = [
  {
    label: "Semana 01",
    focus: "Fundamentos técnicos",
    deliverable: "Mapear arquitetura atual + riscos de escala",
    status: "done",
  },
  {
    label: "Semana 02",
    focus: "Stakeholders & KPIs",
    deliverable: "Discovery questions + métricas para LATAM",
    status: "in-progress",
  },
  {
    label: "Semana 03",
    focus: "Mock Interviews",
    deliverable: "LPs, payment ops drills e plano 90 dias",
    status: "up-next",
  },
];

const statusTone: Record<string, string> = {
  done: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  "in-progress": "text-sky-300 border-sky-400/30 bg-sky-400/10",
  "up-next": "text-zinc-300 border-white/20 bg-white/5",
};

const statusLabel: Record<string, string> = {
  done: "entregue",
  "in-progress": "em curso",
  "up-next": "próximo",
};

const stakeholders = [
  {
    name: "Andreia Guarino",
    title: "Sr. Manager · LATAM Payment Ops",
    signal:
      "Busca automação, redução de custo operacional e playbooks defensáveis para auditores.",
    anchor: "Andreia",
  },
  {
    name: "Sujash Biswas",
    title: "Head LATAM Payments",
    signal:
      "Foco em métricas de escala regional, AWS-first mindset e visão de AI/ML.",
    anchor: "Sujash",
  },
];

const metaCards: Array<{
  label: string;
  value: string;
  icon: LucideIcon;
  footnote?: string;
}> = [
  {
    label: "Timeline",
    value: "Nov · Jan",
    icon: CalendarDays,
    footnote: "Semana 02 inicia discovery com Andreia",
  },
  {
    label: "Stakeholders",
    value: "Andreia · Sujash",
    icon: Users,
    footnote: "Alinhar perguntas abertas antes do mock",
  },
  {
    label: "Parceria",
    value: jobInfo.partnership,
    icon: Shield,
    footnote: "Contrato estratégico com Oakberry",
  },
];

export default function AmazonPrepPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Amazon Prep · Payment Ops",
        description: `${jobInfo.company} · Job ID ${jobInfo.jobId}`,
        icon: ProcessorIcon,
      }}
    >
      <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-primary/15 via-background/70 to-background/30 p-8 shadow-2xl">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,_255,_255,_0.08),_transparent_55%)]" />
          <div className="relative flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="rounded-full border border-white/20 px-4 py-1 text-[0.65rem]">
                Amazon Payment Ops
              </span>
              <Badge variant="outline" className="border-white/30 text-[0.65rem]">
                Job ID: {jobInfo.jobId}
              </Badge>
            </div>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                Program Manager · {jobInfo.location}
              </p>
              <h1 className="text-4xl sm:text-5xl font-display leading-tight">
                Mission Control para a preparação do Payment Business Operation
              </h1>
              <p className="text-lg text-muted-foreground">
                Centralize frameworks, roteiros e sinais críticos da bancada Amazon em uma só tela. Tudo pronto para
                converter descobertas em respostas seguras durante o loop de entrevistas.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="xl" asChild>
                <Link href="/amazon-prep/interview-prep">
                  Abrir roteiro final
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#modules">Explorar módulos</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Escopo",
                  value: "LATAM Payment Ops",
                },
                {
                  label: "Metodologias",
                  value: "Lean · Six Sigma · Working Backwards",
                },
                {
                  label: "Foco",
                  value: "Transformação com AI/ML",
                },
              ].map((meta) => (
                <div
                  key={meta.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{meta.label}</p>
                  <p className="text-lg font-semibold leading-snug">{meta.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          {metaCards.map((meta) => (
            <div
              key={meta.label}
              className="rounded-3xl border border-white/5 bg-background/70 p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <meta.icon className="size-4 text-primary" />
                {meta.label}
              </div>
              <p className="mt-4 text-2xl font-semibold leading-tight">{meta.value}</p>
              {meta.footnote && (
                <p className="mt-2 text-sm text-muted-foreground">{meta.footnote}</p>
              )}
            </div>
          ))}
          <div className="rounded-3xl border border-white/5 bg-background/70 p-6 shadow-lg">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <LineChart className="size-4 text-primary" />
              Health Check
            </div>
            <p className="mt-4 text-2xl font-semibold">0% conteúdo · 0% prática</p>
            <p className="text-sm text-muted-foreground">
              Conteúdo principal e preparação prática aguardando input das novas descobertas.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Checkpoint</p>
            <h2 className="text-3xl font-display">Trilha de progresso</h2>
          </div>
          <Badge variant="outline" className="border-white/30 text-[0.65rem] uppercase tracking-[0.3em]">
            Sprint atual · Mock Interview
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {progressTracks.map((track) => (
            <div
              key={track.label}
              className="rounded-3xl border border-white/5 bg-background/70 p-5 shadow-lg"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{track.label}</p>
              <div className="mt-3 flex items-baseline justify-between">
                <p className="text-4xl font-semibold">{track.value}%</p>
                <Target className="size-4 text-primary" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{track.detail}</p>
              <div className="mt-4">
                <div className={cn("h-2 w-full overflow-hidden rounded-full bg-white/5", `bg-gradient-to-r ${track.tone}`)}>
                  <Progress value={track.value} className="h-2 bg-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="modules" className="space-y-5">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Módulos</p>
          <h2 className="text-3xl font-display">Centrais de conteúdo</h2>
          <p className="text-muted-foreground text-base">
            Escolha um módulo para abrir o conteúdo profundo focado no loop Amazon.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {modules.map((module) => (
            <Link key={module.id} href={module.href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-[1.75rem]">
              <article className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/5 bg-background/70 p-6 shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40">
                <div className={cn(
                  "pointer-events-none absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60",
                  "bg-gradient-to-br",
                  module.glow
                )} />
                <div className="relative flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{module.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold leading-tight">{module.title}</h3>
                        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{module.focus}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-[0.65rem]", module.accent)}>
                      {module.topics} tópicos
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
                  <div className="mt-auto flex items-center justify-between text-xs">
                    <span className={cn("rounded-full border px-3 py-1 uppercase tracking-[0.3em]", module.accent)}>
                      {module.status}
                    </span>
                    <ArrowUpRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/5 bg-background/70 p-6 shadow-lg">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Sprints de foco</p>
                <h3 className="text-2xl font-display">Próximas ações</h3>
              </div>
              <Badge variant="outline" className="border-white/30 text-[0.65rem] uppercase tracking-[0.3em]">
                Prioridade alta
              </Badge>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {quickWins.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-pop/30 p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {action.tag}
                    <ArrowUpRight className="size-4 text-primary" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-lg font-semibold leading-tight">{action.title}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-background/70 p-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Timeline tática</p>
                <h3 className="text-2xl font-display">Runway até o loop</h3>
              </div>
              <Badge variant="outline" className="border-white/30 text-[0.65rem] uppercase tracking-[0.3em]">
                Atualizado 23·11·2025
              </Badge>
            </div>
            <div className="mt-6 space-y-4">
              {timeline.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-pop/30 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.focus}</p>
                    </div>
                    <span className={cn(
                      "rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em]",
                      statusTone[item.status]
                    )}>
                      {statusLabel[item.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{item.deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-background/70 p-6 shadow-xl">
          <div className="flex items-center gap-3">
            <Shield className="size-5 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Stakeholder radar</p>
              <h3 className="text-2xl font-display">Perfis decisores</h3>
            </div>
          </div>
          <div className="mt-6 space-y-5">
            {stakeholders.map((stakeholder) => (
              <div key={stakeholder.name} className="rounded-2xl border border-white/10 bg-pop/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{stakeholder.name}</p>
                    <p className="text-sm text-muted-foreground">{stakeholder.title}</p>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-[0.65rem] uppercase tracking-[0.3em]">
                    {stakeholder.anchor}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{stakeholder.signal}</p>
              </div>
            ))}
          </div>
          <Link
            href="/amazon-prep/stakeholders"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Abrir dossiê completo
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </DashboardPageLayout>
  );
}
