"use client";

import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { downloadMarkdown, exportToMarkdown } from "@/lib/export/markdown";
import { exportToPDF } from "@/lib/export/pdf";

interface ExportItem {
  title: string;
  content: string;
  metadata?: Record<string, string | number | boolean>;
}

interface ExportButtonProps {
  items: ExportItem[];
  filename: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
  className?: string;
}

export function ExportButton({
  items,
  filename,
  variant = "outline",
  size = "sm",
  showText = true,
  className = "",
}: ExportButtonProps) {
  const handleExportMarkdown = () => {
    try {
      const markdown = exportToMarkdown(items);
      downloadMarkdown(markdown, filename);
      toast.success("Arquivo Markdown baixado com sucesso!");
    } catch (error) {
      toast.error("Erro ao exportar Markdown");
    }
  };

  const handleExportPDF = () => {
    try {
      exportToPDF(items, filename);
      toast.success("Abrindo visualização de impressão...");
    } catch (error) {
      toast.error("Erro ao exportar PDF");
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant={variant}
          size={size}
          className={className}
        >
          <Download className={showText ? "mr-1 h-3 w-3" : "h-3 w-3"} />
          {showText && "Exportar"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportMarkdown}>
          <FileText className="mr-2 h-4 w-4" />
          Exportar como Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF}>
          <FileText className="mr-2 h-4 w-4" />
          Exportar como PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
