import Link from "next/link";
import { ArrowLeft, Download, FolderCheck, PenTool, Timer } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArtifactsPage() {
  const rhythm = [
    {
      label: "Segunda",
      focus: "Status Report",
      detail: "Atualize métricas e riscos antes do WBR",
    },
    {
      label: "Quarta",
      focus: "Roadmap",
      detail: "Valide dependências e T-shirt sizing",
    },
    {
      label: "Sexta",
      focus: "OP1 snippets",
      detail: "Documente aprendizados e próximos bets",
    },
  ];
  const quickNotes = [
    "Sempre traga uma métrica comparada à meta",
    "Use BLUF nos e-mails com artefatos anexos",
    "Peça revisão cruzada antes de enviar para liderança",
  ];
  return (
    <DashboardPageLayout
      header={{
        title: "Key Artifacts",
        description: "Templates para o dia a dia.",
      }}
    >
      <AmazonHubShell>
        <div className="space-y-8">
          <Button asChild variant="ghost" className="pl-0 text-sm">
            <Link href="/amz-pay-ops/role">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Toolkit
            </Link>
          </Button>

          <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FolderCheck className="size-5 text-primary flex-shrink-0" />
                  Ritual de artefatos
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Segunda: Status Report · Quarta: Roadmap · Sexta: Revisão de OP1. Reserve 45 minutos por artefato.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {rhythm.map((item) => (
                  <div key={item.label} className="rounded-xl border border-primary/30 bg-background/80 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold">{item.focus}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <PenTool className="size-4 text-primary" />
                  Quick notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {quickNotes.map((note) => (
                  <div key={note} className="rounded-lg border bg-muted/40 px-3 py-2 leading-relaxed">
                    {note}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-dashed border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Status Report (Weekly)</CardTitle>
                <CardDescription className="text-sm">Template para WBR.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-xs font-mono bg-muted p-3 rounded-lg leading-relaxed">
                  <p><strong>Highlights:</strong> O que entregamos essa semana?</p>
                  <p><strong>Lowlights:</strong> O que deu errado? (Seja honesto)</p>
                  <p><strong>Blockers:</strong> Onde preciso de ajuda?</p>
                  <p><strong>Metrics:</strong> Tabela com KPIs vs Meta.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full text-[10px] px-2 py-0.5">Soon</Badge>
                </div>
                <Button variant="outline" className="w-full text-sm" disabled>
                  <Download className="mr-2 size-4" />
                  Baixar Template (.docx)
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Roadmap (Quarterly)</CardTitle>
                <CardDescription className="text-sm">Visão de médio prazo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-xs font-mono bg-muted p-3 rounded-lg leading-relaxed">
                  <p><strong>Goal:</strong> Objetivo estratégico (ex: Reduzir CoP em 5%).</p>
                  <p><strong>Initiatives:</strong> Projetos macro.</p>
                  <p><strong>Milestones:</strong> Datas de entrega (T-Shirt sizing).</p>
                  <p><strong>Dependencies:</strong> Quem pode bloquear?</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full text-[10px] px-2 py-0.5">Soon</Badge>
                </div>
                <Button variant="outline" className="w-full text-sm" disabled>
                  <Download className="mr-2 size-4" />
                  Baixar Template (.xlsx)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Tempo de preparação</h2>
            <p className="text-sm text-muted-foreground">Planeje blocos focados para cada entrega.</p>
          </div>
          <Card className="border-border/70">
            <CardContent className="grid gap-4 md:grid-cols-3 p-4">
              {[
                { label: "Status", minutes: 45, tip: "Atualize métricas e riscos" },
                { label: "Roadmap", minutes: 60, tip: "Valide dependências" },
                { label: "OP1/Docs", minutes: 90, tip: "Revise narrativa" },
              ].map((slot) => (
                <div key={slot.label} className="rounded-lg border bg-muted/40 p-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    <span>{slot.label}</span>
                    <Timer className="size-4 text-primary" />
                  </div>
                  <p className="text-2xl font-semibold">{slot.minutes}m</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{slot.tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
