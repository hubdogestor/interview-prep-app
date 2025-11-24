import Link from "next/link";
import { CalendarClock, Link2, NotebookPen, Target } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { ExportButton } from "@/components/export/export-button";
import QuestionIcon from "@/components/icons/question";
import { QuestionList } from "@/components/questions/question-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/trpc/server";

export default async function QuestionsPage() {
  const caller = await api();
  const allQuestions = await caller.questions.list();

  const questionsData = allQuestions.map((q) => ({
    ...q,
    pergunta: q.pergunta as { pt: string; en: string },
  }));

  // Prepare export data
  const exportItems = questionsData.map((question) => ({
    title: question.pergunta.pt,
    content: question.contexto || "",
    metadata: {
      Categoria: question.categoria,
      Prioridade: question.prioridade,
      "Pergunta (EN)": question.pergunta.en || "",
    },
  }));

  const totalQuestions = questionsData.length;
  const highPriorityCount = questionsData.filter((q) => q.prioridade === "alta").length;
  const categories = Array.from(new Set(questionsData.map((q) => q.categoria).filter(Boolean)));
  const lastUpdatedRaw = questionsData[0]?.updatedAt ?? questionsData[0]?.createdAt;
  const formatDate = (value: Date | string | undefined) => {
    if (!value) return "—";
    const date = typeof value === "string" ? new Date(value) : value;
    return isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  };
  const lastUpdated = formatDate(lastUpdatedRaw as Date | string | undefined);

  const questionSignals = [
    {
      label: "Banco ativo",
      value: `${totalQuestions} perguntas`,
      meta: "Mantenha 30 vivas (60/40 pt·en)",
    },
    {
      label: "Prioridade alta",
      value: `${highPriorityCount}`,
      meta: "Use semanalmente com VP / VTeam",
    },
    {
      label: "Última revisão",
      value: lastUpdated,
      meta: lastUpdated === "—" ? "Registre 3 hoje" : "Atualize FAQs antes do WBR",
    },
  ];

  const cadenceLoops = [
    {
      title: "Daily Check-in",
      cadence: "Manhã",
      description: "Escolha 1 pergunta e valide se ainda gera tensão.",
    },
    {
      title: "Weekly Refresh",
      cadence: "Quinta",
      description: "Adicione métricas e próxima action para 3 perguntas.",
    },
    {
      title: "Monthly Playback",
      cadence: "Último dia útil",
      description: "Envie top 5 dúvidas respondidas para stakeholders-chave.",
    },
  ];

  const bridgeLinks = [
    {
      label: "Practice HQ",
      description: "Ensaios rápidos usando perguntas reais antes das sessões gravadas.",
      href: "/practice",
    },
    {
      label: "Writing Culture",
      description: "Leve as respostas mais ricas para 2 ou 6 pagers.",
      href: "/amz-pay-ops/culture/writing",
    },
    {
      label: "PgM Toolkit",
      description: "Mapeie perguntas por stakeholder e mecanismo.",
      href: "/amz-pay-ops/role/stakeholders",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Perguntas-chave",
        description: "Perguntas para stakeholders e revisões",
        icon: QuestionIcon,
        action: <ExportButton items={exportItems} filename="questions" />,
      }}
    >
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Sistema de perguntas</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Mantenha o banco atualizado e atrele cada pergunta a um próximo experimento.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {questionSignals.map((signal) => (
                <div key={signal.label} className="rounded-xl border bg-muted/40 p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                  <p className="text-lg font-semibold">{signal.value}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{signal.meta}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <NotebookPen className="size-5 text-primary flex-shrink-0" />
                Cadência de uso
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Trate o banco como um produto vivo: revisão curta diária e ciclos largos mensais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {cadenceLoops.map((loop) => (
                <div key={loop.title} className="rounded-lg border border-primary/30 bg-background/70 p-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                    <span>{loop.title}</span>
                    <span className="rounded-full border px-2 py-0.5 text-[10px]">{loop.cadence}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{loop.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Scoreboard</h2>
            <p className="text-sm text-muted-foreground">Revise estes números toda segunda-feira antes do Sprint.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[{
              label: "Perguntas totais",
              value: totalQuestions,
              meta: "Ative 3 novas por mês",
              icon: Target,
            },
            {
              label: "Categorias ativas",
              value: categories.length,
              meta: "Customer · Tech · Finance...",
              icon: Link2,
            },
            {
              label: "Prioridade alta",
              value: highPriorityCount,
              meta: "Use em WBR/MPR",
              icon: CalendarClock,
            },
            {
              label: "Atualização",
              value: lastUpdated,
              meta: "Não deixe passar 14 dias",
              icon: NotebookPen,
            }].map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="border-border/70">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-display">{stat.value}</p>
                      <p className="text-[11px] text-muted-foreground">{stat.meta}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Próximos passos</h2>
            <p className="text-sm text-muted-foreground">Use as perguntas para alimentar prática, escrita e stakeholdering.</p>
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

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Banco vivo</h2>
              <p className="text-sm text-muted-foreground">Registre contexto, prioridade e mantenha o FAQ alinhado.</p>
            </div>
            <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
              Atualizado {lastUpdated}
            </Badge>
          </div>
          <Card className="border-border/70">
            <CardContent className="p-0">
              <QuestionList initialQuestions={questionsData} />
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardPageLayout>
  );
}
