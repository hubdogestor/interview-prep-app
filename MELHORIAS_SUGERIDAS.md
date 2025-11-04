# Sugestões de Melhorias e Evoluções - Interview Prep App

## ✅ Status da Implementação

### Fase 1 - Crítico (CONCLUÍDA)
- ✅ Segurança: Input sanitization e proteção contra prompt injection
- ✅ Type Safety: Eliminação de todos os 'as any'
- ✅ Validação: Safe JSON parsing e validação de respostas IA
- ✅ Error Handling: Error boundaries e tratamento robusto
- ✅ Performance: Paginação cursor-based em todos os endpoints
- ✅ Database: 25+ índices estratégicos otimizados

### Fase 2 - Qualidade (CONCLUÍDA)
- ✅ State Management: Zustand stores (UI, Preferences, Selection)
- ✅ Testing: Suite completa com Vitest (51+ casos de teste)
- ✅ Monitoring: Integração Sentry para error tracking
- ✅ Resilience: Retry logic com exponential backoff
- ✅ Logging: Sistema de logging estruturado

### Fase 3 - Autenticação & Colaboração (CONCLUÍDA)
- ✅ NextAuth.js: Multi-provider authentication (Google, GitHub, Credentials)
- ✅ Authorization: Sistema completo de permissões e ownership
- ✅ Collaboration: Compartilhamento de recursos com permissões granulares
- ✅ Comments: Sistema de comentários com threads
- ✅ Middleware: Proteção automática de rotas
- ✅ Database: Schema atualizado com User, Account, Session, SharedItem, Comment

**⚠️ MIGRAÇÃO NECESSÁRIA:** Consulte `AUTHENTICATION_MIGRATION.md` para guia completo de migração para multi-user.

---

## 📊 Resumo Executivo

Esta aplicação de preparação para entrevistas está **bem arquitetada com fundamentos sólidos** e agora conta com segurança, testes, e autenticação completa.

**Stack Tecnológica:**
- Next.js 14 (App Router)
- tRPC para API type-safe
- Prisma + MongoDB
- Google Gemini AI
- React Query para cache
- Radix UI + Tailwind CSS

**Métricas do Projeto:**
- 217 arquivos TypeScript/TSX
- 149 componentes React
- 9 routers tRPC
- 7 modelos Prisma
- 0 testes (⚠️ crítico)

---

## 🔴 Melhorias Críticas (Prioridade Máxima)

### 1. Segurança - Proteção contra Prompt Injection

**Problema:** Entrada do usuário é interpolada diretamente nos prompts da IA
```typescript
// lib/ai/gemini.ts
const prompt = `...${orientacoesCustomizadas}...`; // ❌ Vulnerável
```

**Solução:**
```typescript
function sanitizeUserInput(input: string, maxLength = 500): string {
  return input
    .substring(0, maxLength)
    .replace(/[<>{}[\]]/g, '') // Remove caracteres perigosos
    .trim();
}

const prompt = `...${sanitizeUserInput(orientacoesCustomizadas)}...`;
```

**Impacto:** ALTO - Previne manipulação do comportamento da IA
**Esforço:** 2-3 horas

---

### 2. Type Safety - Eliminar Asserções `as any`

**Problema:** 25+ ocorrências de `as any` quebram a segurança de tipos

**Localizações:**
- `server/api/routers/icebreakers.ts:55`
- `server/api/routers/experiencias.ts:86`
- `server/api/routers/speeches.ts:59`
- E mais 22 localizações

**Solução:** Criar tipos TypeScript adequados para campos JSON do Prisma

```typescript
// types/prisma-json.ts
export interface BilingualContent {
  pt: string;
  en: string;
}

export interface IcebreakerVersion {
  nome: string;
  conteudo: BilingualContent;
  duracao: number;
  tags: string[];
}

// Usar em vez de 'as any'
versoes: input.versoes as IcebreakerVersion[]
```

**Impacto:** ALTO - Restaura segurança de tipos do TypeScript
**Esforço:** 1-2 dias

---

### 3. Validação de Respostas da IA

**Problema:** JSON parsing sem validação ou try/catch
```typescript
// lib/ai/gemini.ts
const result = JSON.parse(jsonText); // ❌ Pode crashar
```

