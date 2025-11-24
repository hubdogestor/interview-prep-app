import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CalendarDays, CheckCircle2, Circle, Compass, Layers, Sparkles, Target } from "lucide-react";

import { Countdown } from "@/components/amazon/countdown";
import DashboardPageLayout from "@/components/dashboard/layout";
import ProcessorIcon from "@/components/icons/proccesor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { dayOneData } from "@/data/amazon/day-one";

const readinessPhases: {
  id: string;
  badge: string;
  title: string;
  description: string;
  tasks: string[];
}[] = [
  {
    id: "immerse",
    badge: "Semana 0",
    title: "Imersão & Cultura",
    description: "Refine histórias dos Leadership Principles e fortaleça o vocabulário Amazoniano.",
    tasks: ["Completar track The Amazonian Way", "Mapear 3 histórias LP", "Revisar Working Backwards"]
  },
  {
    id: "domain",
    badge: "Semana 1",
    title: "Domínio de Pagamentos",
    description: "Conecte fundamentos de Auth/Capture com os produtos Amazon Pay e métricas críticas.",
    tasks: ["Montar fluxo ponta-a-ponta", "Destacar riscos conhecidos", "Preparar perguntas para Tech"]
  },
  {
    id: "activate",
    badge: "Semana 2",
    title: "Ative o Toolkit",
    description: "Organize artefatos, rota de stakeholders e mecanismos para operar no Day 1.",
    tasks: ["Atualizar roadmap", "Ensaiar status report", "Planejar 30-60-90"]
  }
];

const focusStreams: {
  title: string;
  description: string;
  metric: string;
  status: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Business Foundations",
    description: "Documentar insights de LPs + mecanismos para entrevistas internas.",
    metric: "3 histórias curadas",
    status: "On Track",
    icon: Sparkles
  },
  {
    title: "Payments Intelligence",
    description: "Mapear Auth Rate, CoP e gaps de reconciliação no contexto LATAM.",
    metric: "Auth Rate deck 60%",
    status: "Em progresso",
    icon: Layers
  },
  {
    title: "PgM Toolkit",
    description: "Ajustar cadência de WBR/QBR, playbooks de COE e templates de status.",
    metric: "2 artefatos prontos",
    status: "Precisa foco",
    icon: Compass
  }
];

const signalCards: {
  label: string;
  value: string;
  meta: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Próxima cerimônia",
    value: "WBR · Sexta 09h",
    meta: "Levar 2 insights de Auth Rate",
    icon: CalendarDays
  },
  {
    label: "Foco da semana",
    value: "Day 1 Readiness",
    meta: "Fechar módulos Culture + Domain",
    icon: Target
  }
];

export default function AmazonHubPage() {
  const { hero, modules, quickLinks, dayOneChecklist } = dayOneData;

  return (
    <DashboardPageLayout
      header={{
        title: hero.title,
        description: hero.subtitle,
        icon: ProcessorIcon,
      }}
    >
      <div className="space-y-10">
        <section className="grid gap-6 xl:grid-cols-[2.1fr_1fr]">
          <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
            <CardHeader className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="outline" className="bg-background/60 backdrop-blur">
                  {hero.role}
                </Badge>
                <span className="text-muted-foreground/80">{hero.team}</span>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-semibold tracking-tight">
                Day 1 is loading. Faltam poucos ciclos.
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                Prepare-se para liderar Payments Business Operations dominando cultura, domínio técnico e mecanismos.
                Este hub consolida tudo que você precisa para acelerar.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 grid gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-center">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {signalCards.map((signal) => {
                    const Icon = signal.icon;
                    return (
                      <div
                        key={signal.label}
                        className="rounded-2xl border bg-background/80 p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon className="size-4" />
                          {signal.label}
                        </div>
                        <p className="mt-2 text-lg font-semibold">{signal.value}</p>
                        <p className="text-sm text-muted-foreground">{signal.meta}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Card className="w-full max-w-xs border-primary/30 bg-background/70 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Launch Clock
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Countdown targetDate={hero.targetDate} />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {focusStreams.slice(0, 2).map((stream) => {
              const Icon = stream.icon;
              return (
                <Card key={stream.title} className="h-full border-dashed">
                  <CardHeader className="flex flex-row items-start justify-between gap-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <Badge variant="secondary" className="rounded-full">
                      {stream.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">
                      {stream.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stream.description}</p>
                    <p className="text-xs font-medium text-primary">{stream.metric}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Trilhas Principais</h2>
              <p className="text-sm text-muted-foreground">Escolha um módulo e avance com profundidade.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href={modules[0]?.href ?? "#"}>Continuar de onde parei</Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card
                  key={module.id}
                  className="flex h-full flex-col justify-between border-border/60 bg-card/90 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                      {module.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-primary/60" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="secondary" className="w-full group">
                      <Link href={module.href}>
                        Abrir módulo
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Streams em andamento</h2>
              <p className="text-sm text-muted-foreground">Onde concentrar energia nesta semana.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {focusStreams.map((stream) => {
              const Icon = stream.icon;
              return (
                <Card key={stream.title} className="flex flex-col border-border/70">
                  <CardHeader className="flex flex-row items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{stream.title}</CardTitle>
                        <CardDescription>{stream.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="rounded-full text-xs">
                      {stream.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-primary">{stream.metric}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Day 1 Checklist</CardTitle>
              <CardDescription>Visualize a cadência das entregas essenciais.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {dayOneChecklist.map((item, index) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {item.completed ? (
                      <CheckCircle2 className="size-5 text-primary" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground" />
                    )}
                    {index !== dayOneChecklist.length - 1 && (
                      <span className="mt-1 h-8 w-px bg-border" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${item.completed ? "text-muted-foreground line-through" : ""}`}>
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Tool Simulators</CardTitle>
              <CardDescription>Em breve com dados reais.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <div
                    key={link.href}
                    className="flex items-center gap-4 rounded-2xl border border-dashed bg-muted/30 p-4"
                  >
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium leading-tight">{link.label}</p>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-auto text-[10px]">
                      {link.status}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Readiness Path</CardTitle>
              <CardDescription>Mini roadmap para as próximas três semanas.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-8">
                  {readinessPhases.map((phase) => (
                    <div key={phase.id} className="relative pl-12">
                      <div className="absolute left-0 top-0 flex size-8 items-center justify-center rounded-full border bg-background">
                        <span className="text-xs font-bold">{phase.badge}</span>
                      </div>
                      <h3 className="text-lg font-semibold">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
                      <Separator className="my-3" />
                      <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                        {phase.tasks.map((task) => (
                          <li key={task} className="rounded-lg border bg-muted/40 px-3 py-2">
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardPageLayout>
  );
}
