# CONTEXT.md - Interview Prep App

**Última atualização:** 30 de outubro de 2025
**Fase atual:** Fase 1 completa ✅ | Iniciando Fase 2

## 🎯 Visão Geral

App de preparação para entrevistas de emprego, focado em organizar e praticar:
- Icebreakers (apresentações rápidas)
- Speeches (discursos completos)
- Questions (perguntas para fazer ao entrevistador)
- Experiências profissionais + STAR cases
- Competências técnicas e comportamentais

**Usuário:** Single-user (uso pessoal, sem autenticação)
**Idioma:** PT-BR (preparado para EN futuro)
**IA:** Gemini 2.5 Pro como modelo principal

## 🏗️ Stack Técnica

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind v4, Radix UI, Framer Motion
- **Backend:** tRPC v11 + Prisma + MongoDB
- **IA:** Google AI SDK (Gemini 2.5 Pro)
- **Deploy:** Vercel (recomendado) ou GitHub Pages*
- **Qualidade:** ESLint, TypeScript, Prettier

\* GitHub Pages limitado para SSG; Vercel melhor para tRPC/SSR

## 📊 Schema Prisma

6 modelos principais:
1. **Profile** - dados do usuário (nome, título, resumo, anos exp)
2. **Icebreaker** - apresentações rápidas com versões
3. **Competencia** - skills com níveis e evidências
4. **Experiencia** - histórico profissional + STAR cases
5. **Speech** - discursos completos por tipo de vaga
6. **Question** - perguntas para entrevistadores

Campos Json seguem padrão `{pt: string, en: string}` mas populados só PT-BR inicialmente.

## ✅ Status - Fase 1 COMPLETA

### 1.1 Base de dados ✅
- Prisma configurado com MongoDB
- Schema com 6 collections
- Seeds funcionando
- Scripts: `db:push`, `db:generate`, `db:seed`, `db:studio`

### 1.2 Camada de serviços ✅
- tRPC v11 exposto em `/api/trpc/[trpc]`
- 7 routers: profile, dashboard, icebreakers, competencias, experiencias, speeches, questions
- Middleware de logger
- Error handling com Zod

### 1.3 Integração com layout ✅
- TRPCProvider configurado
- Todas as páginas usando dados reais
- Loading states com Suspense
- Build passando sem erros

## 🚀 Próximos Passos - Fase 2

### Ordem de Prioridade:
1. **Icebreakers** [ALTA] - CRUD + geração via IA
2. **Speeches** [ALTA] - CRUD + versões alternativas via IA
3. **Questions** [MÉDIA] - CRUD + categorização
4. **Experiências** [MÉDIA] - CRUD + revisão STAR cases via IA
5. **Competências** [MÉDIA-BAIXA] - CRUD + evidências
6. **Dashboard** [BAIXA] - métricas reais + notificações

### Features essenciais por módulo:

#### Icebreakers
- CRUD completo (create, read, update, archive, favorite)
- Formulário: React Hook Form + Zod
- Tipos: elevator_pitch, quick_intro, personal_story
- Versões múltiplas (Json array)
- Botão "Gerar com IA" → Gemini 2.5 Pro

#### Speeches
- CRUD completo + versioning
- Editor de texto (pode ser textarea simples)
- Tipo de vaga (dropdown)
- Duração estimada (minutos)
- Áreas de foco (tags)
- Botão "Gerar versão alternativa"

#### Questions
- CRUD completo
- Agrupamento por categoria
- Prioridade (alta/média/baixa)
- Favoritar
- Contexto/dica de uso

#### Experiências
- CRUD completo
- Timeline visual (badge "atual")
- Tecnologias (tags)
- STAR cases (Json array)
- Botão "Revisar STAR case com IA"

## 🤖 IA - Fase 3

### Provider: Gemini 2.5 Pro
- Usuário tem plano Pro do Google AI
- Usar como modelo principal
- Fallback para outros modelos é opcional

### Prompts Essenciais:
1. **Gerar Icebreaker**: baseado em Profile → retornar 2-3 versões
2. **Gerar Speech**: baseado em Profile + tipo de vaga → discurso completo
3. **Revisar STAR case**: analisar estrutura, sugerir melhorias, validar métricas

### Implementação:
- Módulo: `lib/ai/gemini.ts`
- Config: `GOOGLE_AI_API_KEY` em `.env.local`
- Rate limiting básico
- Loading states + error handling
- Armazenar output na base

## 🎨 Design & UX

- Layout importado do v0.app (tema cyberpunk/tech)
- Fonte display: Rebels Fett (custom)
- Fonte mono: Roboto Mono
- Modo: Dark only (por enquanto)
- Responsivo: desktop-first, mobile funcional

### Ajustes necessários:
- Remover "Rebels Ranking" (multi-user)
- Simplificar chat lateral ou transformar em "Notes"
- Copy em tom pessoal (singular)
- Manter widget de clima/data como está

## 📱 Responsividade