**Solução:**
```typescript
import { z } from 'zod';

const IcebreakerSchema = z.object({
  versoes: z.array(z.object({
    nome: z.string(),
    conteudo: z.object({
      pt: z.string(),
      en: z.string()
    }),
    duracao: z.number(),
    tags: z.array(z.string())
  }))
});

function parseAIResponse<T>(text: string, schema: z.ZodSchema<T>): T {
  try {
    const jsonText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    const parsed = JSON.parse(jsonText);
    return schema.parse(parsed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Resposta inválida da IA: ${error.message}`);
    }
    throw new Error('Erro ao processar resposta da IA');
  }
}
```

**Impacto:** ALTO - Previne crashes por resposta malformada
**Esforço:** 1 dia

---

### 4. Error Boundary

**Problema:** Sem error boundary - um erro de componente derruba a aplicação

**Solução:** Criar error boundary global
```typescript
// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
    // TODO: Enviar para serviço de logging (Sentry)
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Algo deu errado!</h2>
      <p className="text-muted-foreground mt-2">
        {error.message || 'Ocorreu um erro inesperado'}
      </p>
      <button
        onClick={reset}
        className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Tentar novamente
      </button>
    </div>
  );
}
```

**Impacto:** ALTO - Melhora experiência do usuário em erros
**Esforço:** 2-3 horas

---

### 5. Rate Limiting HTTP

**Problema:** Endpoints tRPC desprotegidos - apenas Gemini API tem rate limit

**Solução:** Adicionar middleware de rate limiting
```typescript
// lib/rate-limit.ts
import { TRPCError } from '@trpc/server';

const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests = 100,
  windowMs = 60000
): void {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetAt) {
    requestCounts.set(identifier, {
      count: 1,
      resetAt: now + windowMs
    });
    return;
  }

  if (record.count >= maxRequests) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: 'Muitas requisições. Tente novamente em alguns segundos.'
    });
  }

  record.count++;
}

// Usar em routers:
create: publicProcedure
  .input(createSchema)
  .mutation(async ({ ctx, input }) => {
    checkRateLimit(ctx.headers.get('x-forwarded-for') || 'unknown');
    // ...
  })
```

**Impacto:** MÉDIO - Previne abuso da API
**Esforço:** 4-6 horas

---

## 🟡 Melhorias de Alta Prioridade

### 6. Paginação em Endpoints de Lista

**Problema:** Todos os endpoints `findMany` retornam TODOS os registros

**Localizações afetadas:**
- `dashboard.overview()` - 6 queries sem limite
- `icebreakers.list()`
- `speeches.list()`
- `competencias.list()`
- `experiencias.list()`
- `questions.list()`

**Solução:**
```typescript
// server/api/routers/icebreakers.ts
list: publicProcedure
  .input(z.object({
    limit: z.number().min(1).max(100).default(20),
    cursor: z.string().optional(),
    filter: z.enum(['all', 'favorites', 'archived']).default('all')
  }))
  .query(async ({ ctx, input }) => {
    const where: Prisma.IcebreakerWhereInput = {};

    if (input.filter === 'favorites') {
      where.favorite = true;
    } else if (input.filter === 'archived') {
      where.archived = true;
    } else {
      where.archived = false;
    }

    const items = await ctx.prisma.icebreaker.findMany({
      take: input.limit + 1,
      where,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      orderBy: { updatedAt: 'desc' }
    });

    let nextCursor: string | undefined = undefined;
    if (items.length > input.limit) {
      const nextItem = items.pop();
      nextCursor = nextItem?.id;
    }

    return {
      items,
      nextCursor
    };
  })
