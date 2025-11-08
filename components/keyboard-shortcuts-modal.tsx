"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KeyboardShortcut } from "@/hooks/use-keyboard-shortcuts";

interface KeyboardShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortcuts: KeyboardShortcut[];
}

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-muted border border-border rounded">
      {children}
    </kbd>
  );
}

function formatShortcut(shortcut: KeyboardShortcut) {
  const keys: string[] = [];

  if (shortcut.ctrl) {
    // Show Cmd on Mac, Ctrl on Windows/Linux
    keys.push(navigator.platform.includes("Mac") ? "⌘" : "Ctrl");
  }
  if (shortcut.alt) {
    keys.push(navigator.platform.includes("Mac") ? "⌥" : "Alt");
  }
  if (shortcut.shift) {
    keys.push(navigator.platform.includes("Mac") ? "⇧" : "Shift");
  }

  keys.push(shortcut.key.toUpperCase());

  return keys;
}

export function KeyboardShortcutsModal({
  open,
  onOpenChange,
  shortcuts,
}: KeyboardShortcutsModalProps) {
  // Group shortcuts by category
  const categories = {
    Navigation: shortcuts.filter((s) => s.description.includes("Go to")),
    Actions: shortcuts.filter((s) => s.description.includes("New") || s.description.includes("Focus")),
    Help: shortcuts.filter((s) => s.description.includes("keyboard shortcuts")),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display uppercase">
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to navigate faster
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {Object.entries(categories).map(([category, categoryShortcuts]) => {
            if (categoryShortcuts.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-3">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryShortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-accent/50 transition-colors"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex gap-1">
                        {formatShortcut(shortcut).map((key, i) => (
                          <KeyboardKey key={i}>{key}</KeyboardKey>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
          <p>Press <KeyboardKey>?</KeyboardKey> anytime to toggle this help dialog</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
