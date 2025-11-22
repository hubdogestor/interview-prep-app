import { z } from "zod";

/**
 * Enhanced Zod schemas with detailed error messages
 * Centralized validation for consistent error handling
 */

// ============================================
// Base Schemas
// ============================================

export const idSchema = z.string().uuid("ID inválido");

export const requiredStringSchema = (fieldName: string, minLength = 1) =>
  z
    .string({
      required_error: `${fieldName} é obrigatório`,
      invalid_type_error: `${fieldName} deve ser um texto`,
    })
    .min(minLength, `${fieldName} deve ter no mínimo ${minLength} caractere${minLength > 1 ? "s" : ""}`);

export const optionalStringSchema = (fieldName: string, minLength = 1) =>
  z
    .string({
      invalid_type_error: `${fieldName} deve ser um texto`,
    })
    .min(minLength, `${fieldName} deve ter no mínimo ${minLength} caractere${minLength > 1 ? "s" : ""}`)
    .optional();

export const emailSchema = z
  .string({
    required_error: "E-mail é obrigatório",
  })
  .email("E-mail inválido");

export const urlSchema = (fieldName: string) =>
  z
    .string()
    .url(`${fieldName} deve ser uma URL válida`)
    .optional()
    .or(z.literal(""));

// ============================================
// Content Schemas
// ============================================

export const bilingualContentSchema = z.object({
  pt: requiredStringSchema("Conteúdo em português", 10),
  en: z.string().default(""),
});

export const tagsSchema = z
  .array(z.string().min(1, "Tag não pode ser vazia"))
  .max(10, "Máximo de 10 tags")
  .optional()
  .default([]);

// ============================================
// Icebreaker Schemas
// ============================================

export const icebreakerTypeSchema = z.enum(
  ["elevator_pitch", "quick_intro", "personal_story"],
  {
    errorMap: () => ({
      message: "Tipo deve ser: elevator_pitch, quick_intro ou personal_story",
    }),
  }
);

export const icebreakerVersionSchema = z.object({
  nome: requiredStringSchema("Nome da versão", 3),
  conteudo: bilingualContentSchema,
  duracao: z
    .number({
      required_error: "Duração é obrigatória",
      invalid_type_error: "Duração deve ser um número",
    })
    .int("Duração deve ser um número inteiro")
    .min(30, "Duração mínima: 30 segundos")
    .max(600, "Duração máxima: 10 minutos"),
  tags: tagsSchema,
});

export const createIcebreakerSchema = z.object({
  tipo: icebreakerTypeSchema,
  titulo: requiredStringSchema("Título", 3).max(100, "Título muito longo (máx: 100 caracteres)"),
  categoria: optionalStringSchema("Categoria", 2),
  versoes: z
    .array(icebreakerVersionSchema)
    .min(1, "Deve ter pelo menos uma versão")
    .max(5, "Máximo de 5 versões"),
});

export const updateIcebreakerSchema = createIcebreakerSchema
  .partial()
  .extend({
    id: idSchema,
  });

// ============================================
// Speech Schemas
// ============================================

export const createSpeechSchema = z.object({
  tipoVaga: requiredStringSchema("Tipo de vaga", 3).max(100, "Tipo de vaga muito longo"),
  titulo: requiredStringSchema("Título", 5).max(150, "Título muito longo (máx: 150 caracteres)"),
  versao: z.string().regex(/^\d+\.\d+$/, "Versão deve estar no formato X.Y (ex: 1.0)").default("1.0"),
  conteudo: bilingualContentSchema,
  duracaoEstimada: z
    .number({
      required_error: "Duração estimada é obrigatória",
      invalid_type_error: "Duração deve ser um número",
    })
    .positive("Duração deve ser maior que zero")
    .max(30, "Duração máxima: 30 minutos"),
  foco: z
    .array(z.string().min(2, "Foco deve ter no mínimo 2 caracteres"))
    .max(8, "Máximo de 8 focos")
    .default([]),
  nomeEmpresa: optionalStringSchema("Nome da empresa", 2).or(z.literal("")),
  descricaoVaga: optionalStringSchema("Descrição da vaga", 10).or(z.literal("")),
});

