"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { TranslationDialog } from "./translation-dialog";

interface TranslationButtonProps {
  originalText: string;
  from: "pt" | "en";
  to: "pt" | "en";
  context?: string;
  onTranslationComplete?: (translatedText: string) => void;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function TranslationButton({
  originalText,
  from,
  to,
  context,
  onTranslationComplete,
  variant = "outline",
  size = "sm",
  className,
}: TranslationButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const langLabels = {
    pt: "PT",
    en: "EN",
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setDialogOpen(true)}
        disabled={!originalText.trim()}
        className={className}
      >
        <Languages className="h-4 w-4 mr-2" />
        Traduzir {langLabels[from]} → {langLabels[to]}
      </Button>

      <TranslationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        originalText={originalText}
        from={from}
        to={to}
        context={context}
        onTranslationComplete={onTranslationComplete}
      />
    </>
  );
}
