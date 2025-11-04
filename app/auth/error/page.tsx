"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  Configuration: "Erro de configuração do servidor. Entre em contato com o suporte.",
  AccessDenied: "Acesso negado. Você não tem permissão para acessar.",
  Verification: "O token de verificação expirou ou já foi usado.",
  OAuthSignin: "Erro ao iniciar login com o provider.",
  OAuthCallback: "Erro no callback do provider OAuth.",
  OAuthCreateAccount: "Erro ao criar conta com OAuth.",
  EmailCreateAccount: "Erro ao criar conta com email.",
  Callback: "Erro no callback de autenticação.",
  OAuthAccountNotLinked: "Esta conta já existe com outro método de login. Use o método original.",
  EmailSignin: "Erro ao enviar email de verificação.",
  CredentialsSignin: "Credenciais inválidas. Verifique email e senha.",
  SessionRequired: "Você precisa estar autenticado para acessar esta página.",
  Default: "Ocorreu um erro desconhecido. Tente novamente.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">
            Erro de Autenticação
          </h1>

          {/* Error Message */}
          <p className="mb-8 text-center text-sm text-slate-600">
            {errorMessage}
          </p>

          {/* Error Code */}
          {error && (
            <div className="mb-6 rounded-lg bg-slate-100 p-3">
              <p className="text-center text-xs text-slate-500">
                Código do erro: <span className="font-mono">{error}</span>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Tentar Novamente
            </Link>

            <Link
              href="/"
              className="block w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para Início
            </Link>
          </div>

          {/* Help */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              Precisa de ajuda?{" "}
              <Link
                href="/support"
                className="font-medium text-slate-700 underline hover:text-slate-900"
              >
                Entre em contato
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
