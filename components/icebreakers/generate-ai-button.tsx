"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { ContextualLoading } from "@/components/ai/contextual-loading";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAIQueue } from "@/hooks/use-ai-queue";
import { trpc } from "@/lib/trpc/react";
import type { IcebreakerVersion } from "@/types";

const TIPO_OPTIONS = [
  { value: "elevator_pitch", label: "Elevator Pitch (1-2 min)" },
  { value: "quick_intro", label: "Quick Intro (2-4 min)" },
  { value: "personal_story", label: "Personal Story (4-6 min)" },
] as const;

const CATEGORIA_OPTIONS = [
  { value: "fale_sobre_voce", label: "Fale sobre você" },
  { value: "porque_mudar_emprego", label: "Por que mudar de emprego?" },
  { value: "porque_esta_vaga", label: "Por que esta vaga?" },
  { value: "pontos_fortes", label: "Quais são seus pontos fortes?" },
  { value: "areas_desenvolvimento", label: "Áreas de desenvolvimento" },
  { value: "maior_desafio", label: "Maior desafio profissional" },
  { value: "realizacao_orgulho", label: "Realização de maior orgulho" },
  { value: "trabalho_equipe", label: "Como você trabalha em equipe?" },
] as const;

export function GenerateAIButton() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<
    "elevator_pitch" | "quick_intro" | "personal_story"
  >("elevator_pitch");
  const [categoria, setCategoria] = useState<string>("");
  const [orientacoesCustomizadas, setOrientacoesCustomizadas] = useState("");
  const [generatedVersions, setGeneratedVersions] = useState<IcebreakerVersion[] | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const router = useRouter();
  const utils = trpc.useUtils();
  
  // AI Queue integration
  const { addToQueue, startProcessing, completeProcessing } = useAIQueue();

  const generateMutation = trpc.icebreakers.generateWithAI.useMutation({
    onSuccess: (data) => {
      setGeneratedVersions(data.versoes);
      setShowPreview(true);
      toast.success("Icebreakers gerados! Revise antes de salvar.");
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao gerar icebreaker: " + error.message);
    },
  });

  const createMutation = trpc.icebreakers.create.useMutation({
    onSuccess: (data) => {
      utils.icebreakers.list.invalidate();
      toast.success("Icebreaker salvo com sucesso!");
      setOpen(false);
      setShowPreview(false);
      setGeneratedVersions(null);
      router.push(`/icebreakers/${data.id}/editar`);
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao salvar icebreaker: " + error.message);
    },
  });

  const handleGenerate = () => {
    // Add to AI queue
    const queueId = addToQueue({
      type: "icebreaker",
      priority: 5,
      metadata: { tipo, categoria },
    });

    startProcessing(queueId);

    // Execute mutation
    generateMutation.mutate(
      {
        tipo,
        categoria: categoria || undefined,
        orientacoesCustomizadas: orientacoesCustomizadas || undefined,
      },
      {
        onSuccess: () => completeProcessing(queueId),
        onError: (error) => completeProcessing(queueId, error.message),
      }
    );
  };

  const handleSave = () => {
    if (!generatedVersions) return;

    createMutation.mutate({
      tipo,
      titulo: `Icebreaker - ${TIPO_OPTIONS.find((t) => t.value === tipo)?.label}`,
      versoes: generatedVersions,
    });
  };

  const handleRegenerate = () => {
    setShowPreview(false);
    setGeneratedVersions(null);
    handleGenerate();
  };

  const handleCancel = () => {
    setShowPreview(false);
    setGeneratedVersions(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          Gerar com IA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="uppercase font-display flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-chart-1" />
            {showPreview ? "Pré-visualização" : "Gerar Icebreaker com IA"}
          </DialogTitle>
          <DialogDescription>
            {showPreview
              ? "Revise as versões geradas e salve ou regenere"
              : "Configure as opções e gere apresentações personalizadas"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0">
          {generateMutation.isPending ? (
            <ContextualLoading
              messages={[
                "Analisando seu perfil...",
                "Buscando experiências relevantes...",
                "Gerando versões personalizadas...",
                "Ajustando tom e duração...",
                "Finalizando conteúdo..."
              ]}
              cycleDuration={2000}
            />
          ) : showPreview && generatedVersions ? (
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {generatedVersions.map((version, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-display uppercase text-sm">
                          {version.nome}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          ~{version.duracao}s de leitura
                        </p>
                      </div>
                      {version.tags && version.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {version.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {version.conteudo.pt}
                    </p>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="uppercase text-xs">Tipo</Label>
                <Select
                  value={tipo}
                  onValueChange={(value) =>
                    setTipo(value as typeof tipo)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPO_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-xs">
                  Categoria (Opcional)
                </Label>
                <Select value={categoria} onValueChange={setCategoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIA_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-xs">
                  Orientações Customizadas (Opcional)
                </Label>
                <Textarea
                  placeholder='Ex: "Mencionar experiência na Amazon", "Focar em liderança técnica"'
                  value={orientacoesCustomizadas}
                  onChange={(e) => setOrientacoesCustomizadas(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Adicione instruções específicas para personalizar ainda mais
                </p>
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
