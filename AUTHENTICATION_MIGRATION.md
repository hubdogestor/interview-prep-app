# Guia de Migração - Autenticação Multi-Usuário

Este documento descreve como migrar a aplicação de single-user para multi-user com autenticação completa.

## ✅ Fase 3 - Implementado

### Infraestrutura de Autenticação

- ✅ **Prisma Schema** - Modelos User, Account, Session, VerificationToken
- ✅ **NextAuth.js** - Configuração completa com múltiplos providers (Google, GitHub, Credentials)
- ✅ **Middleware** - Proteção de rotas automatizada
- ✅ **tRPC Context** - Sessão do usuário disponível em todos os endpoints
- ✅ **Protected Procedure** - Novo tipo de procedimento que requer autenticação
- ✅ **Authorization Helpers** - Funções para verificar ownership e permissões
- ✅ **Collaboration Router** - API completa para compartilhamento e comentários

### Modelos de Dados

Todos os modelos principais agora incluem `userId`:
- ✅ Profile
- ✅ Icebreaker
- ✅ Speech
- ✅ Competencia
- ✅ Experiencia
- ✅ Question
- ✅ PracticeSession

### Colaboração

- ✅ **SharedItem** - Sistema de compartilhamento com permissões granulares
- ✅ **Comment** - Sistema de comentários com threads e resolução

---

## 🔄 Migração Necessária

### 1. Migração do Banco de Dados

```bash
# 1. Gerar cliente Prisma com novos modelos
npx prisma generate

# 2. Criar migração (MongoDB não usa migrations, mas é bom documentar)
# Os novos campos userId serão adicionados aos documentos existentes

# 3. IMPORTANTE: Executar script de migração de dados
# Este script precisa ser criado para:
# - Criar um usuário "default" para dados existentes
# - Associar todos os registros existentes a este usuário
```

**Script de Migração de Dados** (`scripts/migrate-to-multiuser.ts`):

```typescript
import { prisma } from '@/server/db';

async function migrateToMultiUser() {
  console.log('🔄 Iniciando migração para multi-user...');

  // 1. Criar usuário default para dados existentes
  const defaultUser = await prisma.user.upsert({
    where: { email: 'default@local.app' },
    update: {},
    create: {
      email: 'default@local.app',
      name: 'Default User',
    },
  });

  console.log(`✅ Usuário default criado: ${defaultUser.id}`);

  // 2. Atualizar Profile
  const profilesUpdated = await prisma.profile.updateMany({
    where: { userId: { equals: null } },
    data: { userId: defaultUser.id },
  });
  console.log(`✅ ${profilesUpdated.count} profiles atualizados`);

  // 3. Atualizar Icebreakers
  const icebreakersUpdated = await prisma.icebreaker.updateMany({
    where: { userId: { equals: null } },
    data: { userId: defaultUser.id },
  });
  console.log(`✅ ${icebreakersUpdated.count} icebreakers atualizados`);

  // 4. Atualizar Speeches
  const speechesUpdated = await prisma.speech.updateMany({
    where: { userId: { equals: null } },
    data: { userId: defaultUser.id },
  });
  console.log(`✅ ${speechesUpdated.count} speeches atualizados`);

  // 5. Atualizar Competencias
  const competenciasUpdated = await prisma.competencia.updateMany({
    where: { userId: { equals: null } },
    data: { userId: defaultUser.id },
  });
  console.log(`✅ ${competenciasUpdated.count} competencias atualizadas`);

  // 6. Atualizar Experiencias
  const experienciasUpdated = await prisma.experiencia.updateMany({
    where: { userId: { equals: null } },
    data: { userId: defaultUser.id },
  });
  console.log(`✅ ${experienciasUpdated.count} experiencias atualizadas`);

  // 7. Atualizar Questions
  const questionsUpdated = await prisma.question.updateMany({
    where: { userId: { equals: null } },
    data: { userId: defaultUser.id },
  });
  console.log(`✅ ${questionsUpdated.count} questions atualizadas`);

  // 8. Atualizar PracticeSessions
  const practiceUpdated = await prisma.practiceSession.updateMany({
    where: { userId: { equals: null } },
    data: { userId: defaultUser.id },
  });
  console.log(`✅ ${practiceUpdated.count} practice sessions atualizadas`);

  console.log('✨ Migração concluída com sucesso!');
}

// Executar migração
migrateToMultiUser()
  .catch((e) => {
    console.error('❌ Erro na migração:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
```

### 2. Atualizar Routers

Cada router existente precisa ser atualizado para:
1. Usar `protectedProcedure` ao invés de `publicProcedure`
2. Filtrar dados por `userId` do contexto
3. Verificar ownership antes de update/delete

**Exemplo - Icebreakers Router:**

