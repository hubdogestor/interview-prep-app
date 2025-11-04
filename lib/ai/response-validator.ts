/**
 * Validador de Respostas da IA
 *
 * Valida e faz parse seguro de respostas JSON vindas de modelos de IA,
 * prevenindo crashes por respostas malformadas.
 */

import { z } from 'zod';

// ============================================================
// Tipos de Erro
// ============================================================

export class AIResponseError extends Error {
  constructor(
    message: string,
    public readonly originalError?: unknown,
    public readonly rawResponse?: string
  ) {
    super(message);
    this.name = 'AIResponseError';
  }
}

export class AIValidationError extends Error {
  constructor(
    message: string,
    public readonly zodError?: z.ZodError
  ) {
    super(message);
    this.name = 'AIValidationError';
  }
}

// ============================================================
// Extração de JSON
// ============================================================

/**
 * Extrai JSON de resposta de IA que pode conter markdown
 *
 * Suporta formatos:
 * - ```json\n{...}\n```
 * - ```\n{...}\n```
 * - {...} (puro)
 */
export function extractJsonFromMarkdown(text: string): string {
  // Remove marcadores de código markdown
  let cleaned = text.trim();

  // Padrão 1: ```json ... ```
  const jsonBlockMatch = cleaned.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
    return jsonBlockMatch[1].trim();
  }

  // Padrão 2: ``` ... ```
  const codeBlockMatch = cleaned.match(/```\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }

  // Padrão 3: Texto puro, tentar encontrar objeto JSON
  const jsonObjectMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonObjectMatch) {
    return jsonObjectMatch[0];
  }

  // Padrão 4: Array JSON
  const jsonArrayMatch = cleaned.match(/\[[\s\S]*\]/);
  if (jsonArrayMatch) {
    return jsonArrayMatch[0];
  }

  // Se não encontrou, retorna o texto limpo
  return cleaned;
}

/**
 * Remove comentários de JSON (que tecnicamente não são válidos)
 */
function removeJsonComments(jsonString: string): string {
  // Remove comentários de linha // ...
  let cleaned = jsonString.replace(/\/\/.*$/gm, '');

  // Remove comentários de bloco /* ... */
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');

  return cleaned;
}

// ============================================================
// Parse Seguro de JSON
// ============================================================

/**
 * Faz parse seguro de JSON com tentativas de recuperação
 */
export function safeJsonParse<T = unknown>(text: string): T {
  // Extrair JSON se estiver em markdown
  const extracted = extractJsonFromMarkdown(text);

  // Tentar parse direto
  try {
    return JSON.parse(extracted) as T;
  } catch (firstError) {
    // Tentativa 2: Remover comentários
    try {
      const withoutComments = removeJsonComments(extracted);
      return JSON.parse(withoutComments) as T;
    } catch (secondError) {
      // Tentativa 3: Remover trailing commas
      try {
        const withoutTrailingCommas = extracted.replace(/,(\s*[}\]])/g, '$1');
        return JSON.parse(withoutTrailingCommas) as T;
      } catch (thirdError) {
        throw new AIResponseError(
          'Não foi possível fazer parse da resposta da IA como JSON',
          firstError,
          text.substring(0, 500) // Primeiros 500 chars para debug
        );
      }
    }
  }
}

// ============================================================
// Validação com Schema Zod
// ============================================================

/**
 * Parse e valida resposta de IA usando schema Zod
 *
 * @param text - Resposta bruta da IA
 * @param schema - Schema Zod para validação
 * @param options - Opções de validação
 * @returns Objeto validado
 */
export function parseAndValidateAIResponse<T>(
  text: string,
  schema: z.ZodSchema<T>,
  options: {
    fieldName?: string;
    allowPartial?: boolean;
  } = {}
): T {
  const { fieldName = 'AI response', allowPartial = false } = options;

  // Parse JSON
  let parsed: unknown;
  try {
    parsed = safeJsonParse(text);
  } catch (error) {
    if (error instanceof AIResponseError) {
      throw error;
    }
    throw new AIResponseError(`Erro ao fazer parse de ${fieldName}`, error, text);
  }

  // Validar com schema
  try {
    if (allowPartial && 'partial' in schema) {
      // @ts-expect-error - Zod partial method
      return schema.partial().parse(parsed);
    }
    return schema.parse(parsed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues
        .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
        .join('\n');

      throw new AIValidationError(
        `Validação de ${fieldName} falhou:\n${issues}`,
        error
      );
    }
    throw new AIValidationError(`Erro ao validar ${fieldName}`, error as z.ZodError);
  }
}

// ============================================================
// Validadores Específicos
// ============================================================

/**
 * Valida que a resposta contém texto não-vazio
 */
export function validateNonEmptyText(text: string, fieldName = 'text'): string {
  const trimmed = text.trim();

  if (!trimmed) {
    throw new AIResponseError(`${fieldName} está vazio`);
  }

  if (trimmed.length < 10) {
    throw new AIResponseError(`${fieldName} muito curto (mínimo 10 caracteres)`);
  }

  return trimmed;
}

/**
 * Valida que objeto tem propriedades esperadas
 */
export function validateObjectShape<T extends Record<string, unknown>>(
  obj: unknown,
  requiredKeys: (keyof T)[],
  fieldName = 'object'
): T {
  if (typeof obj !== 'object' || obj === null) {
    throw new AIValidationError(`${fieldName} deve ser um objeto`);
  }

  const typedObj = obj as Record<string, unknown>;

  for (const key of requiredKeys) {
    if (!(String(key) in typedObj)) {
      throw new AIValidationError(
        `${fieldName} faltando propriedade obrigatória: ${String(key)}`
      );
    }
  }

  return typedObj as T;
}

/**
 * Valida score numérico (0-100)
 */
export function validateScore(value: unknown, fieldName = 'score'): number {
  const scoreSchema = z.number().min(0).max(100);

  try {
    return scoreSchema.parse(value);
  } catch (error) {
    throw new AIValidationError(
      `${fieldName} deve ser número entre 0 e 100`,
      error as z.ZodError
    );
  }
}

// ============================================================
// Retry Logic
// ============================================================

export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoff?: boolean;
  onRetry?: (attempt: number, error: Error) => void;
}

/**
 * Executa função com retry automático em caso de erro
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoff = true,
    onRetry,
  } = options;

  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxAttempts) {
        break;
      }

      // Callback antes de retry
      if (onRetry) {
        onRetry(attempt, lastError);
      }

      // Aguardar antes de tentar novamente
      const delay = backoff ? delayMs * Math.pow(2, attempt - 1) : delayMs;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new AIResponseError(
    `Falha após ${maxAttempts} tentativas`,
    lastError
  );
}

// ============================================================
// Helpers de Formatação
// ============================================================

/**
 * Formata erro de validação para exibição ao usuário
 */
export function formatValidationError(error: unknown): string {
  if (error instanceof AIValidationError && error.zodError) {
    const issues = error.zodError.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join(', ');
    return `Resposta inválida: ${issues}`;
  }

  if (error instanceof AIResponseError) {
    return `Erro ao processar resposta: ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro desconhecido ao processar resposta da IA';
}

/**
 * Log de erro de IA (para debug)
 */
export function logAIError(
  context: string,
  error: unknown,
  rawResponse?: string
): void {
  console.error(`[AI Error] ${context}:`, {
    error: error instanceof Error ? error.message : String(error),
    type: error instanceof Error ? error.constructor.name : typeof error,
    rawResponse: rawResponse?.substring(0, 200),
    stack: error instanceof Error ? error.stack : undefined,
  });
}
