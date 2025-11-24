import Link from "next/link";
import { ArrowLeft, Download, FolderCheck } from "lucide-react";

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
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/role">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Toolkit
          </Link>
        </Button>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderCheck className="size-5 text-primary" />
              Ritual de artefatos
            </CardTitle>
            <CardDescription>
              Segunda: Status Report · Quarta: Roadmap · Sexta: Revisão de OP1. Reserve 45 minutos por artefato.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Status Report (Weekly)</CardTitle>
              <CardDescription>Template para WBR.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm font-mono bg-muted p-4 rounded-lg">
                <p><strong>Highlights:</strong> O que entregamos essa semana?</p>
                <p><strong>Lowlights:</strong> O que deu errado? (Seja honesto)</p>
                <p><strong>Blockers:</strong> Onde preciso de ajuda?</p>
                <p><strong>Metrics:</strong> Tabela com KPIs vs Meta.</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full text-[10px]">Soon</Badge>
              </div>
              <Button variant="outline" className="w-full" disabled>
                <Download className="mr-2 size-4" />
                Baixar Template (.docx)
              </Button>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Roadmap (Quarterly)</CardTitle>
              <CardDescription>Visão de médio prazo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm font-mono bg-muted p-4 rounded-lg">
                <p><strong>Goal:</strong> Objetivo estratégico (ex: Reduzir CoP em 5%).</p>
                <p><strong>Initiatives:</strong> Projetos macro.</p>
                <p><strong>Milestones:</strong> Datas de entrega (T-Shirt sizing).</p>
                <p><strong>Dependencies:</strong> Quem pode bloquear?</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full text-[10px]">Soon</Badge>
              </div>
              <Button variant="outline" className="w-full" disabled>
                <Download className="mr-2 size-4" />
                Baixar Template (.xlsx)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
