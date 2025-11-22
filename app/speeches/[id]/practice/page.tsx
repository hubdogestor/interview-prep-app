"use client";

import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import MessageIcon from "@/components/icons/message";
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

export default function PracticeSpeechPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: speech, isLoading } = trpc.speeches.getById.useQuery({
    id,
  });

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Carregando...",
          description: "Aguarde",
          icon: MessageIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </DashboardPageLayout>
    );
  }

  if (!speech) {
    return (
      <DashboardPageLayout
        header={{
          title: "Não encontrado",
          description: "Speech não encontrado",
          icon: MessageIcon,
        }}
      >
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-muted-foreground">Speech não encontrado</p>
          <Button onClick={() => router.push("/speeches")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para listagem
          </Button>
        </div>
      </DashboardPageLayout>
    );
  }

  const conteudoOriginal =
    typeof speech.conteudo === "string"
      ? speech.conteudo
      : (speech.conteudo as { pt: string; en: string }).pt;

  return (
    <DashboardPageLayout
      header={{
        title: `Practice: ${speech.titulo}`,
        description: speech.tipoVaga,
        icon: MessageIcon,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/speeches/${id}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Info */}
        <Card className="p-6 bg-chart-2/5 border-chart-2">
          <h3 className="font-display uppercase mb-2 text-sm text-muted-foreground">
            Modo de Prática com IA
          </h3>
          <p className="text-sm">
            Grave seu speech e receba feedback automatizado sobre clareza,
            fluência e completude. Tempo estimado:{" "}
            <strong>{speech.duracaoEstimada} minutos</strong>.
          </p>
        </Card>

        {/* AudioPractice Component */}
        <AudioPractice
          tipo="speech"
          itemId={speech.id}
          itemTitle={speech.titulo}
          conteudoOriginal={conteudoOriginal}
          onComplete={() => router.push(`/speeches/${id}`)}
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
