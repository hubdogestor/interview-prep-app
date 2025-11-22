"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface UseResizablePanelProps {
  minWidth?: number;
  maxWidth?: number;
  defaultWidth: number;
  localStorageKey?: string;
}

export function useResizablePanel({
  minWidth = 200,
  maxWidth = 600,
  defaultWidth,
  localStorageKey,
}: UseResizablePanelProps) {
  // Inicializa a largura do painel, tentando carregar do localStorage
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== "undefined" && localStorageKey) {
      const saved = localStorage.getItem(localStorageKey);
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

  // Salva a largura no localStorage quando ela muda
  useEffect(() => {
    if (localStorageKey && typeof window !== "undefined") {
      localStorage.setItem(localStorageKey, width.toString());
    }
  }, [width, localStorageKey]);

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

      const delta = e.clientX - startXRef.current;
      const newWidth = startWidthRef.current + delta;

      // Limita a largura entre min e max
      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setWidth(clampedWidth);
    },
    [isResizing, minWidth, maxWidth]
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

// Hook para painel do lado direito (inverte o delta)
export function useResizablePanelRight({
  minWidth = 200,
  maxWidth = 600,
  defaultWidth,
  localStorageKey,
}: UseResizablePanelProps) {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== "undefined" && localStorageKey) {
      const saved = localStorage.getItem(localStorageKey);
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

  useEffect(() => {
    if (localStorageKey && typeof window !== "undefined") {
      localStorage.setItem(localStorageKey, width.toString());
    }
  }, [width, localStorageKey]);

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

      // Inverte o delta para painéis no lado direito
      const delta = startXRef.current - e.clientX;
      const newWidth = startWidthRef.current + delta;

      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setWidth(clampedWidth);
    },
    [isResizing, minWidth, maxWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
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
