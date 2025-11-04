/**
 * Sentry Configuration - Error Tracking & Monitoring
 *
 * Configuração centralizada do Sentry para tracking de erros
 * e monitoramento de performance.
 *
 * Setup:
 * 1. npm install @sentry/nextjs
 * 2. Adicionar NEXT_PUBLIC_SENTRY_DSN no .env.local
 * 3. Importar em _app.tsx ou layout.tsx
 */

/**
 * Inicializa o Sentry (client-side)
 *
 * Uso:
 * ```typescript
 * import { initSentry } from '@/lib/monitoring/sentry';
 *
 * // Em _app.tsx ou layout.tsx
 * if (typeof window !== 'undefined') {
 *   initSentry();
 * }
 * ```
 */
export function initSentry() {
  const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const ENVIRONMENT = process.env.NODE_ENV;

  // Não inicializar em desenvolvimento sem DSN
  if (!DSN && ENVIRONMENT === 'development') {
    console.info('⚠️  Sentry DSN not configured. Error tracking disabled.');
    return;
  }

  if (!DSN) {
    console.warn('⚠️  NEXT_PUBLIC_SENTRY_DSN not set. Error tracking disabled.');
    return;
  }

  try {
    // Lazy import para evitar aumentar bundle size
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.init({
        dsn: DSN,
        environment: ENVIRONMENT,

        // Performance Monitoring
        tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0,

        // Session Replay
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,

        // Configurações
        beforeSend(event, hint) {
          // Filtrar erros conhecidos não-críticos
          if (event.exception) {
            const error = hint.originalException;

            // Ignorar erros de rede
            if (error && typeof error === 'object' && 'message' in error) {
              const message = String(error.message).toLowerCase();
              if (
                message.includes('network') ||
                message.includes('fetch') ||
                message.includes('timeout')
              ) {
                return null; // Não enviar para Sentry
              }
            }
          }

          return event;
        },

        // Ignore breadcrumbs de console em produção
        beforeBreadcrumb(breadcrumb) {
          if (
            ENVIRONMENT === 'production' &&
            breadcrumb.category === 'console'
          ) {
            return null;
          }
          return breadcrumb;
        },

        integrations: function (integrations) {
          // Browser Tracing
          integrations.push(
            new (Sentry as any).BrowserTracing({
              tracePropagationTargets: ['localhost', /^\//],
            })
          );

          // Session Replay
          if (ENVIRONMENT === 'production') {
            integrations.push(
              new (Sentry as any).Replay({
                maskAllText: true,
                blockAllMedia: true,
              })
            );
          }

          return integrations;
        },
      });

      console.info('✅ Sentry initialized');
    });
  } catch (error) {
    console.error('❌ Failed to initialize Sentry:', error);
  }
}

/**
 * Captura erro manualmente no Sentry
 *
 * Uso:
 * ```typescript
 * try {
 *   // código
 * } catch (error) {
 *   captureError(error, { context: 'AI Generation', userId: '123' });
 * }
 * ```
 */
export async function captureError(
  error: Error | unknown,
  context?: Record<string, unknown>
) {
  try {
    const Sentry = await import('@sentry/nextjs');

    if (context) {
      Sentry.setContext('custom', context);
    }

    if (error instanceof Error) {
      Sentry.captureException(error);
    } else {
      Sentry.captureException(new Error(String(error)));
    }
  } catch (e) {
    // Fallback para console se Sentry falhar
    console.error('Failed to capture error in Sentry:', error);
  }
}

/**
 * Captura mensagem no Sentry
 */
export async function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context?: Record<string, unknown>
) {
  try {
    const Sentry = await import('@sentry/nextjs');

    if (context) {
      Sentry.setContext('custom', context);
    }

    Sentry.captureMessage(message, level);
  } catch (e) {
    console.error('Failed to capture message in Sentry:', message);
  }
}

/**
 * Set user context para Sentry
 */
export async function setUser(user: {
  id: string;
  email?: string;
  username?: string;
}) {
  try {
    const Sentry = await import('@sentry/nextjs');
    Sentry.setUser(user);
  } catch (e) {
    console.error('Failed to set user in Sentry');
  }
}

/**
 * Clear user context
 */
export async function clearUser() {
  try {
    const Sentry = await import('@sentry/nextjs');
    Sentry.setUser(null);
  } catch (e) {
    console.error('Failed to clear user in Sentry');
  }
}

/**
 * Adiciona breadcrumb para debugging
 */
export async function addBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, unknown>
) {
  try {
    const Sentry = await import('@sentry/nextjs');
    Sentry.addBreadcrumb({
      message,
      category,
      data,
      level: 'info',
    });
  } catch (e) {
    // Silent fail
  }
}

/**
 * Mede performance de operação
 */
export async function measurePerformance<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  const start = Date.now();

  try {
    const result = await operation();
    const duration = Date.now() - start;

    // Adicionar breadcrumb de performance
    await addBreadcrumb(`${name} completed`, 'performance', {
      duration,
    });

    return result;
  } catch (error) {
    const duration = Date.now() - start;

    await captureError(error, {
      operation: name,
      duration,
    });

    throw error;
  }
}
