/**
 * Server-Side Session Helpers
 *
 * Utilitários para obter sessão do usuário em server components,
 * API routes, e middleware.
 */

import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';
import { type Session } from 'next-auth';
import { redirect } from 'next/navigation';

// ============================================================
// Session Getters
// ============================================================

/**
 * Obtém sessão atual no servidor
 *
 * Uso em Server Components:
 * ```typescript
 * const session = await getSession();
 * if (!session) {
 *   redirect('/auth/signin');
 * }
 * ```
 */
export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

/**
 * Obtém sessão ou lança erro se não autenticado
 *
 * Uso em Server Components:
 * ```typescript
 * const session = await requireAuth();
 * // Se chegou aqui, usuário está autenticado
 * ```
 */
export async function requireAuth(): Promise<Session> {
  const session = await getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return session;
}

/**
 * Obtém ID do usuário autenticado
 *
 * Uso em Server Components:
 * ```typescript
 * const userId = await getCurrentUserId();
 * if (!userId) {
 *   return <div>Please sign in</div>;
 * }
 * ```
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.id || null;
}

/**
 * Obtém ID do usuário ou lança erro
 *
 * Uso em API Routes:
 * ```typescript
 * const userId = await requireUserId();
 * // Garantido que userId existe
 * ```
 */
export async function requireUserId(): Promise<string> {
  const session = await requireAuth();
  return session.user.id;
}

/**
 * Verifica se usuário está autenticado
 *
 * Uso em Server Components:
 * ```typescript
 * const isAuthenticated = await isAuth();
 * if (isAuthenticated) {
 *   // ...
 * }
 * ```
 */
export async function isAuth(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

// ============================================================
// Type Guards
// ============================================================

/**
 * Type guard para verificar se session existe
 */
export function hasSession(session: Session | null): session is Session {
  return session !== null && !!session.user;
}

// ============================================================
// Error Classes
// ============================================================

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}
