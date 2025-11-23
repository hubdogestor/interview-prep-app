"use client";

import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Plus, Trash2, X } from "lucide-react";
import { z } from "zod";

import { StarCaseAIButton } from "@/components/experiencias/star-case-ai-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TextStats } from "@/components/ui/text-stats";
import { Textarea } from "@/components/ui/textarea";
import { createExperienciaSchema, starCaseSchema } from "@/lib/validation/schemas";
import type { Experiencia } from "@/types";

// Use schema centralizado para validação
const formSchema = createExperienciaSchema;

type FormValues = z.infer<typeof formSchema>;
type StarCase = z.infer<typeof starCaseSchema>;

interface ExperienciaFormProps {
  defaultValues?: Experiencia;
  onSubmit: (data: FormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function ExperienciaForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: ExperienciaFormProps) {
  const [showStarCaseDialog, setShowStarCaseDialog] = useState(false);
  const [editingStarIndex, setEditingStarIndex] = useState<number | null>(null);
  const [tecnologiasInput, setTecnologiasInput] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      empresa: "",
      cargo: "",
      periodo: { inicio: "", fim: null },
      pitchElevator: { pt: "", en: "" },
      speechCompleto: { pt: "", en: "" },
      starCases: [],
      tecnologias: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "starCases",
  });

  const empresaNome =
    useWatch({ control: form.control, name: "empresa" }) ?? "";
  const cargoNome = useWatch({ control: form.control, name: "cargo" }) ?? "";
  const tecnologiasSelecionadas =
    useWatch({ control: form.control, name: "tecnologias" }) ?? [];

  // Estado temporário para o STAR Case sendo criado/editado
  const [tempStarCase, setTempStarCase] = useState<StarCase>({
    titulo: "",
    situation: "",
    task: "",
    action: "",
    result: "",
    idioma: "pt",
  });

  const handleOpenStarDialog = (index?: number) => {
    if (index !== undefined) {
      setEditingStarIndex(index);
      setTempStarCase(fields[index]);
    } else {
      setEditingStarIndex(null);
      setTempStarCase({
        titulo: "",
        situation: "",
        task: "",
        action: "",
        result: "",
        idioma: "pt",
      });
    }
    setShowStarCaseDialog(true);
  };

  const handleSaveStarCase = () => {
    // Validar se todos os campos estão preenchidos
    if (
      !tempStarCase.titulo ||
      !tempStarCase.situation ||
      !tempStarCase.task ||
      !tempStarCase.action ||
      !tempStarCase.result
    ) {
      return;
    }

    if (editingStarIndex !== null) {
      update(editingStarIndex, tempStarCase);
    } else {
      append(tempStarCase);
    }

    setShowStarCaseDialog(false);
    setTempStarCase({
      titulo: "",
      situation: "",
      task: "",
      action: "",
      result: "",
      idioma: "pt",
    });
  };

  const handleAddTecnologia = () => {
    if (!tecnologiasInput.trim()) return;

    const tags = tecnologiasInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const currentTecnologias = form.getValues("tecnologias");
    form.setValue("tecnologias", [...currentTecnologias, ...tags]);
    setTecnologiasInput("");
  };

  const handleRemoveTecnologia = (index: number) => {
    const currentTecnologias = form.getValues("tecnologias");
    form.setValue(
      "tecnologias",
      currentTecnologias.filter((_, i) => i !== index)
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
              name="empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu cargo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="periodo.inicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="periodo.fim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Término</FormLabel>
                    <FormControl>
                      <Input
                        type="month"
                        {...field}
                        value={field.value || ""}
                        placeholder="Atual"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Deixe em branco se ainda trabalha aqui
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>

        {/* Tecnologias */}
        <Card className="p-6">
          <h3 className="text-lg font-display uppercase mb-4">Tecnologias</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Adicione tecnologias (separadas por vírgula)"
                value={tecnologiasInput}
                onChange={(e) => setTecnologiasInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTecnologia();
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddTecnologia}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {tecnologiasSelecionadas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tecnologiasSelecionadas.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    #{tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTecnologia(index)}
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

        {/* Elevator Pitch */}
        <Card className="p-6">
          <h3 className="text-lg font-display uppercase mb-4">
            Elevator Pitch
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="pitchElevator.pt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Português</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Resumo rápido desta experiência em português"
                      className="min-h-[100px]"
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
              name="pitchElevator.en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Quick summary in English"
                      className="min-h-[100px]"
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

        {/* Speech Completo */}
        <Card className="p-6">
          <h3 className="text-lg font-display uppercase mb-4">
            Speech Completo
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="speechCompleto.pt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Português</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição detalhada da experiência em português"
                      className="min-h-[200px]"
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
              name="speechCompleto.en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description in English"
                      className="min-h-[200px]"
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

        {/* STAR Cases */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display uppercase">STAR Cases</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleOpenStarDialog()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar STAR Case
            </Button>
          </div>

          {fields.length === 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhum STAR Case adicionado ainda
              </p>
              <StarCaseAIButton
                empresaNome={empresaNome}
                cargoNome={cargoNome}
                mode="create"
                onGenerated={(starCase) => {
                  append(starCase);
                }}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{field.titulo}</h4>
                        <Badge variant="outline" className="text-xs">
                          {field.idioma.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <strong>S:</strong> {field.situation.slice(0, 80)}...
                        </p>
                        <p>
                          <strong>T:</strong> {field.task.slice(0, 80)}...
                        </p>
                        <p>
                          <strong>A:</strong> {field.action.slice(0, 80)}...
                        </p>
                        <p>
                          <strong>R:</strong> {field.result.slice(0, 80)}...
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenStarDialog(index)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <StarCaseAIButton
                        empresaNome={empresaNome}
                        cargoNome={cargoNome}
                        mode="rewrite"
                        existingCase={field}
                        onGenerated={(updatedCase) => {
                          update(index, updatedCase);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
              <StarCaseAIButton
                empresaNome={empresaNome}
                cargoNome={cargoNome}
                mode="create"
                onGenerated={(starCase) => {
                  append(starCase);
                }}
              />
            </div>
          )}
        </Card>

        {/* Botões de ação */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Salvando..." : "Salvar Experiência"}
          </Button>
        </div>
      </form>

      {/* Dialog para STAR Case */}
      <Dialog open={showStarCaseDialog} onOpenChange={setShowStarCaseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingStarIndex !== null
                ? "Editar STAR Case"
                : "Novo STAR Case"}
            </DialogTitle>
            <DialogDescription>
              Descreva um caso usando a metodologia STAR (Situation, Task,
              Action, Result)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Título do Case</label>
              <Input
                value={tempStarCase.titulo}
                onChange={(e) =>
                  setTempStarCase({ ...tempStarCase, titulo: e.target.value })
                }
                placeholder="Ex: Otimização de Performance"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Idioma</label>
              <Select
                value={tempStarCase.idioma}
                onValueChange={(value: "pt" | "en") =>
                  setTempStarCase({ ...tempStarCase, idioma: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium">
                Situation (Situação)
              </label>
              <Textarea
                value={tempStarCase.situation}
                onChange={(e) =>
                  setTempStarCase({
                    ...tempStarCase,
                    situation: e.target.value,
                  })
                }
                placeholder="Descreva o contexto e a situação..."
                className="min-h-[80px]"
              />
              <TextStats text={tempStarCase.situation} />
            </div>

            <div>
              <label className="text-sm font-medium">Task (Tarefa)</label>
              <Textarea
                value={tempStarCase.task}
                onChange={(e) =>
                  setTempStarCase({ ...tempStarCase, task: e.target.value })
                }
                placeholder="Qual era sua responsabilidade ou objetivo..."
                className="min-h-[80px]"
              />
              <TextStats text={tempStarCase.task} />
            </div>

            <div>
              <label className="text-sm font-medium">Action (Ação)</label>
              <Textarea
                value={tempStarCase.action}
                onChange={(e) =>
                  setTempStarCase({ ...tempStarCase, action: e.target.value })
                }
                placeholder="O que você fez especificamente..."
                className="min-h-[80px]"
              />
              <TextStats text={tempStarCase.action} />
            </div>

            <div>
              <label className="text-sm font-medium">Result (Resultado)</label>
              <Textarea
                value={tempStarCase.result}
                onChange={(e) =>
                  setTempStarCase({ ...tempStarCase, result: e.target.value })
                }
                placeholder="Quais foram os resultados e impactos..."
                className="min-h-[80px]"
              />
              <TextStats text={tempStarCase.result} />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowStarCaseDialog(false)}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={handleSaveStarCase}>
              {editingStarIndex !== null ? "Salvar Alterações" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
