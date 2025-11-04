'use client';

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Props para ErrorBoundary
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: unknown[];
}

/**
 * State do ErrorBoundary
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Reutilizável
 *
 * Captura erros em componentes filhos e exibe fallback UI.
 *
 * Uso:
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 *
 * Com fallback customizado:
 * ```tsx
 * <ErrorBoundary
 *   fallback={(error, reset) => (
 *     <div>
 *       <p>Erro: {error.message}</p>
 *       <button onClick={reset}>Tentar novamente</button>
 *     </div>
 *   )}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log do erro
    console.error('ErrorBoundary caught error:', {
      error: error.message,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // Callback customizado
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: Enviar para serviço de monitoramento
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, { extra: errorInfo });
    // }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset error se resetKeys mudarem
    if (
      this.state.hasError &&
      this.props.resetKeys &&
      prevProps.resetKeys &&
      !this.areResetKeysEqual(prevProps.resetKeys, this.props.resetKeys)
    ) {
      this.reset();
    }
  }

  areResetKeysEqual(keysA: unknown[], keysB: unknown[]): boolean {
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key, index) => key === keysB[index]);
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Renderizar fallback customizado se fornecido
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      // Renderizar fallback padrão
      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

/**
 * Fallback UI Padrão
 */
function DefaultErrorFallback({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): JSX.Element {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-6">
      <div className="flex max-w-md flex-col items-center space-y-4 text-center">
        {/* Ícone */}
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>

        {/* Mensagem */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Ocorreu um erro</h3>
          <p className="text-sm text-muted-foreground">
            Algo deu errado ao renderizar este componente.
          </p>
        </div>

        {/* Detalhes (apenas dev) */}
        {isDevelopment && (
          <div className="w-full rounded border border-destructive/20 bg-background p-3 text-left">
            <p className="mb-1 text-xs font-semibold text-destructive">
              Erro (dev only):
            </p>
            <pre className="overflow-x-auto text-xs text-muted-foreground">
              {error.message}
            </pre>
          </div>
        )}

        {/* Botão de reset */}
        <Button onClick={reset} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar Novamente
        </Button>
      </div>
    </div>
  );
}

/**
 * Hook para resetar error boundary programaticamente
 */
export function useErrorHandler(): {
  showBoundary: (error: Error) => void;
} {
  const [, setError] = React.useState<Error>();

  return {
    showBoundary: React.useCallback((error: Error) => {
      setError(() => {
        throw error;
      });
    }, []),
  };
}

/**
 * HOC para envolver componente com ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
): React.ComponentType<P> {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}
