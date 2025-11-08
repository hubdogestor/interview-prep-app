"use client";

import { useState } from "react";
import { useGlobalShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { KeyboardShortcutsModal } from "@/components/keyboard-shortcuts-modal";

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  const [helpOpen, setHelpOpen] = useState(false);

  const shortcuts = useGlobalShortcuts({
    onShowHelp: () => setHelpOpen(true),
  });

  return (
    <>
      {children}
      <KeyboardShortcutsModal
        open={helpOpen}
        onOpenChange={setHelpOpen}
        shortcuts={shortcuts}
      />
    </>
  );
}
