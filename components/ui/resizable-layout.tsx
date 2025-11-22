"use client";

import React, { type ReactNode } from "react";

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
    minWidth: 200,
    maxWidth: 400,
    defaultWidth: 240, // Aproximadamente col-span-2 em grid de 12 colunas
    localStorageKey: "interview-prep-left-panel-width",
  });

  // Hook para o painel direito
  const rightPanelState = useResizablePanelRight({
    minWidth: 280,
    maxWidth: 600,
    defaultWidth: 360, // Aproximadamente col-span-3 em grid de 12 colunas
    localStorageKey: "interview-prep-right-panel-width",
  });

  return (
    <>
      {/* Layout Mobile - mantém o comportamento original */}
      <div className="lg:hidden w-full">{children}</div>

      {/* Layout Desktop com Painéis Redimensionáveis */}
      <div className="hidden lg:flex w-full">
        {/* Painel Esquerdo (Sidebar) */}
        <div
          className="relative flex-shrink-0 transition-none"
          style={{ width: `${leftPanelState.width}px` }}
        >
          <div className="sticky top-0 h-screen overflow-y-auto">
            {leftPanel}
          </div>
        </div>

        {/* Handle de Redimensionamento do Painel Esquerdo */}
        <ResizableHandle
          onMouseDown={leftPanelState.handleMouseDown}
          isResizing={leftPanelState.isResizing}
          side="right"
        />

        {/* Conteúdo Principal (Flexível) */}
        <div className="flex-1 min-w-0 px-sides">
          {children}
        </div>

        {/* Handle de Redimensionamento do Painel Direito */}
        <ResizableHandle
          onMouseDown={rightPanelState.handleMouseDown}
          isResizing={rightPanelState.isResizing}
          side="left"
        />

        {/* Painel Direito (Widget + Notifications) */}
        <div
          className="relative flex-shrink-0 transition-none"
          style={{ width: `${rightPanelState.width}px` }}
        >
          {rightPanel}
        </div>
      </div>
    </>
  );
}
