"use client";

import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateProfessionalPDF, type ExportItem } from "@/lib/export/pdf";
import { useToast } from "@/hooks/use-toast";

interface PDFExportButtonProps {
  items: ExportItem[];
  title: string;
  subtitle?: string;
  author?: string;
  filename?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

/**
 * Button component for exporting content to PDF
 * Supports both immediate export and export with options
 */
export function PDFExportButton({
  items,
  title,
  subtitle,
  author,
  filename,
  variant = "outline",
  size = "default",
}: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (includeMetadata = true) => {
    if (items.length === 0) {
      toast({
        title: "Nenhum item para exportar",
        description: "Adicione alguns itens antes de exportar.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);

    try {
      const exportItems = includeMetadata
        ? items
        : items.map((item) => ({ title: item.title, content: item.content }));

      const doc = generateProfessionalPDF(exportItems, {
        title,
        subtitle,
        author,
        date: new Date(),
      });

      const finalFilename = filename || `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.pdf`;
      doc.save(finalFilename);

      toast({
        title: "PDF exportado com sucesso!",
        description: `${items.length} ${items.length === 1 ? "item exportado" : "itens exportados"}.`,
      });
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      toast({
        title: "Erro ao exportar PDF",
        description: "Ocorreu um erro ao gerar o arquivo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} disabled={isExporting} className="gap-2">
          {isExporting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span className="hidden sm:inline">Exportando...</span>
            </>
          ) : (
            <>
              <Download className="size-4" />
              <span className="hidden sm:inline">Exportar PDF</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções de Exportação</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport(true)} className="gap-2">
          <FileText className="size-4" />
          <span>PDF Completo (com metadados)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport(false)} className="gap-2">
          <FileText className="size-4" />
          <span>PDF Simples (sem metadados)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
