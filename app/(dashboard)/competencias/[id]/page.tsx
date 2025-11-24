"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { CompetenciaForm } from "@/components/competencias/competencia-form";
import DashboardPageLayout from "@/components/dashboard/layout";
import StarIcon from "@/components/icons/star";
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
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/react";

export default function EditarCompetenciaPage() {
  const params = useParams();
  const router = useRouter();
  const utils = trpc.useUtils();
  const id = params.id as string;

  const { data: competencia, isLoading } = trpc.competencias.getById.useQuery({
    id,
  });

  const updateMutation = trpc.competencias.update.useMutation({
    onSuccess: () => {
      toast.success("Competência atualizada com sucesso!");
      utils.competencias.list.invalidate();
      utils.competencias.getById.invalidate({ id });
      router.push("/competencias");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao atualizar competência: " + error.message);
    },
  });

  const deleteMutation = trpc.competencias.delete.useMutation({
    onSuccess: () => {
      toast.success("Competência excluída com sucesso!");
      utils.competencias.list.invalidate();
      router.push("/competencias");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao excluir competência: " + error.message);
    },
  });

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Carregando...",
          description: "Aguarde",
          icon: StarIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Carregando competência...</p>
        </div>
      </DashboardPageLayout>
    );
  }

  if (!competencia) {
    return (
      <DashboardPageLayout
        header={{
          title: "Não encontrado",
          description: "Competência não encontrada",
          icon: StarIcon,
        }}
      >
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-muted-foreground">Competência não encontrada</p>
          <Button onClick={() => router.push("/competencias")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para listagem
          </Button>
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      header={{
        title: "Editar Competência",
        description: competencia.nome,
        icon: StarIcon,
        action: (
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir esta competência? Esta ação
                    não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteMutation.mutate({ id })}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/competencias")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        ),
      }}
    >
      <div className="max-w-4xl">
        <CompetenciaForm
          defaultValues={competencia}
          onSubmit={(data) => updateMutation.mutate({ id, ...data })}
          isSubmitting={updateMutation.isPending}
        />
      </div>
    </DashboardPageLayout>
  );
}
