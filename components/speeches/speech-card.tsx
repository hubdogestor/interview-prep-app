"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import MessageIcon from "@/components/icons/message";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InlineEdit } from "@/components/ui/inline-edit";
import { cardHover, cardTap, iconHover } from "@/lib/animations";
import { toastMessages } from "@/lib/toast-messages";
import { trpc } from "@/lib/trpc/react";

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

  const updateMutation = trpc.speeches.update.useMutation({
    onSuccess: () => {
      utils.speeches.list.invalidate();
      toastMessages.speech.updated();
    },
    onError: () => {
      toastMessages.speech.error.update();
    },
  });

  const deleteMutation = trpc.speeches.delete.useMutation({
    onSuccess: () => {
      toastMessages.speech.deleted();
      utils.speeches.list.invalidate();
    },
    onError: () => {
      toastMessages.speech.error.delete();
    },
  });

  const toggleFavoriteMutation = trpc.speeches.toggleFavorite.useMutation({
    onMutate: async ({ id }) => {
      await utils.speeches.list.cancel();
      const previousSpeeches = utils.speeches.list.getData();

      utils.speeches.list.setData(undefined, (old) => {
        if (!old) return old;
        return old.map((s) =>
          s.id === id ? { ...s, favorite: !s.favorite } : s
        );
      });

      return { previousSpeeches };
    },
    onError: (err, variables, context) => {
      if (context?.previousSpeeches) {
        utils.speeches.list.setData(undefined, context.previousSpeeches);
      }
      toastMessages.speech.error.favorite();
    },
    onSettled: () => {
      utils.speeches.list.invalidate();
    },
  });

  const toggleArchiveMutation = trpc.speeches.toggleArchive.useMutation({
    onMutate: async ({ id }) => {
      await utils.speeches.list.cancel();
      const previousSpeeches = utils.speeches.list.getData();

      utils.speeches.list.setData(undefined, (old) => {
        if (!old) return old;
        return old.map((s) =>
          s.id === id ? { ...s, archived: !s.archived } : s
        );
      });

      return { previousSpeeches };
    },
    onSuccess: () => {
      if (speech.archived) {
        toastMessages.speech.unarchived();
      } else {
        toastMessages.speech.archived();
      }
    },
    onError: (err, variables, context) => {
      if (context?.previousSpeeches) {
        utils.speeches.list.setData(undefined, context.previousSpeeches);
      }
      toastMessages.speech.error.archive();
    },
    onSettled: () => {
      utils.speeches.list.invalidate();
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

  const handleTitleUpdate = async (newTitle: string) => {
    await updateMutation.mutateAsync({
      id: speech.id,
      titulo: newTitle,
    });
  };

  return (
    <motion.div
      whileHover={cardHover}
      whileTap={cardTap}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:bg-accent/50 transition-colors group cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <InlineEdit
              value={speech.titulo}
              onSave={handleTitleUpdate}
              className="text-xl font-display mb-2 uppercase"
              inputClassName="text-xl font-display uppercase"
              placeholder="Título do speech"
              maxLength={100}
            />
            <p className="text-sm text-muted-foreground uppercase mb-2">
              {speech.tipoVaga}
            </p>
          </div>
          <motion.div whileHover={iconHover}>
            <MessageIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
          </motion.div>
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
                Tem certeza que deseja excluir o speech &quot;{speech.titulo}&quot;?
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
    </motion.div>
  );
}
