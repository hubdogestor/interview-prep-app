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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

const TIPO_OPTIONS = [
  { value: "elevator_pitch", label: "Elevator Pitch (30-60s)" },
  { value: "quick_intro", label: "Quick Intro (15-30s)" },
  { value: "personal_story", label: "Personal Story (60-90s)" },
] as const;

export function GenerateAIButton() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<
    "elevator_pitch" | "quick_intro" | "personal_story"
  >("elevator_pitch");
  const router = useRouter();
  const utils = trpc.useUtils();

  const generateMutation = trpc.icebreakers.generateWithAI.useMutation({
    onSuccess: (data) => {
      toast.success("Icebreakers gerados com sucesso!");
      setOpen(false);

      // Cria um novo icebreaker com as versões geradas
      createMutation.mutate({
        tipo,
        titulo: `Icebreaker Gerado - ${TIPO_OPTIONS.find((t) => t.value === tipo)?.label}`,
        versoes: data.versoes,
      });
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao gerar icebreaker: " + error.message);
    },
  });

  const createMutation = trpc.icebreakers.create.useMutation({
    onSuccess: (data) => {
      utils.icebreakers.list.invalidate();
      router.push(`/icebreakers/${data.id}/editar`);
    },
    onError: (error: { message: string }) => {
      toast.error("Erro ao salvar icebreaker: " + error.message);
    },
  });

  const handleGenerate = () => {
    generateMutation.mutate({ tipo });
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="uppercase font-display">
            Gerar Icebreaker com IA
          </DialogTitle>
          <DialogDescription>
            Selecione o tipo de apresentação que deseja gerar. A IA criará 3
            versões diferentes baseadas no seu perfil.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="tipo" className="uppercase">
              Tipo de Apresentação
            </Label>
            <Select
              value={tipo}
              onValueChange={(value: any) => setTipo(value)}
              disabled={isLoading}
            >
              <SelectTrigger id="tipo">
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

          <div className="rounded-lg bg-muted p-4 text-sm">
            <p className="font-semibold mb-2 uppercase">O que será gerado:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Versão Curta (concisa e impactante)</li>
              <li>Versão Média (detalhada e técnica)</li>
              <li>Versão Longa (completa com storytelling)</li>
            </ul>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>
                {generateMutation.isPending
                  ? "Gerando com IA..."
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
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
