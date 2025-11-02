"use client";

import { useGlobalShortcuts } from "@/hooks/use-keyboard-shortcuts";

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  useGlobalShortcuts();
  return <>{children}</>;
}
