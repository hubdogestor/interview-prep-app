"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContextualLoading } from "@/components/ai/contextual-loading";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

interface StarCase {
  titulo: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  idioma: "pt" | "en";
}

interface StarCaseAIButtonProps {
  experienciaId?: string;
  empresaNome?: string;
  cargoNome?: string;
  existingCase?: StarCase;
  mode: "create" | "rewrite";
  onGenerated: (starCase: StarCase) => void;
}

export function StarCaseAIButton({
  experienciaId,
  empresaNome,
  cargoNome,
  existingCase,
  mode,
  onGenerated,
}: StarCaseAIButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [generationMode, setGenerationMode] = useState<"auto" | "guided">("auto");
  const [idioma, setIdioma] = useState<"pt" | "en">("pt");

  // Guided mode inputs
  const [tituloInput, setTituloInput] = useState("");
  const [contextoInput, setContextoInput] = useState("");
  const [competenciaFoco, setCompetenciaFoco] = useState("");

  // Rewrite mode inputs
  const [rewriteInstructions, setRewriteInstructions] = useState("");

  const generateMutation = trpc.experiencias.generateStarCaseWithAI.useMutation({
    onSuccess: (data) => {
      onGenerated(data);
      toast.success("STAR Case gerado com sucesso!");
      handleClose();
    },
    onError: (error) => {
      toast.error("Erro ao gerar STAR Case: " + error.message);
    },
  });

  const handleGenerate = () => {
    if (mode === "rewrite" && existingCase) {
      // Rewrite existing case
      generateMutation.mutate({
        mode: "rewrite",
        experienciaId,
        empresaNome,
        cargoNome,
        idioma,
        existingCase,
        rewriteInstructions: rewriteInstructions || undefined,
      });
    } else if (generationMode === "auto") {
      // Full auto generation
      generateMutation.mutate({
        mode: "auto",
        experienciaId,
        empresaNome,
        cargoNome,
        idioma,
      });
    } else {
      // Guided generation
      if (!tituloInput || !contextoInput) {
        toast.error("Preencha pelo menos o título e o contexto");
        return;
      }
      generateMutation.mutate({
        mode: "guided",
        experienciaId,
        empresaNome,
        cargoNome,
        idioma,
        titulo: tituloInput,
        contexto: contextoInput,
        competenciaFoco: competenciaFoco || undefined,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setGenerationMode("auto");
    setTituloInput("");
    setContextoInput("");
    setCompetenciaFoco("");
    setRewriteInstructions("");
  };

  return (
    <>
      {mode === "create" ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-3 border border-dashed border-border hover:border-chart-1 hover:bg-chart-1/10 rounded-lg transition-colors uppercase text-xs font-display text-chart-1 flex items-center justify-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          GERAR STAR CASE COM IA
        </button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="text-chart-1"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reescrever com IA
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="uppercase font-display flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-chart-1" />
              {mode === "rewrite" ? "Reescrever STAR Case com IA" : "Gerar STAR Case com IA"}
            </DialogTitle>
            <DialogDescription>
              {mode === "rewrite"
                ? "A IA irá reescrever o STAR Case seguindo suas instruções"
                : "Configure os detalhes para gerar um STAR Case personalizado"}
            </DialogDescription>
          </DialogHeader>

          {generateMutation.isPending ? (
            <div className="flex-1 flex items-center justify-center py-8">
              <ContextualLoading
                messages={[
                  "Analisando sua experiência profissional...",
                  "Identificando conquistas relevantes...",
                  "Estruturando no formato STAR...",
                  "Refinando a narrativa...",
                  "Finalizando STAR Case...",
                ]}
                cycleDuration={2000}
              />
            </div>
          ) : mode === "rewrite" ? (
            <div className="space-y-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="idioma" className="uppercase">
                  Idioma
                </Label>
                <Select value={idioma} onValueChange={(v) => setIdioma(v as "pt" | "en")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card className="p-4 bg-muted">
                <h4 className="font-display uppercase text-sm mb-2">STAR Case Atual</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Título:</strong> {existingCase?.titulo}</p>
                  <p className="text-muted-foreground line-clamp-2">
                    <strong>Situation:</strong> {existingCase?.situation}
                  </p>
                  <p className="text-muted-foreground line-clamp-2">
                    <strong>Result:</strong> {existingCase?.result}
                  </p>
                </div>
              </Card>

              <div className="grid gap-3">
                <Label htmlFor="rewriteInstructions" className="uppercase">
                  Instruções para Reescrita (Opcional)
                </Label>
                <Textarea
                  id="rewriteInstructions"
                  placeholder="Ex: 'Enfatize mais os resultados quantitativos', 'Torne mais conciso', 'Destaque liderança'"
                  value={rewriteInstructions}
                  onChange={(e) => setRewriteInstructions(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  Deixe em branco para uma reescrita geral melhorando clareza e impacto
                </p>
              </div>
            </div>
          ) : (
            <Tabs value={generationMode} onValueChange={(v) => setGenerationMode(v as "auto" | "guided")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="auto">Automático</TabsTrigger>
                <TabsTrigger value="guided">Guiado</TabsTrigger>
              </TabsList>

              <TabsContent value="auto" className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="idioma-auto" className="uppercase">
                    Idioma
                  </Label>
                  <Select value={idioma} onValueChange={(v) => setIdioma(v as "pt" | "en")}>
                    <SelectTrigger id="idioma-auto">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {empresaNome && cargoNome && (
                  <Card className="p-4 bg-chart-1/10 border-chart-1">
                    <p className="text-sm">
                      <strong className="uppercase text-xs text-muted-foreground block mb-1">
                        Contexto:
                      </strong>
                      A IA irá gerar um STAR Case baseado na sua experiência como{" "}
                      <strong>{cargoNome}</strong> na <strong>{empresaNome}</strong>
                    </p>
                  </Card>
                )}

                <p className="text-xs text-muted-foreground">
                  A IA irá gerar um STAR Case completo automaticamente baseando-se no seu
                  perfil e experiências cadastradas.
                </p>
              </TabsContent>

              <TabsContent value="guided" className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="idioma-guided" className="uppercase">
                    Idioma
                  </Label>
                  <Select value={idioma} onValueChange={(v) => setIdioma(v as "pt" | "en")}>
                    <SelectTrigger id="idioma-guided">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="titulo" className="uppercase">
                    Título do Case *
                  </Label>
                  <Input
                    id="titulo"
                    placeholder="Ex: Migração de Sistema Legacy"
                    value={tituloInput}
                    onChange={(e) => setTituloInput(e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="contexto" className="uppercase">
                    Contexto/Situação *
                  </Label>
                  <Textarea
                    id="contexto"
                    placeholder="Descreva brevemente a situação ou desafio que você enfrentou..."
                    value={contextoInput}
                    onChange={(e) => setContextoInput(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="competencia" className="uppercase">
                    Competência em Foco (Opcional)
                  </Label>
                  <Input
                    id="competencia"
                    placeholder="Ex: Liderança, Problem Solving, Comunicação"
                    value={competenciaFoco}
                    onChange={(e) => setCompetenciaFoco(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    A IA enfatizará esta competência no STAR Case
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={generateMutation.isPending}
            >
              Cancelar
            </Button>
            <Button onClick={handleGenerate} disabled={generateMutation.isPending}>
              {generateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {mode === "rewrite" ? "Reescrever" : "Gerar STAR Case"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
