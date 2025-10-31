"use client";

import { useRouter } from "next/navigation";
import { IcebreakerForm } from "@/components/icebreakers/icebreaker-form";
import DashboardPageLayout from "@/components/dashboard/layout";
import MicrophoneIcon from "@/components/icons/microphone";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

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
