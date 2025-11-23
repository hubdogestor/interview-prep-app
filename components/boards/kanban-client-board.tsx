"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { TrelloBoard } from "@/components/boards/trello-board";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc/react";
import type { BoardColumn } from "@/types/boards";

interface KanbanClientBoardProps {
  boardName: string;
  initialColumns: BoardColumn[];
  addCardLabel?: string;
  showKRs?: boolean;
}

export function KanbanClientBoard({
  boardName,
  initialColumns,
  addCardLabel = "Adicionar item",
  showKRs = true,
}: KanbanClientBoardProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const utils = trpc.useUtils();

  // Buscar dados salvos do usuário
  const { data: savedBoard } = trpc.kanbans.get.useQuery(
    { name: boardName },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 5000, // Refetch a cada 5 segundos
    }
  );

  // Usar dados salvos ou dados iniciais
  const columns = useMemo(
    () => (savedBoard?.columns as BoardColumn[] | undefined) ?? initialColumns,
    [savedBoard?.columns, initialColumns]
  );

  // Mutation para salvar
  const saveMutation = trpc.kanbans.save.useMutation({
    onMutate: () => {
      setIsSaving(true);
    },
    onSuccess: () => {
      setIsSaving(false);
      // Invalidar cache para refetch imediato
      utils.kanbans.get.invalidate({ name: boardName });
      // Toast sutil de sucesso
      toast({
        title: "Salvo",
        description: "Alterações salvas automaticamente",
        duration: 2000,
      });
    },
    onError: (error: { message: string }) => {
      setIsSaving(false);
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Auto-save com debounce
  const saveColumns = useCallback(
    (newColumns: BoardColumn[]) => {
      saveMutation.mutate({
        name: boardName,
        columns: newColumns,
      });
    },
    [boardName, saveMutation]
  );

  // Callback para quando as colunas mudarem
  const handleColumnsChange = useCallback(
    (newColumns: BoardColumn[]) => {
      // Limpar timeout anterior
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Aguardar 1 segundo após a última mudança para salvar
      saveTimeoutRef.current = setTimeout(() => {
        saveColumns(newColumns);
      }, 1000);
    },
    [saveColumns, boardName]
  );

  // Cleanup do timeout ao desmontar
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Indicador de salvamento */}
      {isSaving && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg border border-white/10 bg-background/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
            Salvando...
          </div>
        </div>
      )}

      <TrelloBoard
        initialColumns={columns}
        addCardLabel={addCardLabel}
        onColumnsChange={handleColumnsChange}
        showKRs={showKRs}
      />
    </div>
  );
}

