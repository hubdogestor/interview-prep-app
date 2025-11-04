/**
 * Tipos TypeScript para campos JSON do Prisma
 *
 * Este arquivo define tipos explícitos para substituir 'as any'
 * nos campos JSON do schema Prisma, garantindo type safety.
 */

import { z } from 'zod';

// ============================================================
// Tipos Base
// ============================================================

export interface BilingualContent {
  pt: string;
  en: string;
}

export interface DateRange {
  inicio: string; // ISO date string
  fim?: string | null; // null = "Atual"
}

// ============================================================
// Icebreaker Types
// ============================================================

export interface IcebreakerVersion {
  nome: string;
  conteudo: BilingualContent;
  duracao: number;
  tags: string[];
}

export type IcebreakerTipo = 'elevator_pitch' | 'quick_intro' | 'personal_story';

// ============================================================
// Speech Types
// ============================================================

export interface SpeechContent extends BilingualContent {}

// ============================================================
// Competencia Types
// ============================================================

export interface CompetenciaDescricao extends BilingualContent {}

export interface TrackRecordItem {
  projeto: string;
  resultado: string;
  ano: number;
  impacto?: string;
}

export type CompetenciaCategoria = 'tecnica' | 'soft_skill' | 'lideranca' | 'ferramenta';
export type CompetenciaNivel = 'basico' | 'intermediario' | 'avancado' | 'expert';

// ============================================================
// Experiencia Types
// ============================================================

export interface ExperienciaPeriodo extends DateRange {}

export interface PitchElevator extends BilingualContent {}

export interface SpeechCompleto extends BilingualContent {}

export interface StarCase {
  titulo: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  idioma: 'pt' | 'en';
  competenciasUsadas?: string[];
  metricas?: string;
}

// ============================================================
// Question Types
// ============================================================

export interface QuestionContent extends BilingualContent {}

export type QuestionCategoria = 'tecnica' | 'comportamental' | 'cultura' | 'carreira';
export type QuestionPrioridade = 'alta' | 'media' | 'baixa';

// ============================================================
// Practice Session Types
// ============================================================

export interface PracticeAvaliacaoIA {
  clareza: number; // 0-10
  fluencia: number; // 0-10
  completude: number; // 0-10
  feedback: string;
  pontosFortes: string[];
  pontosAMelhorar: string[];
  sugestoes: string[];
}

export type PracticeTipo = 'icebreaker' | 'speech' | 'star_case';

// ============================================================
// Profile Types
// ============================================================

export interface ProfileResumo extends BilingualContent {}

// ============================================================
// Schemas Zod para Validação
// ============================================================

export const BilingualContentSchema = z.object({
  pt: z.string().min(1, 'Conteúdo em português é obrigatório'),
  en: z.string().min(1, 'Conteúdo em inglês é obrigatório'),
});

export const DateRangeSchema = z.object({
  inicio: z.string().datetime(),
  fim: z.string().datetime().nullable().optional(),
});

export const IcebreakerVersionSchema = z.object({
  nome: z.string().min(1),
  conteudo: BilingualContentSchema,
  duracao: z.number().min(0).max(600), // Max 10 minutos
  tags: z.array(z.string()),
});

export const TrackRecordItemSchema = z.object({
  projeto: z.string().min(1),
  resultado: z.string().min(1),
  ano: z.number().min(1900).max(new Date().getFullYear() + 1),
  impacto: z.string().optional(),
});

export const StarCaseSchema = z.object({
  titulo: z.string().min(1),
  situation: z.string().min(1),
  task: z.string().min(1),
  action: z.string().min(1),
  result: z.string().min(1),
  idioma: z.enum(['pt', 'en']),
  competenciasUsadas: z.array(z.string()).optional(),
  metricas: z.string().optional(),
});

export const PracticeAvaliacaoIASchema = z.object({
  clareza: z.number().min(0).max(10),
  fluencia: z.number().min(0).max(10),
  completude: z.number().min(0).max(10),
  feedback: z.string(),
  pontosFortes: z.array(z.string()),
  pontosAMelhorar: z.array(z.string()),
  sugestoes: z.array(z.string()),
});

// ============================================================
// Type Guards
// ============================================================

export function isBilingualContent(value: unknown): value is BilingualContent {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.pt === 'string' &&
    typeof obj.en === 'string'
  );
}

export function isIcebreakerVersion(value: unknown): value is IcebreakerVersion {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.nome === 'string' &&
    isBilingualContent(obj.conteudo) &&
    typeof obj.duracao === 'number' &&
    Array.isArray(obj.tags)
  );
}

export function isStarCase(value: unknown): value is StarCase {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.titulo === 'string' &&
    typeof obj.situation === 'string' &&
    typeof obj.task === 'string' &&
    typeof obj.action === 'string' &&
    typeof obj.result === 'string' &&
    (obj.idioma === 'pt' || obj.idioma === 'en')
  );
}

// ============================================================
// Helpers para Cast Seguro
// ============================================================

/**
 * Converte JSON do Prisma para tipo específico com validação
 */
export function safeJsonCast<T>(
  value: unknown,
  schema: z.ZodSchema<T>,
  fieldName = 'value'
): T {
  try {
    return schema.parse(value);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new Error(`Validação falhou em ${fieldName}: ${issues}`);
    }
    throw new Error(`Erro ao validar ${fieldName}: ${error}`);
  }
}

/**
 * Cast de array JSON com validação de cada item
 */
export function safeJsonArrayCast<T>(
  value: unknown,
  itemSchema: z.ZodSchema<T>,
  fieldName = 'array'
): T[] {
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} deve ser um array`);
  }

  return value.map((item, index) => {
    try {
      return itemSchema.parse(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues = error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
        throw new Error(`Validação falhou em ${fieldName}[${index}]: ${issues}`);
      }
      throw new Error(`Erro ao validar ${fieldName}[${index}]: ${error}`);
    }
  });
}
