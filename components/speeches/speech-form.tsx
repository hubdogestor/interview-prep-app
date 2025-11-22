"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2,Sparkles } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextStats } from "@/components/ui/text-stats";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc/react";

// Schema para criar speech
const formSchema = z.object({
  tipoVaga: z.string().min(1, "Tipo de vaga é obrigatório"),
  titulo: z.string().min(1, "Título é obrigatório"),
  versao: z.string().default("1.0"),
  conteudo: z.object({
    pt: z.string().min(1, "Conteúdo em português é obrigatório"),
    en: z.string().default(""),
  }),
  duracaoEstimada: z.number().positive("Duração deve ser maior que zero"),
  foco: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

interface SpeechFormProps {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function SpeechForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: SpeechFormProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editInstructions, setEditInstructions] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      tipoVaga: "",
      titulo: "",
      versao: "1.0",
      conteudo: { pt: "", en: "" },
      duracaoEstimada: 3,
      foco: [],
    },
  });

  const editMutation = trpc.speeches.editWithAI.useMutation({
    onSuccess: (data) => {
      form.setValue("conteudo.pt", data.conteudoEditado);
      toast.success("Conteúdo editado com sucesso!");
      setIsEditDialogOpen(false);
      setEditInstructions("");
    },
    onError: (error) => {
      toast.error("Erro ao editar: " + error.message);
    },
  });

  const handleEditWithAI = () => {
    setEditInstructions("");
    setIsEditDialogOpen(true);
  };

  const handleConfirmEdit = () => {
    if (!editInstructions.trim()) {
      toast.error("Por favor, descreva o que deseja editar");
      return;
    }

    const currentContent = form.getValues("conteudo.pt");
    editMutation.mutate({
      conteudoAtual: currentContent,
      instrucoes: editInstructions,
    });
  };

  const handleFocoChange = (value: string) => {
    const focoArray = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    form.setValue("foco", focoArray);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Título */}
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Título</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Apresentação Técnica Completa"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Um título descritivo para este speech
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tipo de Vaga */}
        <FormField
          control={form.control}
          name="tipoVaga"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Tipo de Vaga</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Backend Engineer, Tech Lead, etc."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Para qual tipo de vaga este speech é direcionado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Versão */}
        <FormField
          control={form.control}
          name="versao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Versão</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 1.0, 2.1, etc." {...field} />
              </FormControl>
              <FormDescription>
                Número de versão deste speech
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conteúdo PT */}
        <FormField
          control={form.control}
          name="conteudo.pt"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel className="uppercase">Conteúdo (Português)</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEditWithAI}
                  className="text-chart-1 border-chart-1 hover:bg-chart-1/10"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Editar com IA
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Escreva seu speech completo em português..."
                  className="min-h-[300px] font-mono"
                  {...field}
                />
              </FormControl>
              <TextStats text={field.value || ""} wordsPerMinute={150} className="mt-2" />
              <FormDescription>
                O texto completo do seu speech em português
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duração Estimada */}
        <FormField
          control={form.control}
          name="duracaoEstimada"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Duração Estimada (minutos)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="3"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormDescription>
                Tempo estimado de apresentação em minutos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Áreas de Foco */}
        <FormField
          control={form.control}
          name="foco"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Áreas de Foco</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: liderança, arquitetura, performance"
                  value={field.value?.join(", ") || ""}
                  onChange={(e) => handleFocoChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                Principais áreas abordadas neste speech (separe com vírgulas)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar Speech"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Limpar
          </Button>
        </div>
      </form>

      {/* Dialog de Edição com IA */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="uppercase font-display">
              Editar Speech com IA
            </DialogTitle>
            <DialogDescription>
              Descreva o que você quer mudar no texto e a IA fará a edição para você.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="edit-instructions" className="uppercase">
                O que deseja editar?
              </Label>
              <Textarea
                id="edit-instructions"
                placeholder='Ex: "Fale sobre a empresa Amazon e não Nubank" ou "Adicione mais detalhes sobre o projeto X" ou "Torne o discurso mais conciso"'
                value={editInstructions}
                onChange={(e) => setEditInstructions(e.target.value)}
                disabled={editMutation.isPending}
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Seja específico nas suas instruções para obter o melhor resultado
              </p>
            </div>

            {editMutation.isPending && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Editando com IA...</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={editMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmEdit}
              disabled={editMutation.isPending || !editInstructions.trim()}
            >
              {editMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Editando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Editar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
