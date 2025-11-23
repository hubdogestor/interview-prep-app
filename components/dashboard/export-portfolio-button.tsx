"use client";

import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { downloadMarkdown,exportPortfolioCompleto } from "@/lib/export/markdown";
import { trpc } from "@/lib/trpc/react";
import { useEffect, useState } from "react";

export function ExportPortfolioButton() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: experiencias = [] } = trpc.experiencias.list.useQuery(undefined, { enabled: mounted });
  const { data: competencias = [] } = trpc.competencias.list.useQuery(undefined, { enabled: mounted });

  const handleExportPortfolio = () => {
    if (experiencias.length === 0 && competencias.length === 0) {
      toast.error("Não há dados para exportar");
      return;
    }

    const markdown = exportPortfolioCompleto(experiencias, competencias);
    const filename = `portfolio-completo-${new Date().toISOString().split("T")[0]}`;
    downloadMarkdown(markdown, filename);
    toast.success("Portfólio exportado com sucesso!");
  };

  const hasData = experiencias.length > 0 || competencias.length > 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
            <FileText className="h-5 w-5 text-chart-3" />
          </div>
          <div>
            <h3 className="font-display uppercase text-sm">Exportar Portfólio</h3>
            <p className="text-xs text-muted-foreground">
              Experiências e Competências em Markdown
            </p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPortfolio}
                disabled={!hasData}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Completo
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Baixar portfólio completo com estatísticas e índice</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
}
