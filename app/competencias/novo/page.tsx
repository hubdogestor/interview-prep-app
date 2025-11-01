"use client";

import { useRouter } from "next/navigation";
import { CompetenciaForm } from "@/components/competencias/competencia-form";
import DashboardPageLayout from "@/components/dashboard/layout";
import StarIcon from "@/components/icons/star";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

export default function NovaCompetenciaPage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const createMutation = trpc.competencias.create.useMutation({
    onSuccess: () => {
      toast.success("Competência criada com sucesso!");
      utils.competencias.list.invalidate();
      router.push("/competencias");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao criar competência: " + error.message);
    },
  });

  return (
    <DashboardPageLayout
      header={{
        title: "Nova Competência",
        description: "Adicione uma nova habilidade ao seu arsenal",
        icon: StarIcon,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/competencias")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
      }}
    >
      <div className="max-w-4xl">
        <CompetenciaForm
          onSubmit={(data) => createMutation.mutate(data)}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </DashboardPageLayout>
  );
}
