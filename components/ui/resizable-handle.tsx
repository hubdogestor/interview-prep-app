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
        "group/handle relative h-full w-full flex items-center justify-center",
        "cursor-col-resize select-none touch-none",
        "hover:bg-primary/5 transition-colors",
        isResizing && "bg-primary/10",
        className
      )}
      aria-label={`Redimensionar painel ${side === "left" ? "esquerdo" : "direito"}`}
      role="separator"
      aria-orientation="vertical"
    >
      {/* Área de clique expandida (invisível) */}
      <div className="absolute inset-y-0 -left-2 -right-2" />

      {/* Linha indicadora sutil */}
      <div
        className={cn(
          "absolute inset-y-0 left-1/2 -translate-x-1/2 w-px",
          "bg-transparent transition-all duration-150",
          "group-hover/handle:bg-border/40",
          isResizing && "bg-primary w-[2px]"
        )}
      />

      {/* Ícone de grip (aparece no hover) */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "pointer-events-none",
          "opacity-0 scale-90 transition-all duration-150",
          "group-hover/handle:opacity-100 group-hover/handle:scale-100",
          isResizing && "opacity-100 scale-100",
          "bg-background/95 border border-border rounded-md p-1 shadow-sm"
        )}
      >
        <GripVertical className="h-3 w-3 text-muted-foreground" />
      </div>
    </div>
  );
}
