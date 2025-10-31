"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { TextStats } from "@/components/ui/text-stats";
import { TeleprompterView } from "@/components/teleprompter/teleprompter-view";
import { PracticeTimer } from "@/components/practice/practice-timer";
import { Eye, Monitor, Timer } from "lucide-react";

interface Version {
  nome: string;
  conteudo: {
    pt: string;
    en: string;
  };
  duracao: number;
  tags: string[];
}

interface ViewVersionsModalProps {
  versions: Version[];
  titulo: string;
}

export function ViewVersionsModal({
  versions,
  titulo,
}: ViewVersionsModalProps) {
  const [open, setOpen] = useState(false);
  const [teleprompterOpen, setTeleprompterOpen] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

  const handleOpenTeleprompter = (version: Version) => {
    setSelectedVersion(version);
    setTeleprompterOpen(true);
  };

  const handleOpenTimer = (version: Version) => {
    setSelectedVersion(version);
    setTimerOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent"
          >
            <Badge
              variant="outline"
              className="uppercase cursor-pointer hover:bg-accent"
            >
              <Eye className="mr-1 h-3 w-3" />
              {versions.length} versões
            </Badge>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="uppercase font-display">
              {titulo}
            </DialogTitle>
            <DialogDescription>
              Visualize todas as versões deste icebreaker
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {versions.map((version, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display uppercase text-lg">
                      {version.nome}
                    </h3>
                    <TextStats
                      text={version.conteudo.pt}
                      className="mt-1"
                      wordsPerMinute={120}
                    />
                  </div>
                  {version.tags && version.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {version.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="prose prose-sm prose-invert max-w-none mb-4">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {version.conteudo.pt}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <CopyButton
                    text={version.conteudo.pt}
                    successMessage="Icebreaker copiado!"
                    size="sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenTeleprompter(version)}
                  >
                    <Monitor className="mr-1 h-3 w-3" />
                    Teleprompter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenTimer(version)}
                  >
                    <Timer className="mr-1 h-3 w-3" />
                    Timer
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {selectedVersion && (
        <>
          <TeleprompterView
            open={teleprompterOpen}
            onOpenChange={setTeleprompterOpen}
            title={`${titulo} - ${selectedVersion.nome}`}
            content={selectedVersion.conteudo.pt}
          />
          <PracticeTimer
            open={timerOpen}
            onOpenChange={setTimerOpen}
            targetDuration={selectedVersion.duracao}
          />
        </>
      )}
    </>
  );
}
