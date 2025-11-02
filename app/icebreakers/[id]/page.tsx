import DashboardPageLayout from "@/components/dashboard/layout";
import MicIcon from "@/components/icons/mic";
import { IcebreakerView } from "@/components/icebreakers/icebreaker-view";
import { api } from "@/lib/trpc/server";
import { notFound } from "next/navigation";

export default async function IcebreakerViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caller = await api();
  const icebreaker = await caller.icebreakers.getById({ id });

  if (!icebreaker) {
    notFound();
  }

  const icebreakerData = {
    ...icebreaker,
    conteudo: icebreaker.conteudo as { pt: string; en: string },
  };

  return (
    <DashboardPageLayout
      header={{
        title: icebreaker.titulo,
        description: icebreaker.tipoVaga,
        icon: MicIcon,
      }}
    >
      <IcebreakerView icebreaker={icebreakerData} />
    </DashboardPageLayout>
  );
}
