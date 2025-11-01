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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { TextStats } from "@/components/ui/text-stats";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema para track record individual
const trackRecordSchema = z.object({
  projeto: z.string().min(1, "Nome do projeto é obrigatório"),
  resultado: z.string().min(1, "Resultado é obrigatório"),
  ano: z.number().int().positive("Ano deve ser válido"),
});

// Schema para criar competência
const formSchema = z.object({
  nome: z.string().min(1, "Nome da competência é obrigatório"),
  categoria: z.enum(["technical", "soft_skills", "leadership"]),
  nivel: z.enum(["basic", "intermediate", "advanced", "expert"]),
  descricao: z.object({
    pt: z.string().min(1, "Descrição em português é obrigatória"),
    en: z.string().default(""),
  }),
  ferramentas: z.array(z.string()).default([]),
  evidencias: z.array(z.string()).default([]),
  trackRecord: z.array(trackRecordSchema).default([]),
});

type FormValues = z.infer<typeof formSchema>;

interface CompetenciaFormProps {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

const CATEGORIA_OPTIONS = [
  { value: "technical", label: "Technical" },
  { value: "soft_skills", label: "Soft Skills" },
  { value: "leadership", label: "Leadership" },
] as const;

const NIVEL_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
] as const;

export function CompetenciaForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: CompetenciaFormProps) {
  const [ferramentasInput, setFerramentasInput] = useState("");
  const [evidenciasInput, setEvidenciasInput] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      nome: "",
      categoria: "technical",
      nivel: "intermediate",
      descricao: { pt: "", en: "" },
      ferramentas: [],
      evidencias: [],
      trackRecord: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "trackRecord",
  });

  const handleAddFerramentas = () => {
    if (!ferramentasInput.trim()) return;
    const tags = ferramentasInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const current = form.getValues("ferramentas");
    form.setValue("ferramentas", [...current, ...tags]);
    setFerramentasInput("");
  };

  const handleRemoveFerramenta = (index: number) => {
    const current = form.getValues("ferramentas");
    form.setValue(
      "ferramentas",
      current.filter((_, i) => i !== index)
    );
  };

  const handleAddEvidencias = () => {
    if (!evidenciasInput.trim()) return;
    const items = evidenciasInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const current = form.getValues("evidencias");
    form.setValue("evidencias", [...current, ...items]);
    setEvidenciasInput("");
  };

  const handleRemoveEvidencia = (index: number) => {
    const current = form.getValues("evidencias");
    form.setValue(
      "evidencias",
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Informações Básicas */}
        <Card className="p-6">
          <h3 className="text-lg font-display uppercase mb-4">
            Informações Básicas
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Competência</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: React Development, Leadership, Problem Solving"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIA_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nivel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nível de Proficiência</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {NIVEL_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>

        {/* Descrição */}
        <Card className="p-6">
          <h3 className="text-lg font-display uppercase mb-4">Descrição</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="descricao.pt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Português</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva sua experiência e domínio desta competência"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <TextStats text={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao.en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your experience with this skill"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <TextStats text={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Ferramentas */}
        <Card className="p-6">
          <h3 className="text-lg font-display uppercase mb-4">
            Ferramentas & Tecnologias
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Adicione ferramentas (separadas por vírgula)"
                value={ferramentasInput}
                onChange={(e) => setFerramentasInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFerramentas();
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddFerramentas}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {form.watch("ferramentas").length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.watch("ferramentas").map((item, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    #{item}
                    <button
                      type="button"
                      onClick={() => handleRemoveFerramenta(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Evidências */}
        <Card className="p-6">
          <h3 className="text-lg font-display uppercase mb-4">Evidências</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="URLs, certificados, projetos (separados por vírgula)"
                value={evidenciasInput}
                onChange={(e) => setEvidenciasInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddEvidencias();
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddEvidencias}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {form.watch("evidencias").length > 0 && (
              <div className="space-y-2">
                {form.watch("evidencias").map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                  >
                    <span className="text-sm flex-1 truncate">{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleRemoveEvidencia(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Track Record */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display uppercase">Track Record</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ projeto: "", resultado: "", ano: new Date().getFullYear() })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>

          {fields.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhum projeto adicionado
            </p>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <FormField
                        control={form.control}
                        name={`trackRecord.${index}.projeto`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Projeto</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome do projeto" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`trackRecord.${index}.resultado`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Resultado</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Impacto e resultados"
                                className="min-h-[60px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`trackRecord.${index}.ano`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Ano</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Botões de ação */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Salvando..." : "Salvar Competência"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