export const updateSpeechSchema = createSpeechSchema
  .partial()
  .extend({
    id: idSchema,
  });

// ============================================
// Competência Schemas
// ============================================

export const competenciaCategorySchema = z.enum(
  ["technical", "soft_skills", "leadership"],
  {
    errorMap: () => ({
      message: "Categoria inválida. Escolha entre: technical, soft_skills ou leadership",
    }),
  }
);

export const competenciaNivelSchema = z.enum(
  ["basic", "intermediate", "advanced", "expert"],
  {
    errorMap: () => ({
      message: "Nível inválido",
    }),
  }
);

export const trackRecordSchema = z.object({
  projeto: requiredStringSchema("Nome do projeto", 3),
  resultado: requiredStringSchema("Resultado", 10),
  ano: z
    .number({
      required_error: "Ano é obrigatório",
      invalid_type_error: "Ano deve ser um número",
    })
    .int("Ano deve ser um número inteiro")
    .min(1990, "Ano muito antigo")
    .max(new Date().getFullYear() + 1, "Ano inválido"),
});

export const createCompetenciaSchema = z.object({
  nome: requiredStringSchema("Nome", 2).max(100, "Nome muito longo"),
  categoria: competenciaCategorySchema,
  nivel: competenciaNivelSchema,
  descricao: bilingualContentSchema,
  ferramentas: z
    .array(z.string().min(1, "Ferramenta não pode ser vazia"))
    .max(20, "Máximo de 20 ferramentas")
    .default([]),
  evidencias: z
    .array(z.string().min(5, "Evidência muito curta"))
    .max(10, "Máximo de 10 evidências")
    .default([]),
  trackRecord: z
    .array(trackRecordSchema)
    .max(15, "Máximo de 15 registros")
    .default([]),
});

export const updateCompetenciaSchema = createCompetenciaSchema
  .partial()
  .extend({
    id: idSchema,
  });

// ============================================
// Experiência Schemas
// ============================================

export const starCaseSchema = z.object({
  titulo: requiredStringSchema("Título do case", 5).max(150, "Título muito longo"),
  situation: requiredStringSchema("Situation", 10),
  task: requiredStringSchema("Task", 10),
  action: requiredStringSchema("Action", 10),
  result: requiredStringSchema("Result", 10),
  idioma: z.enum(["pt", "en"], {
    errorMap: () => ({ message: "Idioma deve ser 'pt' ou 'en'" }),
  }),
});

export const createExperienciaSchema = z.object({
  empresa: requiredStringSchema("Empresa", 2).max(100, "Nome da empresa muito longo"),
  cargo: requiredStringSchema("Cargo", 2).max(100, "Nome do cargo muito longo"),
  periodo: z.object({
    inicio: requiredStringSchema("Data de início", 1),
    fim: z.string().nullable(),
  }),
  pitchElevator: bilingualContentSchema,
  speechCompleto: bilingualContentSchema,
  starCases: z
    .array(starCaseSchema)
    .max(10, "Máximo de 10 STAR cases")
    .default([]),
  tecnologias: z
    .array(z.string().min(1))
    .max(15, "Máximo de 15 tecnologias")
    .default([]),
});

export const updateExperienciaSchema = createExperienciaSchema
  .partial()
  .extend({
    id: idSchema,
  });

// ============================================
// Practice Session Schema
// ============================================

export const createPracticeSessionSchema = z.object({
  tipo: z.enum(["audio", "video", "text"], {
    errorMap: () => ({ message: "Tipo inválido" }),
  }),
  conteudo: requiredStringSchema("Conteúdo", 10),
  duracao: z
    .number()
    .int("Duração deve ser um número inteiro")
    .positive("Duração deve ser maior que zero")
    .max(3600, "Duração máxima: 1 hora"),
  notas: optionalStringSchema("Notas", 5),
  tags: tagsSchema,
});

// ============================================
// Helper Functions
// ============================================

/**
 * Format Zod errors into user-friendly messages
 */
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  error.errors.forEach((err) => {
    const path = err.path.join(".");
    errors[path] = err.message;
  });

  return errors;
}

/**
 * Validate data against schema and return formatted errors
 */
export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: formatZodErrors(result.error),
  };
}
