"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

export function GenerateAIButton() {
  const [open, setOpen] = useState(false);
  const [tipoVaga, setTipoVaga] = useState("");
  const [foco, setFoco] = useState("");
  const [duracaoDesejada, setDuracaoDesejada] = useState(3);
  const router = useRouter();
  const utils = trpc.useUtils();

  const generateMutation = trpc.speeches.generateWithAI.useMutation({
    onSuccess: (data) => {
      toast.success("Speech gerado com sucesso!");
      setOpen(false);

      // Cria um novo speech com o conteúdo gerado
      createMutation.mutate({
        tipoVaga,
        titulo: `Speech para ${tipoVaga}`,
        versao: "1.0",
        conteudo: data.conteudo,
        duracaoEstimada: data.duracaoEstimada,
        foco: foco
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      });
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao gerar speech: " + error.message);
    },
  });

  const createMutation = trpc.speeches.create.useMutation({
    onSuccess: (data) => {
      utils.speeches.list.invalidate();
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
      foco: foco
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      duracaoDesejada,
    });
  };

  const isLoading = generateMutation.isPending || createMutation.isPending;

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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="uppercase font-display">
            Gerar Speech com IA
          </DialogTitle>
          <DialogDescription>
            Forneça informações sobre a vaga e a IA criará um speech completo e
            estruturado baseado no seu perfil.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="tipoVaga" className="uppercase">
              Tipo de Vaga *
            </Label>
            <Input
              id="tipoVaga"
              placeholder="Ex: Senior Backend Engineer, Tech Lead, etc."
              value={tipoVaga}
              onChange={(e) => setTipoVaga(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Para qual tipo de vaga você está se candidatando?
            </p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="foco" className="uppercase">
              Áreas de Foco
            </Label>
            <Input
              id="foco"
              placeholder="Ex: liderança, arquitetura, performance"
              value={foco}
              onChange={(e) => setFoco(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Separe múltiplas áreas com vírgulas (opcional)
            </p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="duracao" className="uppercase">
              Duração Desejada (minutos)
            </Label>
            <Input
              id="duracao"
              type="number"
              min="1"
              max="10"
              value={duracaoDesejada}
              onChange={(e) => setDuracaoDesejada(parseInt(e.target.value) || 3)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Tempo aproximado de apresentação (1-10 minutos)
            </p>
          </div>

          <div className="rounded-lg bg-muted p-4 text-sm">
            <p className="font-semibold mb-2 uppercase">Estrutura do Speech:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Introdução pessoal e profissional</li>
              <li>Experiência profissional relevante</li>
              <li>Competências técnicas e soft skills</li>
              <li>Realizações e impacto</li>
              <li>Motivação para a vaga</li>
            </ul>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>
                {generateMutation.isPending
                  ? "Gerando speech com IA... (isso pode levar alguns segundos)"
                  : "Salvando..."}
              </span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button onClick={handleGenerate} disabled={isLoading || !tipoVaga}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar Speech
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
