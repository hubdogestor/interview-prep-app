"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

import DashboardPageLayout from "@/components/dashboard/layout";
import { ExperienciaForm } from "@/components/experiencias/experiencia-form";
import BriefcaseIcon from "@/components/icons/briefcase";
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

export default function EditarExperienciaPage() {
  const params = useParams();
  const router = useRouter();
  const utils = trpc.useUtils();
  const id = params.id as string;

  const { data: experiencia, isLoading } = trpc.experiencias.getById.useQuery({
    id,
  });

  const updateMutation = trpc.experiencias.update.useMutation({
    onSuccess: () => {
      toast.success("Experiência atualizada com sucesso!");
      utils.experiencias.list.invalidate();
      utils.experiencias.getById.invalidate({ id });
      router.push("/experiencias");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao atualizar experiência: " + error.message);
    },
  });

  const deleteMutation = trpc.experiencias.delete.useMutation({
    onSuccess: () => {
      toast.success("Experiência excluída com sucesso!");
      utils.experiencias.list.invalidate();
      router.push("/experiencias");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao excluir experiência: " + error.message);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id });
  };

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Carregando...",
          description: "Aguarde",
          icon: BriefcaseIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Carregando experiência...</p>
        </div>
      </DashboardPageLayout>
    );
  }

  if (!experiencia) {
    return (
      <DashboardPageLayout
        header={{
          title: "Não encontrado",
          description: "Experiência não encontrada",
          icon: BriefcaseIcon,
        }}
      >
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-muted-foreground">Experiência não encontrada</p>
          <Button onClick={() => router.push("/experiencias")}>
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
        title: "Editar Experiência",
        description: experiencia.empresa,
        icon: BriefcaseIcon,
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
                    Tem certeza que deseja excluir esta experiência? Esta ação
                    não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
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
              onClick={() => router.push("/experiencias")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        ),
      }}
    >
      <div className="max-w-4xl">
        <ExperienciaForm
          defaultValues={experiencia}
          onSubmit={(data) => updateMutation.mutate({ id, ...data })}
          isSubmitting={updateMutation.isPending}
        />
      </div>
    </DashboardPageLayout>
  );
}
