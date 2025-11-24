import Link from "next/link";
import { ArrowRight, BookMarked, MessageSquare, NotebookPen, Sparkles } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cultureData } from "@/data/amazon/culture";
import { cn } from "@/lib/utils";

export default function CulturePage() {
  const { hero, sections } = cultureData;
  const focusHighlights = [
    "Dominar 2 histórias de LP para cada mecanismo",
    "Converter insights em ações concretas para Day 1",
    "Praticar escrita narrativa com feedback rápido",
  ];
  const narrativePulse = [
    {
      label: "Story Bank",
      value: "12 entradas",
      meta: "Atualize 2 histórias por semana",
      icon: BookMarked,
    },
    {
      label: "Writing Cadence",
      value: "3 rituais",
      meta: "Daily Pulse · Weekly Remix · Monthly OP",
      icon: NotebookPen,
    },
    {
      label: "PR/FAQ ativos",
      value: "2 drafts",
      meta: "Wallet LATAM · BNPL Ops",
      icon: MessageSquare,
    },
  ];
  const cultureLoops = [
    {
      title: "Daily Pulse",
      cadence: "Diário",
      description: "Relacione um evento real com um LP antes das 10h.",
      actions: ["Escreva 5 linhas", "Compartilhe em 1:1 ou no canal"],
    },
    {
      title: "Weekly Remix",
      cadence: "Sexta",
      description: "Selecione 1 história e transforme em narrativa de 2 parágrafos.",
      actions: ["Adicione métricas", "Liste próximos experimentos"],
    },
    {
      title: "Monthly Calibration",
      cadence: "Mensal",
      description: "Revise com o gestor quais histórias contam melhor seu impacto.",
      actions: ["Mapeie gaps", "Planeje novos contextos"],
    },
  ];
  const microPractices = [
    {
      title: "Working Backwards Sprint",
      description: "30 minutos para escrever um parágrafo PR + 3 FAQs difíceis.",
      href: "/amz-pay-ops/culture/working-backwards",
    },
    {
      title: "LP Story Lab",
      description: "Use o template de Leadership Principles e gere ângulos diferentes.",
      href: "/amz-pay-ops/culture/lps",
    },
    {
      title: "Writing Clinic",
      description: "Revisão rápida de 6-pager/2-pager com checklist Send.",
      href: "/amz-pay-ops/culture/writing",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: hero.title,
        description: hero.subtitle,
      }}
    >
      <AmazonHubShell>
        <div className="space-y-8">
          <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <Card className="border-border/70">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Sistema operacional Amazoniano</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{hero.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {focusHighlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border bg-muted/40 px-3 py-2.5 text-xs font-medium text-muted-foreground leading-relaxed"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="size-5 text-primary flex-shrink-0" />
                  Ritual diário
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Escolha um princípio de liderança, escreva um parágrafo relacionando com sua experiência e compartilhe com um mentor.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Objetivo: criar um banco de histórias autênticas e atualizadas para entrevistas internas, avaliações e WBRs.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            {narrativePulse.map((signal) => {
              const Icon = signal.icon;
              return (
                <Card key={signal.label} className="border-border/70">
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                      <p className="text-base font-semibold">{signal.value}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{signal.meta}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Culture Library</h2>
              <p className="text-sm text-muted-foreground">Trilhas sempre ativas para conectar cultura a execução.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card
                    key={section.id}
                    className="flex flex-col overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className={cn("h-1.5 w-full", section.bgColor.replace("/10", ""))}></div>
                    <CardHeader className="flex-1 pb-4">
                      <div className={cn("mb-3 flex size-12 items-center justify-center rounded-xl flex-shrink-0", section.bgColor, section.color)}>
                        <Icon className="size-6" />
                      </div>
                      <CardTitle className="mb-2 text-base">{section.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3">{section.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-0 pb-4">
                      <Button asChild variant="secondary" className="w-full group text-sm">
                        <Link href={section.href}>
                          Explorar trilha
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Culture Systems</h2>
              <p className="text-sm text-muted-foreground">Rituais que mantêm cultura viva e acionável.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {cultureLoops.map((loop) => (
                <Card key={loop.title} className="flex h-full flex-col border-border/70">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold uppercase tracking-wide">{loop.title}</span>
                      <span className="rounded-full border px-2 py-0.5 text-[10px]">{loop.cadence}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs text-muted-foreground">
                    <p className="leading-relaxed">{loop.description}</p>
                    <div className="space-y-1.5">
                      {loop.actions.map((action) => (
                        <div key={action} className="rounded-lg border bg-muted/40 px-2.5 py-1.5 leading-snug">
                          {action}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Micro Practices</h2>
              <p className="text-sm text-muted-foreground">Use estes gatilhos para transformar cultura em ação.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {microPractices.map((practice) => (
                <Card key={practice.title} className="flex h-full flex-col border-border/70">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{practice.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 text-sm text-muted-foreground">
                    <p className="leading-relaxed">{practice.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4">
                    <Button asChild variant="ghost" className="justify-start px-0 text-sm text-primary">
                      <Link href={practice.href}>Abrir guia</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Cultura em outros hubs</h2>
              <p className="text-sm text-muted-foreground">Continue a jornada conectando cultura com domínio e execução.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[{ label: "Domain Playbook", href: "/amz-pay-ops/domain", description: "Mapeie Auth Rate, CoP e Amazon Pay LATAM" }, { label: "PgM Toolkit", href: "/amz-pay-ops/role", description: "Artefatos, stakeholders e mecanismos" }, { label: "Practice Prompts", href: "/questions", description: "Ensaios contínuos para entrevistas e WBR" }].map((link) => (
                <Card key={link.label} className="border-border/70">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{link.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p className="mb-2 leading-relaxed">{link.description}</p>
                    <Button asChild variant="secondary" size="sm">
                      <Link href={link.href}>Abrir hub</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
