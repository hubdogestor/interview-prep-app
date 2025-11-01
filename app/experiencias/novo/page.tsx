"use client";

import { useRouter } from "next/navigation";
import { ExperienciaForm } from "@/components/experiencias/experiencia-form";
import DashboardPageLayout from "@/components/dashboard/layout";
import BriefcaseIcon from "@/components/icons/briefcase";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

export default function NovaExperienciaPage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const createMutation = trpc.experiencias.create.useMutation({
    onSuccess: () => {
      toast.success("Experiência criada com sucesso!");
      utils.experiencias.list.invalidate();
      router.push("/experiencias");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao criar experiência: " + error.message);
    },
  });

  return (
    <DashboardPageLayout
      header={{
        title: "Nova Experiência",
        description: "Adicione uma nova experiência profissional",
        icon: BriefcaseIcon,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/experiencias")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
      }}
    >
      <div className="max-w-4xl">
        <ExperienciaForm
          onSubmit={(data) => createMutation.mutate(data)}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </DashboardPageLayout>
  );
}
