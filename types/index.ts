/**
 * Central type definitions for the interview-prep-app
 * These types extend Prisma models with proper TypeScript types
 */

// ========================================
// COMPETENCIA TYPES
// ========================================

export type CompetenciaCategoria = "technical" | "soft_skills" | "leadership";
export type CompetenciaNivel = "basic" | "intermediate" | "advanced" | "expert";

export interface CompetenciaDescricao {
  pt: string;
  en: string;
}

export interface TrackRecordItem {
  projeto: string;
  resultado: string;
  ano: number;
}

export interface Competencia {
  id: string;
  nome: string;
  categoria: CompetenciaCategoria;
  nivel: CompetenciaNivel;
  descricao: CompetenciaDescricao;
  ferramentas: string[];
  evidencias: string[];
  trackRecord: TrackRecordItem[];
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// EXPERIENCIA TYPES
// ========================================

export interface Periodo {
  inicio: string;
  fim: string | null;
}

export interface BilingualContent {
  pt: string;
  en: string;
}

export interface StarCase {
  id?: string;
  titulo: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  idioma: "pt" | "en";
  competencia?: string;
  createdAt?: Date;
}

export interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  periodo: Periodo;
  pitchElevator: BilingualContent;
  speechCompleto: BilingualContent;
  starCases: StarCase[];
  tecnologias: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// ICEBREAKER TYPES
// ========================================

export interface IcebreakerVersion {
  nome: string;
  conteudo: BilingualContent;
  duracao: number;
  tags?: string[];
}

export interface Icebreaker {
  id: string;
  tipo: string;
  titulo: string;
  tipoVaga?: string;
  versao?: string;
  conteudo?: BilingualContent;
  duracaoEstimada?: number;
  foco?: string[];
  versoes: IcebreakerVersion[];
  favorite: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// SPEECH TYPES
// ========================================

export interface Speech {
  id: string;
  tipoVaga: string;
  titulo: string;
  versao: string;
  conteudo: BilingualContent;
  duracaoEstimada: number;
  foco: string[];
  favorite: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// QUESTION TYPES
// ========================================

export interface Question {
  id: string;
  categoria: string;
  pergunta: BilingualContent;
  respostaEsperada: BilingualContent;
  dificuldade: "easy" | "medium" | "hard";
  tags: string[];
  favorite: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// PRACTICE SESSION TYPES
// ========================================

export interface PracticeSession {
  id: string;
  tipo: string;
  duracaoMinutos: number;
  feedback?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// PROFILE TYPES
// ========================================

export interface Profile {
  id: string;
  nome: string;
  titulo: string;
  foto?: string;
  email?: string;
  telefone?: string;
  linkedin?: string;
  github?: string;
  resumo: BilingualContent;
  anosExperiencia: number;
  createdAt: Date;
  updatedAt: Date;
}
