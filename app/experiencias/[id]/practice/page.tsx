"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mic,Play, Timer } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import BriefcaseIcon from "@/components/icons/briefcase";
import { PracticeTimer } from "@/components/practice/practice-timer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";
import type { StarCase } from "@/types";

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

const StarCaseTeleprompter = dynamic(
  () =>
    import("@/components/experiencias/star-case-teleprompter").then(
      (mod) => mod.StarCaseTeleprompter
    ),
  {
    loading: () => (
      <Card className="p-8">
        <div className="flex items-center justify-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-muted-foreground">Carregando teleprompter...</span>
        </div>
      </Card>
    ),
    ssr: false,
  }
);

export default function PracticeExperienciaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [selectedStarCase, setSelectedStarCase] = useState<StarCase | null>(null);
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showAudioPractice, setShowAudioPractice] = useState(false);

  const { data: experiencia, isLoading } = trpc.experiencias.getById.useQuery({
    id,
  });

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Carregando...",
          description: "Aguarde",
          icon: BriefcaseIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </DashboardPageLayout>
    );
  }

  if (!experiencia) {
    return (
      <DashboardPageLayout
        header={{
          title: "Não encontrado",
          description: "Experiência não encontrada",
          icon: BriefcaseIcon,
        }}
      >
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-muted-foreground">Experiência não encontrada</p>
          <Button onClick={() => router.push("/experiencias")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para listagem
          </Button>
        </div>
      </DashboardPageLayout>
    );
  }

  const handlePracticeTeleprompter = (starCase: StarCase) => {
    setSelectedStarCase(starCase);
    setShowTeleprompter(true);
  };

  const handlePracticeTimer = (starCase: StarCase) => {
    setSelectedStarCase(starCase);
    setShowTimer(true);
  };

  const handlePracticeAudio = (starCase: StarCase) => {
    setSelectedStarCase(starCase);
    setShowAudioPractice(true);
  };

  return (
    <DashboardPageLayout
      header={{
        title: `Practice: ${experiencia.empresa}`,
        description: experiencia.cargo,
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
      <div className="space-y-6">
        {/* Info */}
        <Card className="p-6 bg-chart-1/5 border-chart-1">
          <h3 className="font-display uppercase mb-2 text-sm text-muted-foreground">
            Modo de Prática
          </h3>
          <p className="text-sm">
            Pratique seus STAR Cases com teleprompter ou timer. Escolha um case
            abaixo para começar.
          </p>
        </Card>

        {/* STAR Cases */}
        {experiencia.starCases && experiencia.starCases.length > 0 ? (
          <div className="space-y-4">
            {(experiencia.starCases as StarCase[]).map((starCase, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-display uppercase">
                        {starCase.titulo}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {starCase.idioma.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-chart-1">Situation:</strong>{" "}
                        {starCase.situation.slice(0, 150)}...
                      </p>
                      <p>
                        <strong className="text-chart-4">Result:</strong>{" "}
                        {starCase.result.slice(0, 150)}...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handlePracticeAudio(starCase)}
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    AI PRACTICE
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePracticeTeleprompter(starCase)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    TELEPROMPTER
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePracticeTimer(starCase)}
                  >
                    <Timer className="h-4 w-4 mr-2" />
                    TIMER
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground uppercase mb-4">
              Nenhum STAR Case cadastrado ainda
            </p>
            <Button
              variant="outline"
              onClick={() => router.push(`/experiencias/${id}`)}
            >
              Editar Experiência
            </Button>
          </Card>
        )}
      </div>

      {/* Teleprompter Dialog */}
      {selectedStarCase && (
        <StarCaseTeleprompter
          open={showTeleprompter}
          onOpenChange={setShowTeleprompter}
          starCase={selectedStarCase}
        />
      )}

      {/* Practice Timer */}
      {selectedStarCase && (
        <PracticeTimer
          open={showTimer}
          onOpenChange={setShowTimer}
          targetDuration={180}
        />
      )}

      {/* Audio Practice with AI */}
      {selectedStarCase && showAudioPractice && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-3xl">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAudioPractice(false)}
                  className="absolute top-0 right-0 z-10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <div className="mt-12">
                  <h2 className="text-2xl font-display uppercase mb-2">
                    {selectedStarCase.titulo}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Grave seu STAR Case e receba feedback automatizado
                  </p>
                  <AudioPractice
                    tipo="star_case"
                    itemId={id}
                    itemTitle={selectedStarCase.titulo}
                    conteudoOriginal={`${selectedStarCase.situation}\n\n${selectedStarCase.task}\n\n${selectedStarCase.action}\n\n${selectedStarCase.result}`}
                    onComplete={() => setShowAudioPractice(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardPageLayout>
  );
}
