"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

// Schema para versão individual de icebreaker
const versaoSchema = z.object({
  nome: z.string().min(1, "Nome da versão é obrigatório"),
  conteudo: z.object({
    pt: z.string().min(1, "Conteúdo em português é obrigatório"),
    en: z.string().default(""),
  }),
  duracao: z.number().positive("Duração deve ser maior que zero"),
  tags: z.array(z.string()).default([]),
});

// Schema para criar icebreaker
const formSchema = z.object({
  tipo: z.enum(["elevator_pitch", "quick_intro", "personal_story"]),
  titulo: z.string().min(1, "Título é obrigatório"),
  versoes: z.array(versaoSchema).min(1, "Adicione pelo menos uma versão"),
});

type FormValues = z.infer<typeof formSchema>;

interface IcebreakerFormProps {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

const TIPO_OPTIONS = [
  { value: "elevator_pitch", label: "Elevator Pitch" },
  { value: "quick_intro", label: "Quick Intro" },
  { value: "personal_story", label: "Personal Story" },
] as const;

export function IcebreakerForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: IcebreakerFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editInstructions, setEditInstructions] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      tipo: "elevator_pitch",
      titulo: "",
      versoes: [
        {
          nome: "Versão 1",
          conteudo: { pt: "", en: "" },
          duracao: 60,
          tags: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "versoes",
  });

  const editMutation = trpc.icebreakers.editWithAI.useMutation({
    onSuccess: (data) => {
      if (editingIndex !== null) {
        form.setValue(`versoes.${editingIndex}.conteudo.pt`, data.conteudoEditado);
        toast.success("Conteúdo editado com sucesso!");
        setIsEditDialogOpen(false);
        setEditInstructions("");
        setEditingIndex(null);
      }
    },
    onError: (error) => {
      toast.error("Erro ao editar: " + error.message);
    },
  });

  const handleEditWithAI = (index: number) => {
    setEditingIndex(index);
    setEditInstructions("");
    setIsEditDialogOpen(true);
  };

  const handleConfirmEdit = () => {
    if (editingIndex === null) return;
    if (!editInstructions.trim()) {
      toast.error("Por favor, descreva o que deseja editar");
      return;
    }

    const currentContent = form.getValues(`versoes.${editingIndex}.conteudo.pt`);
    editMutation.mutate({
      conteudoAtual: currentContent,
      instrucoes: editInstructions,
    });
  };

  const handleTagsChange = (index: number, value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    form.setValue(`versoes.${index}.tags`, tags);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Tipo */}
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIPO_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Título */}
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Título</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Apresentação Técnica Sênior"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Um título descritivo para este icebreaker
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* Versões */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display uppercase">Versões</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  nome: `Versão ${fields.length + 1}`,
                  conteudo: { pt: "", en: "" },
                  duracao: 60,
                  tags: [],
                })
              }
            >
              + Adicionar Versão
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display uppercase">
                    Versão {index + 1}
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditWithAI(index)}
                      className="text-chart-1 border-chart-1 hover:bg-chart-1/10"
                    >
                      <Sparkles className="mr-1 h-3 w-3" />
                      Editar com IA
                    </Button>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-destructive"
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                </div>

                {/* Nome da versão */}
                <FormField
                  control={form.control}
                  name={`versoes.${index}.nome`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Versão</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Versão Curta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Conteúdo PT */}
                <FormField
                  control={form.control}
                  name={`versoes.${index}.conteudo.pt`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conteúdo (Português)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Escreva seu icebreaker em português..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duração */}
                <FormField
                  control={form.control}
                  name={`versoes.${index}.duracao`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração (segundos)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="60"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Tempo estimado de fala em segundos
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags */}
                <FormField
                  control={form.control}
                  name={`versoes.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: curta, técnica, liderança"
                          value={field.value?.join(", ") || ""}
                          onChange={(e) =>
                            handleTagsChange(index, e.target.value)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Separe as tags com vírgulas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar Icebreaker"}
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
              Editar com IA
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
                placeholder='Ex: "Fale sobre a empresa Amazon e não Nubank" ou "Coloque que foram 14 anos, não 15" ou "Torne o texto mais direto e objetivo"'
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
