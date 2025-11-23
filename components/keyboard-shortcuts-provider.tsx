"use client";

import React from "react";

import { KeyboardShortcutsDialog } from "@/components/ui/keyboard-shortcuts-dialog";
import { useGlobalShortcuts } from "@/hooks/use-keyboard-shortcuts";

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  useGlobalShortcuts();
  
  return (
    <>
      {children}
      <KeyboardShortcutsDialog />
    </>
  );
}
