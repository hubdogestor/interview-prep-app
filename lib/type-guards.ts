import type { JsonValue } from "@prisma/client/runtime/library";

/**
 * Type guards e helpers para converter JsonValue do Prisma em tipos específicos
 * Garante type safety ao trabalhar com campos JSON do banco
 */

// ==================== COMPETENCIAS ====================

export interface CompetenciaDescricao {
  pt: string;
  en: string;
}

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

export function parseTrackRecordArray(value: JsonValue): TrackRecord[] {
  if (!Array.isArray(value)) return [];
  const filtered = value.filter(isTrackRecord);
  return filtered as unknown as TrackRecord[];
}

// ==================== EXPERIENCIAS ====================

export interface Periodo {
  inicio: string;
  fim: string | null;
}

export interface BilingualContent {
  pt: string;
  en: string;
}

export interface StarCase {
  titulo: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  idioma: "pt" | "en";
}

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

export interface IcebreakerVersion {
  nome: string;
  conteudo: BilingualContent;
  duracao: number;
  tags?: string[];
}

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
