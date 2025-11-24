import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ClipboardList,
  Cpu,
  Globe2,
  Layers3,
  LineChart,
  ShieldCheck,
  Star,
  Target,
  Users2,
} from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import ProcessorIcon from "@/components/icons/proccesor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const jobInfo = {
  title: "Program Manager, Payment Business Operation",
  company: "Amazon",
  location: "São Paulo, Brasil",
  jobId: "3059488",
  partnership: "Oakberry Strategic Partnership",
};

type ModuleTile = {
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

const modules: ModuleTile[] = [
  {
    id: "operating-rhythm",
    title: "Operating Rhythm",
    description:
      "Cadência semanal, 30·60·90 e rituais LIVE com Andreia/Sujash para manter o pulso da operação.",
    icon: Target,
    topics: 3,
    status: "Em curso",
    href: "/amazon-prep/interview-prep",
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
];

const progressTracks = [
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
];

const runwayActions = [
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
];

const timeline = [
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
      "Prioriza eficiência operacional, Six Sigma e ciclos semanais de decisão com dados.",
    anchor: "Andreia",
  },
  {
    name: "Sujash Biswas",
    title: "Head LATAM Payments",
    signal:
      "Olha para escala regional, replicabilidade e como LATAM influencia roadmaps globais.",
    anchor: "Sujash",
  },
  {
    name: "Equipe Oakberry",
    title: "Parceiro estratégico",
    signal:
      "Precisa de visibilidade sobre rollouts, SLAs e integrações conjuntas com Amazon Pay.",
    anchor: "Oak",
  },
];

const metaCards: Array<{
  label: string;
  value: string;
  icon: LucideIcon;
  footnote?: string;
}> = [
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
    value: jobInfo.partnership,
    icon: ShieldCheck,
    footnote: "Modelo Oakberry + Payment Ops",
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
      <section className="grid gap-6 xl:grid-cols-[1.6fr_minmax(320px,1fr)]">
        <div className="relative overflow-hidden rounded-[30px] border border-white/5 bg-gradient-to-br from-primary/20 via-background/70 to-background/20 p-8 shadow-2xl">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,_255,_255,_0.15),_transparent_55%)]" />
          <div className="relative flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
              <span className="rounded-full border border-white/20 px-4 py-1">Amazon Payment Ops</span>
              <Badge variant="outline" className="border-white/30">
                {jobInfo.location}
              </Badge>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Program Manager · {jobInfo.company}
              </p>
              <h1 className="text-4xl sm:text-5xl font-display leading-tight">
                Mission Control do onboarding e operação do Payment Business Operation
              </h1>
              <p className="text-base text-muted-foreground">
                Hub para decisões pós-assinatura: rituais, stakeholders, sistemas e narrativas que mantêm a operação LATAM em ritmo Amazon. Tudo sincronizado com o que Andreia e Sujash esperam nas primeiras 12 semanas.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="xl" asChild>
                <Link href="/amazon-prep/interview-prep">
                  Abrir plano 30·60·90
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#modules">Explorar módulos</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[{
                label: "Escopo",
                value: "LATAM Payment Ops",
              },
              {
                label: "Metodologias",
                value: "Lean · Six Sigma · Working Backwards",
              },
              {
                label: "Foco",
                value: "Onboarding + AI/ML",
              }].map((meta) => (
                <div key={meta.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">{meta.label}</p>
                  <p className="text-lg font-semibold leading-snug">{meta.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          {metaCards.map((meta) => (
            <Card key={meta.label} className="border-white/5 bg-background/70">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                  <meta.icon className="size-4 text-primary" />
                  {meta.label}
                </div>
                <p className="text-2xl font-semibold leading-tight">{meta.value}</p>
                {meta.footnote && <p className="text-sm text-muted-foreground">{meta.footnote}</p>}
              </CardContent>
            </Card>
          ))}
          <Card className="border-white/5 bg-background/70">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                <LineChart className="size-4 text-primary" />
                Health Check
              </div>
              <p className="text-2xl font-semibold">Contexto 65% · Sistemas 40% · Resultados 35%</p>
              <p className="text-sm text-muted-foreground">
                Concluído discovery com stakeholders. Em andamento: fechamento dos alarmes críticos e primeira rodada de scorecards compartilhados.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Checkpoint</p>
            <h2 className="text-3xl font-display">Trilha de progresso</h2>
          </div>
          <Badge variant="outline" className="border-white/30 text-[0.65rem] uppercase tracking-[0.3em]">
            Sprint atual · Operação
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {progressTracks.map((track) => (
            <Card key={track.label} className="border-white/5 bg-background/70">
              <CardContent className="p-5 space-y-4">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">{track.label}</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-4xl font-semibold">{track.value}%</p>
                  <Target className="size-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{track.detail}</p>
                <div className="rounded-full bg-white/5 p-0.5">
                  <div className={cn("rounded-full bg-gradient-to-r", track.tone)}>
                    <Progress value={track.value} className="h-2 bg-transparent" />
                  </div>
                </div>
              </CardContent>
            </Card>
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={module.href}
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <article className="relative h-full overflow-hidden rounded-3xl border border-white/5 bg-background/80 p-5 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40">
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60",
                    "bg-gradient-to-br",
                    module.gradient
                  )}
                />
                <div className="relative flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <module.icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold leading-tight">{module.title}</h3>
                        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                          {module.focus}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-[0.65rem]", module.accent)}>
                      {module.topics} tópicos
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
                  <div className="mt-auto flex items-center justify-between text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground">
                    <span className={cn("rounded-full border px-3 py-1", module.accent)}>{module.status}</span>
                    <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_minmax(320px,1fr)]">
        <Card className="border-white/5 bg-background/70">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Runway imediato</p>
                <h3 className="text-2xl font-display">Blocos prioritários</h3>
              </div>
              <Badge variant="outline" className="border-white/20 text-[0.65rem] uppercase tracking-[0.35em]">
                Semana atual
              </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {runwayActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-pop/40 p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                    {action.tag}
                    <ArrowUpRight className="size-4 text-primary" />
                  </div>
                  <p className="text-lg font-semibold leading-tight">{action.title}</p>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-background/70">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <BarChart3 className="size-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Stakeholder radar</p>
                <h3 className="text-xl font-display">Perfis decisores</h3>
              </div>
            </div>
            <div className="space-y-4">
              {stakeholders.map((stakeholder) => (
                <div key={stakeholder.name} className="rounded-2xl border border-white/10 bg-pop/40 p-4">
                  <div className="flex items-center justify-between">
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Abrir dossiê completo
              <ArrowUpRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_minmax(320px,1fr)]">
        <Card className="border-white/5 bg-background/70">
          <CardContent className="p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Ramp plan</p>
                <h3 className="text-2xl font-display">Runway até o primeiro OP1</h3>
              </div>
              <Badge variant="outline" className="border-white/30 text-[0.65rem] uppercase tracking-[0.3em]">
                Atualizado 23·11·2025
              </Badge>
            </div>
            <div className="space-y-4">
              {timeline.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-pop/40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                        {item.focus}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em]",
                        statusTone[item.status]
                      )}
                    >
                      {statusLabel[item.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{item.deliverable}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-background/70">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <Layers3 className="size-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Docs em andamento</p>
                <h3 className="text-xl font-display">Narrativas e playbooks</h3>
              </div>
            </div>
            <div className="space-y-4">
              {["6-Pager Payment Ops", "Plano 30·60·90", "Mapa de riscos PCI"].map((doc) => (
                <div key={doc} className="flex items-center justify-between rounded-2xl border border-white/10 bg-pop/40 px-4 py-3">
                  <p className="text-sm font-medium">{doc}</p>
                  <Badge variant="outline" className="border-white/20 text-[0.65rem] uppercase tracking-[0.3em]">
                    Draft
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="justify-start gap-2 text-sm" asChild>
              <Link href="/amazon-prep/program-management">
                <ArrowUpRight className="size-4" />
                Ver playbooks
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </DashboardPageLayout>
  );
}
