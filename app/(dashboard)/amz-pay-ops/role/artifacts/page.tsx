import Link from "next/link";
import { ArrowLeft, Download, FolderCheck } from "lucide-react";

import { AmazonHubShell } from "@/components/amazon/hub-shell";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArtifactsPage() {
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
          </Card>

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
      </AmazonHubShell>
    </DashboardPageLayout>
  );
}
