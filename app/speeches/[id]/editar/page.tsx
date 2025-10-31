"use client";

import { useRouter } from "next/navigation";
import { SpeechForm } from "@/components/speeches/speech-form";
import DashboardPageLayout from "@/components/dashboard/layout";
import MessageIcon from "@/components/icons/message";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

export default function EditarSpeechPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data: speech, isLoading } = trpc.speeches.getById.useQuery({
    id: params.id,
  });

  const updateMutation = trpc.speeches.update.useMutation({
    onSuccess: () => {
      toast.success("Speech atualizado com sucesso!");
      utils.speeches.list.invalidate();
      router.push("/speeches");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao atualizar speech: " + error.message);
    },
  });

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Editar Speech",
          description: "Carregando...",
          icon: MessageIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground uppercase">Carregando...</p>
        </div>
      </DashboardPageLayout>
    );
  }

  if (!speech) {
    return (
      <DashboardPageLayout
        header={{
          title: "Editar Speech",
          description: "Não encontrado",
          icon: MessageIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground uppercase">
            Speech não encontrado
          </p>
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      header={{
        title: "Editar Speech",
        description: speech.titulo,
        icon: MessageIcon,
      }}
    >
      <div className="max-w-4xl">
        <SpeechForm
          defaultValues={{
            tipoVaga: speech.tipoVaga,
            titulo: speech.titulo,
            versao: speech.versao,
            conteudo: speech.conteudo as any,
            duracaoEstimada: speech.duracaoEstimada,
            foco: speech.foco,
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
