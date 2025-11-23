import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle2, Loader2, Save } from "lucide-react";

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  lastSaved: Date | null;
  className?: string;
}

export function AutoSaveIndicator({
  isSaving,
  lastSaved,
  className = "",
}: AutoSaveIndicatorProps) {
  if (isSaving) {
    return (
      <div
        className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}
      >
        <Loader2 className="h-3 w-3 animate-spin" />
        <span>Salvando...</span>
      </div>
    );
  }

  if (lastSaved) {
    const timeAgo = formatDistanceToNow(lastSaved, {
      addSuffix: true,
      locale: ptBR,
    });

    return (
      <div
        className={`flex items-center gap-2 text-sm text-green-600 dark:text-green-400 ${className}`}
      >
        <CheckCircle2 className="h-3 w-3" />
        <span>Salvo {timeAgo}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}
    >
      <Save className="h-3 w-3" />
      <span>Auto-save ativo</span>
    </div>
  );
}
