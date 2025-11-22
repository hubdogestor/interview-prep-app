"use client";

import { useState } from "react";
import { Loader2,Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc/react";

interface TrackRecordAIButtonProps {
  competenciaNome: string;
  competenciaCategoria: "technical" | "soft_skills" | "leadership";
  existingTrackRecord?: {
    projeto: string;
    resultado: string;
    ano: number;
  };
  onGenerated: (trackRecord: { projeto: string; resultado: string; ano: number }) => void;
}

export function TrackRecordAIButton({
  competenciaNome,
  competenciaCategoria,
  existingTrackRecord,
  onGenerated,
}: TrackRecordAIButtonProps) {
  const [open, setOpen] = useState(false);
  const [instructions, setInstructions] = useState("");

  const generateMutation = trpc.competencias.generateTrackRecordWithAI.useMutation({
    onSuccess: (data) => {
      onGenerated(data);
      setOpen(false);
      setInstructions("");
      toast.success(
        existingTrackRecord
          ? "Track Record aprimorado com sucesso!"
          : "Track Record gerado com sucesso!"
      );
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao gerar track record");
    },
  });

  const handleGenerate = () => {
    generateMutation.mutate({
      competenciaNome,
      competenciaCategoria,
      existingTrackRecord,
      instructions: instructions || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-chart-1"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {existingTrackRecord ? "Aprimorar" : "Gerar"} com IA
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display uppercase flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-chart-1" />
            {existingTrackRecord ? "Aprimorar Track Record" : "Gerar Track Record"}
          </DialogTitle>
          <DialogDescription>
            {existingTrackRecord
              ? "A IA irá sugerir melhorias para este projeto, tornando o resultado mais impactante e mensurável."
              : `A IA irá sugerir um projeto relevante para a competência "${competenciaNome}".`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {existingTrackRecord && (
            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">
                Projeto Atual
              </Label>
              <div className="p-3 bg-muted rounded-md space-y-2">
                <div>
                  <span className="text-xs font-medium">Projeto:</span>
                  <p className="text-sm">{existingTrackRecord.projeto}</p>
                </div>
                <div>
                  <span className="text-xs font-medium">Resultado:</span>
                  <p className="text-sm">{existingTrackRecord.resultado}</p>
                </div>
                <div>
                  <span className="text-xs font-medium">Ano:</span>
                  <p className="text-sm">{existingTrackRecord.ano}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="instructions">
              Instruções Adicionais (opcional)
            </Label>
            <Textarea
              id="instructions"
              placeholder={
                existingTrackRecord
                  ? "Ex: Enfatizar resultados quantitativos, adicionar métricas de impacto..."
                  : "Ex: Projeto relacionado a e-commerce, foco em escalabilidade..."
              }
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="w-full"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                {existingTrackRecord ? "Aprimorar" : "Gerar"} Track Record
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
