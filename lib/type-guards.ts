import type { Prisma } from "@prisma/client";
import type { JsonValue } from "@prisma/client/runtime/library";

import type {
  BilingualContent,
  Competencia,
  CompetenciaDescricao,
  Experiencia,
  Icebreaker,
  IcebreakerVersion,
  Periodo,
  Speech,
  StarCase,
  TrackRecordItem,
} from "@/types";

/**
 * Type guards e helpers para converter JsonValue do Prisma em tipos específicos
 * Garante type safety ao trabalhar com campos JSON do banco
 */

// ==================== COMPETENCIAS ====================

export interface TrackRecord {
  projeto: string;
  resultado: string;
  contexto?: string;
  tecnologias?: string[];
}

export function isCompetenciaDescricao(value: unknown): value is CompetenciaDescricao {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.pt === "string" && typeof obj.en === "string";
}

export function parseCompetenciaDescricao(value: JsonValue): CompetenciaDescricao {
  if (isCompetenciaDescricao(value)) return value;
  // Fallback para valores inválidos
  return { pt: "", en: "" };
}

export function isTrackRecord(value: unknown): value is TrackRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.projeto === "string" && typeof obj.resultado === "string";
}

export function parseTrackRecordArray(value: JsonValue): TrackRecordItem[] {
  if (!Array.isArray(value)) return [];
  const filtered = value.filter(isTrackRecord);
  return filtered as unknown as TrackRecordItem[];
}

// ==================== EXPERIENCIAS ====================

export function isPeriodo(value: unknown): value is Periodo {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.inicio === "string" &&
    (obj.fim === null || typeof obj.fim === "string")
  );
}

export function parsePeriodo(value: JsonValue): Periodo {
  if (isPeriodo(value)) return value;
  return { inicio: "", fim: null };
}

export function isBilingualContent(value: unknown): value is BilingualContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.pt === "string" && typeof obj.en === "string";
}

export function parseBilingualContent(value: JsonValue): BilingualContent {
  if (isBilingualContent(value)) return value;
  return { pt: "", en: "" };
}

export function isStarCase(value: unknown): value is StarCase {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.titulo === "string" &&
    typeof obj.situation === "string" &&
    typeof obj.task === "string" &&
    typeof obj.action === "string" &&
    typeof obj.result === "string" &&
    (obj.idioma === "pt" || obj.idioma === "en")
  );
}

export function parseStarCaseArray(value: JsonValue): StarCase[] {
  if (!Array.isArray(value)) return [];
  const filtered = value.filter(isStarCase);
  return filtered as unknown as StarCase[];
}

// ==================== ICEBREAKERS ====================

export function isIcebreakerVersion(value: unknown): value is IcebreakerVersion {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.nome === "string" &&
    isBilingualContent(obj.conteudo) &&
    typeof obj.duracao === "number"
  );
}

export function parseIcebreakerVersions(value: JsonValue): IcebreakerVersion[] {
  if (!Array.isArray(value)) return [];
  const filtered = value.filter(isIcebreakerVersion);
  return filtered as unknown as IcebreakerVersion[];
}

// ==================== SPEECHES ====================

export interface SpeechContent {
  pt: string;
  en: string;
}

export function isSpeechContent(value: unknown): value is SpeechContent {
  return isBilingualContent(value);
}

export function parseSpeechContent(value: JsonValue): SpeechContent {
  return parseBilingualContent(value);
}

// ==================== QUESTIONS ====================

export interface QuestionContent {
  pt: string;
  en: string;
}

export function isQuestionContent(value: unknown): value is QuestionContent {
  return isBilingualContent(value);
}

export function parseQuestionContent(value: JsonValue): QuestionContent {
  return parseBilingualContent(value);
}

// ==================== PROFILE ====================

export interface ProfileResumo {
  pt: string;
  en: string;
}

export function isProfileResumo(value: unknown): value is ProfileResumo {
  return isBilingualContent(value);
}

export function parseProfileResumo(value: JsonValue): ProfileResumo {
  return parseBilingualContent(value);
}

