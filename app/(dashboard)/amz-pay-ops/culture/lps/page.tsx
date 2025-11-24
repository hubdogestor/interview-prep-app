import Link from "next/link";
import { ArrowLeft, CalendarClock, PenTool, Star, Target } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cultureData } from "@/data/amazon/culture";

export default function LPsPage() {
  const lpSignals = [
    {
      label: "Story Bank",
      value: "12 entradas",
      meta: "Atualize 2 histórias por semana",
    },
    {
      label: "LP Focus",
      value: "4 princípios",
      meta: "Associe cada um a um mecanismo",
    },
    {
      label: "Mentoria",
      value: "Quinzenal",
      meta: "Traga 1 história para feedback",
    },
  ];
  const cadenceLoops = [
    {
      title: "Daily Pulse",
      description: "Escreva 5 linhas relacionando um evento real a um LP.",
    },
    {
      title: "Weekly Remix",
      description: "Transforme uma história em narrativa de 2 parágrafos.",
    },
    {
      title: "Monthly Calibration",
      description: "Reveja com o gestor quais histórias contam melhor seu impacto.",
    },
  ];
  const storyPrompts = [
    {
      title: "Customer Obsession",
      detail: "Quando você abriu mão de um caminho mais fácil para proteger o cliente?",
    },
    {
      title: "Dive Deep",
      detail: "Conte uma investigação em que dados derrubaram um mito do time.",
    },
    {
      title: "Bias for Action",
      detail: "Qual aposta calculada você fez mesmo com dados incompletos?",
    },
  ];
  const nextLinks = [
    {
      label: "Working Backwards",
      description: "Transforme histórias em PR/FAQ.",
      href: "/amz-pay-ops/culture/working-backwards",
    },
    {
      label: "Writing Culture",
      description: "Lapide as narrativas com checklist Send.",
      href: "/amz-pay-ops/culture/writing",
    },
    {
      label: "Practice Prompts",
      description: "Ensaios rápidos para entrevistas e WBR.",
      href: "/questions",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Leadership Principles",
        description: "O DNA da Amazon aplicado a Operations.",
      }}
    >
      <AmazonHubShell>
        <div className="space-y-8">
          <Button asChild variant="ghost" className="pl-0 text-sm">
            <Link href="/amz-pay-ops/culture">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Cultura
            </Link>
          </Button>

          <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Star className="size-5 text-primary flex-shrink-0" />
                  Como usar este painel
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Escolha 4 LPs para serem seu &quot;core&quot; e mapeie histórias recentes. Releia semanalmente antes de entrevistas internas, WBR e mecanismos.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {lpSignals.map((signal) => (
                  <div key={signal.label} className="rounded-xl border border-primary/30 bg-background/80 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                    <p className="text-sm font-semibold">{signal.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{signal.meta}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarClock className="size-5 text-primary" />
                  Cadência mínima
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {cadenceLoops.map((loop) => (
                  <div key={loop.title} className="rounded-lg border bg-muted/40 p-3">
                    <p className="font-semibold">{loop.title}</p>
                    <p className="text-xs leading-relaxed">{loop.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Story prompts</h2>
              <p className="text-sm text-muted-foreground">Use estes gatilhos para quebrar o bloqueio de escrita.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {storyPrompts.map((prompt) => (
                <Card key={prompt.title} className="border-border/70">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <PenTool className="size-4 text-primary" />
                      {prompt.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    {prompt.detail}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cultureData.lps.map((lp, index) => (
              <Card key={index} className="flex h-full flex-col border-border/70 transition-all hover:-translate-y-1 hover:border-primary/50">
                <CardHeader className="pb-4">
                  <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Princípio #{index + 1}</span>
                    <Badge variant="secondary" className="rounded-full text-[10px] px-2 py-0.5">Ops Lens</Badge>
                  </div>
                  <CardTitle className="text-base mb-2">{lp.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    &quot;{lp.description}&quot;
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0 pb-4">
                  <div className="rounded-xl border bg-muted/40 p-3 text-sm leading-relaxed">
                    <span className="font-semibold text-primary block mb-1.5 text-xs">Aplicação em Ops</span>
                    <span className="text-xs">{lp.opsApplication}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Conecte com outros hubs</h2>
              <p className="text-sm text-muted-foreground">Leve suas histórias para mecanismos, escrita e prática.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {nextLinks.map((link) => (
                <Card key={link.label} className="border-border/70">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Target className="size-4 text-primary" />
                      {link.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p className="leading-relaxed">{link.description}</p>
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
