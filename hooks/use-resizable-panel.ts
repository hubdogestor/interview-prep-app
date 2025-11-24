"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type TimeoutId = ReturnType<typeof setTimeout>;

interface UseResizablePanelProps {
  minWidth?: number;
  maxWidth?: number;
  defaultWidth: number;
  side: "left" | "right"; // Qual painel (esquerdo ou direito)
}

export function useResizablePanel({
  minWidth = 200,
  maxWidth = 600,
  defaultWidth,
  side,
}: UseResizablePanelProps) {
  // Inicializa a largura do painel a partir do localStorage
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const key = side === "left" ? "leomds-app-left-panel-width" : "leomds-app-right-panel-width";
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= minWidth && parsed <= maxWidth) {
          return parsed;
        }
      }
    }
    return defaultWidth;
  });

  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);
  const saveTimeoutRef = useRef<TimeoutId | null>(null);
  const lastSavedWidthRef = useRef<number>(defaultWidth);

  // Salva a largura no localStorage após 500ms de inatividade
  useEffect(() => {
    // Não salva se é o mesmo valor
    if (width === lastSavedWidthRef.current) return;

    // Limpa timeout anterior
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Salva após 500ms de inatividade
    saveTimeoutRef.current = setTimeout(() => {
      lastSavedWidthRef.current = width;
      
      if (typeof window !== "undefined") {
        const key = side === "left" ? "leomds-app-left-panel-width" : "leomds-app-right-panel-width";
        localStorage.setItem(key, width.toString());
      }
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [width, side]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      startXRef.current = e.clientX;
      startWidthRef.current = width;
    },
    [width]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      // Para o painel esquerdo: arrasta para DIREITA aumenta largura
      // Para o painel direito: inverte o delta
      const delta = side === "left" ? e.clientX - startXRef.current : startXRef.current - e.clientX;
      const newWidth = startWidthRef.current + delta;

      // Limita a largura entre min e max
      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setWidth(clampedWidth);
    },
    [isResizing, minWidth, maxWidth, side]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Adiciona event listeners para mousemove e mouseup globalmente
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      // Adiciona classe ao body para melhorar a experiência de UX
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return {
    width,
    isResizing,
    handleMouseDown,
  };
}

// Hook para painel do lado direito (mantido para compatibilidade)
export function useResizablePanelRight(props: Omit<UseResizablePanelProps, "side">) {
  return useResizablePanel({ ...props, side: "right" });
}
