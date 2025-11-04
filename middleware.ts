/**
 * Next.js Middleware - Authentication & Route Protection
 *
 * Middleware executado em TODAS as rotas antes do processamento.
 * Usado para proteger rotas e redirecionar usuários não autenticados.
 *
 * IMPORTANTE: Middleware roda no Edge Runtime, então nem todas as APIs
 * Node.js estão disponíveis aqui.
 */

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================================
// Protected Routes Configuration
// ============================================================

/**
 * Rotas que requerem autenticação
 */
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/icebreakers',
  '/speeches',
  '/competencias',
  '/experiencias',
  '/questions',
  '/practice',
  '/settings',
];

/**
 * Rotas públicas (não requerem autenticação)
 */
const PUBLIC_ROUTES = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/auth/signout',
  '/auth/error',
  '/auth/verify-request',
];

// ============================================================
// Middleware
// ============================================================

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Log de acesso (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Middleware] ${req.method} ${pathname}`);
    }

    // Permitir acesso a rotas públicas
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }

    // Verificar se é rota protegida
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtectedRoute && !req.nextauth.token) {
      // Redirecionar para sign in se não autenticado
      const signInUrl = new URL('/auth/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Se usuário está autenticado e tenta acessar página de auth, redirecionar para dashboard
    if (
      req.nextauth.token &&
      (pathname === '/auth/signin' || pathname === '/auth/signup')
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Autorização customizada
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Rotas públicas sempre autorizadas
        if (PUBLIC_ROUTES.includes(pathname)) {
          return true;
        }

        // APIs públicas (não requerem auth)
        if (pathname.startsWith('/api/public')) {
          return true;
        }

        // Rotas protegidas requerem token
        const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
          pathname.startsWith(route)
        );

        if (isProtectedRoute) {
          return !!token;
        }

        // Por padrão, autorizar
        return true;
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

// ============================================================
// Matcher Configuration
// ============================================================

/**
 * Configuração do matcher - define quais rotas o middleware deve processar
 *
 * NOTA: Middleware não roda em:
 * - /api/auth/* (NextAuth rotas)
 * - /_next/* (Next.js internals)
 * - /static/* (arquivos estáticos)
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
