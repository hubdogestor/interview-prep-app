"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

const questionFormSchema = z.object({
  categoria: z.enum(["tecnica", "comportamental", "cultura", "carreira"], {
    required_error: "Selecione uma categoria",
  }),
  pergunta: z.object({
    pt: z.string().min(1, "Pergunta em português é obrigatória"),
    en: z.string().default(""),
  }),
  contexto: z.string().optional(),
  prioridade: z.enum(["alta", "media", "baixa"]).default("media"),
});

type QuestionFormValues = z.infer<typeof questionFormSchema>;

interface QuestionFormProps {
  initialData?: {
    id: string;
    categoria: string;
    pergunta: { pt: string; en: string };
    contexto: string | null;
    prioridade: string;
  };
}

export function QuestionForm({ initialData }: QuestionFormProps) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: initialData
      ? {
          categoria: initialData.categoria as
            | "tecnica"
            | "comportamental"
            | "cultura"
            | "carreira",
          pergunta: initialData.pergunta,
          contexto: initialData.contexto || "",
          prioridade: initialData.prioridade as "alta" | "media" | "baixa",
        }
      : {
          categoria: "tecnica",
          pergunta: { pt: "", en: "" },
          contexto: "",
          prioridade: "media",
        },
  });

  const createMutation = trpc.questions.create.useMutation({
    onSuccess: () => {
      toast.success("Pergunta criada com sucesso!");
      utils.questions.list.invalidate();
      router.push("/questions");
    },
    onError: (error) => {
      toast.error(`Erro ao criar pergunta: ${error.message}`);
    },
  });

  const updateMutation = trpc.questions.update.useMutation({
    onSuccess: () => {
      toast.success("Pergunta atualizada com sucesso!");
      utils.questions.list.invalidate();
      router.push("/questions");
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar pergunta: ${error.message}`);
    },
  });

  const deleteMutation = trpc.questions.delete.useMutation({
    onSuccess: () => {
      toast.success("Pergunta removida com sucesso!");
      utils.questions.list.invalidate();
      router.push("/questions");
    },
    onError: (error) => {
      toast.error(`Erro ao remover pergunta: ${error.message}`);
    },
  });

  function onSubmit(data: QuestionFormValues) {
    if (initialData) {
      updateMutation.mutate({ id: initialData.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  }

  function handleDelete() {
    if (!initialData) return;

    if (
      confirm(
        "Tem certeza que deseja remover esta pergunta? Esta ação não pode ser desfeita."
      )
    ) {
      deleteMutation.mutate({ id: initialData.id });
    }
  }

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase">Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tecnica">🚀 Técnica</SelectItem>
                    <SelectItem value="comportamental">
                      🎯 Comportamental
                    </SelectItem>
                    <SelectItem value="cultura">👥 Cultura</SelectItem>
                    <SelectItem value="carreira">📈 Carreira</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prioridade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase">Prioridade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="alta">🔴 Alta</SelectItem>
                    <SelectItem value="media">🟡 Média</SelectItem>
                    <SelectItem value="baixa">🟢 Baixa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="pergunta.pt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Pergunta (Português)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex: Qual é a cultura de engenharia da empresa?"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A pergunta que você quer fazer ao entrevistador
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pergunta.en"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Pergunta (Inglês)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex: What is the company's engineering culture?"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Tradução em inglês (opcional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contexto"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">
                Contexto / Dica de Uso
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex: Usar quando entrevistador mencionar trabalho remoto"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Quando ou como usar esta pergunta (opcional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Salvando..."
              : initialData
                ? "Atualizar Pergunta"
                : "Criar Pergunta"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/questions")}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          {initialData && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
              className="ml-auto"
            >
              Remover
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
