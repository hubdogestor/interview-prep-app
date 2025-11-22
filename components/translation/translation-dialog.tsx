"use client";

import { useState } from "react";
import { ArrowRight, Check,Copy, Languages, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc/react";

interface TranslationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  originalText: string;
  from: "pt" | "en";
  to: "pt" | "en";
  context?: string;
  onTranslationComplete?: (translatedText: string) => void;
}

export function TranslationDialog({
  open,
  onOpenChange,
  originalText,
  from,
  to,
  context,
  onTranslationComplete,
}: TranslationDialogProps) {
  const [translatedText, setTranslatedText] = useState("");
  const [copied, setCopied] = useState(false);

  const translateMutation = trpc.ai.translateContent.useMutation();

  const handleTranslate = async () => {
    try {
      const result = await translateMutation.mutateAsync({
        content: originalText,
        from,
        to,
        context,
      });

      setTranslatedText(result);
      toast.success("Tradução concluída!");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao traduzir conteúdo";
      toast.error(errorMessage);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    toast.success("Tradução copiada!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseTranslation = () => {
    if (onTranslationComplete) {
      onTranslationComplete(translatedText);
    }
    onOpenChange(false);
  };

  const langLabels = {
    pt: "Português",
    en: "English",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Tradução Automática
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Language Direction */}
          <div className="flex items-center justify-center gap-3 py-2">
            <Badge variant="outline" className="text-sm">
              {langLabels[from]}
            </Badge>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <Badge variant="outline" className="text-sm">
              {langLabels[to]}
            </Badge>
          </div>

          {/* Original Text */}
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Texto Original ({langLabels[from]})
            </label>
            <Textarea
              value={originalText}
              readOnly
              rows={8}
              className="resize-none bg-muted/50"
            />
          </div>

          {/* Context (if provided) */}
          {context && (
            <div className="text-xs text-muted-foreground border-l-2 border-chart-1 pl-3 py-1">
              <strong>Contexto:</strong> {context}
            </div>
          )}

          {/* Translate Button */}
          {!translatedText && (
            <Button
              onClick={handleTranslate}
              disabled={translateMutation.isPending}
              className="w-full"
              size="lg"
            >
              {translateMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Traduzindo com IA...
                </>
              ) : (
                <>
                  <Languages className="h-5 w-5 mr-2" />
                  Traduzir com IA
                </>
              )}
            </Button>
          )}

          {/* Translated Text */}
          {translatedText && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Tradução ({langLabels[to]})
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7"
                >
                  {copied ? (
                    <Check className="h-3 w-3 mr-1" />
                  ) : (
                    <Copy className="h-3 w-3 mr-1" />
                  )}
                  {copied ? "Copiado!" : "Copiar"}
                </Button>
              </div>
              <Textarea
                value={translatedText}
                onChange={(e) => setTranslatedText(e.target.value)}
                rows={8}
                className="resize-none"
                placeholder="A tradução aparecerá aqui..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                Você pode editar a tradução antes de usar
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setTranslatedText("");
              onOpenChange(false);
            }}
          >
            Cancelar
          </Button>
          {translatedText && onTranslationComplete && (
            <Button onClick={handleUseTranslation}>Usar Tradução</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
