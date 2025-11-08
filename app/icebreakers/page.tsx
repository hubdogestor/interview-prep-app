"use client";

import Link from "next/link";
import DashboardPageLayout from "@/components/dashboard/layout";
import MicrophoneIcon from "@/components/icons/microphone";
import { Button } from "@/components/ui/button";
import { IcebreakerCard } from "@/components/icebreakers/icebreaker-card";
import { GenerateAIButton } from "@/components/icebreakers/generate-ai-button";
import { ExportButton } from "@/components/export/export-button";
import { SkeletonGrid } from "@/components/ui/skeleton-cards";
import { trpc } from "@/lib/trpc/client";

export default function IcebreakersPage() {
  const { data, isLoading } = trpc.icebreakers.list.useQuery();
  const icebreakers = data?.items ?? [];

  // Prepare export data
  const exportItems = icebreakers.flatMap((icebreaker) =>
    icebreaker.versoes.map((versao: any) => ({
      title: `${icebreaker.titulo} - ${versao.nome}`,
      content: versao.conteudo.pt,
      metadata: {
        Tipo: icebreaker.tipo,
        "Duração": `${versao.duracao}s`,
        Tags: versao.tags?.join(", ") || "",
      },
    }))
  );

  return (
    <DashboardPageLayout
      header={{
        title: "Icebreakers",
        description: "Your introduction arsenal",
        icon: MicrophoneIcon,
        action: <ExportButton items={exportItems} filename="icebreakers" />,
      }}
    >
      {isLoading ? (
        <SkeletonGrid type="icebreaker" count={4} columns="2" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {icebreakers.map((icebreaker) => (
            <IcebreakerCard key={icebreaker.id} icebreaker={icebreaker} />
          ))}

          {icebreakers.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p className="uppercase">Nenhum icebreaker cadastrado ainda</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/icebreakers/novo">
          <Button
            variant="outline"
            className="w-full h-full p-4 border-dashed uppercase"
          >
            + Criar Novo Icebreaker
          </Button>
        </Link>
        <GenerateAIButton />
      </div>
    </DashboardPageLayout>
  );
}
