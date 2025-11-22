"use client";

import type { Competencia } from "@prisma/client";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { downloadMarkdown,exportCompetencias } from "@/lib/export/markdown";

interface ExportButtonProps {
  competencia?: Competencia;
  competencias?: Competencia[];
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ExportCompetenciaButton({
  competencia,
  competencias,
  variant = "outline",
  size = "sm",
}: ExportButtonProps) {
  const handleExport = () => {
    const dataToExport = competencia ? [competencia] : competencias || [];

    if (dataToExport.length === 0) {
      toast.error("Nenhuma competência para exportar");
      return;
    }

    const markdown = exportCompetencias(dataToExport);
    const filename = competencia
      ? `competencia-${competencia.nome.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}`
      : `competencias-${new Date().toISOString().split("T")[0]}`;

    downloadMarkdown(markdown, filename);

    toast.success(
      competencia
        ? "Competência exportada com sucesso!"
        : `${dataToExport.length} competências exportadas com sucesso!`
    );
  };

  return (
    <Button variant={variant} size={size} onClick={handleExport}>
      <Download className="h-4 w-4 mr-2" />
      {competencia ? "Export" : `Export (${competencias?.length || 0})`}
    </Button>
  );
}
