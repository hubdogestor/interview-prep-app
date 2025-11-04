'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

/**
 * Error Boundary Global da Aplicação
 *
 * Captura erros não tratados em componentes React e exibe
 * uma interface amigável ao usuário.
 *
 * Next.js App Router requirement: deve ser 'use client'
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro para debugging
    console.error('Application error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    // TODO: Enviar para serviço de monitoramento (Sentry, LogRocket, etc.)
    // if (window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Ícone de erro */}
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        {/* Mensagem principal */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Algo deu errado!
          </h1>
          <p className="text-sm text-muted-foreground">
            Ocorreu um erro inesperado. Tente recarregar a página ou entre em
            contato com o suporte se o problema persistir.
          </p>
        </div>

        {/* Detalhes do erro (apenas em desenvolvimento) */}
        {isDevelopment && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-left">
            <p className="mb-2 text-xs font-semibold text-destructive">
              Detalhes do Erro (apenas em desenvolvimento):
            </p>
            <pre className="overflow-x-auto text-xs text-muted-foreground">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Ações */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} size="lg">
            Tentar Novamente
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = '/')}
          >
            Voltar ao Início
          </Button>
        </div>

        {/* Informações adicionais */}
        <p className="text-xs text-muted-foreground">
          Se o problema persistir, tente limpar o cache do navegador ou entre
          em contato com o suporte.
        </p>
      </div>
    </div>
  );
}
