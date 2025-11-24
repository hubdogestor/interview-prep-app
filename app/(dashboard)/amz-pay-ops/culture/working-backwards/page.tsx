import Link from "next/link";
import { ArrowLeft, Compass, FileText, Link2, Target } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkingBackwardsPage() {
  const wbSignals = [
    {
      label: "Cliente",
      value: "Persona + cenário",
      meta: "Defina contexto real, não hipotético",
    },
    {
      label: "Métrica",
      value: "North Star",
      meta: "Quanto muda a vida do cliente?",
    },
    {
      label: "FAQ dif",
      value: "3 perguntas",
      meta: "Risco · Custo · Execução",
    },
  ];
  const faqPatterns = [
    {
      title: "Risco",
      detail: "Qual mitigação existe para falha do experimento?",
    },
    {
      title: "Custo",
      detail: "Como justificamos o investimento vs ROI?",
    },
    {
      title: "Operação",
      detail: "Como vamos suportar o mecanismo no Day 2?",
    },
  ];
  const bridgeLinks = [
    {
      label: "LP Story Bank",
      description: "Garanta histórias sólidas antes de escrever o PR.",
      href: "/amz-pay-ops/culture/lps",
    },
    {
      label: "Writing Clinic",
      description: "Use checklist Send para lapidar o texto.",
      href: "/amz-pay-ops/culture/writing",
    },
    {
      label: "Toolkit Artifacts",
      description: "Transforme PR/FAQ em 6-pager, roadmap e WBR.",
      href: "/amz-pay-ops/role/artifacts",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Working Backwards",
        description: "O mecanismo de inovação da Amazon.",
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

          <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Card className="border-border/70">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="size-5 text-primary flex-shrink-0" />
                  O Conceito
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground text-sm">
                <p>
                  A maioria das empresas segue o fluxo: Ideia &gt; Produto &gt; Marketing &gt; Cliente.
                </p>
                <p>
                  Na Amazon, invertemos isso: <strong>Cliente &gt; Press Release &gt; Produto.</strong>
                </p>
                <p>
                  Se você não consegue escrever um Press Release convincente que explique por que o cliente vai amar o produto, então o produto não deve ser construído.
                </p>
                <div className="rounded-xl border bg-muted/40 p-3">
                  <p className="text-xs font-semibold text-primary mb-1.5">Uso prático</p>
                  <p className="text-xs leading-relaxed">
                    Antes de qualquer iniciativa em Payments, escreva um parágrafo de PR/FAQ focado no cliente final e compartilhe com o time.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {wbSignals.map((signal) => (
                    <div key={signal.label} className="rounded-lg border bg-muted/30 p-3 text-xs">
                      <p className="font-semibold uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                      <p className="text-base font-semibold">{signal.value}</p>
                      <p className="text-muted-foreground leading-relaxed">{signal.meta}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">As 5 Perguntas do Cliente</CardTitle>
                <CardDescription className="text-sm">Antes de começar qualquer projeto, responda:</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2.5 text-sm font-medium">
                  <li>Quem é o cliente?</li>
                  <li>Qual é o problema ou oportunidade do cliente?</li>
                  <li>Qual é o benefício mais importante para o cliente?</li>
                  <li>Como você sabe o que o cliente precisa ou quer?</li>
                  <li>Como é a experiência do cliente?</li>
                </ol>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Compass className="size-5 text-primary flex-shrink-0" />
                  Roteiro rápido
                </CardTitle>
                <CardDescription className="text-sm">Checklist para conduzir uma sessão de Working Backwards.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Defina o cliente-alvo e escreva o parágrafo de abertura",
                  "Liste métricas/benefícios tangíveis",
                  "Prepare 3 FAQs difíceis (risco, custo, operação)",
                ].map((item, i) => (
                  <div key={item} className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed">
                    <Badge variant="secondary" className="mb-2 rounded-full text-[10px] px-2 py-0.5">Passo {i + 1}</Badge>
                    <p>{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-5 lg:grid-cols-2">
              <Card className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="size-5 text-primary" />
                    FAQ Patterns
                  </CardTitle>
                  <CardDescription className="text-sm">Não deixe perguntas críticas de fora.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {faqPatterns.map((pattern) => (
                    <div key={pattern.title} className="rounded-lg border bg-muted/30 px-3 py-2 leading-relaxed">
                      <span className="font-semibold">{pattern.title}</span> · {pattern.detail}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Link2 className="size-5 text-primary" />
                    Hand-off para mecanismos
                  </CardTitle>
                  <CardDescription className="text-sm">Mapeie como o PR/FAQ alimenta WBR, QBR e Roadmap.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {["WBR: destaque métricas e asks", "Roadmap: transforme benefícios em milestones", "OP1/OP2: conecte ao investimento"].map((item) => (
                    <div key={item} className="rounded-lg border bg-muted/40 px-3 py-2 leading-relaxed">
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Pontes com outros hubs</h2>
              <p className="text-sm text-muted-foreground">Garanta que o PR/FAQ vire execução.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {bridgeLinks.map((link) => (
                <Card key={link.label} className="border-border/70">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{link.label}</CardTitle>
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
