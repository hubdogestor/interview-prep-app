import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Compass, Layers, Sparkles } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import ProcessorIcon from "@/components/icons/proccesor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { dayOneData } from "@/data/amazon/day-one";

const missionHighlights = [
  "Conectar cultura, domínio de pagamentos e mecanismos de execução",
  "Manter o acervo vivo de narrativas, métricas e perguntas críticas",
  "Operar como hub perene: acesse qualquer trilha sem depender de checklists",
];

const referenceGlances = [
  {
    title: "Culture OS",
    description: "Leadership Principles, Working Backwards e escrita narrativa para operar Amazon Payments.",
    icon: Sparkles,
    href: "/amz-pay-ops/culture",
  },
  {
    title: "Domain Playbook",
    description: "Fluxos de Auth/Capture, métricas chave e mapa do ecossistema Amazon Pay.",
    icon: Layers,
    href: "/amz-pay-ops/domain",
  },
  {
    title: "PgM Toolkit",
    description: "Stakeholders, artefatos e mecanismos para liderar operações em Day 1.",
    icon: Compass,
    href: "/amz-pay-ops/role",
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
    description: "Histórias, narrativas e ferramentas de escrita para adaptar LPs a operações reais.",
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
    description: "Fundamentos de pagamentos, Amazon Pay LATAM e guias de risco/fraude.",
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
    description: "Guias sobre clareza de função, stakeholders críticos e artefatos.",
    icon: Compass,
    href: "/amz-pay-ops/role",
    links: [
      { label: "Role Clarity", href: "/amz-pay-ops/role/clarity" },
      { label: "Stakeholders", href: "/amz-pay-ops/role/stakeholders" },
      { label: "Key Artifacts", href: "/amz-pay-ops/role/artifacts" },
    ],
  },
];

const referenceCapsules = [
  {
    title: "Imersão Amazoniana",
    summary: "Narrativas, vocabulário e rituais de escrita para viver os LPs no contexto de Payments.",
    highlights: ["Story bank por LP", "Working Backwards aplicado", "Toolkit de escrita"]
  },
  {
    title: "Domínio de Pagamentos",
    summary: "Mapa ponta-a-ponta de Auth/Capture, métricas e riscos recorrentes em LATAM.",
    highlights: ["Fluxos operacionais", "Amazon Pay LATAM", "Playbooks de fraude"]
  },
  {
    title: "Toolkit de Operações",
    summary: "Artefatos permanentes, stakeholders e mecanismos para Day 1 e Day 2.",
    highlights: ["Role clarity", "Checklist de mecanismos", "Biblioteca de artefatos"]
  },
];

const essentialDocs = [
  {
    title: "Setup & Acessos",
    detail: "Checklist de laptop, VPN, AtoZ, Phonetool e credenciais essenciais.",
  },
  {
    title: "Orientation Pack",
    detail: "Resumo do OP1, mapa de squads e glossário de termos Amazon Pay.",
  },
  {
    title: "Stakeholder Briefs",
    detail: "Quem são Andreia, Sujash e Tech Pods, e quais agendas cada um lidera.",
  },
  {
    title: "Runbook de incidentes",
    detail: "Procedimentos e contatos críticos para P1/P2.",
  },
];

const sandboxLinks = dayOneData.quickLinks.map((link) => ({
  label: link.label,
  description: link.description,
  href: link.href,
}));

const sectionIndex = [
  { label: "Missão", href: "#mission" },
  { label: "Trilhas", href: "#pillars" },
  { label: "Biblioteca", href: "#knowledge" },
  { label: "Readiness", href: "#readiness" },
  { label: "Anchors", href: "#anchors" },
  { label: "Ferramentas", href: "#tools" },
];

export default function AmazonHubPage() {
  const { hero, modules } = dayOneData;

  return (
    <DashboardPageLayout
      header={{
        title: hero.title,
        description: hero.subtitle,
        icon: ProcessorIcon,
      }}
    >
      <AmazonHubShell>
        <section id="mission" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_1fr]">
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
                  Day 1 como biblioteca viva.
                </CardTitle>
                <CardDescription className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  Todas as referências de cultura, domínio e toolkit em um único hub, prontas para consulta a qualquer momento.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid gap-3 sm:grid-cols-3">
                  {missionHighlights.map((item) => (
                    <div key={item} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {referenceGlances.map((glance) => {
                const Icon = glance.icon;
                return (
                  <Card key={glance.title} className="flex h-full flex-col border-border/70">
                    <CardContent className="flex flex-1 flex-col gap-3 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                          <Icon className="size-5" />
                        </div>
                        <p className="text-sm font-semibold">{glance.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{glance.description}</p>
                      <Button asChild variant="secondary" size="sm" className="w-full justify-center">
                        <Link href={glance.href}>
                          Abrir hub
                          <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <nav
            aria-label="Mapa rápido do hub"
            className="rounded-2xl border border-dashed border-border/60 bg-background/60 px-4 py-3"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Seções</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sectionIndex.map((section) => (
                <Link
                  key={section.label}
                  href={section.href}
                  className="rounded-full border border-border/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {section.label}
                </Link>
              ))}
            </div>
          </nav>
        </section>

        <section id="pillars" className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Trilhas principais</h2>
              <p className="text-sm text-muted-foreground">Escolha um módulo e use como referência profunda.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full text-sm">
              <Link href={modules[0]?.href ?? "#"}>Ver mapa completo</Link>
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
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Biblioteca central</h2>
            <p className="text-sm text-muted-foreground">Navegue por coleções temáticas prontas para consulta.</p>
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
                        <Link
                          key={link.label}
                          href={link.href}
                          className="flex items-center justify-between rounded-lg border px-3 py-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          {link.label}
                          <ArrowRight className="size-4" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button asChild variant="ghost" className="w-full justify-start px-0 text-sm text-primary">
                      <Link href={stack.href}>Ver overview completo</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="readiness" className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Readiness path</h2>
            <p className="text-sm text-muted-foreground">Entenda como navegar entre cultura, domínio e toolkit em uma sequência coerente.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {referenceCapsules.map((capsule) => (
              <Card key={capsule.title} className="flex h-full flex-col border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{capsule.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p className="leading-relaxed">{capsule.summary}</p>
                  <div className="space-y-2">
                    {capsule.highlights.map((highlight) => (
                      <div key={highlight} className="rounded-lg border bg-muted/30 px-3 py-2 text-xs uppercase tracking-wide">
                        {highlight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="anchors" className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Day 1 anchors</h2>
            <p className="text-sm text-muted-foreground">Documentos permanentes que ancoram decisões e comunicações.</p>
          </div>
          <Card className="border-border/70">
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {essentialDocs.map((doc) => (
                <div key={doc.title} className="rounded-2xl border bg-muted/30 p-4">
                  <p className="font-semibold">{doc.title}</p>
                  <p className="text-sm leading-relaxed">{doc.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="tools" className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Spaces & sandboxes</h2>
            <p className="text-sm text-muted-foreground">Ambientes seguros para testar narrativas, mecanismos e fluxos internos.</p>
          </div>
          <Card className="border-border/70">
            <CardContent className="space-y-3">
              {sandboxLinks.map((link) => (
                <div key={link.label} className="flex items-center justify-between rounded-2xl border px-4 py-3 text-sm">
                  <div>
                    <p className="font-semibold">{link.label}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{link.description}</p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-primary">
                    <Link href={link.href}>Abrir</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