- **Desktop:** 1440px+ (foco principal)
- **Tablet:** 768px-1439px (funcional, sem otimizações)
- **Mobile:** <768px (funcional básico)
- Sidebar colapsa em mobile
- Cards empilham
- Sem PWA ou offline mode

## 🌐 Internacionalização

### Atual:
- UI em PT-BR hardcoded
- Schema com campos `{pt: string, en: string}`
- Popular apenas campo `pt`
- Campo `en` fica vazio string

### Futuro:
- Adicionar next-intl ou next-i18next
- Criar locales/pt-BR.json, locales/en-US.json
- Toggle de idioma no header
- Popular campos `en` na base
- IA pode auxiliar tradução

## 🚢 Deploy

- **Recomendado:** Vercel (suporta SSR + tRPC)
- **Alternativa:** GitHub Pages (limitação: só SSG)
- **Database:** MongoDB Atlas (50 USD créditos + free tier)
- **CI/CD:** GitHub Actions (lint + typecheck)
- **Ambientes:** Produção única (sem staging)

## 📂 Estrutura de Pastas

```
├── app/                       # Next.js App Router
│   ├── api/trpc/[trpc]/      # tRPC endpoints
│   ├── (pages)/              # Páginas principais
│   ├── loading.tsx           # Loading states
│   └── layout.tsx            # Root layout
├── components/
│   ├── dashboard/            # Componentes do dashboard
│   ├── ui/                   # shadcn/ui components
│   └── loading/              # Skeletons
├── lib/
│   ├── db.ts                 # Prisma client
│   ├── trpc/                 # tRPC setup (react + server)
│   └── ai/                   # (Fase 3) Gemini integration
├── server/
│   └── api/
│       ├── root.ts           # Root router
│       ├── trpc.ts           # tRPC config
│       └── routers/          # Domain routers
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
└── scripts/
    └── test-trpc.ts          # tRPC endpoint tests
```

## 🔧 Scripts Úteis

```bash
# Desenvolvimento
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run start            # Start production server

# Database
npm run db:push          # Sync schema to MongoDB
npm run db:generate      # Regenerate Prisma Client
npm run db:seed          # Run seed script
npm run db:studio        # Open Prisma Studio

# Qualidade
npm run lint             # ESLint
npm run lint:fix         # ESLint com --fix
npm run typecheck        # TypeScript check
npm run format           # Prettier check

# Custom
npx tsx scripts/test-trpc.ts  # Test all tRPC endpoints
```

## 🎓 Decisões Técnicas Importantes

### Por que tRPC?
- Type-safety end-to-end sem code generation
- Integração nativa com Next.js App Router
- Melhor DX que REST para fullstack TS

### Por que MongoDB?
- Créditos de 50 USD disponíveis
- Schema flexível (Json fields)
- Free tier suficiente após créditos
- Prisma tem bom suporte

### Por que Gemini 2.5 Pro?
- Usuário tem plano Pro assinado
- Excelente qualidade para geração de texto
- API simples e bem documentada
- Suporta contexto longo (importante para STAR cases)

### Por que não usar TipTap inicialmente?
- Overkill para MVP
- Textarea simples suficiente para Fase 2
- Pode adicionar rich text editor depois se necessário

## ⚠️ Limitações Conhecidas

1. **Single-user**: sem multi-tenancy, auth, ou isolamento de dados
2. **No auth**: qualquer um com URL pode acessar
3. **No backup automático**: backups manuais via MongoDB Atlas
4. **No i18n ainda**: UI hardcoded em PT-BR
5. **No mobile optimization**: responsivo básico apenas

## 📚 Como Usar Este Documento

### Em nova conversa com Claude:
```
Olá! Estou trabalhando no Interview Prep App.
Leia o arquivo CONTEXT.md para entender o projeto.

Estou na fase [X] trabalhando em [Y].
```

### Para retomar trabalho:
```
Olá! Continuando o Interview Prep App.
Contexto: leia CONTEXT.md
Último status: [descrever onde parou]
Próximo passo: [o que fazer agora]
```

### Para revisões:
```
Revisar [feature] do Interview Prep App.
Leia CONTEXT.md para contexto completo.
```

---

## 💡 Sistema de Gamificação (Futuro)

### Pontuação STAR Cases
- Tem S, T, A, R completos? +25 cada = 100 pontos
- Tem métricas quantificáveis? +20 pontos
- Revisado por IA? +10 pontos
- **Total possível:** 130 pontos por STAR case

### Streaks
- Dias consecutivos praticando/revisando conteúdo
- Notificações para manter streak ativo

### Progress Tracking
- % de completude por seção
- Metas personalizadas

## 📬 Notificações Sugeridas

- "Há X dias sem criar/revisar conteúdo"
- "Você tem Y speeches sem revisão de IA"
- "Competência [X] sem evidências há Z dias"
- "Streak de W dias! Continue praticando"

---

**Última fase completa:** Fase 1 (Infraestrutura de Dados & Serviços)
**Próxima fase:** Fase 2.1 (Icebreakers CRUD + IA)
**Versão:** 0.1.0
