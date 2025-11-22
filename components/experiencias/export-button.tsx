"use client";

import type { Experiencia } from "@/types";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { downloadMarkdown,exportExperiencias } from "@/lib/export/markdown";

interface ExportButtonProps {
  experiencia?: Experiencia;
  experiencias?: Experiencia[];
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ExportExperienciaButton({
  experiencia,
  experiencias,
  variant = "outline",
  size = "sm",
}: ExportButtonProps) {
  const handleExport = () => {
    const dataToExport = experiencia ? [experiencia] : experiencias || [];

    if (dataToExport.length === 0) {
      toast.error("Nenhuma experiência para exportar");
      return;
    }

    const markdown = exportExperiencias(dataToExport);
    const filename = experiencia
      ? `experiencia-${experiencia.empresa.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}`
      : `experiencias-${new Date().toISOString().split("T")[0]}`;

    downloadMarkdown(markdown, filename);

    toast.success(
      experiencia
        ? "Experiência exportada com sucesso!"
        : `${dataToExport.length} experiências exportadas com sucesso!`
    );
  };

  return (
    <Button variant={variant} size={size} onClick={handleExport}>
      <Download className="h-4 w-4 mr-2" />
      {experiencia ? "Export" : `Export (${experiencias?.length || 0})`}
    </Button>
  );
}
