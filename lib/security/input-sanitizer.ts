/**
 * Utilitários de Segurança - Sanitização de Input
 *
 * Previne ataques de prompt injection e valida entradas do usuário
 * antes de usar em prompts de IA ou queries de banco de dados.
 */

import { z } from 'zod';

// ============================================================
// Configurações de Sanitização
// ============================================================

const DANGEROUS_PATTERNS = [
  // Tentativas de quebrar o prompt
  /ignore\s+(all\s+)?previous\s+instructions?/gi,
  /disregard\s+(all\s+)?previous\s+instructions?/gi,
  /forget\s+(all\s+)?previous\s+instructions?/gi,

  // Tentativas de injeção de sistema
  /system\s*:/gi,
  /assistant\s*:/gi,
  /user\s*:/gi,

  // Tentativas de executar comandos
  /<script[^>]*>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi, // onclick, onerror, etc.

  // Tentativas de acessar dados sensíveis
  /api[_-]?key/gi,
  /password/gi,
  /token/gi,
  /secret/gi,
];

// ============================================================
// Funções de Sanitização
// ============================================================

/**
 * Sanitiza entrada do usuário para uso em prompts de IA
 *
 * @param input - Texto a ser sanitizado
 * @param maxLength - Tamanho máximo permitido (default: 2000)
 * @returns Texto sanitizado
 */
export function sanitizeForAIPrompt(input: string, maxLength = 2000): string {
  if (typeof input !== 'string') {
    throw new Error('Input deve ser uma string');
  }

  // Limitar tamanho
  let sanitized = input.substring(0, maxLength).trim();

  // Remover padrões perigosos
  for (const pattern of DANGEROUS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[REMOVIDO]');
  }

  // Remover caracteres de controle e zero-width
  sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F\u200B-\u200D\uFEFF]/g, '');

  // Normalizar espaços múltiplos
  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  // Se ficou muito pequeno após sanitização, retornar vazio
  if (sanitized.length < 3) {
    return '';
  }

  return sanitized;
}

/**
 * Sanitiza texto básico (nomes, títulos, etc.)
 *
 * @param input - Texto a ser sanitizado
 * @param maxLength - Tamanho máximo permitido (default: 200)
 * @returns Texto sanitizado
 */
export function sanitizeText(input: string, maxLength = 200): string {
  if (typeof input !== 'string') {
    throw new Error('Input deve ser uma string');
  }

  return input
    .substring(0, maxLength)
    .replace(/[<>{}[\]]/g, '') // Remove caracteres perigosos
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sanitiza URL
 *
 * @param url - URL a ser validada
 * @returns URL sanitizada ou null se inválida
 */
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Apenas https e http
    if (!['https:', 'http:'].includes(parsed.protocol)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Valida e sanitiza email
 */
export function sanitizeEmail(email: string): string {
  const emailSchema = z.string().email().max(255);

  try {
    return emailSchema.parse(email.toLowerCase().trim());
  } catch {
    throw new Error('Email inválido');
  }
}

// ============================================================
// Validação de Tamanho de Dados
// ============================================================

/**
 * Valida tamanho de objeto JSON
 */
export function validateJsonSize(data: unknown, maxSizeKb = 100): void {
  const jsonString = JSON.stringify(data);
  const sizeKb = new TextEncoder().encode(jsonString).length / 1024;

  if (sizeKb > maxSizeKb) {
    throw new Error(
      `Dados muito grandes: ${sizeKb.toFixed(2)}KB (máximo: ${maxSizeKb}KB)`
    );
  }
}

/**
 * Valida tamanho de array
 */
export function validateArraySize<T>(
  array: T[],
  maxLength: number,
  fieldName = 'array'
): void {
  if (!Array.isArray(array)) {
    throw new Error(`${fieldName} deve ser um array`);
  }

  if (array.length > maxLength) {
    throw new Error(
      `${fieldName} muito grande: ${array.length} itens (máximo: ${maxLength})`
    );
  }
}

// ============================================================
// Rate Limiting Helper
// ============================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Verifica rate limit para um identificador
 *
 * @param key - Identificador (userId, IP, etc.)
 * @param maxRequests - Número máximo de requisições
 * @param windowMs - Janela de tempo em ms
 * @returns true se permitido, false se excedeu limite
 */
export function checkRateLimit(
  key: string,
  maxRequests = 10,
  windowMs = 60000
): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  // Limpar entradas antigas periodicamente
  if (rateLimitStore.size > 10000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (now > v.resetAt) {
        rateLimitStore.delete(k);
      }
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Obtém tempo restante até reset do rate limit
 */
export function getRateLimitReset(key: string): number {
  const entry = rateLimitStore.get(key);
  if (!entry) return 0;

  const now = Date.now();
  return Math.max(0, entry.resetAt - now);
}

// ============================================================
// Detecção de Conteúdo Suspeito
// ============================================================

/**
 * Analisa texto em busca de padrões suspeitos
 */
export function detectSuspiciousContent(input: string): {
  isSuspicious: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Verifica padrões perigosos
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(input)) {
      reasons.push(`Padrão suspeito detectado: ${pattern.source}`);
    }
  }

  // Verifica repetição excessiva
  if (/(.)\1{50,}/.test(input)) {
    reasons.push('Repetição excessiva de caracteres');
  }

  // Verifica muitos números seguidos (possível tentativa de injeção)
  if (/\d{100,}/.test(input)) {
    reasons.push('Sequência numérica muito longa');
  }

  // Verifica quantidade excessiva de caracteres especiais
  const specialCharsRatio = (input.match(/[^a-zA-Z0-9\s]/g) || []).length / input.length;
  if (specialCharsRatio > 0.5) {
    reasons.push('Proporção alta de caracteres especiais');
  }

  return {
    isSuspicious: reasons.length > 0,
    reasons,
  };
}

// ============================================================
// Logging de Segurança
// ============================================================

/**
 * Registra tentativa suspeita (para futura integração com sistema de logging)
 */
export function logSuspiciousActivity(
  userId: string | undefined,
  action: string,
  details: Record<string, unknown>
): void {
  // TODO: Integrar com sistema de logging (Pino, Winston)
  console.warn('🚨 Atividade suspeita detectada:', {
    timestamp: new Date().toISOString(),
    userId: userId || 'anonymous',
    action,
    details,
  });
}
