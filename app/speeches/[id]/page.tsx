import { notFound } from "next/navigation";

import DashboardPageLayout from "@/components/dashboard/layout";
import MessageIcon from "@/components/icons/message";
import { SpeechView } from "@/components/speeches/speech-view";
import { api } from "@/lib/trpc/server";

export default async function SpeechViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caller = await api();
  const speech = await caller.speeches.getById({ id });

  if (!speech) {
    notFound();
  }

  const speechData = {
    ...speech,
    conteudo: speech.conteudo as { pt: string; en: string },
  };

  return (
    <DashboardPageLayout
      header={{
        title: speech.titulo,
        description: speech.tipoVaga,
        icon: MessageIcon,
      }}
    >
      <SpeechView speech={speechData} />
    </DashboardPageLayout>
  );
}
