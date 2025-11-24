import Link from "next/link";
import { ArrowLeft, CalendarClock, Layers3, Link2, PenTool, Sparkles } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cultureData } from "@/data/amazon/culture";

export default function WritingPage() {
  const { principles, artifacts } = cultureData.writing;
  const writingSignals = [
    {
      label: "Doc pipeline",
      value: "3 ativos",
      meta: "Draft, review e ready to ship",
    },
    {
      label: "Tempo de review",
      value: "< 48h",
      meta: "Líder responde em 2 dias úteis",
    },
    {
      label: "FAQ coverage",
      value: "80%",
      meta: "5+ perguntas antecipadas",
    },
  ];
  const cadenceLoops = [
    {
      title: "Segunda: Brief",
      description: "Atualize o problem statement e métricas antes do stand-up.",
    },
    {
      title: "Quarta: Peer review",
      description: "Troque o draft com um parceiro fora do time e colete gaps.",
    },
    {
      title: "Sexta: Dry run",
      description: "Ensaiar leitura silenciosa e FAQ com o sponsor.",
    },
  ];
  const pipelineStages = [
    {
      stage: "Brief",
      detail: "1 página com objetivo, métrica alvo e LP dominante.",
      tip: "Valide com o gestor antes de investir horas em narrativa.",
    },
    {
      stage: "Narrativa",
      detail: "6 páginas que contam o porquê, o como e o impacto previsto.",
      tip: "Use dados reais, mesmo que parciais, ou explique a lacuna.",
    },
    {
      stage: "FAQ",
      detail: "Perguntas difíceis que você mesmo faria para matar o projeto.",
      tip: "Conecte com riscos operacionais e mecanismos existentes.",
    },
    {
      stage: "Read-out",
      detail: "Reunião silenciosa + decisão. Registre owners e próximos passos.",
      tip: "Capture dissent e registre no doc para accountability.",
    },
  ];
  const reviewLoops = [
    {
      title: "Red Team",
      subtitle: "Quality Gate",
      description: "Escolha alguém que discorde naturalmente da ideia para validar história e métricas.",
    },
    {
      title: "Voice of Ops",
      subtitle: "Ground Truth",
      description: "Faça operadores revisarem o impacto real nos processos e SLAs.",
    },
    {
      title: "Leadership edit",
      subtitle: "Tone & bets",
      description: "Use sugestões do VP para calibrar narrativa vs. ambição.",
    },
  ];
  const writingPrompts = [
    {
      title: "Bloqueio",
      detail: "Qual decisão crítica precisa ser tomada após ler este doc?",
    },
    {
      title: "Métrica",
      detail: "Qual métrica muda em 90 dias se seguirmos o plano?",
    },
    {
      title: "Cliente",
      detail: "Qual história de cliente você abre o doc para gerar empatia imediata?",
    },
  ];
  const bridgeLinks = [
    {
      label: "Working Backwards",
      description: "Transforme insights do PR/FAQ em roadmap e mecanismos.",
      href: "/amz-pay-ops/culture/working-backwards",
    },
    {
      label: "Role · Artifacts",
      description: "Conecte docs aprovados aos rituais (WBR, MPR, BR).",
      href: "/amz-pay-ops/role/artifacts",
    },
    {
      label: "Practice · Questions",
      description: "Teste FAQs em voz alta antes do read-out.",
      href: "/questions",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Writing Culture",
        description: "Clareza de pensamento = Clareza de escrita.",
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

          <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <PenTool className="size-5 text-primary flex-shrink-0" />
                  Sistema de Escrita
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Mantenha o pipeline saudável: todo documento precisa de um dono claro, dados auditáveis e FAQ afiado.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {writingSignals.map((signal) => (
                  <div key={signal.label} className="rounded-xl border border-primary/30 bg-background/80 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                    <p className="text-sm font-semibold">{signal.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{signal.meta}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-5">
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

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Dica de Ouro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Antes de enviar qualquer documento, faça o &quot;So What?&quot; test.
                    <br />
                    Para cada parágrafo, pergunte-se: &quot;E daí?&quot;. Se a resposta não for óbvia, reescreva ou apague.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Layers3 className="size-5 text-primary" />
                  Pipeline narrativo
                </CardTitle>
                <CardDescription className="text-sm">Cada estágio tem um dono e um deliverable claro.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pipelineStages.map((stage) => (
                  <div key={stage.stage} className="rounded-xl border bg-muted/30 p-3 text-sm">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <span>{stage.stage}</span>
                      <Badge variant="secondary">Owner definido</Badge>
                    </div>
                    <p className="mt-2 text-muted-foreground">{stage.detail}</p>
                    <p className="mt-1 text-[11px] text-primary">Tip: {stage.tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-5">
              <Card className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="size-5 text-primary" />
                    Loops de review
                  </CardTitle>
                  <CardDescription className="text-sm">Escolha conscientemente quem edita o doc em cada rodada.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reviewLoops.map((loop) => (
                    <div key={loop.title} className="rounded-xl border bg-muted/40 p-3 text-sm">
                      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                        <span>{loop.title}</span>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                          {loop.subtitle}
                        </Badge>
                      </div>
                      <p className="mt-2 text-muted-foreground leading-relaxed">{loop.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <PenTool className="size-4 text-primary" />
                    Checklist &quot;Send&quot;
                  </CardTitle>
                  <CardDescription className="text-xs">3 minutos antes de compartilhar qualquer narrativa.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-muted-foreground">
                  <p>1. BLUF claro no primeiro parágrafo?</p>
                  <p>2. Métricas com número, fonte e owner?</p>
                  <p>3. FAQ cobre riscos operacionais e financeiros?</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Princípios de escrita</h2>
              <p className="text-sm text-muted-foreground">Na Amazon escrevemos para sermos entendidos, não para impressionar.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {principles.map((principle) => (
                <Card key={principle.title} className="border-border/70">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    {principle.desc}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Gatilhos rápidos</h2>
              <p className="text-sm text-muted-foreground">Perguntas para destravar o parágrafo inicial.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {writingPrompts.map((prompt) => (
                <Card key={prompt.title} className="border-border/70">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{prompt.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    {prompt.detail}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Tabs defaultValue="6-pager" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="6-pager">6-Pager</TabsTrigger>
              <TabsTrigger value="pr-faq">PR/FAQ</TabsTrigger>
              <TabsTrigger value="2-pager">2-Pager</TabsTrigger>
            </TabsList>
            {artifacts.map((artifact) => {
              const key = artifact.title.toLowerCase().includes("6")
                ? "6-pager"
                : artifact.title.toLowerCase().includes("pr")
                ? "pr-faq"
                : "2-pager";

              return (
                <TabsContent key={key} value={key}>
                  <Card className="border-border/70">
                    <CardHeader>
                      <CardTitle>{artifact.title}</CardTitle>
                      <CardDescription>{artifact.desc}</CardDescription>
                    </CardHeader>
                    {artifact.structure && (
                      <CardContent>
                        <h4 className="text-sm font-semibold mb-3">Estrutura recomendada</h4>
                        <div className="flex flex-wrap gap-2">
                          {artifact.structure.map((section, i) => (
                            <Badge key={section} variant="secondary">
                              {i + 1}. {section}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Conecte com outros hubs</h2>
              <p className="text-sm text-muted-foreground">Docs fortes alimentam mecanismos, decisões e prática.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {bridgeLinks.map((link) => (
                <Card key={link.label} className="border-border/70">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Link2 className="size-4 text-primary" />
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
