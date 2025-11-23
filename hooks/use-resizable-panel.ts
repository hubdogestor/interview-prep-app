"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { trpc } from "@/lib/trpc/client";

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
  // Busca preferências do banco de dados
  const { data: preferences } = trpc.userPreferences.get.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const updateLeftWidth = trpc.userPreferences.updateLeftPanelWidth.useMutation();
  const updateRightWidth = trpc.userPreferences.updateRightPanelWidth.useMutation();

  // Inicializa a largura do painel com valor do banco ou padrão
  const [width, setWidth] = useState<number>(defaultWidth);

  // Atualiza width quando preferences carregam
  useEffect(() => {
    if (preferences) {
      const savedWidth = side === "left" ? preferences.leftPanelWidth : preferences.rightPanelWidth;
      if (savedWidth && savedWidth >= minWidth && savedWidth <= maxWidth) {
        setWidth(savedWidth);
      }
    }
  }, [preferences, side, minWidth, maxWidth]);

  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Salva a largura no banco de dados com debounce
  useEffect(() => {
    if (!preferences) return; // Aguarda carregar preferências

    // Limpa timeout anterior
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Salva após 500ms de inatividade
    saveTimeoutRef.current = setTimeout(() => {
      if (side === "left") {
        updateLeftWidth.mutate({ width });
      } else {
        updateRightWidth.mutate({ width });
      }
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [width, side]); // Removido preferences, updateLeftWidth, updateRightWidth das dependências

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
