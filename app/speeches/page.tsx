"use client";

import Link from "next/link";
import DashboardPageLayout from "@/components/dashboard/layout";
import MessageIcon from "@/components/icons/message";
import { Button } from "@/components/ui/button";
import { SpeechCard } from "@/components/speeches/speech-card";
import { GenerateAIButton } from "@/components/speeches/generate-ai-button";
import { ExportButton } from "@/components/export/export-button";
import { SkeletonGrid } from "@/components/ui/skeleton-cards";
import { trpc } from "@/lib/trpc/client";

export default function SpeechesPage() {
  const { data, isLoading } = trpc.speeches.list.useQuery();
  const speeches = data?.items ?? [];

  // Prepare export data
  const exportItems = speeches.map((speech) => ({
    title: speech.titulo,
    content: speech.conteudo.pt,
    metadata: {
      "Tipo de Vaga": speech.tipoVaga,
      Versão: speech.versao,
      "Duração": `${speech.duracaoEstimada} min`,
      Foco: speech.foco?.join(", ") || "",
    },
  }));

  return (
    <DashboardPageLayout
      header={{
        title: "Speeches",
        description: "Your complete narratives",
        icon: MessageIcon,
        action: <ExportButton items={exportItems} filename="speeches" />,
      }}
    >
      {isLoading ? (
        <SkeletonGrid type="speech" count={4} columns="2" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {speeches.map((speech) => (
            <SpeechCard key={speech.id} speech={speech} />
          ))}

          {speeches.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p className="uppercase">Nenhum speech cadastrado ainda</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/speeches/novo">
          <Button
            variant="outline"
            className="w-full h-full p-4 border-dashed uppercase"
          >
            + Criar Novo Speech
          </Button>
        </Link>
        <GenerateAIButton />
      </div>
    </DashboardPageLayout>
  );
}