```

**Impacto:** ALTO - Melhora performance com muitos dados
**Esforço:** 2-3 dias (todos os endpoints)

---

### 7. Otimização de Queries do Dashboard

**Problema:** Dashboard carrega TODOS os campos de TODOS os registros

**Solução:**
```typescript
// server/api/routers/dashboard.ts
overview: publicProcedure.query(async ({ ctx }) => {
  const [profile, stats] = await Promise.all([
    ctx.prisma.profile.findFirst({
      select: { nome: true, titulo: true, anosExperiencia: true }
    }),
    // Contar em vez de carregar tudo
    ctx.prisma.$transaction([
      ctx.prisma.competencia.count(),
      ctx.prisma.experiencia.count(),
      ctx.prisma.speech.count(),
      ctx.prisma.question.count(),
      ctx.prisma.icebreaker.count(),
    ])
  ]);

  const [competenciasCount, experienciasCount, speechesCount, questionsCount, icebreakersCount] = stats;

  return {
    profile,
    stats: {
      competencias: competenciasCount,
      experiencias: experienciasCount,
      speeches: speechesCount,
      questions: questionsCount,
      icebreakers: icebreakersCount
    }
  };
});
```

**Impacto:** MÉDIO - Reduz tamanho de resposta em 80-90%
**Esforço:** 1 dia

---

### 8. File I/O Assíncrono

**Problema:** `loadContextFiles()` usa operações síncronas que bloqueiam event loop

**Solução:**
```typescript
// lib/ai/gemini.ts
import { promises as fs } from 'fs';

async function loadContextFiles(): Promise<string> {
  const contextDir = path.join(process.cwd(), "context-files");
  let contextData = "";

  const files = ["cv.md", "playbook.md", "experiencias.md", "competencias.md"];

  for (const file of files) {
    try {
      const filePath = path.join(contextDir, file);

      // Verificar tamanho antes de ler
      const stats = await fs.stat(filePath);
      if (stats.size > 100 * 1024) { // Limite: 100KB
        console.warn(`⚠️  Arquivo muito grande: ${file} (${stats.size} bytes)`);
        continue;
      }

      const content = await fs.readFile(filePath, "utf-8");
      contextData += `\n\n### ${file.replace(".md", "").toUpperCase()}\n${content}`;
    } catch (error) {
      console.warn(`⚠️  Erro ao carregar ${file}:`, error);
    }
  }

  return contextData;
}

// Cache em memória para evitar leituras repetidas
let contextCache: { data: string; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export async function getContextFiles(): Promise<string> {
  const now = Date.now();

  if (contextCache && (now - contextCache.timestamp) < CACHE_TTL) {
    return contextCache.data;
  }

  const data = await loadContextFiles();
  contextCache = { data, timestamp: now };
  return data;
}
```

**Impacto:** MÉDIO - Melhora performance e não bloqueia event loop
**Esforço:** 3-4 horas

---

### 9. Gerenciamento de Estado com Zustand

**Problema:** Zustand está instalado mas não utilizado. 44 `useState` dispersos causam complexidade

**Solução:** Implementar stores Zustand para UI state
```typescript
// lib/stores/ui-store.ts
import { create } from 'zustand';

interface UIState {
  // Modals
  openModals: Set<string>;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;

  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Command palette
  commandPaletteOpen: boolean;
  toggleCommandPalette: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  openModals: new Set(),
  openModal: (id) => set((state) => ({
    openModals: new Set(state.openModals).add(id)
  })),
  closeModal: (id) => set((state) => {
    const newSet = new Set(state.openModals);
    newSet.delete(id);
    return { openModals: newSet };
  }),

  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({
    sidebarCollapsed: !state.sidebarCollapsed
  })),

  commandPaletteOpen: false,
  toggleCommandPalette: () => set((state) => ({
    commandPaletteOpen: !state.commandPaletteOpen
  }))
}));

// Uso:
const { openModal, closeModal } = useUIStore();
```

**Impacto:** MÉDIO - Simplifica gerenciamento de estado
**Esforço:** 2-3 dias

---

### 10. Implementar Testes

**Problema:** 0% de cobertura de testes

**Solução:** Configurar ambiente de testes e adicionar testes críticos

```bash
# Instalar dependências
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event @vitejs/plugin-react
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
});
```

**Testes prioritários:**
1. Hooks customizados (`useAudioRecorder`, `useChatState`)
2. Funções de utilidade da IA (`parseAIResponse`, `sanitizeUserInput`)
3. Routers tRPC (queries e mutations)
4. Componentes críticos (formulários, botões de IA)

**Impacto:** ALTO - Previne regressões e bugs
**Esforço:** 1-2 semanas

---

## 🟢 Melhorias de Prioridade Média

### 11. Logging Estruturado

**Problema:** Apenas `console.log` em desenvolvimento

**Solução:** Implementar logging estruturado com Pino
```typescript
// lib/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  ...(process.env.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  })
});

