"use client";

import { useEffect, useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  Sparkles,
  XCircle,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIQueue } from "@/hooks/use-ai-queue";
import { cn } from "@/lib/utils";

const typeLabels = {
  icebreaker: "Icebreaker",
  speech: "Speech",
  competencia: "Competência",
  experiencia: "Experiência",
  review: "Review",
};

const statusIcons = {
  queued: Clock,
  processing: Loader2,
  completed: CheckCircle2,
  failed: XCircle,
};

const statusColors = {
  queued: "text-muted-foreground",
  processing: "text-blue-500",
  completed: "text-green-500",
  failed: "text-destructive",
};

/**
 * Visual indicator for AI queue status with rate limit info
 */
export function AIQueueStatus() {
  const {
    queue,
    isProcessing,
    rateLimitInfo,
    queuedCount,
    processingCount,
    completedCount,
    failedCount,
    clearCompleted,
  } = useAIQueue();

  const [open, setOpen] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState<string>("");

  useEffect(() => {
    if (!rateLimitInfo.resetAt) {
      setTimeUntilReset("");
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const resetTime = new Date(rateLimitInfo.resetAt!).getTime();
      const diff = resetTime - now;

      if (diff <= 0) {
        setTimeUntilReset("Resetando...");
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeUntilReset(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [rateLimitInfo.resetAt]);

  const ratePercentage = (rateLimitInfo.remaining / rateLimitInfo.maxPerMinute) * 100;
  const isLowOnRate = ratePercentage < 30;

  const totalActive = queuedCount + processingCount;

  if (queue.length === 0 && !isProcessing) {
    return null; // Hide when nothing is happening
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 relative",
            isProcessing && "border-blue-500 bg-blue-500/10"
          )}
        >
          {isProcessing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          <span className="hidden sm:inline">
            {isProcessing ? "Gerando..." : "Fila de IA"}
          </span>
          {totalActive > 0 && (
            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
              {totalActive}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap className="size-4 text-yellow-500" />
              Fila de IA
            </h4>
            {completedCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompleted}
                className="h-7 text-xs"
              >
                Limpar
              </Button>
            )}
          </div>

          {/* Rate Limit Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rate Limit</span>
              <span
                className={cn(
                  "font-mono font-medium",
                  isLowOnRate && "text-orange-500"
                )}
              >
                {rateLimitInfo.remaining}/{rateLimitInfo.maxPerMinute}
              </span>
            </div>
            <Progress
              value={ratePercentage}
              className={cn(
                "h-2",
                isLowOnRate && "[&>div]:bg-orange-500"
              )}
            />
            {rateLimitInfo.resetAt && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="size-3" />
                Reset em: {timeUntilReset}
              </p>
            )}
            {isLowOnRate && (
              <div className="flex items-start gap-2 p-2 bg-orange-500/10 rounded-md">
                <AlertTriangle className="size-4 text-orange-500 mt-0.5" />
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  Limite próximo! Aguarde alguns minutos antes de fazer mais requisições.
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Fila</p>
              <p className="text-lg font-semibold">{queuedCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Ativo</p>
              <p className="text-lg font-semibold text-blue-500">
                {processingCount}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">OK</p>
              <p className="text-lg font-semibold text-green-500">
                {completedCount}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Erro</p>
              <p className="text-lg font-semibold text-destructive">
                {failedCount}
              </p>
            </div>
          </div>
        </div>

        {/* Queue Items */}
        <ScrollArea className="h-[300px] p-4">
          <AnimatePresence mode="popLayout">
            {queue.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center p-6"
              >
                <Sparkles className="size-12 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">
                  Nenhuma geração em andamento
                </p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {queue.map((item) => {
                  const Icon = statusIcons[item.status];
                  const colorClass = statusColors[item.status];

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="p-3">
                        <div className="flex items-start gap-3">
                          <Icon
                            className={cn(
                              "size-5 shrink-0",
                              colorClass,
                              item.status === "processing" && "animate-spin"
                            )}
                          />
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-medium truncate">
                                {typeLabels[item.type]}
                              </p>
                              <Badge
                                variant={
                                  item.status === "completed"
                                    ? "default"
                                    : item.status === "failed"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {item.status}
                              </Badge>
                            </div>
                            {item.error && (
                              <p className="text-xs text-destructive">
                                {item.error}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {item.status === "queued" &&
                                `Aguardando... (prioridade: ${item.priority})`}
                              {item.status === "processing" &&
                                `Gerando há ${Math.round((Date.now() - (item.startedAt?.getTime() || Date.now())) / 1000)}s`}
                              {item.status === "completed" &&
                                `Concluído ${item.completedAt ? new Date(item.completedAt).toLocaleTimeString("pt-BR") : ""}`}
                              {item.status === "failed" &&
                                `Falhou ${item.completedAt ? new Date(item.completedAt).toLocaleTimeString("pt-BR") : ""}`}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
