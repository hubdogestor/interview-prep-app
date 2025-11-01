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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

interface CompetenciaData {
  nome: string;
  categoria: "technical" | "soft_skills" | "leadership";
  nivel: "basic" | "intermediate" | "advanced" | "expert";
  descricao: {
    pt: string;
    en: string;
  };
  ferramentas: string[];
  evidencias: string[];
  trackRecord: {
    projeto: string;
    resultado: string;
    ano: number;
  }[];
}

interface CompetenciaAIButtonProps {
  mode: "create" | "rewrite";
  existingCompetencia?: CompetenciaData;
  onGenerated: (competencia: CompetenciaData) => void;
}

export function CompetenciaAIButton({
  mode,
  existingCompetencia,
  onGenerated,
}: CompetenciaAIButtonProps) {
  const [open, setOpen] = useState(false);
  const [generationMode, setGenerationMode] = useState<"auto" | "guided">("auto");

  // Guided mode inputs
  const [nomeInput, setNomeInput] = useState("");
  const [categoriaInput, setCategoriaInput] = useState<"technical" | "soft_skills" | "leadership">("technical");
  const [nivelInput, setNivelInput] = useState<"basic" | "intermediate" | "advanced" | "expert">("intermediate");
  const [contextoInput, setContextoInput] = useState("");

  // Rewrite mode inputs
  const [rewriteInstructions, setRewriteInstructions] = useState("");

  const generateMutation = trpc.competencias.generateCompetenciaWithAI.useMutation({
    onSuccess: (data) => {
      onGenerated(data);
      toast.success("Competência gerada com sucesso!");
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao gerar competência");
    },
  });

  const handleClose = () => {
    setOpen(false);
    setGenerationMode("auto");
    setNomeInput("");
    setCategoriaInput("technical");
    setNivelInput("intermediate");
    setContextoInput("");
    setRewriteInstructions("");
  };

  const handleGenerate = () => {
    if (mode === "rewrite" && existingCompetencia) {
      // Rewrite mode
      generateMutation.mutate({
        mode: "rewrite",
        existingCompetencia,
        rewriteInstructions: rewriteInstructions || undefined,
      });
    } else if (generationMode === "guided") {
      // Guided mode
      if (!nomeInput.trim()) {
        toast.error("Por favor, forneça pelo menos o nome da competência");
        return;
      }
      generateMutation.mutate({
        mode: "guided",
        nome: nomeInput,
        categoria: categoriaInput,
        nivel: nivelInput,
        contexto: contextoInput || undefined,
      });
    } else {
      // Auto mode
      generateMutation.mutate({
        mode: "auto",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-2 border-primary/50 hover:border-primary hover:bg-primary/5"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Gerar Competência com IA
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full text-xs"
          >
            <Sparkles className="h-3 w-3 mr-2" />
            Reescrever com IA
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="uppercase font-display flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {mode === "create" ? "Gerar Competência com IA" : "Reescrever Competência com IA"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Use IA para criar uma competência baseada no seu perfil e experiências"
              : "Melhore ou traduza esta competência usando IA"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {mode === "create" ? (
            <Tabs value={generationMode} onValueChange={(v) => setGenerationMode(v as "auto" | "guided")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="auto">Automático</TabsTrigger>
                <TabsTrigger value="guided">Guiado</TabsTrigger>
              </TabsList>

              <TabsContent value="auto" className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    A IA irá analisar seu CV e experiências para gerar automaticamente
                    uma competência relevante com descrição bilíngue, ferramentas e track record.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="guided" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome da Competência *</Label>
                    <Input
                      id="nome"
                      placeholder="Ex: React Development, Leadership, Problem Solving"
                      value={nomeInput}
                      onChange={(e) => setNomeInput(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoria</Label>
                      <Select
                        value={categoriaInput}
                        onValueChange={(v) => setCategoriaInput(v as any)}
                      >
                        <SelectTrigger id="categoria">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="soft_skills">Soft Skills</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nivel">Nível</Label>
                      <Select
                        value={nivelInput}
                        onValueChange={(v) => setNivelInput(v as any)}
                      >
                        <SelectTrigger id="nivel">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contexto">Contexto Adicional (opcional)</Label>
                    <Textarea
                      id="contexto"
                      placeholder="Forneça mais detalhes sobre onde e como você usou esta competência..."
                      className="min-h-[100px]"
                      value={contextoInput}
                      onChange={(e) => setContextoInput(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">Competência atual:</p>
                <p className="text-sm"><strong>Nome:</strong> {existingCompetencia?.nome}</p>
                <p className="text-sm"><strong>Categoria:</strong> {existingCompetencia?.categoria}</p>
                <p className="text-sm"><strong>Nível:</strong> {existingCompetencia?.nivel}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rewrite-instructions">
                  Instruções para IA (opcional)
                </Label>
                <Textarea
                  id="rewrite-instructions"
                  placeholder="Ex: Traduza para inglês, Torne mais técnico, Adicione mais métricas, etc."
                  className="min-h-[100px]"
                  value={rewriteInstructions}
                  onChange={(e) => setRewriteInstructions(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Deixe em branco para melhorias gerais (clareza, impacto, estrutura)
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={generateMutation.isPending}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleGenerate}
              disabled={generateMutation.isPending}
              className="flex-1"
            >
              {generateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Gerar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
