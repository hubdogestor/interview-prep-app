"use client";

import React from "react";
import { GripVertical } from "lucide-react";

import { cn } from "@/lib/utils";

interface ResizableHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isResizing: boolean;
  side?: "left" | "right";
  className?: string;
}

export function ResizableHandle({
  onMouseDown,
  isResizing,
  side = "right",
  className,
}: ResizableHandleProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className={cn(
        "group relative flex items-center justify-center transition-colors z-50",
        "hover:bg-primary/10",
        isResizing && "bg-primary/20",
        side === "right" ? "cursor-col-resize" : "cursor-col-resize",
        // Área de clique maior para melhor usabilidade
        "w-1 hover:w-2",
        className
      )}
      aria-label={`Redimensionar painel ${side === "left" ? "esquerdo" : "direito"}`}
      role="separator"
      aria-orientation="vertical"
    >
      {/* Linha visual do handle */}
      <div
        className={cn(
          "absolute inset-y-0 w-[2px] transition-all",
          "bg-border group-hover:bg-primary/50",
          isResizing && "bg-primary",
          side === "right" ? "left-0" : "right-0"
        )}
      />
      
      {/* Ícone de grip (aparece no hover) */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-background border border-border rounded-sm p-0.5 shadow-sm",
          isResizing && "opacity-100"
        )}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
