/**
 * NextAuth.js API Route Handler
 *
 * Rota dinâmica que lida com todas as requisições de autenticação.
 * Todas as rotas /api/auth/* são gerenciadas automaticamente pelo NextAuth.
 *
 * Rotas disponíveis:
 * - GET  /api/auth/signin - Página de sign in
 * - POST /api/auth/signin/:provider - Iniciar OAuth
 * - GET  /api/auth/callback/:provider - Callback OAuth
 * - POST /api/auth/signout - Sign out
 * - GET  /api/auth/session - Obter sessão atual
 * - GET  /api/auth/csrf - Obter CSRF token
 * - GET  /api/auth/providers - Listar providers disponíveis
 */

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
