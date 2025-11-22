"use client";

import { useState } from "react";
import { Loader2,Sparkles } from "lucide-react";
import { toast } from "sonner";

import { ContextualLoading } from "@/components/ai/contextual-loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/lib/trpc/react";

interface SuggestedQuestion {
  categoria: "tecnica" | "comportamental" | "cultura" | "carreira";
  pergunta: {
    pt: string;
    en: string;
  };
  contexto: string;
  prioridade: "alta" | "media" | "baixa";
}

const priorityColors: Record<string, string> = {
  alta: "bg-destructive",
  media: "bg-warning",
  baixa: "bg-muted",
};

const categoryIcons: Record<string, string> = {
  tecnica: "🚀",
  comportamental: "🎯",
  cultura: "👥",
  carreira: "📈",
};

export function SuggestAIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tipoVaga, setTipoVaga] = useState("");
  const [empresaAlvo, setEmpresaAlvo] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState<
    SuggestedQuestion[]
  >([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(
    new Set()
  );

  const utils = trpc.useUtils();

  const suggestMutation = trpc.questions.suggestWithAI.useMutation({
    onSuccess: (data) => {
      setSuggestedQuestions(data);
      setShowPreview(true);
      // Select all by default
      setSelectedQuestions(new Set(data.map((_, i) => i)));
      toast.success("Perguntas geradas! Revise e selecione as que deseja salvar.");
    },
    onError: (error) => {
      toast.error("Erro ao gerar perguntas: " + error.message);
    },
  });

  const createMutation = trpc.questions.create.useMutation({
    onSuccess: () => {
      utils.questions.list.invalidate();
    },
  });

  const handleGenerate = () => {
    suggestMutation.mutate({
      tipoVaga: tipoVaga || undefined,
      empresaAlvo: empresaAlvo || undefined,
    });
  };

  const handleSaveSelected = async () => {
    const questionsToSave = Array.from(selectedQuestions).map(
      (index) => suggestedQuestions[index]
    );

    if (questionsToSave.length === 0) {
      toast.error("Selecione pelo menos uma pergunta para salvar");
      return;
    }

    try {
      // Save all selected questions
      await Promise.all(
        questionsToSave.map((q) =>
          createMutation.mutateAsync({
            categoria: q.categoria,
            pergunta: q.pergunta,
            contexto: q.contexto,
            prioridade: q.prioridade,
          })
        )
      );

      toast.success(
        `${questionsToSave.length} ${questionsToSave.length === 1 ? "pergunta salva" : "perguntas salvas"} com sucesso!`
      );
      handleClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error("Erro ao salvar perguntas: " + errorMessage);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowPreview(false);
    setTipoVaga("");
    setEmpresaAlvo("");
    setSuggestedQuestions([]);
    setSelectedQuestions(new Set());
  };

  const handleRegenerate = () => {
    setShowPreview(false);
    setSuggestedQuestions([]);
    setSelectedQuestions(new Set());
  };

  const toggleQuestion = (index: number) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedQuestions(newSelected);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-4 border border-dashed border-border hover:border-chart-1 hover:bg-chart-1/10 rounded-lg transition-colors uppercase text-sm font-display text-chart-1"
      >
        ✨ SUGGEST QUESTIONS WITH AI
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="uppercase font-display flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-chart-1" />
              Sugerir Perguntas com IA
            </DialogTitle>
            <DialogDescription>
              {showPreview
                ? "Revise as perguntas geradas e selecione as que deseja salvar"
                : "Configure os detalhes para gerar perguntas personalizadas"}
            </DialogDescription>
          </DialogHeader>

          {suggestMutation.isPending ? (
            <div className="flex-1 flex items-center justify-center py-8">
              <ContextualLoading
                messages={[
                  "Analisando seu perfil profissional...",
                  "Identificando áreas estratégicas...",
                  "Gerando perguntas personalizadas...",
                  "Adaptando para o contexto da vaga...",
                  "Finalizando sugestões...",
                ]}
                cycleDuration={2000}
              />
            </div>
          ) : showPreview && suggestedQuestions.length > 0 ? (
            <ScrollArea className="flex-1 pr-4 max-h-[50vh]">
              <div className="space-y-3">
                {suggestedQuestions.map((question, index) => (
                  <Card
                    key={index}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedQuestions.has(index)
                        ? "border-chart-1 bg-chart-1/5"
                        : "hover:border-accent"
                    }`}
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedQuestions.has(index)}
                        onCheckedChange={() => toggleQuestion(index)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">
                            {categoryIcons[question.categoria]}
                          </span>
                          <Badge variant="outline" className="uppercase text-xs">
                            {question.categoria}
                          </Badge>
                          <Badge
                            className={`uppercase text-xs ${priorityColors[question.prioridade]}`}
                          >
                            {question.prioridade}
                          </Badge>
                        </div>
                        <p className="font-medium mb-2">{question.pergunta.pt}</p>
                        {question.pergunta.en && (
                          <p className="text-xs text-muted-foreground italic mb-2">
                            {question.pergunta.en}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground border-t border-border pt-2 mt-2">
                          💡 {question.contexto}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="tipoVaga" className="uppercase">
                  Tipo de Vaga (Opcional)
                </Label>
                <Input
                  id="tipoVaga"
                  placeholder="Ex: Backend Engineer, Tech Lead, Full Stack Developer"
                  value={tipoVaga}
                  onChange={(e) => setTipoVaga(e.target.value)}
                  disabled={suggestMutation.isPending}
                />
                <p className="text-xs text-muted-foreground">
                  Deixe em branco para perguntas genéricas baseadas no seu perfil
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="empresaAlvo" className="uppercase">
                  Empresa Alvo (Opcional)
                </Label>
                <Input
                  id="empresaAlvo"
                  placeholder="Ex: Amazon, Google, Nubank"
                  value={empresaAlvo}
                  onChange={(e) => setEmpresaAlvo(e.target.value)}
                  disabled={suggestMutation.isPending}
                />
                <p className="text-xs text-muted-foreground">
                  A IA pode adaptar perguntas para o contexto da empresa
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            {showPreview ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRegenerate}
                  disabled={createMutation.isPending}
                >
                  Gerar Novas
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={createMutation.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveSelected}
                  disabled={
                    selectedQuestions.size === 0 || createMutation.isPending
                  }
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    `Salvar ${selectedQuestions.size} ${selectedQuestions.size === 1 ? "Pergunta" : "Perguntas"}`
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={suggestMutation.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={suggestMutation.isPending}
                >
                  {suggestMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Gerar Perguntas
                    </>
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
