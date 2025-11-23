"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import MicIcon from "@/components/icons/mic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";

const AudioPractice = dynamic(
  () =>
    import("@/components/practice/audio-practice").then(
      (mod) => mod.AudioPractice
    ),
  {
    loading: () => (
      <Card className="p-8">
        <div className="flex items-center justify-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-muted-foreground">Carregando ferramenta de prática...</span>
        </div>
      </Card>
    ),
    ssr: false,
  }
);

export default function PracticeIcebreakerPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: icebreaker, isLoading } = trpc.icebreakers.getById.useQuery({
    id,
  });

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Carregando...",
          description: "Aguarde",
          icon: MicIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </DashboardPageLayout>
    );
  }

  if (!icebreaker) {
    return (
      <DashboardPageLayout
        header={{
          title: "Não encontrado",
          description: "Icebreaker não encontrado",
          icon: MicIcon,
        }}
      >
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-muted-foreground">Icebreaker não encontrado</p>
          <Button onClick={() => router.push("/icebreakers")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para listagem
          </Button>
        </div>
      </DashboardPageLayout>
    );
  }

  // Pega a primeira versão como padrão
  const primeiraVersao = icebreaker.versoes[0];
  
  if (!primeiraVersao) {
    return (
      <DashboardPageLayout
        header={{
          title: "Sem conteúdo",
          description: "Nenhuma versão disponível",
          icon: MicIcon,
        }}
      >
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-muted-foreground">Nenhuma versão disponível para praticar</p>
          <Button onClick={() => router.push("/icebreakers")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para listagem
          </Button>
        </div>
      </DashboardPageLayout>
    );
  }

  const conteudoOriginal = primeiraVersao.conteudo.pt;
  const duracaoEstimada = primeiraVersao.duracao;

  return (
    <DashboardPageLayout
      header={{
        title: `Practice: ${icebreaker.titulo}`,
        description: icebreaker.tipoVaga || icebreaker.tipo,
        icon: MicIcon,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/icebreakers/${id}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Info */}
        <Card className="p-6 bg-chart-1/5 border-chart-1">
          <h3 className="font-display uppercase mb-2 text-sm text-muted-foreground">
            Modo de Prática com IA
          </h3>
          <p className="text-sm">
            Grave seu icebreaker e receba feedback automatizado sobre clareza,
            fluência e completude. Tempo estimado:{" "}
            <strong>{duracaoEstimada}s</strong>.
          </p>
        </Card>

        {/* AudioPractice Component */}
        <AudioPractice
          tipo="icebreaker"
          itemId={icebreaker.id}
          itemTitle={icebreaker.titulo}
          conteudoOriginal={conteudoOriginal}
          onComplete={() => router.push(`/icebreakers/${id}`)}
        />

        {/* Reference Content */}
        <Card className="p-6">
          <h3 className="font-display uppercase mb-4 text-sm text-muted-foreground">
            Conteúdo de Referência
          </h3>
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
              {conteudoOriginal}
            </p>
          </div>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
