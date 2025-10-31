"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";

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
              <FormLabel className="uppercase">Conteúdo (Português)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escreva seu speech completo em português..."
                  className="min-h-[300px] font-mono"
                  {...field}
                />
              </FormControl>
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
    </Form>
  );
}