// Uso:
logger.info({ userId, action: 'create_icebreaker' }, 'Icebreaker created');
logger.error({ error, context }, 'AI request failed');
```

**Esforço:** 1 dia

---

### 12. Completar Profile Router

**Problema:** Profile router só tem `get`, falta CRUD completo

**Solução:**
```typescript
// server/api/routers/profile.ts
export const profileRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.profile.findFirst();
  }),

  create: publicProcedure
    .input(profileSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.profile.create({ data: input });
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: profileSchema.partial()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.profile.update({
        where: { id: input.id },
        data: input.data
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.profile.delete({
        where: { id: input.id }
      });
    })
});
```

**Esforço:** 2-3 horas

---

### 13. Integração com Sentry

**Problema:** Mencionado no README mas não implementado

**Solução:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Esforço:** 3-4 horas

---

### 14. Relacionamentos no Schema Prisma

**Problema:** `PracticeSession.itemId` é string sem FK

**Solução:**
```prisma
model PracticeSession {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  tipo          String

  // Relacionamentos opcionais
  icebreakerId  String?  @db.ObjectId
  icebreaker    Icebreaker? @relation(fields: [icebreakerId], references: [id])

  speechId      String?  @db.ObjectId
  speech        Speech?  @relation(fields: [speechId], references: [id])

  starCaseId    String?  @db.ObjectId
  experiencia   Experiencia? @relation(fields: [starCaseId], references: [id])

  duracao       Int
  transcricao   String?
  audioUrl      String?
  avaliacaoIA   Json?
  score         Int?

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// Adicionar campo em outros models
model Icebreaker {
  // ... campos existentes
  practices PracticeSession[]
}
```

**Esforço:** 1 dia + migração de dados

---

### 15. Adicionar Índices no Banco

**Problema:** Sem índices documentados, queries podem ser lentas

**Solução:**
```prisma
model Icebreaker {
  // ... campos existentes

  @@index([favorite])
  @@index([archived])
  @@index([updatedAt])
  @@index([tipo, favorite])
}

model Speech {
  // ... campos existentes

  @@index([favorite])
  @@index([archived])
  @@index([tipoVaga])
}

model PracticeSession {
  // ... campos existentes

  @@index([tipo])
  @@index([icebreakerId])
  @@index([createdAt])
}
```

**Esforço:** 2-3 horas

---

## 💡 Melhorias Futuras (Evoluções)

### 16. Autenticação Multi-Usuário

**Implementação sugerida:** NextAuth.js ou Clerk

**Benefícios:**
- Suportar múltiplos usuários
- Login social (Google, GitHub)
- Isolar dados por usuário
- Adicionar planos/pricing

**Esforço:** 1-2 semanas

---

### 17. Sistema de Colaboração

**Features:**
- Compartilhar icebreakers/speeches com outros usuários
- Comentários e feedback
- Templates públicos
- Comunidade de prática

**Esforço:** 3-4 semanas

---

### 18. Analytics Avançado

**Features:**
- Tracking de tempo de prática
- Evolução de score ao longo do tempo
- Identificar competências mais praticadas
- Sugestões personalizadas baseadas em dados

**Esforço:** 2-3 semanas

---

### 19. Mobile App (React Native)

**Features:**
- App nativo iOS/Android
- Prática offline
- Notificações push para lembretes
- Sincronização com web

**Esforço:** 2-3 meses

---

### 20. Integração com LinkedIn

**Features:**
- Importar experiências do LinkedIn
- Exportar portfólio para LinkedIn
- Análise de job postings
- Match com vagas

**Esforço:** 2-3 semanas

---

### 21. Suporte a Múltiplas LLMs

**Problema:** Apenas Gemini implementado

**Solução:** Abstração para múltiplos providers
```typescript
// lib/ai/providers.ts
interface AIProvider {
  generate(prompt: string, options: GenerateOptions): Promise<string>;
  chat(messages: Message[]): Promise<string>;
}

class GeminiProvider implements AIProvider { ... }
class OpenAIProvider implements AIProvider { ... }
class AnthropicProvider implements AIProvider { ... }

// Seleção dinâmica
const provider = createProvider(process.env.AI_PROVIDER || 'gemini');
```

**Benefícios:**
- Fallback em caso de falha
- Comparação de qualidade
- Otimização de custo

**Esforço:** 1 semana

---

### 22. Modo Offline

**Features:**
- Service Worker para cache
- IndexedDB para dados locais
- Sincronização quando online
- Queue de operações pendentes

**Esforço:** 2-3 semanas

---

### 23. Exportação Avançada

**Features:**
- Exportar para Google Docs
- Templates customizáveis
- Exportar para LaTeX/Markdown
- Gerar apresentação de slides

**Esforço:** 1-2 semanas

---

### 24. Assistente de Voz

**Features:**
- Prática com comando de voz
- Feedback em tempo real
- Análise de pronúncia
- Detecção de palavras de preenchimento ("né", "tipo")

**Esforço:** 3-4 semanas

---

### 25. Gamificação

**Features:**
- Sistema de pontos e badges
- Streaks de prática diária
- Desafios semanais
- Ranking de progresso

**Esforço:** 2-3 semanas

---

## 📋 Plano de Ação Recomendado

### Fase 1: Fundação (2-3 semanas)
1. ✅ Implementar sanitização de input (prompt injection)
2. ✅ Adicionar validação de JSON
3. ✅ Criar tipos TypeScript adequados
4. ✅ Implementar error boundary
5. ✅ Adicionar rate limiting

### Fase 2: Qualidade (3-4 semanas)
6. Implementar paginação
7. Otimizar queries do dashboard
8. Converter file I/O para async
9. Implementar Zustand
10. Adicionar testes básicos (hooks e utils)

### Fase 3: Observabilidade (1-2 semanas)
11. Implementar logging estruturado
12. Integrar Sentry
13. Adicionar métricas de performance
14. Documentar API

### Fase 4: Performance (1-2 semanas)
15. Adicionar índices no banco
16. Implementar caching estratégico
17. Otimizar bundle size
18. Lazy loading de componentes

### Fase 5: Evoluções (contínuo)
19. Escolher features futuras baseado em feedback
20. Implementar autenticação multi-usuário
21. Sistema de colaboração
22. Analytics avançado

---

## 🎯 Métricas de Sucesso

### Antes das Melhorias
- ❌ 0% cobertura de testes
- ❌ 25+ asserções `as any`
- ❌ 0 error boundaries
- ❌ Sem rate limiting HTTP
- ❌ Sem validação de resposta da IA

### Depois das Melhorias (Fase 1-3)
- ✅ 60%+ cobertura de testes
- ✅ 0 asserções `as any`
- ✅ Error boundaries implementados
- ✅ Rate limiting em todos endpoints
- ✅ Validação completa com Zod
- ✅ Logging estruturado
- ✅ Monitoramento de erros (Sentry)

---

## 💰 Estimativa de Esforço Total

| Fase | Esforço | Valor Entregue |
|------|---------|----------------|
| Fase 1 (Crítico) | 2-3 semanas | Segurança e estabilidade |
| Fase 2 (Qualidade) | 3-4 semanas | Performance e manutenibilidade |
| Fase 3 (Observabilidade) | 1-2 semanas | Debugging e monitoramento |
| Fase 4 (Performance) | 1-2 semanas | Escalabilidade |
| **Total até Produção** | **7-11 semanas** | App production-ready |

---

## 📚 Recursos e Documentação

### Para Implementar
- [tRPC Best Practices](https://trpc.io/docs/server/middlewares)
- [Zod Validation](https://zod.dev/)
- [Zustand Guide](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Vitest Testing](https://vitest.dev/guide/)

### Para Monitoramento
- [Sentry Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Pino Logging](https://getpino.io/)

---

## 🤝 Contribuindo

Este documento será atualizado conforme melhorias são implementadas. Marque itens concluídos com ✅ e adicione observações de implementação.

**Última atualização:** 2025-11-04
