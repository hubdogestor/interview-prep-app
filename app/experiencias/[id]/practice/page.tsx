"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/layout";
import BriefcaseIcon from "@/components/icons/briefcase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Timer } from "lucide-react";
import { trpc } from "@/lib/trpc/react";
import { StarCaseTeleprompter } from "@/components/experiencias/star-case-teleprompter";
import { PracticeTimer } from "@/components/practice/practice-timer";

interface StarCase {
  titulo: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  idioma: "pt" | "en";
}

export default function PracticeExperienciaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [selectedStarCase, setSelectedStarCase] = useState<StarCase | null>(null);
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

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
            {experiencia.starCases.map((starCase: StarCase, index: number) => (
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
          title={selectedStarCase.titulo}
          targetDuration={180} // 3 minutes default for STAR cases
          description={`Practice: ${selectedStarCase.titulo}`}
        />
      )}
    </DashboardPageLayout>
  );
}
