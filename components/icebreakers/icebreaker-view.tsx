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
import { Monitor, Timer, Mic } from "lucide-react";

interface IcebreakerViewProps {
  icebreaker: {
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

export function IcebreakerView({ icebreaker }: IcebreakerViewProps) {
  const [teleprompterOpen, setTeleprompterOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const conteudo = icebreaker.conteudo.pt;
  const targetSeconds = icebreaker.duracaoEstimada;

  return (
    <>
      <div className="max-w-4xl space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Badge variant="outline" className="uppercase">
              v{icebreaker.versao}
            </Badge>
            <Badge variant="secondary" className="uppercase">
              {icebreaker.duracaoEstimada}s
            </Badge>
            {icebreaker.favorite && (
              <Badge variant="default" className="uppercase bg-yellow-600">
                ⭐ Favorito
              </Badge>
            )}
            {icebreaker.archived && (
              <Badge variant="secondary" className="uppercase">
                📦 Arquivado
              </Badge>
            )}
          </div>

          {icebreaker.foco && icebreaker.foco.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-display uppercase mb-3">
                Áreas de Foco
              </h3>
              <div className="flex flex-wrap gap-2">
                {icebreaker.foco.map((item) => (
                  <Badge key={item} variant="secondary" className="text-xs">
                    #{item}
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
              successMessage="Icebreaker copiado!"
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
            <Link href={`/icebreakers/${icebreaker.id}/practice`}>
              <Button variant="default" size="sm">
                <Mic className="mr-1 h-3 w-3" />
                Practice
              </Button>
            </Link>
            <ExportButton
              items={[
                {
                  title: icebreaker.titulo,
                  content: conteudo,
                  metadata: {
                    "Tipo de Vaga": icebreaker.tipoVaga,
                    Versão: icebreaker.versao,
                    "Duração Estimada": `${icebreaker.duracaoEstimada} segundos`,
                    "Áreas de Foco": icebreaker.foco.join(", "),
                  },
                },
              ]}
              filename={`icebreaker-${icebreaker.titulo.toLowerCase().replace(/\s+/g, "-")}`}
              size="sm"
            />
          </div>
        </Card>

        <div className="flex gap-4">
          <Link href={`/icebreakers/${icebreaker.id}/editar`} className="flex-1">
            <Button variant="default" className="w-full">
              Editar Icebreaker
            </Button>
          </Link>
          <Link href="/icebreakers">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </div>

      <TeleprompterView
        open={teleprompterOpen}
        onOpenChange={setTeleprompterOpen}
        title={icebreaker.titulo}
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
