"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import DashboardPageLayout from "@/components/dashboard/layout";
import MessageIcon from "@/components/icons/message";
import { SpeechForm } from "@/components/speeches/speech-form";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/react";

export default function NovoSpeechPage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const createMutation = trpc.speeches.create.useMutation({
    onSuccess: () => {
      toast.success("Speech criado com sucesso!");
      utils.speeches.list.invalidate();
      router.push("/speeches");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao criar speech: " + error.message);
    },
  });

  return (
    <DashboardPageLayout
      header={{
        title: "Novo Speech",
        description: "Crie um novo discurso completo",
        icon: MessageIcon,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/speeches")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
      }}
    >
      <div className="max-w-4xl">
        <SpeechForm
          onSubmit={(data) => createMutation.mutate(data)}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </DashboardPageLayout>
  );
}
