"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { trpc } from "@/lib/trpc/react";
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

export function useCustomFlags() {
  const { data: customFlags = [], isLoading } = trpc.customFlags.list.useQuery(undefined, {
    refetchInterval: 5000, // Auto-sync a cada 5 segundos
  });

  const customChips: BoardCardChip[] = customFlags.map((flag: { label: string; colorClass: string }) => ({
    label: flag.label,
    colorClass: flag.colorClass,
  }));

  const allFlags = [...DEFAULT_CHIPS, ...customChips];

  return { allFlags, customFlags, isLoading };
}

export function FlagManagerSelect({ value, onValueChange, className }: FlagManagerSelectProps) {
  const { allFlags, customFlags } = useCustomFlags();
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showManageDialog, setShowManageDialog] = useState(false);
  const [newFlagLabel, setNewFlagLabel] = useState("");
  const [newFlagColor, setNewFlagColor] = useState(COLOR_OPTIONS[0].value);

  const utils = trpc.useUtils();

  const createMutation = trpc.customFlags.create.useMutation({
    onSuccess: async () => {
      await utils.customFlags.list.invalidate();
      setNewFlagLabel("");
      setNewFlagColor(COLOR_OPTIONS[0].value);
      setShowNewDialog(false);
    },
    onError: (error) => {
      console.error("Erro ao criar flag:", error);
      alert("Erro ao criar flag. Tente novamente.");
    },
  });

  const deleteMutation = trpc.customFlags.delete.useMutation({
    onSuccess: async () => {
      await utils.customFlags.list.invalidate();
    },
    onError: (error) => {
      console.error("Erro ao deletar flag:", error);
      alert("Erro ao deletar flag. Tente novamente.");
    },
  });

  const handleDeleteFlag = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta flag?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleAddFlag = () => {
    if (!newFlagLabel.trim()) return;

    createMutation.mutate({
      label: newFlagLabel.trim(),
      colorClass: newFlagColor,
    });
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
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", chip.colorClass)} />
                {chip.label}
              </div>
            </SelectItem>
          ))}
          <div className="border-t border-white/10 mt-1 pt-1 space-y-1">
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
            {customFlags.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-xs text-muted-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowManageDialog(true);
                }}
              >
                <X className="h-3 w-3" />
                Gerenciar flags
              </Button>
            )}
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
            <Button 
              onClick={handleAddFlag} 
              disabled={!newFlagLabel.trim() || createMutation.isPending}
            >
              {createMutation.isPending ? "Criando..." : "Criar Flag"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showManageDialog} onOpenChange={setShowManageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerenciar Flags Customizadas</DialogTitle>
            <DialogDescription>
              Exclua flags customizadas que você não precisa mais.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {customFlags.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhuma flag customizada ainda.
              </p>
            ) : (
              customFlags.map((flag: { id: string; label: string; colorClass: string }) => (
                <div
                  key={flag.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/10 bg-background/40"
                >
                  <div className="flex items-center gap-2">
                    <div className={cn("h-3 w-3 rounded-full", flag.colorClass)} />
                    <span className="text-sm">{flag.label}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteFlag(flag.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowManageDialog(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
