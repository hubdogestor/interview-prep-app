"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Plus, Trash2, X } from "lucide-react";
import { z } from "zod";

import { CompetenciaAIButton } from "@/components/competencias/competencia-ai-button";
import { TrackRecordAIButton } from "@/components/competencias/track-record-ai-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
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
import { TextStats } from "@/components/ui/text-stats";
import { Textarea } from "@/components/ui/textarea";
import { createCompetenciaSchema } from "@/lib/validation/schemas";

// Use schema centralizado para validação
const formSchema = createCompetenciaSchema;

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

  const watchedValues = useWatch<FormValues>({ control: form.control });
  const competenciaNome = watchedValues?.nome;
  const competenciaCategoria = watchedValues?.categoria;
  const competenciaNivel = watchedValues?.nivel;
  const descricaoValue = watchedValues?.descricao;
  const ferramentasValue = watchedValues?.ferramentas ?? [];
  const evidenciasValue = watchedValues?.evidencias ?? [];
  const trackRecordEntries = watchedValues?.trackRecord ?? [];

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

            {/* AI Button for rewriting/improving description */}
            {descricaoValue?.pt && (
              <CompetenciaAIButton
                mode="rewrite"
                existingCompetencia={{
                  nome: competenciaNome ?? "",
                  categoria: competenciaCategoria ?? "technical",
                  nivel: competenciaNivel ?? "intermediate",
                  descricao: descricaoValue ?? { pt: "", en: "" },
                  ferramentas: ferramentasValue,
                  evidencias: evidenciasValue,
                  trackRecord: trackRecordEntries,
                }}
                onGenerated={(competencia) => {
                  form.setValue("descricao", competencia.descricao);
                  if (competencia.ferramentas.length > 0) {
                    form.setValue("ferramentas", competencia.ferramentas);
                  }
                  if (competencia.evidencias.length > 0) {
                    form.setValue("evidencias", competencia.evidencias);
                  }
                  if (competencia.trackRecord.length > 0) {
                    form.setValue("trackRecord", competencia.trackRecord);
                  }
                }}
              />
            )}
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

            {ferramentasValue.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ferramentasValue.map((item, index) => (
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

            {evidenciasValue.length > 0 && (
              <div className="space-y-2">
                {evidenciasValue.map((item, index) => (
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
            <div className="flex gap-2">
              {competenciaNome && (
                <TrackRecordAIButton
                  competenciaNome={competenciaNome}
                  competenciaCategoria={competenciaCategoria}
                  onGenerated={(trackRecord) => {
                    append(trackRecord);
                  }}
                />
              )}
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
          </div>

          {fields.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhum projeto adicionado
            </p>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => {
                const currentTrackRecord = trackRecordEntries[index] ?? field;
                const hasProject = Boolean(currentTrackRecord?.projeto);

                return (
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

                      {/* AI Button to improve this track record */}
                      {hasProject && (
                        <div className="flex justify-end">
                          <TrackRecordAIButton
                            competenciaNome={competenciaNome}
                            competenciaCategoria={competenciaCategoria}
                            existingTrackRecord={currentTrackRecord}
                            onGenerated={(trackRecord) => {
                              form.setValue(`trackRecord.${index}`, trackRecord);
                            }}
                          />
                        </div>
                      )}
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
                );
              })}
            </div>
          )}
        </Card>

        {/* AI Generation for new competência */}
        {!defaultValues && (
          <CompetenciaAIButton
            mode="create"
            onGenerated={(competencia) => {
              form.setValue("nome", competencia.nome);
              form.setValue("categoria", competencia.categoria);
              form.setValue("nivel", competencia.nivel);
              form.setValue("descricao", competencia.descricao);
              form.setValue("ferramentas", competencia.ferramentas);
              form.setValue("evidencias", competencia.evidencias);
              form.setValue("trackRecord", competencia.trackRecord);
            }}
          />
        )}

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
