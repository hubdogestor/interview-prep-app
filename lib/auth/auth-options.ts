/**
 * NextAuth.js Configuration
 *
 * Configuração centralizada do NextAuth para autenticação multi-provider
 * com suporte a Google, GitHub, e credenciais.
 *
 * Setup:
 * 1. npm install next-auth @next-auth/prisma-adapter
 * 2. Adicionar variáveis no .env:
 *    - NEXTAUTH_URL=http://localhost:3000
 *    - NEXTAUTH_SECRET=your-secret-here
 *    - GOOGLE_CLIENT_ID=your-google-client-id
 *    - GOOGLE_CLIENT_SECRET=your-google-client-secret
 *    - GITHUB_ID=your-github-client-id
 *    - GITHUB_SECRET=your-github-client-secret
 */

import { type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/server/db';
import { logger } from '@/lib/logger';

// ============================================================
// NextAuth Configuration
// ============================================================

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  // Provedores de autenticação
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),

    // Credenciais (para desenvolvimento/testes)
    // NOTA: Em produção, considere desabilitar ou usar bcrypt para senhas
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Em produção, verificar senha com bcrypt
        // Por enquanto, apenas para desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          // Buscar ou criar usuário
          let user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split('@')[0],
              },
            });
          }

          return user;
        }

        return null;
      },
    }),
  ],

  // Configurações de sessão
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },

  // Páginas customizadas
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/onboarding', // Redireciona novos usuários para onboarding
  },

  // Callbacks
  callbacks: {
    // JWT Callback - adiciona dados do usuário ao token
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      // Adicionar provider ao token (útil para tracking)
      if (account) {
        token.provider = account.provider;
      }

      return token;
    },

    // Session Callback - adiciona dados do token à sessão
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }

      return session;
    },

    // Redirect Callback - controla redirecionamentos pós-login
    async redirect({ url, baseUrl }) {
      // Permitir redirecionamento relativo
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }

      // Permitir redirecionamento para mesma origem
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },

    // SignIn Callback - controle adicional de acesso
    async signIn({ user, account, profile }) {
      // Verificar se email está verificado (Google/GitHub)
      if (account?.provider === 'google' || account?.provider === 'github') {
        const email = user.email;

        if (!email) {
          logger.warn('User attempted sign in without email', {
            provider: account.provider,
          });
          return false;
        }

        // Aqui você pode adicionar lógica de whitelist/blacklist
        // Por exemplo: apenas permitir emails de domínios específicos
        // if (!email.endsWith('@empresa.com')) {
        //   return false;
        // }
      }

      return true;
    },
  },

  // Eventos - para logging e analytics
  events: {
    async signIn({ user, account }) {
      logger.info('User signed in', {
        userId: user.id,
        email: user.email,
        provider: account?.provider,
      });
    },

    async signOut({ token }) {
      logger.info('User signed out', {
        userId: token?.id,
      });
    },

    async createUser({ user }) {
      logger.info('New user created', {
        userId: user.id,
        email: user.email,
      });

      // Aqui você pode enviar welcome email, criar profile inicial, etc.
    },
  },

  // Debug mode (apenas em desenvolvimento)
  debug: process.env.NODE_ENV === 'development',

  // Secret para JWT
  secret: process.env.NEXTAUTH_SECRET,
};

// ============================================================
// Type Augmentation - Adiciona tipagem ao NextAuth
// ============================================================

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    provider?: string;
  }
}
