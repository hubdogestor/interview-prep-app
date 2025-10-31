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
import MessageIcon from "@/components/icons/message";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

interface SpeechCardProps {
  speech: {
    id: string;
    tipoVaga: string;
    titulo: string;
    versao: string;
    duracaoEstimada: number;
    foco: string[];
    favorite?: boolean;
    archived?: boolean;
  };
}

export function SpeechCard({ speech }: SpeechCardProps) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const deleteMutation = trpc.speeches.delete.useMutation({
    onSuccess: () => {
      toast.success("Speech removido com sucesso!");
      utils.speeches.list.invalidate();
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao remover speech: " + error.message);
    },
  });

  const toggleFavoriteMutation = trpc.speeches.toggleFavorite.useMutation({
    onSuccess: () => {
      utils.speeches.list.invalidate();
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao favoritar: " + error.message);
    },
  });

  const toggleArchiveMutation = trpc.speeches.toggleArchive.useMutation({
    onSuccess: () => {
      toast.success(
        speech.archived ? "Speech desarquivado!" : "Speech arquivado!"
      );
      utils.speeches.list.invalidate();
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao arquivar: " + error.message);
    },
  });

  const handleEdit = () => {
    router.push(`/speeches/${speech.id}/editar`);
  };

  const handleView = () => {
    router.push(`/speeches/${speech.id}`);
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: speech.id });
  };

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: speech.id });
  };

  const handleToggleArchive = () => {
    toggleArchiveMutation.mutate({ id: speech.id });
  };

  return (
    <Card className="p-6 hover:bg-accent/50 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-display mb-2 uppercase">
            {speech.titulo}
          </h3>
          <p className="text-sm text-muted-foreground uppercase mb-2">
            {speech.tipoVaga}
          </p>
        </div>
        <MessageIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <Badge variant="outline" className="uppercase">
          v{speech.versao}
        </Badge>
        <Badge variant="secondary" className="uppercase">
          {speech.duracaoEstimada}min
        </Badge>
        {speech.favorite && (
          <Badge variant="default" className="uppercase bg-yellow-600">
            ⭐ Favorito
          </Badge>
        )}
        {speech.archived && (
          <Badge variant="secondary" className="uppercase">
            📦 Arquivado
          </Badge>
        )}
      </div>

      {speech.foco && speech.foco.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {speech.foco.map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                #{item}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <Button
          variant="default"
          size="sm"
          className="flex-1 min-w-[100px]"
          onClick={handleView}
        >
          Ver
        </Button>
        <Button variant="outline" size="sm" onClick={handleEdit}>
          Editar
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleFavorite}
          disabled={toggleFavoriteMutation.isPending}
          title={speech.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {speech.favorite ? "⭐" : "☆"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleArchive}
          disabled={toggleArchiveMutation.isPending}
          title={speech.archived ? "Desarquivar" : "Arquivar"}
        >
          {speech.archived ? "📂" : "📦"}
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
                Tem certeza que deseja excluir o speech "{speech.titulo}"?
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
