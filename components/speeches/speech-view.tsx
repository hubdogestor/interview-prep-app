"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { TextStats } from "@/components/ui/text-stats";
import { TeleprompterView } from "@/components/teleprompter/teleprompter-view";
import { FloatingTimer } from "@/components/practice/floating-timer";
import { ExportButton } from "@/components/export/export-button";
import { Monitor, Timer } from "lucide-react";

interface SpeechViewProps {
  speech: {
    id: string;
    titulo: string;
    tipoVaga: string;
    versao: string;
    conteudo: { pt: string; en: string };
    duracaoEstimada: number;
    foco: string[];
    favorite: boolean;
    archived: boolean;
  };
}

export function SpeechView({ speech }: SpeechViewProps) {
  const [teleprompterOpen, setTeleprompterOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const conteudo = speech.conteudo.pt;
  const targetSeconds = speech.duracaoEstimada * 60;

  return (
    <>
      <div className="max-w-4xl space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Badge variant="outline" className="uppercase">
              v{speech.versao}
            </Badge>
            <Badge variant="secondary" className="uppercase">
              {speech.duracaoEstimada}min
            </Badge>
            {speech.favorite && (
              <Badge variant="default" className="uppercase bg-yellow-600">
                ⭐ Favorito
              </Badge>
            )}
            {speech.archived && (
              <Badge variant="secondary" className="uppercase">
                📦 Arquivado
              </Badge>
            )}
          </div>

          {speech.foco && speech.foco.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-display uppercase mb-3">
                Áreas de Foco
              </h3>
              <div className="flex flex-wrap gap-2">
                {speech.foco.map((item) => (
                  <Badge key={item} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-display uppercase text-muted-foreground">
                  Conteúdo
                </h3>
                <TextStats text={conteudo} wordsPerMinute={150} />
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {conteudo}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-6 mt-6 border-t border-border flex-wrap">
            <CopyButton
              text={conteudo}
              successMessage="Speech copiado!"
              size="sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTeleprompterOpen(true)}
            >
              <Monitor className="mr-1 h-3 w-3" />
              Teleprompter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTimer(true)}
            >
              <Timer className="mr-1 h-3 w-3" />
              Timer
            </Button>
            <ExportButton
              items={[
                {
                  title: speech.titulo,
                  content: conteudo,
                  metadata: {
                    "Tipo de Vaga": speech.tipoVaga,
                    Versão: speech.versao,
                    "Duração Estimada": `${speech.duracaoEstimada} minutos`,
                    "Áreas de Foco": speech.foco.join(", "),
                  },
                },
              ]}
              filename={`speech-${speech.titulo.toLowerCase().replace(/\s+/g, "-")}`}
              size="sm"
            />
          </div>
        </Card>

        <div className="flex gap-4">
          <Link href={`/speeches/${speech.id}/editar`} className="flex-1">
            <Button variant="default" className="w-full">
              Editar Speech
            </Button>
          </Link>
          <Link href="/speeches">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </div>

      <TeleprompterView
        open={teleprompterOpen}
        onOpenChange={setTeleprompterOpen}
        title={speech.titulo}
        content={conteudo}
      />

      {showTimer && (
        <FloatingTimer
          targetDuration={targetSeconds}
          onClose={() => setShowTimer(false)}
        />
      )}
    </>
  );
}
