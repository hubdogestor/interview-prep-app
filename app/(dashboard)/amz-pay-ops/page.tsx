import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BookMarked, CalendarDays, Compass, Layers, Sparkles } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import ProcessorIcon from "@/components/icons/proccesor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { dayOneData } from "@/data/amazon/day-one";

const readinessPhases = [
  {
    id: "immerse",
    badge: "Semana 0",
    title: "Imersão & Cultura",
    description: "Refine histórias dos Leadership Principles, fortaleça vocabulário Amazoniano e pratique Working Backwards.",
    tasks: ["Completar track The Amazonian Way", "Mapear 3 histórias LP", "Revisar Working Backwards"],
  },
  {
    id: "domain",
    badge: "Semana 1",
    title: "Domínio de Pagamentos",
    description: "Conecte fundamentos de Auth/Capture com Amazon Pay e métricas críticas.",
    tasks: ["Montar fluxo ponta-a-ponta", "Destacar riscos conhecidos", "Preparar perguntas para Tech"],
  },
  {
    id: "activate",
    badge: "Semana 2",
    title: "Ative o Toolkit",
    description: "Organize artefatos, rota de stakeholders e mecanismos para operar no Day 1.",
    tasks: ["Atualizar roadmap", "Ensaiar status report", "Planejar 30-60-90"],
  },
];

const missionHighlights = [
  "Conectar cultura, domínio de pagamentos e mecanismos de execução",
  "Manter o acervo vivo de narrativas, métricas e perguntas críticas",
  "Operar como hub perene: acesse qualquer trilha sem depender de checklists",
];

const missionCallouts: {
  label: string;
  value: string;
  meta: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Próxima cerimônia",
    value: "WBR · Sexta 09h",
    meta: "Levar 2 insights de Auth Rate",
    icon: CalendarDays,
  },
  {
    label: "Foco atual",
    value: "Conectar Culture + Domain",
    meta: "Atualize toolkit base antes do Day 1",
    icon: BookMarked,
  },
];

const knowledgeStacks: {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Culture OS",
    description: "LP stories, Writing Rituals e Working Backwards em um só lugar.",
    icon: Sparkles,
    href: "/amz-pay-ops/culture",
    links: [
      { label: "Leadership Principles", href: "/amz-pay-ops/culture/lps" },
      { label: "Working Backwards", href: "/amz-pay-ops/culture/working-backwards" },
      { label: "Writing Culture", href: "/amz-pay-ops/culture/writing" },
    ],
  },
  {
    title: "Payments Intelligence",
    description: "Mapeie Auth Rate, CoP e Amazon Pay LATAM com profundidade.",
    icon: Layers,
    href: "/amz-pay-ops/domain",
    links: [
      { label: "Fundamentals", href: "/amz-pay-ops/domain/fundamentals" },
      { label: "Amazon Pay Ecosystem", href: "/amz-pay-ops/domain/amazon-pay" },
      { label: "Risk & Fraud", href: "/amz-pay-ops/domain/risk-fraud" },
    ],
  },
  {
    title: "PgM Toolkit",
    description: "Stakeholders, mecanismos e artefatos para operar em alta resolução.",
    icon: Compass,
    href: "/amz-pay-ops/role",
    links: [
      { label: "Role Clarity", href: "/amz-pay-ops/role/clarity" },
      { label: "Stakeholders", href: "/amz-pay-ops/role/stakeholders" },
      { label: "Key Artifacts", href: "/amz-pay-ops/role/artifacts" },
    ],
  },
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
      <AmazonHubShell>
        <section id="mission" className="space-y-5">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_1fr]">
            <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
              <CardHeader className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <Badge variant="outline" className="bg-background/60 backdrop-blur text-xs px-3 py-1">
                    {hero.role}
                  </Badge>
                  <span className="text-muted-foreground/80 text-sm">{hero.team}</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                  Day 1 é um estado permanente.
                </CardTitle>
                <CardDescription className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  Este hub consolida cultura, domínio técnico e mecanismos para operar Amazon Payments em qualquer momento. Sem checklists, sem kanban – apenas conhecimento acionável.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid gap-3 sm:grid-cols-3">
                  {missionHighlights.map((item) => (
                    <div key={item} className="rounded-xl border border-border/60 bg-background/60 p-3 text-sm leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {missionCallouts.map((signal) => {
                const Icon = signal.icon;
                return (
                  <Card key={signal.label} className="border-border/70">
                    <CardContent className="flex items-start gap-3 p-4">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                        <Icon className="size-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {signal.label}
                        </p>
                        <p className="text-base font-semibold">{signal.value}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{signal.meta}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pillars" className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Launch Pillars</h2>
              <p className="text-sm text-muted-foreground">Selecione uma trilha e aprofunde sem depender de progresso.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full text-sm">
              <Link href={modules[0]?.href ?? "#"}>Navegar pelas trilhas</Link>
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card
                  key={module.id}
                  className="flex h-full flex-col justify-between border-border/70 bg-card/90 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                        <Icon className="size-6" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <CardTitle className="text-base font-semibold">{module.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">{module.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0">
                    <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                      {module.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2">
                          <span className="size-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                          <span className="flex-1">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button asChild variant="secondary" className="w-full group text-sm">
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

        <section id="knowledge" className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Knowledge Library</h2>
              <p className="text-sm text-muted-foreground">Cards com links diretos para subtrilhas e documentos.</p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {knowledgeStacks.map((stack) => {
              const Icon = stack.icon;
              return (
                <Card key={stack.title} className="flex h-full flex-col border-border/70">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                        <Icon className="size-6" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-base font-semibold">{stack.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">{stack.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0">
                    <div className="space-y-2 text-sm">
                      {stack.links.map((link) => (
                        <Link key={link.label} href={link.href} className="flex items-center justify-between rounded-lg border px-3 py-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                          {link.label}
                          <ArrowRight className="size-4" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button asChild variant="ghost" className="w-full justify-start px-0 text-sm text-primary">
                      <Link href={stack.href}>
                        Ver overview completo
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="readiness" className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Readiness Path</h2>
            <p className="text-sm text-muted-foreground">Use como bússola atemporal – não como checklist.</p>
          </div>
          <Card className="border-border/70">
            <CardContent className="pt-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-7">
                  {readinessPhases.map((phase) => (
                    <div key={phase.id} className="relative pl-12">
                      <div className="absolute left-0 top-0 flex size-8 items-center justify-center rounded-full border bg-background flex-shrink-0">
                        <span className="text-[10px] font-bold">{phase.badge}</span>
                      </div>
                      <h3 className="text-base font-semibold mb-1.5">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{phase.description}</p>
                      <Separator className="my-3" />
                      <ul className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
                        {phase.tasks.map((task) => (
                          <li key={task} className="rounded-lg border bg-muted/40 px-3 py-2 leading-relaxed">
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

        <section id="anchors" className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Day 1 Anchors</CardTitle>
              <CardDescription className="text-sm">Referências permanentes – revise sempre que necessário.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dayOneChecklist.map((item, index) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className="size-5 rounded-full border border-border/70 text-[10px] font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    {index !== dayOneChecklist.length - 1 && (
                      <span className="mt-1 h-8 w-px bg-border" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card id="tools" className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Tool Simulators</CardTitle>
              <CardDescription className="text-sm">Espaços para prototipar mecanismos.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <div
                    key={link.href}
                    className="flex items-center gap-3 rounded-xl border border-dashed bg-muted/30 p-3"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Icon className="size-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="text-sm font-medium leading-tight">{link.label}</p>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 flex-shrink-0">
                      {link.status}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