// ==================== PRACTICE SESSIONS ====================

export interface AvaliacaoIA {
  clareza: number;
  fluencia: number;
  completude: number;
  pontosFortesw?: string[];
  areasAMelhorar?: string[];
  feedback: string;
}

export function isAvaliacaoIA(value: unknown): value is AvaliacaoIA {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.clareza === "number" &&
    typeof obj.fluencia === "number" &&
    typeof obj.completude === "number" &&
    typeof obj.feedback === "string"
  );
}

export function parseAvaliacaoIA(value: JsonValue): AvaliacaoIA | null {
  if (isAvaliacaoIA(value)) return value;
  return null;
}

// ==================== GENERIC HELPERS ====================

/**
 * Converte JsonValue para string com fallback
 */
export function jsonToString(value: JsonValue, fallback = ""): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return fallback;
  return String(value);
}

/**
 * Converte JsonValue para number com fallback
 */
export function jsonToNumber(value: JsonValue, fallback = 0): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
}

/**
 * Converte JsonValue para boolean
 */
export function jsonToBoolean(value: JsonValue): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return Boolean(value);
}

/**
 * Converte JsonValue para array de strings
 */
export function jsonToStringArray(value: JsonValue): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string");
  }
  return [];
}

// ==================== PRISMA CONVERTERS ====================

/**
 * Converte modelo Competencia do Prisma para tipo da aplicação
 */
export function prismaCompetenciaToApp(
  prisma: Prisma.CompetenciaGetPayload<Record<string, never>>
): Competencia {
  return {
    id: prisma.id,
    nome: prisma.nome,
    categoria: prisma.categoria as "technical" | "soft_skills" | "leadership",
    nivel: prisma.nivel as "basic" | "intermediate" | "advanced" | "expert",
    descricao: parseCompetenciaDescricao(prisma.descricao),
    ferramentas: prisma.ferramentas,
    evidencias: prisma.evidencias,
    trackRecord: parseTrackRecordArray(prisma.trackRecord),
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
  };
}

/**
 * Converte modelo Experiencia do Prisma para tipo da aplicação
 */
export function prismaExperienciaToApp(
  prisma: Prisma.ExperienciaGetPayload<Record<string, never>>
): Experiencia {
  return {
    id: prisma.id,
    empresa: prisma.empresa,
    cargo: prisma.cargo,
    periodo: parsePeriodo(prisma.periodo),
    pitchElevator: parseBilingualContent(prisma.pitchElevator),
    speechCompleto: parseBilingualContent(prisma.speechCompleto),
    starCases: parseStarCaseArray(prisma.starCases),
    tecnologias: prisma.tecnologias,
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
  };
}

/**
 * Converte modelo Icebreaker do Prisma para tipo da aplicação
 */
export function prismaIcebreakerToApp(
  prisma: Prisma.IcebreakerGetPayload<Record<string, never>>
): Icebreaker {
  const versoes = parseIcebreakerVersions(prisma.versoes);
  const primeiraVersao = versoes[0];
  
  return {
    id: prisma.id,
    tipo: prisma.tipo,
    titulo: prisma.titulo,
    versoes,
    // Propriedades opcionais para compatibilidade
    tipoVaga: prisma.tipo,
    versao: primeiraVersao?.nome,
    conteudo: primeiraVersao?.conteudo,
    duracaoEstimada: primeiraVersao?.duracao,
    foco: primeiraVersao?.tags,
    favorite: prisma.favorite,
    archived: prisma.archived,
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
  };
}

/**
 * Converte modelo Speech do Prisma para tipo da aplicação
 */
export function prismaSpeechToApp(
  prisma: Prisma.SpeechGetPayload<Record<string, never>>
): Speech {
  return {
    id: prisma.id,
    tipoVaga: prisma.tipoVaga,
    titulo: prisma.titulo,
    versao: prisma.versao,
    conteudo: parseSpeechContent(prisma.conteudo),
    duracaoEstimada: prisma.duracaoEstimada,
    foco: prisma.foco,
    favorite: prisma.favorite,
    archived: prisma.archived,
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
  };
}
