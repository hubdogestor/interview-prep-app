"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Sparkles } from "lucide-react";

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  content: string | null;
  isLoading: boolean;
  loadingMessage?: string;
  onAccept: () => void;
  onRegenerate?: () => void;
  acceptLabel?: string;
  regenerateLabel?: string;
}

export function PreviewDialog({
  open,
  onOpenChange,
  title,
  description,
  content,
  isLoading,
  loadingMessage = "Gerando conteúdo...",
  onAccept,
  onRegenerate,
  acceptLabel = "Salvar",
  regenerateLabel = "Regenerar",
}: PreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="uppercase font-display flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-chart-1" />
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="flex-1 min-h-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-chart-1" />
              <p className="text-sm text-muted-foreground uppercase">
                {loadingMessage}
              </p>
            </div>
          ) : content ? (
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                <div className="p-4 bg-accent/30 rounded-lg border border-border">
                  <p className="text-sm whitespace-pre-wrap">{content}</p>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-muted-foreground uppercase">
                Nenhum conteúdo gerado ainda
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0">
          <div className="flex items-center gap-2 w-full justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <div className="flex gap-2">
              {onRegenerate && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onRegenerate}
                  disabled={isLoading || !content}
                  className="text-chart-1 border-chart-1 hover:bg-chart-1/10"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  {regenerateLabel}
                </Button>
              )}
              <Button
                type="button"
                onClick={onAccept}
                disabled={isLoading || !content}
              >
                {acceptLabel}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
