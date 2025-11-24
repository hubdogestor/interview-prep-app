import Link from "next/link";
import { ArrowLeft, MessageSquare, Share2, User } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roleData } from "@/data/amazon/role";

export default function StakeholdersPage() {
  const { stakeholders } = roleData;
  const cadenceSignals = [
    {
      label: "Andreia",
      value: "Seg · 09h",
      meta: "Status + métricas",
    },
    {
      label: "Sujash",
      value: "Qui · 10h (PST)",
      meta: "BLUF + replicabilidade",
    },
    {
      label: "Tech Pods",
      value: "Daily async",
      meta: "Blockers + runway",
    },
  ];
  const prepChecklist = [
    "Defina objetivo do toque (Ask x Inform)",
    "Traga 1 métrica + 1 insight",
    "Antecipe perguntas difíceis (risco, custo, prazo)",
  ];
  const influenceAngles = [
    {
      title: "Dados",
      description: "Use Auth Rate, CoP e metricas operacionais para fundamentar pedidos.",
    },
    {
      title: "Narrativa",
      description: "Conecte o cliente final ao impacto para obter buy-in mais rápido.",
    },
    {
      title: "Ritmo",
      description: "Marque checkpoints fixos e evite dependências silenciosas.",
    },
  ];

  return (
    <DashboardPageLayout
      header={{
        title: "Stakeholder Management",
        description: "Influência sem autoridade.",
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
                <CardTitle className="text-base">Playbook de influência</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Releia antes das reuniões 1:1. Entre com dados (Andreia), visão (Sujash) e clareza técnica (Eng).
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {cadenceSignals.map((signal) => (
                  <div key={signal.label} className="rounded-xl border border-primary/30 bg-background/70 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                    <p className="text-sm font-semibold">{signal.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{signal.meta}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="size-4 text-primary" />
                  Checklist pré-1:1
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {prepChecklist.map((item) => (
                  <div key={item} className="rounded-lg border bg-muted/40 px-3 py-2 leading-relaxed">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stakeholders.map((person, i) => (
              <Card key={i} className="flex h-full flex-col border-border/70">
                <CardHeader className="flex flex-row items-center gap-3 pb-3">
                  <Avatar className="size-12 flex-shrink-0">
                    <AvatarImage src={`/avatars/${person.name.split(" ")[0].toLowerCase()}.png`} />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 flex-1">
                    <CardTitle className="text-sm font-semibold">{person.name}</CardTitle>
                    <CardDescription className="text-xs">{person.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Foco</span>
                    <p className="text-sm font-medium mt-1">{person.focus}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-xs leading-relaxed">
                    <span className="font-bold block mb-1.5">Estratégia:</span>
                    {person.strategy}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Ângulos de influência</h2>
              <p className="text-sm text-muted-foreground">Combine dados, narrativa e cadência para acelerar decisões.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {influenceAngles.map((angle) => (
                <Card key={angle.title} className="border-border/70">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Share2 className="size-4 text-primary" />
                      {angle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    {angle.description}
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
