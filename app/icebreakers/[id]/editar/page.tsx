"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import DashboardPageLayout from "@/components/dashboard/layout";
import { IcebreakerForm } from "@/components/icebreakers/icebreaker-form";
import MicrophoneIcon from "@/components/icons/microphone";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/react";

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
      <div className="max-w-4xl relative">
        <div className="absolute top-0 right-0 -mt-2">
          <Link href="/icebreakers">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

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
