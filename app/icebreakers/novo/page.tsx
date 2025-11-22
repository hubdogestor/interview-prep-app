"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import DashboardPageLayout from "@/components/dashboard/layout";
import { IcebreakerForm } from "@/components/icebreakers/icebreaker-form";
import MicrophoneIcon from "@/components/icons/microphone";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/react";

export default function NovoIcebreakerPage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const createMutation = trpc.icebreakers.create.useMutation({
    onSuccess: () => {
      toast.success("Icebreaker criado com sucesso!");
      utils.icebreakers.list.invalidate();
      router.push("/icebreakers");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao criar icebreaker: " + error.message);
    },
  });

  return (
    <DashboardPageLayout
      header={{
        title: "Novo Icebreaker",
        description: "Crie uma nova apresentação",
        icon: MicrophoneIcon,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/icebreakers")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
      }}
    >
      <div className="max-w-4xl">
        <IcebreakerForm
          onSubmit={(data) => createMutation.mutate(data)}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </DashboardPageLayout>
  );
}
