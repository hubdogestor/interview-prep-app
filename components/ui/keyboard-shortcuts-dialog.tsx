"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command, Keyboard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fadeIn } from "@/lib/animations";

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  // Navigation
  { keys: ["Ctrl", "K"], description: "Abrir busca global", category: "Navegação" },
  { keys: ["Ctrl", "H"], description: "Ir para Dashboard", category: "Navegação" },
  { keys: ["Ctrl", "P"], description: "Ir para Práticas", category: "Navegação" },
  { keys: ["Ctrl", "Alt", "C"], description: "Ir para Competências", category: "Navegação" },
  { keys: ["Ctrl", "Alt", "E"], description: "Ir para Experiências", category: "Navegação" },
  
  // Actions
  { keys: ["Ctrl", "N"], description: "Criar novo item", category: "Ações" },
  { keys: ["Ctrl", "S"], description: "Salvar", category: "Ações" },
  { keys: ["Ctrl", "E"], description: "Editar item atual", category: "Ações" },
  { keys: ["Esc"], description: "Cancelar/Fechar", category: "Ações" },
  
  // Inline Editing
  { keys: ["Enter"], description: "Confirmar edição inline", category: "Edição" },
  { keys: ["Esc"], description: "Cancelar edição inline", category: "Edição" },
  
  // Lists
  { keys: ["↑", "↓"], description: "Navegar em listas", category: "Listas" },
  { keys: ["Enter"], description: "Selecionar item", category: "Listas" },
  
  // General
  { keys: ["?"], description: "Mostrar atalhos (esta janela)", category: "Geral" },
  { keys: ["Ctrl", "Z"], description: "Desfazer", category: "Geral" },
  { keys: ["Ctrl", "Shift", "Z"], description: "Refazer", category: "Geral" },
];

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Show shortcuts dialog with ?
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="size-5" />
            Atalhos de Teclado
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {Object.entries(groupedShortcuts).map(([category, items]) => (
            <motion.div
              key={category}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {items.map((shortcut, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, i) => (
                          <span key={i} className="flex items-center gap-1">
                            <Badge
                              variant="outline"
                              className="font-mono text-xs px-2"
                            >
                              {key}
                            </Badge>
                            {i < shortcut.keys.length - 1 && (
                              <span className="text-xs text-muted-foreground">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
          <Command className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Pressione <Badge variant="outline" className="mx-1">?</Badge> a qualquer momento para ver esta janela
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
