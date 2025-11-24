import Link from "next/link";
import { ArrowUpRight, BarChart3, Layers3, LineChart, Target } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import ProcessorIcon from "@/components/icons/proccesor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { amazonHubData } from "@/data/amazon/onboarding";
import { cn } from "@/lib/utils";

const {
  jobInfo,
  modules,
  progressTracks,
  runwayActions,
  timeline,
  statusTone,
  statusLabel,
  stakeholders,
  metaCards,
  heroMeta,
  healthCheck,
  docsInFlight,
} = amazonHubData;

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
                <Link href="/amazon-prep/operating-rhythm">
                  Abrir plano 30·60·90
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#modules">Explorar módulos</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroMeta.map((meta) => (
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
                {healthCheck.title}
              </div>
              <p className="text-2xl font-semibold">{healthCheck.summary}</p>
              <p className="text-sm text-muted-foreground">{healthCheck.detail}</p>
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
              {timeline.map((item) => {
                const tone = statusTone[item.status as keyof typeof statusTone] ?? "";
                const label = statusLabel[item.status as keyof typeof statusLabel] ?? item.status;
                return (
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
                          tone
                        )}
                      >
                        {label}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{item.deliverable}</p>
                  </div>
                );
              })}
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
              {docsInFlight.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-pop/40 px-4 py-3">
                  <p className="text-sm font-medium">{doc.name}</p>
                  <Badge variant="outline" className="border-white/20 text-[0.65rem] uppercase tracking-[0.3em]">
                    {doc.status}
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
