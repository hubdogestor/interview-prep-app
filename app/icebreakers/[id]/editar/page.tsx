"use client";

import { useRouter } from "next/navigation";
import { IcebreakerForm } from "@/components/icebreakers/icebreaker-form";
import DashboardPageLayout from "@/components/dashboard/layout";
import MicrophoneIcon from "@/components/icons/microphone";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

export default function EditarIcebreakerPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data: icebreaker, isLoading } = trpc.icebreakers.getById.useQuery({
    id: params.id,
  });

  const updateMutation = trpc.icebreakers.update.useMutation({
    onSuccess: () => {
      toast.success("Icebreaker atualizado com sucesso!");
      utils.icebreakers.list.invalidate();
      router.push("/icebreakers");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao atualizar icebreaker: " + error.message);
    },
  });

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Editar Icebreaker",
          description: "Carregando...",
          icon: MicrophoneIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground uppercase">Carregando...</p>
        </div>
      </DashboardPageLayout>
    );
  }

  if (!icebreaker) {
    return (
      <DashboardPageLayout
        header={{
          title: "Editar Icebreaker",
          description: "Não encontrado",
          icon: MicrophoneIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground uppercase">
            Icebreaker não encontrado
          </p>
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      header={{
        title: "Editar Icebreaker",
        description: icebreaker.titulo,
        icon: MicrophoneIcon,
      }}
    >
      <div className="max-w-4xl">
        <IcebreakerForm
          defaultValues={{
            tipo: icebreaker.tipo as "elevator_pitch" | "quick_intro" | "personal_story",
            titulo: icebreaker.titulo,
            versoes: icebreaker.versoes as any,
          }}
          onSubmit={(data) =>
            updateMutation.mutate({
              id: params.id,
              ...data,
            })
          }
          isSubmitting={updateMutation.isPending}
        />
      </div>
    </DashboardPageLayout>
  );
}
