import Link from "next/link";

import DashboardPageLayout from "@/components/dashboard/layout";
import { ExportButton } from "@/components/export/export-button";
import { GenerateAIButton } from "@/components/icebreakers/generate-ai-button";
import { IcebreakerCard } from "@/components/icebreakers/icebreaker-card";
import MicrophoneIcon from "@/components/icons/microphone";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/trpc/server";

export default async function IcebreakersPage() {
  const caller = await api();
  const icebreakers = await caller.icebreakers.list();

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
