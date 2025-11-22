"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { ContextualLoading } from "@/components/ai/contextual-loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TextStats } from "@/components/ui/text-stats";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc/react";

interface GeneratedSpeech {
  conteudo: { pt: string; en: string };
  duracaoEstimada: number;
}

export function GenerateAIButton() {
  const [open, setOpen] = useState(false);
  const [tipoVaga, setTipoVaga] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [descricaoVaga, setDescricaoVaga] = useState("");
  const [foco, setFoco] = useState("");
  const [duracaoDesejada, setDuracaoDesejada] = useState(3);
  const [generatedSpeech, setGeneratedSpeech] = useState<GeneratedSpeech | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const router = useRouter();
  const utils = trpc.useUtils();

  const generateMutation = trpc.speeches.generateWithAI.useMutation({
    onSuccess: (data) => {
      setGeneratedSpeech(data);
      setShowPreview(true);
      toast.success("Speech gerado! Revise antes de salvar.");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao gerar speech: " + error.message);
    },
  });

  const createMutation = trpc.speeches.create.useMutation({
    onSuccess: (data) => {
      utils.speeches.list.invalidate();
      toast.success("Speech salvo com sucesso!");
      setOpen(false);
      setShowPreview(false);
      setGeneratedSpeech(null);
      router.push(`/speeches/${data.id}/editar`);
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao salvar speech: " + error.message);
    },
  });

  const handleGenerate = () => {
    if (!tipoVaga) {
      toast.error("Por favor, informe o tipo de vaga");
      return;
    }

    generateMutation.mutate({
      tipoVaga,
      nomeEmpresa: nomeEmpresa || undefined,
      descricaoVaga: descricaoVaga || undefined,
      foco: foco
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      duracaoDesejada,
    });
  };

  const handleSave = () => {
    if (!generatedSpeech) return;

    createMutation.mutate({
      tipoVaga,
      titulo: `Speech para ${tipoVaga}`,
      versao: "1.0",
      conteudo: generatedSpeech.conteudo,
      duracaoEstimada: generatedSpeech.duracaoEstimada,
      foco: foco
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    });
  };

  const handleRegenerate = () => {
    setShowPreview(false);
    setGeneratedSpeech(null);
    handleGenerate();
  };

  const handleCancel = () => {
    setShowPreview(false);
    setGeneratedSpeech(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-full p-4 border-dashed uppercase text-chart-1 hover:border-chart-1 hover:bg-chart-1/10"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Gerar com IA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="uppercase font-display flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-chart-1" />
            {showPreview ? "Pré-visualização" : "Gerar Speech com IA"}
          </DialogTitle>
          <DialogDescription>
            {showPreview
              ? "Revise o discurso gerado e salve ou regenere"
              : "Configure as opções e gere um discurso personalizado"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0">
          {generateMutation.isPending ? (
            <ContextualLoading
              messages={[
                "Analisando seu perfil...",
                "Coletando experiências relevantes...",
                "Estruturando o discurso...",
                "Ajustando tom profissional...",
                "Finalizando conteúdo..."
              ]}
              cycleDuration={2000}
            />
          ) : showPreview && generatedSpeech ? (
            <ScrollArea className="h-full max-h-[50vh] pr-4">
              <Card className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display uppercase text-sm">
                      Speech Gerado
                    </h4>
                    <TextStats
                      text={generatedSpeech.conteudo.pt}
                      wordsPerMinute={150}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Duração estimada: ~{generatedSpeech.duracaoEstimada} minutos
                  </p>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {generatedSpeech.conteudo.pt}
                  </p>
                </div>
              </Card>
            </ScrollArea>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="uppercase text-xs">
                  Tipo de Vaga <span className="text-destructive">*</span>
                </Label>
                <Input
                  placeholder="Ex: Senior Software Engineer, Product Manager"
                  value={tipoVaga}
                  onChange={(e) => setTipoVaga(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-xs">
                  Nome da Empresa (Opcional)
                </Label>
                <Input
                  placeholder="Ex: Google, Amazon"
                  value={nomeEmpresa}
                  onChange={(e) => setNomeEmpresa(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-xs">
                  Descrição da Vaga (Opcional)
                </Label>
                <Textarea
                  placeholder="Cole a descrição da vaga para personalizar o speech"
                  value={descricaoVaga}
                  onChange={(e) => setDescricaoVaga(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-xs">
                  Áreas de Foco (Opcional)
                </Label>
                <Input
                  placeholder="Ex: liderança, arquitetura, cloud"
                  value={foco}
                  onChange={(e) => setFoco(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Separe por vírgula
                </p>
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-xs">
                  Duração Desejada (minutos)
                </Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={duracaoDesejada}
                  onChange={(e) =>
                    setDuracaoDesejada(parseInt(e.target.value) || 3)
                  }
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0">
          <div className="flex items-center gap-2 w-full justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={showPreview ? handleCancel : () => setOpen(false)}
              disabled={generateMutation.isPending || createMutation.isPending}
            >
              {showPreview ? "Voltar" : "Cancelar"}
            </Button>
            <div className="flex gap-2">
              {showPreview ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRegenerate}
                    disabled={generateMutation.isPending || createMutation.isPending}
                    className="text-chart-1 border-chart-1 hover:bg-chart-1/10"
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    Regenerar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSave}
                    disabled={generateMutation.isPending || createMutation.isPending}
                  >
                    {createMutation.isPending ? "Salvando..." : "Salvar"}
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Gerar
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
