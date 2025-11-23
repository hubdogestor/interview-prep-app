"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { BoardCardChip } from "@/types/boards";

const DEFAULT_CHIPS: BoardCardChip[] = [
  { label: "Novo", colorClass: "bg-primary/15 text-primary border-primary/20" },
  { label: "OKR", colorClass: "bg-amber-500/15 text-amber-100 border-transparent" },
  { label: "Urgente", colorClass: "bg-red-500/15 text-red-100 border-transparent" },
  { label: "Importante", colorClass: "bg-orange-500/15 text-orange-100 border-transparent" },
  { label: "Bug", colorClass: "bg-rose-500/15 text-rose-100 border-transparent" },
  { label: "Feature", colorClass: "bg-green-500/15 text-green-100 border-transparent" },
  { label: "Melhoria", colorClass: "bg-blue-500/15 text-blue-100 border-transparent" },
  { label: "Pesquisa", colorClass: "bg-purple-500/15 text-purple-100 border-transparent" },
  { label: "Bloqueado", colorClass: "bg-gray-500/15 text-gray-100 border-transparent" },
];

const COLOR_OPTIONS = [
  { value: "bg-primary/15 text-primary border-primary/20", label: "Azul Primary" },
  { value: "bg-amber-500/15 text-amber-100 border-transparent", label: "Amarelo" },
  { value: "bg-red-500/15 text-red-100 border-transparent", label: "Vermelho" },
  { value: "bg-orange-500/15 text-orange-100 border-transparent", label: "Laranja" },
  { value: "bg-rose-500/15 text-rose-100 border-transparent", label: "Rosa" },
  { value: "bg-green-500/15 text-green-100 border-transparent", label: "Verde" },
  { value: "bg-blue-500/15 text-blue-100 border-transparent", label: "Azul" },
  { value: "bg-purple-500/15 text-purple-100 border-transparent", label: "Roxo" },
  { value: "bg-gray-500/15 text-gray-100 border-transparent", label: "Cinza" },
  { value: "bg-teal-500/15 text-teal-100 border-transparent", label: "Verde-água" },
  { value: "bg-indigo-500/15 text-indigo-100 border-transparent", label: "Índigo" },
  { value: "bg-pink-500/15 text-pink-100 border-transparent", label: "Pink" },
];

interface FlagManagerSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const STORAGE_KEY = "trello-custom-flags";

export function useCustomFlags() {
  const [customFlags, setCustomFlags] = useState<BoardCardChip[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCustomFlags(JSON.parse(stored));
      } catch {
        setCustomFlags([]);
      }
    }
  }, []);

  const saveFlags = (flags: BoardCardChip[]) => {
    setCustomFlags(flags);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  };

  const allFlags = [...DEFAULT_CHIPS, ...customFlags];

  return { allFlags, customFlags, saveFlags };
}

export function FlagManagerSelect({ value, onValueChange, className }: FlagManagerSelectProps) {
  const { allFlags, customFlags, saveFlags } = useCustomFlags();
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newFlagLabel, setNewFlagLabel] = useState("");
  const [newFlagColor, setNewFlagColor] = useState(COLOR_OPTIONS[0].value);

  const handleDeleteFlag = (label: string) => {
    const updated = customFlags.filter((f) => f.label !== label);
    saveFlags(updated);
  };

  const handleAddFlag = () => {
    if (!newFlagLabel.trim()) return;

    const newFlag: BoardCardChip = {
      label: newFlagLabel.trim(),
      colorClass: newFlagColor,
    };

    saveFlags([...customFlags, newFlag]);
    setNewFlagLabel("");
    setNewFlagColor(COLOR_OPTIONS[0].value);
    setShowNewDialog(false);
  };

  const isCustomFlag = (label: string) => {
    return customFlags.some((f) => f.label === label);
  };

  return (
    <>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder="Sem flag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Sem flag</SelectItem>
          {allFlags.map((chip) => (
            <SelectItem key={chip.label} value={chip.label}>
              <div className="flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", chip.colorClass)} />
                  {chip.label}
                </div>
                {isCustomFlag(chip.label) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteFlag(chip.label);
                    }}
                    className="ml-auto text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </SelectItem>
          ))}
          <div className="border-t border-white/10 mt-1 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-xs"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowNewDialog(true);
              }}
            >
              <Plus className="h-3 w-3" />
              Nova flag
            </Button>
          </div>
        </SelectContent>
      </Select>

      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Flag</DialogTitle>
            <DialogDescription>
              Adicione uma flag customizada para categorizar seus cards.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="flag-label">Nome da Flag</Label>
              <Input
                id="flag-label"
                placeholder="Ex: Em Progresso"
                value={newFlagLabel}
                onChange={(e) => setNewFlagLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddFlag();
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flag-color">Cor</Label>
              <Select value={newFlagColor} onValueChange={setNewFlagColor}>
                <SelectTrigger id="flag-color">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_OPTIONS.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={cn("h-3 w-3 rounded-full", color.value)} />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border border-white/10 bg-background/40 p-3">
              <p className="text-xs text-muted-foreground mb-2">Preview:</p>
              <Badge variant="outline" className={cn("text-[10px] uppercase tracking-widest", newFlagColor)}>
                {newFlagLabel || "Nova Flag"}
              </Badge>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowNewDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddFlag} disabled={!newFlagLabel.trim()}>
              Criar Flag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
