/**
 * Sistema de Logging Estruturado
 *
 * Logger simples e eficaz baseado em console com suporte a:
 * - Níveis de log (debug, info, warn, error)
 * - Contexto estruturado
 * - Timestamps
 * - Formatação colorida (desenvolvimento)
 * - JSON estruturado (produção)
 *
 * Uso:
 * ```typescript
 * import { logger } from '@/lib/logger';
 *
 * logger.info('User logged in', { userId: '123', ip: '127.0.0.1' });
 * logger.error('Database connection failed', { error: err, database: 'main' });
 * ```
 */

// Tipos
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  [key: string]: unknown;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: Error;
}

// Configuração
const LOG_LEVEL = (process.env.LOG_LEVEL as LogLevel) || 'info';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Níveis de log e suas prioridades
const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Cores para desenvolvimento (ANSI)
const COLORS = {
  debug: '\x1b[36m', // Cyan
  info: '\x1b[32m',  // Green
  warn: '\x1b[33m',  // Yellow
  error: '\x1b[31m', // Red
  reset: '\x1b[0m',
};

// Ícones para cada nível
const ICONS = {
  debug: '🔍',
  info: 'ℹ️',
  warn: '⚠️',
  error: '❌',
};

/**
 * Verifica se um nível de log deve ser exibido
 */
function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[LOG_LEVEL];
}

/**
 * Formata uma entrada de log para desenvolvimento
 */
function formatForDevelopment(entry: LogEntry): string {
  const color = COLORS[entry.level];
  const icon = ICONS[entry.level];
  const reset = COLORS.reset;

  let output = `${color}${icon} [${entry.level.toUpperCase()}]${reset} ${entry.timestamp} - ${entry.message}`;

  if (entry.context && Object.keys(entry.context).length > 0) {
    output += `\n  ${color}Context:${reset} ${JSON.stringify(entry.context, null, 2)}`;
  }

  if (entry.error) {
    output += `\n  ${COLORS.error}Error:${reset} ${entry.error.message}`;
    if (entry.error.stack) {
      output += `\n  ${COLORS.error}Stack:${reset}\n${entry.error.stack}`;
    }
  }

  return output;
}

/**
 * Formata uma entrada de log para produção (JSON)
 */
function formatForProduction(entry: LogEntry): string {
  const output: Record<string, unknown> = {
    level: entry.level,
    message: entry.message,
    timestamp: entry.timestamp,
  };

  if (entry.context) {
    output.context = entry.context;
  }

  if (entry.error) {
    output.error = {
      message: entry.error.message,
      name: entry.error.name,
      stack: entry.error.stack,
    };
  }

  return JSON.stringify(output);
}

/**
 * Cria uma entrada de log
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  contextOrError?: LogContext | Error
): LogEntry {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
  };

  if (contextOrError) {
    if (contextOrError instanceof Error) {
      entry.error = contextOrError;
    } else {
      entry.context = contextOrError;
    }
  }

  return entry;
}

/**
 * Registra uma entrada de log
 */
function log(entry: LogEntry): void {
  if (!shouldLog(entry.level)) {
    return;
  }

  const formatted = IS_PRODUCTION
    ? formatForProduction(entry)
    : formatForDevelopment(entry);

  // Escolher método console apropriado
  switch (entry.level) {
    case 'debug':
      console.debug(formatted);
      break;
    case 'info':
      console.info(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    case 'error':
      console.error(formatted);
      break;
  }
}

/**
 * Logger principal
 */
export const logger = {
  /**
   * Log de debug (desenvolvimento apenas)
   */
  debug(message: string, context?: LogContext): void {
    log(createLogEntry('debug', message, context));
  },

  /**
   * Log de informação
   */
  info(message: string, context?: LogContext): void {
    log(createLogEntry('info', message, context));
  },

  /**
   * Log de aviso
   */
  warn(message: string, context?: LogContext): void {
    log(createLogEntry('warn', message, context));
  },

  /**
   * Log de erro
   */
  error(message: string, errorOrContext?: Error | LogContext): void {
    log(createLogEntry('error', message, errorOrContext));
  },

  /**
   * Cria um logger child com contexto padrão
   */
  child(defaultContext: LogContext) {
    return {
      debug: (message: string, context?: LogContext) =>
        logger.debug(message, { ...defaultContext, ...context }),
      info: (message: string, context?: LogContext) =>
        logger.info(message, { ...defaultContext, ...context }),
      warn: (message: string, context?: LogContext) =>
        logger.warn(message, { ...defaultContext, ...context }),
      error: (message: string, errorOrContext?: Error | LogContext) => {
        if (errorOrContext instanceof Error) {
          logger.error(message, errorOrContext);
        } else {
          logger.error(message, { ...defaultContext, ...errorOrContext });
        }
      },
    };
  },
};

/**
 * Logger específico para API requests
 */
export const apiLogger = logger.child({ component: 'api' });

/**
 * Logger específico para AI operations
 */
export const aiLogger = logger.child({ component: 'ai' });

/**
 * Logger específico para Database operations
 */
export const dbLogger = logger.child({ component: 'database' });

/**
 * Helper para medir tempo de execução
 */
export function measureTime() {
  const start = Date.now();

  return {
    end: (label: string, context?: LogContext) => {
      const duration = Date.now() - start;
      logger.debug(`⏱️  ${label}`, { ...context, durationMs: duration });
      return duration;
    },
  };
}

/**
 * Middleware para capturar erros não tratados
 */
export function setupErrorHandlers(): void {
  if (typeof process !== 'undefined') {
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught exception', error);
      // Em produção, você pode querer enviar para um serviço de monitoramento
      process.exit(1);
    });

    process.on('unhandledRejection', (reason: unknown) => {
      const error = reason instanceof Error ? reason : new Error(String(reason));
      logger.error('Unhandled promise rejection', error);
    });
  }
}
