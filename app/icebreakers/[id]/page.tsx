import { notFound } from "next/navigation";
import { type Metadata } from "next";

import DashboardPageLayout from "@/components/dashboard/layout";
import { IcebreakerView } from "@/components/icebreakers/icebreaker-view";
import MicIcon from "@/components/icons/mic";
import { api } from "@/lib/trpc/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const caller = await api();
  const icebreaker = await caller.icebreakers.getById({ id });

  if (!icebreaker) {
    return {
      title: "Icebreaker não encontrado",
    };
  }

  return {
    title: icebreaker.titulo,
    description: `Icebreaker: ${icebreaker.titulo} - ${icebreaker.tipo}`,
  };
}

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

  // Pega a primeira versão como padrão
  const primeiraVersao = icebreaker.versoes[0];
  
  if (!primeiraVersao) {
    notFound();
  }

  const icebreakerData = {
    id: icebreaker.id,
    titulo: icebreaker.titulo,
    tipoVaga: icebreaker.tipoVaga || icebreaker.tipo,
    versao: primeiraVersao.nome,
    conteudo: primeiraVersao.conteudo,
    duracaoEstimada: primeiraVersao.duracao,
    foco: primeiraVersao.tags || [],
    favorite: icebreaker.favorite,
    archived: icebreaker.archived,
  };

  return (
    <DashboardPageLayout
      header={{
        title: icebreaker.titulo,
        description: icebreakerData.tipoVaga,
        icon: MicIcon,
      }}
    >
      <IcebreakerView icebreaker={icebreakerData} />
    </DashboardPageLayout>
  );
}
