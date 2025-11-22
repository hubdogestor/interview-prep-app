"use client";

import { useMemo } from "react";
import { type Change, diffWords } from "diff";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { staggerContainer, listItemStagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface DiffViewProps {
  oldText: string;
  newText: string;
  oldLabel?: string;
  newLabel?: string;
  className?: string;
}

/**
 * Side-by-side diff view component for comparing text versions
 * Highlights additions, deletions, and unchanged text
 */
export function DiffView({
  oldText,
  newText,
  oldLabel = "Versão Anterior",
  newLabel = "Versão Atual",
  className,
}: DiffViewProps) {
  const diff = useMemo(() => diffWords(oldText, newText), [oldText, newText]);

  const stats = useMemo(() => {
    let additions = 0;
    let deletions = 0;

    diff.forEach((part) => {
      if (part.added) {
        additions += part.value.split(/\s+/).filter(Boolean).length;
      } else if (part.removed) {
        deletions += part.value.split(/\s+/).filter(Boolean).length;
      }
    });

    return { additions, deletions };
  }, [diff]);

  const renderDiffText = (parts: Change[], side: "old" | "new") => {
    return parts.map((part, index) => {
      const isAdded = part.added;
      const isRemoved = part.removed;
      const isUnchanged = !isAdded && !isRemoved;

      // Old side: show removed and unchanged
      if (side === "old") {
        if (isAdded) return null;
        return (
          <span
            key={index}
            className={cn(
              isRemoved && "bg-destructive/20 text-destructive line-through",
              isUnchanged && "text-foreground"
            )}
          >
            {part.value}
          </span>
        );
      }

      // New side: show added and unchanged
      if (isRemoved) return null;
      return (
        <span
          key={index}
          className={cn(
            isAdded && "bg-green-500/20 text-green-600 dark:text-green-400 font-medium",
            isUnchanged && "text-foreground"
          )}
        >
          {part.value}
        </span>
      );
    });
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn("space-y-4", className)}
    >
      {/* Stats Summary */}
      <motion.div variants={listItemStagger} className="flex items-center gap-4">
        <Badge variant="outline" className="gap-1.5">
          <span className="size-2 rounded-full bg-green-500" />
          <span className="text-xs">
            {stats.additions} {stats.additions === 1 ? "adição" : "adições"}
          </span>
        </Badge>
        <Badge variant="outline" className="gap-1.5">
          <span className="size-2 rounded-full bg-destructive" />
          <span className="text-xs">
            {stats.deletions} {stats.deletions === 1 ? "remoção" : "remoções"}
          </span>
        </Badge>
      </motion.div>

      {/* Side-by-side diff */}
      <motion.div variants={listItemStagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Old Version */}
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{oldLabel}</h3>
            <Badge variant="secondary" className="text-xs">
              Original
            </Badge>
          </div>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
              {renderDiffText(diff, "old")}
            </div>
          </ScrollArea>
        </Card>

        {/* New Version */}
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{newLabel}</h3>
            <Badge variant="default" className="text-xs">
              Atualizado
            </Badge>
          </div>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
              {renderDiffText(diff, "new")}
            </div>
          </ScrollArea>
        </Card>
      </motion.div>

      {/* Legend */}
      <motion.div variants={listItemStagger} className="flex items-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block px-2 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 rounded">
            texto
          </span>
          <span>Adicionado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block px-2 py-0.5 bg-destructive/20 text-destructive line-through rounded">
            texto
          </span>
          <span>Removido</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
