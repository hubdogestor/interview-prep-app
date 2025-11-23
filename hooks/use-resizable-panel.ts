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
  // Busca preferências do banco de dados (opcional - pode falhar se não autenticado)
  const { data: preferences, isError } = trpc.userPreferences.get.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const utils = trpc.useUtils();
  const updateLeftWidth = trpc.userPreferences.updateLeftPanelWidth.useMutation({
    onSuccess: () => {
      utils.userPreferences.get.invalidate();
    },
  });
  const updateRightWidth = trpc.userPreferences.updateRightPanelWidth.useMutation({
    onSuccess: () => {
      utils.userPreferences.get.invalidate();
    },
  });

  // Inicializa a largura do painel
  const [width, setWidth] = useState<number>(() => {
    // Tenta carregar do localStorage como fallback
    if (typeof window !== "undefined") {
      const key = side === "left" ? "interview-prep-left-panel-width" : "interview-prep-right-panel-width";
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

  // Atualiza width quando preferences carregam do banco de dados
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
  const lastSavedWidthRef = useRef<number>(defaultWidth);

  // Salva a largura (localStorage como fallback + banco se autenticado)
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
      
      // Sempre salva no localStorage como fallback
      if (typeof window !== "undefined") {
        const key = side === "left" ? "interview-prep-left-panel-width" : "interview-prep-right-panel-width";
        localStorage.setItem(key, width.toString());
      }
      
      // Tenta salvar no banco se autenticado (ignora erro se não autenticado)
      if (!isError) {
        try {
          if (side === "left") {
            updateLeftWidth.mutate({ width });
          } else {
            updateRightWidth.mutate({ width });
          }
        } catch (e) {
          // Ignora erro se não autenticado
          console.debug("Não foi possível salvar preferência no banco (usuário não autenticado)");
        }
      }
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [width, side, isError, updateLeftWidth, updateRightWidth]);

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
