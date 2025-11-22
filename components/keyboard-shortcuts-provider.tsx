"use client";

import React from "react";

import { useGlobalShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { KeyboardShortcutsDialog } from "@/components/ui/keyboard-shortcuts-dialog";

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  useGlobalShortcuts();
  
  return (
    <>
      {children}
      <KeyboardShortcutsDialog />
    </>
  );
}
