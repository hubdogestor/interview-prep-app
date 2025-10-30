# 🛠️ TODO: Interview Prep App — Template v0

**Atualização:** 30 de outubro de 2025  
**Status atual:** Tooling do template pronto; aguardando reinstalação de dados/serviços  
**Fase vigente:** Fase 1 concluída · pronto para iniciar Fase 2 (Dados & Integrações)

---

## Stack de referência

- Next.js 14.2 · App Router · RSC habilitado
- React 18.2 · TypeScript 5
- Tailwind CSS v4 + `tailwindcss-animate`
- shadcn/ui (estilo new-york) + Radix UI completo
- Recharts, Framer Motion, Embla, Sonner, Vaul
- Pacotes utilitários: Zustand, React Hook Form, Zod, date-fns, cmdk, etc.

---

## ✅ Fase 0 · Base do template

- [x] Limpar codebase anterior
- [x] Criar novo projeto Next + Tailwind
- [x] Importar template `dashboardv0` (layout completo do v0)
- [x] Ajustar dependências para npm (React 18 + Next 14)
- [x] `npm run build` validado (warnings apenas sobre `metadataBase`)

---

## 🔜 Fase 1 · Reinstalar infraestrutura

1. Configuração do tooling
   - [x] Revisar ESLint (v4/v0), adicionar regras do plano anterior (import-order, tailwind, etc)
   - [x] Configurar scripts `npm run lint`, `npm run format`, `npm run typecheck`
   - [x] Atualizar `components.json` (aliases, registries se precisarmos importar novos blocos)
2. Base comum
   - [x] Criar `src/lib/utils.ts` e helpers alinhados ao template (shadcn expõe util idêntico)
   - [x] Normalizar paths/alinhamento de aliases (`@/components`, `@/lib`, etc.)
   - [x] Adicionar `metadataBase` em `app/layout.tsx`
3. Documentação inicial
   - [x] Atualizar README com instruções de dev (npm, Tailwind v4, scripts)
   - [x] Registrar variáveis esperadas no `.env.local`

---

## 🎯 Fase 2 · Dados & Integrações core

1. Banco & ORM
   - [ ] Reinstalar Prisma + MongoDB Atlas (strings em `.env.local`)
   - [ ] Recriar schema (Profile, Icebreaker, Competencia, Experiencia, Speech, Question)
   - [ ] Configurar `prisma generate`/`db push` + seeding inicial
   - [ ] Criar `src/lib/db` e consolidar client
2. API / tRPC
   - [ ] Configurar tRPC v11 (api route handler + `@/lib/trpc/client`)
   - [ ] Definir routers: `profile`, `dashboard`, `questions`, etc.
   - [ ] Implementar mocks → dados reais do banco.
3. Camada de dados no layout
   - [ ] Substituir `mock.json` por chamadas tRPC/Prisma
   - [ ] Ajustar cards (stats, ranking, security) para usar dados reais
   - [ ] Preparar estados de loading / fallback do template

---

## 🤖 Fase 3 · Serviços de IA e automação

1. Failover híbrido
   - [ ] Reinstalar SDKs (Anthropic, Google, OpenAI)
   - [ ] Criar service `@/lib/ai/providers` com failover automático
   - [ ] Mapear prompts para: icebreakers, perguntas, feedbacks, etc.
2. Ações no dashboard
   - [ ] Wireframes para botões (ex: "New Message", "Clear all") chamando serviços reais
   - [ ] Registrar fluxos (logs, telemetry)

---

## 🧭 Fase 4 · UX & Conteúdo

- [ ] Localização (pt/en) e copy final no template
- [ ] Ajustar navegação (rotas, breadcrumbs, breadcrumbs fictícios → real)
- [ ] Validar responsividade (sidebar fixa, mobile header, chat flutuante)
- [ ] Acessibilidade: foco, aria, contraste -> componentes Radix customizados
- [ ] Substituir assets (avatars, GIFs) por versões do projeto

---

## 📈 Fase 5 · Observabilidade & Deploy

- [ ] Reintegrar Sentry (edge/server) + DSN
- [ ] Configurar Vercel project (ou alternativa) + envs secretos
- [ ] CI/CD: lint, build, testes (quando disponíveis)
- [ ] Scripts de manutenção (backup Mongo, resets)

---

## 🗓️ Rotina sugerida

- Manter `todo29-10.md` como referência histórica
- Atualizar este TODO ao final de cada bloco de trabalho
- Validar `npm run lint` + `npm run build` antes de commits
- Registrar decisões relevantes no README / docs internos

---

## 📌 Notas rápidas

- O template usa muitas dependências marcadas como `latest`; travar versões conforme for introduzindo integrações (evita breaking changes).
- `mock.json` permanece útil como fallback até conectarmos dados reais.
- Components exclusivos (`bullet`, `tv-noise`, etc.) já estão presentes na pasta `components/**` — preservar estrutura ao refatorar.
- Lembrete: rever plano de IA/tRPC do documento anterior ao integrar para garantir paridade de features.
