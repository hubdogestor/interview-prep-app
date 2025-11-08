"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

/**
 * Hook to register keyboard shortcuts
 *
 * @param shortcuts - Array of keyboard shortcuts to register
 * @param enabled - Whether shortcuts are enabled (default: true)
 *
 * @example
 * ```tsx
 * useKeyboardShortcuts([
 *   { key: 'n', ctrl: true, action: () => router.push('/novo'), description: 'New item' },
 *   { key: 'k', ctrl: true, action: () => setSearchOpen(true), description: 'Search' },
 * ]);
 * ```
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts, enabled]);
}

/**
 * Hook to register global app keyboard shortcuts
 * Automatically registers common shortcuts for navigation
 */
export function useGlobalShortcuts(options?: { onShowHelp?: () => void }) {
  const router = useRouter();

  const shortcuts: KeyboardShortcut[] = [
    // Help
    {
      key: "?",
      action: () => options?.onShowHelp?.(),
      description: "Show keyboard shortcuts",
    },
    // Navigation
    {
      key: "h",
      ctrl: true,
      action: () => router.push("/dashboard"),
      description: "Go to Dashboard",
    },
    {
      key: "i",
      ctrl: true,
      alt: true,
      action: () => router.push("/icebreakers"),
      description: "Go to Icebreakers",
    },
    {
      key: "s",
      ctrl: true,
      alt: true,
      action: () => router.push("/speeches"),
      description: "Go to Speeches",
    },
    {
      key: "q",
      ctrl: true,
      alt: true,
      action: () => router.push("/questions"),
      description: "Go to Questions",
    },
    {
      key: "c",
      ctrl: true,
      alt: true,
      action: () => router.push("/competencias"),
      description: "Go to Competências",
    },
    {
      key: "e",
      ctrl: true,
      alt: true,
      action: () => router.push("/experiencias"),
      description: "Go to Experiências",
    },
    {
      key: "p",
      ctrl: true,
      action: () => router.push("/practice"),
      description: "Go to Practice",
    },
    // New items
    {
      key: "n",
      ctrl: true,
      shift: true,
      action: () => router.push("/icebreakers/novo"),
      description: "New Icebreaker",
    },
    // Search (Ctrl+K is a common pattern)
    {
      key: "k",
      ctrl: true,
      action: () => {
        const firstInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
        }
      },
      description: "Focus search",
    },
  ];

  useKeyboardShortcuts(shortcuts);

  return shortcuts;
}
