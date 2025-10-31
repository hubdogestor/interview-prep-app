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
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

interface IcebreakerCardProps {
  icebreaker: {
    id: string;
    tipo: string;
    titulo: string;
    versoes: any[];
  };
}

export function IcebreakerCard({ icebreaker }: IcebreakerCardProps) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const deleteMutation = trpc.icebreakers.delete.useMutation({
    onSuccess: () => {
      toast.success("Icebreaker removido com sucesso!");
      utils.icebreakers.list.invalidate();
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao remover icebreaker: " + error.message);
    },
  });

  const handleEdit = () => {
    router.push(`/icebreakers/${icebreaker.id}/editar`);
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: icebreaker.id });
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

      <div className="flex items-center gap-3 mb-4">
        <Badge variant="outline" className="uppercase">
          {icebreaker.versoes.length} versões
        </Badge>
      </div>

      <div className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={handleEdit}
        >
          Editar
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              Excluir
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
