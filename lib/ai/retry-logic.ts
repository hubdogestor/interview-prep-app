/**
 * Retry Logic para AI Calls
 *
 * Implementa retry automático com exponential backoff
 * para chamadas de IA que podem falhar temporariamente.
 */

import { logger, aiLogger } from '@/lib/logger';
import { captureError } from '@/lib/monitoring/sentry';

// ============================================================
// Types
// ============================================================

export interface RetryConfig {
  /**
   * Número máximo de tentativas (incluindo a primeira)
   * @default 3
   */
  maxAttempts?: number;

  /**
   * Delay inicial em ms antes do primeiro retry
   * @default 1000
   */
  initialDelayMs?: number;

  /**
   * Multiplicador para exponential backoff
   * @default 2
   */
  backoffMultiplier?: number;

  /**
   * Delay máximo em ms
   * @default 30000 (30 segundos)
   */
  maxDelayMs?: number;

  /**
   * Função para determinar se deve fazer retry baseado no erro
   * @default retryOnAnyError
   */
  shouldRetry?: (error: Error, attempt: number) => boolean;

  /**
   * Callback executado antes de cada retry
   */
  onRetry?: (error: Error, attempt: number, delayMs: number) => void;

  /**
   * Timeout para cada tentativa em ms
   * @default 60000 (60 segundos)
   */
  timeoutMs?: number;
}

export interface RetryResult<T> {
  data: T;
  attempts: number;
  totalDuration: number;
}

// ============================================================
// Default Configurations
// ============================================================

const DEFAULT_CONFIG: Required<RetryConfig> = {
  maxAttempts: 3,
  initialDelayMs: 1000,
  backoffMultiplier: 2,
  maxDelayMs: 30000,
  shouldRetry: retryOnAnyError,
  onRetry: () => {},
  timeoutMs: 60000,
};

// ============================================================
// Retry Strategies
// ============================================================

/**
 * Retry em qualquer erro
 */
export function retryOnAnyError(): boolean {
  return true;
}

/**
 * Retry apenas em erros de rede/timeout
 */
export function retryOnNetworkError(error: Error): boolean {
  const message = error.message.toLowerCase();
  return (
    message.includes('network') ||
    message.includes('timeout') ||
    message.includes('econnreset') ||
    message.includes('enotfound') ||
    message.includes('fetch failed') ||
    message.includes('503') ||
    message.includes('502') ||
    message.includes('429') // Rate limit
  );
}

/**
 * Nunca fazer retry (útil para testes)
 */
export function neverRetry(): boolean {
  return false;
}

// ============================================================
// Core Retry Logic
// ============================================================

/**
 * Calcula delay para próxima tentativa usando exponential backoff
 */
function calculateDelay(attempt: number, config: Required<RetryConfig>): number {
  const delay =
    config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt - 1);

  // Adicionar jitter (±20%) para evitar thundering herd
  const jitter = delay * (0.8 + Math.random() * 0.4);

  return Math.min(jitter, config.maxDelayMs);
}

/**
 * Aguarda por um período de tempo
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Adiciona timeout a uma promise
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    ),
  ]);
}

/**
 * Executa operação com retry automático
 *
 * @param operation Função assíncrona a ser executada
 * @param config Configuração de retry
 * @returns Resultado com dados e metadados
 *
 * @example
 * ```typescript
 * const result = await withRetry(
 *   async () => {
 *     const response = await fetch('https://api.example.com/data');
 *     return response.json();
 *   },
 *   {
 *     maxAttempts: 3,
 *     shouldRetry: retryOnNetworkError,
 *     onRetry: (error, attempt) => {
 *       console.log(`Retry ${attempt} após erro:`, error.message);
 *     },
 *   }
 * );
 *
 * console.log(`Sucesso após ${result.attempts} tentativas`);
 * console.log(result.data);
 * ```
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  userConfig: RetryConfig = {}
): Promise<RetryResult<T>> {
  const config = { ...DEFAULT_CONFIG, ...userConfig };
  const startTime = Date.now();

  let lastError: Error | undefined;
  let attempt = 0;

  while (attempt < config.maxAttempts) {
    attempt++;

    try {
      aiLogger.debug(`Executing operation (attempt ${attempt}/${config.maxAttempts})`);

      // Executar com timeout
      const data = await withTimeout(operation(), config.timeoutMs);

      const totalDuration = Date.now() - startTime;

      if (attempt > 1) {
        aiLogger.info('Operation succeeded after retry', {
          attempts: attempt,
          totalDuration,
        });
      }

      return {
        data,
        attempts: attempt,
        totalDuration,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      aiLogger.warn(`Operation failed (attempt ${attempt}/${config.maxAttempts})`, {
        error: lastError.message,
        attempt,
      });

      // Verificar se deve fazer retry
      const shouldRetry = config.shouldRetry(lastError, attempt);

      if (!shouldRetry || attempt >= config.maxAttempts) {
        // Última tentativa ou não deve fazer retry
        break;
      }

      // Calcular delay e aguardar
      const delayMs = calculateDelay(attempt, config);

      aiLogger.debug(`Waiting ${delayMs}ms before retry`, { delayMs, attempt });

      // Callback antes do retry
      config.onRetry(lastError, attempt, delayMs);

      await delay(delayMs);
    }
  }

  // Todas as tentativas falharam
  const totalDuration = Date.now() - startTime;

  aiLogger.error('Operation failed after all retries', {
    attempts: attempt,
    totalDuration,
    error: lastError?.message,
  });

  // Capturar no Sentry
  await captureError(lastError, {
    operation: 'retry_exhausted',
    attempts: attempt,
    totalDuration,
  });

  throw lastError || new Error('Operation failed after all retry attempts');
}

// ============================================================
// Configurações Pré-definidas
// ============================================================

/**
 * Configuração para AI calls (mais agressiva)
 */
export const AI_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 4,
  initialDelayMs: 2000,
  backoffMultiplier: 2,
  maxDelayMs: 30000,
  shouldRetry: retryOnNetworkError,
  timeoutMs: 90000, // 90 segundos
};

/**
 * Configuração para API calls rápidas
 */
export const FAST_API_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelayMs: 500,
  backoffMultiplier: 2,
  maxDelayMs: 5000,
  shouldRetry: retryOnNetworkError,
  timeoutMs: 10000, // 10 segundos
};

/**
 * Configuração para operações críticas (sem retry)
 */
export const NO_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 1,
  shouldRetry: neverRetry,
};

// ============================================================
// Helper Functions
// ============================================================

/**
 * Wrapper conveniente para AI calls com retry automático
 */
export async function withAIRetry<T>(
  operation: () => Promise<T>,
  customConfig?: Partial<RetryConfig>
): Promise<T> {
  const result = await withRetry(operation, {
    ...AI_RETRY_CONFIG,
    ...customConfig,
  });

  return result.data;
}

/**
 * Wrapper conveniente para API calls com retry
 */
export async function withAPIRetry<T>(
  operation: () => Promise<T>,
  customConfig?: Partial<RetryConfig>
): Promise<T> {
  const result = await withRetry(operation, {
    ...FAST_API_RETRY_CONFIG,
    ...customConfig,
  });

  return result.data;
}