```typescript
// ANTES
list: publicProcedure
  .input(z.object({ ... }).optional())
  .query(async ({ ctx, input }) => {
    const icebreakers = await ctx.prisma.icebreaker.findMany({
      where: { archived: false },
      // ...
    });
  });

// DEPOIS
list: protectedProcedure
  .input(z.object({ ... }).optional())
  .query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const icebreakers = await ctx.prisma.icebreaker.findMany({
      where: {
        userId,  // ⭐ Filtrar por userId
        archived: false
      },
      // ...
    });
  });

// ANTES
update: publicProcedure
  .input(z.object({ id: z.string(), ... }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.icebreaker.update({
      where: { id: input.id },
      data: { ... },
    });
  });

// DEPOIS
update: protectedProcedure
  .input(z.object({ id: z.string(), ... }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    // ⭐ Verificar ownership
    await assertOwnership('icebreaker', input.id, userId);

    return await ctx.prisma.icebreaker.update({
      where: { id: input.id },
      data: { ... },
    });
  });
```

**Routers que precisam ser atualizados:**
- [ ] `/server/api/routers/icebreakers.ts`
- [ ] `/server/api/routers/speeches.ts`
- [ ] `/server/api/routers/competencias.ts`
- [ ] `/server/api/routers/experiencias.ts`
- [ ] `/server/api/routers/questions.ts`
- [ ] `/server/api/routers/profile.ts`
- [ ] `/server/api/routers/dashboard.ts`
- [ ] `/server/api/routers/practice.ts`

### 3. Atualizar Frontend

#### 3.1. Adicionar SessionProvider

`app/layout.tsx`:
```typescript
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

#### 3.2. Criar Páginas de Auth

Criar as seguintes páginas:
- `app/auth/signin/page.tsx` - Página de login
- `app/auth/signup/page.tsx` - Página de cadastro
- `app/auth/signout/page.tsx` - Confirmação de logout
- `app/auth/error/page.tsx` - Página de erro de auth
- `app/onboarding/page.tsx` - Onboarding para novos usuários

#### 3.3. Componentes de Auth

Criar componentes:
- `components/auth/SignInButton.tsx`
- `components/auth/SignOutButton.tsx`
- `components/auth/UserMenu.tsx`
- `components/auth/ProtectedRoute.tsx`

#### 3.4. Hooks Customizados

```typescript
// hooks/use-current-user.ts
import { useSession } from 'next-auth/react';

export function useCurrentUser() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}
```

### 4. Variáveis de Ambiente

Adicionar no `.env.local`:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (opcional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### 5. Instalar Dependências

```bash
npm install next-auth @next-auth/prisma-adapter
```

---

## 📋 Checklist de Migração

### Pré-requisitos
- [ ] Backup do banco de dados
- [ ] Instalar dependências (`next-auth`, `@next-auth/prisma-adapter`)
- [ ] Configurar variáveis de ambiente

### Backend
- [ ] Executar `npx prisma generate`
- [ ] Executar script de migração de dados
- [ ] Atualizar todos os routers para usar `protectedProcedure`
- [ ] Adicionar filtros por `userId` em todas as queries
- [ ] Adicionar verificações de ownership em updates/deletes

### Frontend
- [ ] Adicionar `SessionProvider` no layout root
- [ ] Criar páginas de autenticação
- [ ] Criar componentes de auth (SignIn, SignOut, UserMenu)
- [ ] Atualizar navegação para incluir auth status
- [ ] Adicionar proteção de rotas no client-side

### Testes
- [ ] Testar login com Google OAuth
- [ ] Testar login com GitHub OAuth
- [ ] Testar login com Credentials (dev only)
- [ ] Testar criação de novos recursos (devem ser associados ao user correto)
- [ ] Testar listagem (deve mostrar apenas recursos do usuário)
- [ ] Testar compartilhamento de recursos
- [ ] Testar comentários
- [ ] Testar logout

---

## 🔐 Recursos de Colaboração

### Compartilhar Recurso

```typescript
// Compartilhar com usuários específicos
const result = await trpc.collaboration.share.mutate({
  resourceType: 'icebreaker',
  resourceId: 'abc123',
  shareWith: ['user@example.com'],
  permission: 'edit',
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
});

// Criar link público
const { shareToken } = await trpc.collaboration.createPublicLink.mutate({
  resourceType: 'speech',
  resourceId: 'xyz789',
  permission: 'view',
});

// Link: https://app.com/shared/{shareToken}
```

### Comentários

```typescript
// Criar comentário
const comment = await trpc.collaboration.createComment.mutate({
  resourceType: 'competencia',
  resourceId: 'comp123',
  content: 'Great skill! You should add more examples.',
});

// Listar comentários
const comments = await trpc.collaboration.listComments.query({
  resourceType: 'competencia',
  resourceId: 'comp123',
});

// Responder a comentário (thread)
const reply = await trpc.collaboration.createComment.mutate({
  resourceType: 'competencia',
  resourceId: 'comp123',
  content: 'Thanks for the feedback!',
  parentId: comment.id,
});
```

---

## 🚀 Deployment

### Produção

1. **Configurar OAuth Apps** no Google e GitHub
2. **Adicionar variáveis de ambiente** no Vercel/produção
3. **Executar migração de dados** ANTES de deploy
4. **Testar autenticação** em staging antes de produção

### Rollback

Se necessário reverter:
1. Remover middleware.ts temporariamente
2. Usar procedimentos públicos novamente
3. Dados de usuário permanecem intactos

---

## 📚 Referências

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- [tRPC Protected Procedures](https://trpc.io/docs/server/middlewares)
