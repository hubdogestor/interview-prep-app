"use client";

import React, { type ReactNode, useMemo } from "react";

import { ResizableHandle } from "@/components/ui/resizable-handle";
import {
  useResizablePanel,
  useResizablePanelRight,
} from "@/hooks/use-resizable-panel";

interface ResizableLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  children: ReactNode;
}

export function ResizableLayout({
  leftPanel,
  rightPanel,
  children,
}: ResizableLayoutProps) {
  // Hook para o painel esquerdo
  const leftPanelState = useResizablePanel({
    minWidth: 160,
    maxWidth: 400,
    defaultWidth: 240,
    localStorageKey: "interview-prep-left-panel-width",
  });

  // Hook para o painel direito
  const rightPanelState = useResizablePanelRight({
    minWidth: 200,
    maxWidth: 600,
    defaultWidth: 360,
    localStorageKey: "interview-prep-right-panel-width",
  });

  // Memoizar estilos para evitar re-renders
  const leftPanelStyle = useMemo(
    () => ({
      width: `${leftPanelState.width}px`,
      ["--sidebar-width" as string]: `${leftPanelState.width}px`,
    }),
    [leftPanelState.width]
  );

  const rightPanelStyle = useMemo(
    () => ({
      width: `${rightPanelState.width}px`,
    }),
    [rightPanelState.width]
  );

  return (
    <>
      {/* Layout Mobile - mantém o comportamento original */}
      <div className="lg:hidden w-full">{children}</div>

      {/* Layout Desktop com Painéis Redimensionáveis */}
      <div className="hidden lg:flex w-full min-h-screen">
        {/* Painel Esquerdo com Handle Integrado */}
        <div className="relative flex-shrink-0" style={leftPanelStyle}>
          {leftPanel}
          
          {/* Handle overlay no lado direito */}
          <div className="absolute top-0 right-0 bottom-0 w-1 z-50">
            <ResizableHandle
              onMouseDown={leftPanelState.handleMouseDown}
              isResizing={leftPanelState.isResizing}
              side="right"
            />
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 min-w-0">{children}</div>

        {/* Painel Direito com Handle Integrado */}
        <div className="relative flex-shrink-0" style={rightPanelStyle}>
          {/* Handle overlay no lado esquerdo */}
          <div className="absolute top-0 left-0 bottom-0 w-1 z-50">
            <ResizableHandle
              onMouseDown={rightPanelState.handleMouseDown}
              isResizing={rightPanelState.isResizing}
              side="left"
            />
          </div>
          
          {rightPanel}
        </div>
      </div>
    </>
  );
}
