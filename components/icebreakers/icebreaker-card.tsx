"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MicrophoneIcon from "@/components/icons/microphone";
import { ViewVersionsModal } from "@/components/icebreakers/view-versions-modal";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

interface IcebreakerCardProps {
  icebreaker: {
    id: string;
    tipo: string;
    titulo: string;
    versoes: any[];
    favorite?: boolean;
    archived?: boolean;
  };
}

export function IcebreakerCard({ icebreaker }: IcebreakerCardProps) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const deleteMutation = trpc.icebreakers.delete.useMutation({
    onError: (error: { message: string }) => {
      toast.error("Erro ao remover icebreaker: " + error.message);
      // Refresh on error to restore correct state
      utils.icebreakers.list.invalidate();
    },
    onSettled: () => {
      // Sync with server after mutation
      utils.icebreakers.list.invalidate();
    },
  });

  const toggleFavoriteMutation = trpc.icebreakers.toggleFavorite.useMutation({
    onMutate: async ({ id }) => {
      // Cancel outgoing refetches
      await utils.icebreakers.list.cancel();

      // Snapshot the previous value
      const previousData = utils.icebreakers.list.getData();

      // Optimistically update the cache
      utils.icebreakers.list.setData(undefined, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((item) =>
            item.id === id ? { ...item, favorite: !item.favorite } : item
          ),
        };
      });

      return { previousData };
    },
    onError: (error: { message: string }, _variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        utils.icebreakers.list.setData(undefined, context.previousData);
      }
      toast.error("Erro ao favoritar: " + error.message);
    },
    onSettled: () => {
      // Sync with server after mutation
      utils.icebreakers.list.invalidate();
    },
  });

  const toggleArchiveMutation = trpc.icebreakers.toggleArchive.useMutation({
    onSuccess: () => {
      toast.success(
        icebreaker.archived
          ? "Icebreaker desarquivado!"
          : "Icebreaker arquivado!"
      );
      utils.icebreakers.list.invalidate();
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao arquivar: " + error.message);
    },
  });

  const handleEdit = () => {
    router.push(`/icebreakers/${icebreaker.id}/editar`);
  };

  const handleDelete = () => {
    // Optimistically remove and show undo toast
    const previousData = utils.icebreakers.list.getData();

    // Immediately update UI
    utils.icebreakers.list.setData(undefined, (old) => {
      if (!old) return old;
      return {
        ...old,
        items: old.items.filter((item) => item.id !== icebreaker.id),
      };
    });

    // Show toast with undo
    let timeoutId: NodeJS.Timeout;
    toast.success("Icebreaker removido", {
      description: "Clique em 'Desfazer' para restaurar",
      duration: 5000,
      action: {
        label: "Desfazer",
        onClick: () => {
          // Restore the item
          if (previousData) {
            utils.icebreakers.list.setData(undefined, previousData);
          }
          clearTimeout(timeoutId);
          toast.info("Remoção cancelada");
        },
      },
    });

    // Execute actual delete after delay
    timeoutId = setTimeout(() => {
      deleteMutation.mutate({ id: icebreaker.id });
    }, 5000);
  };

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: icebreaker.id });
  };

  const handleToggleArchive = () => {
    toggleArchiveMutation.mutate({ id: icebreaker.id });
  };

  return (
    <Card className="p-6 hover:bg-accent/50 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-display mb-2 uppercase">
            {icebreaker.titulo}
          </h3>
          <p className="text-sm text-muted-foreground uppercase">
            {icebreaker.tipo}
          </p>
        </div>
        <MicrophoneIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <ViewVersionsModal
          versions={icebreaker.versoes as any}
          titulo={icebreaker.titulo}
        />
        {icebreaker.favorite && (
          <Badge variant="default" className="uppercase bg-yellow-600">
            ⭐ Favorito
          </Badge>
        )}
        {icebreaker.archived && (
          <Badge variant="secondary" className="uppercase">
            📦 Arquivado
          </Badge>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant="default"
          size="sm"
          className="flex-1 min-w-[100px]"
          onClick={handleEdit}
        >
          Editar
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleFavorite}
          disabled={toggleFavoriteMutation.isPending}
          title={icebreaker.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {icebreaker.favorite ? "⭐" : "☆"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleArchive}
          disabled={toggleArchiveMutation.isPending}
          title={icebreaker.archived ? "Desarquivar" : "Arquivar"}
        >
          {icebreaker.archived ? "📂" : "📦"}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              🗑️
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o icebreaker "{icebreaker.titulo}"?
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}
