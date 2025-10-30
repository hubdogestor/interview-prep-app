# Plano de Entrega · Interview Prep App

**Atualização:** 30 de outubro de 2025
**Status atual:** Fase 1 completa ✅ | Iniciando Fase 2
**Objetivo:** Tornar as seções de "Interview Prep" totalmente funcionais com dados reais e automações de IA

📄 **Ver também:** `CONTEXT.md` para documentação completa do projeto

---

## Fase 0 · Template & Tooling (✅ concluída)

- [x] Importar layout do v0.app e ajustar assets
- [x] Configurar scripts (`lint`, `typecheck`, `format`) e padronizar ESLint
- [x] Garantir build Next.js 14 + Tailwind v4 funcionando

---

## Fase 1 · Infraestrutura de Dados & Serviços (✅ concluída)

1. **Base de dados** ✅
   - [x] Reinstalar Prisma + driver MongoDB e recriar `.env.local`
   - [x] Recriar schema das coleções principais (Profile, Icebreaker, Competencia, Experiencia, Speech, Question)
   - [x] Implementar seeds mínimos para desenvolvimento
   - [x] Configurar scripts `prisma generate`, `prisma db push` e política de migrations

2. **Camada de serviços** ✅
   - [x] Reconfigurar cliente Prisma compartilhado (`lib/db`)
   - [x] Reinstalar tRPC v11 e expor router raiz no App Router (`app/api/trpc/[trpc]/route.ts`)
   - [x] Criar routers por domínio (`profile`, `dashboard`, `icebreakers`, `competencias`, `experiencias`, `speeches`, `questions`)
   - [x] Implementar modelos de erro/respostas tipadas + middlewares (logger implementado)

3. **Integração com layout** ✅
   - [x] Substituir `mock.json` por loaders RSC consumindo as queries tRPC
   - [x] Definir estado de loading/fallback para cards, gráficos e notificações
   - [x] Mapear navegação server/client (sidebar server, formulários client)

---

## Fase 2 · Funcionalidades Interview Prep (🚧 em andamento)

### 2.1 Icebreakers [PRIORIDADE ALTA]
- [ ] CRUD completo (criar, editar, listar, arquivar)
- [ ] Formulário com React Hook Form + Zod
- [ ] Favoritar icebreakers
- [ ] Tipos: elevator_pitch, quick_intro, personal_story
- [ ] Gerenciar múltiplas versões (Json array no schema)
- [ ] Mutations tRPC: create, update, delete, archive, favorite
- [ ] Botão "Gerar com IA" (preparar handler, implementar IA na Fase 3)

### 2.2 Speeches [PRIORIDADE ALTA]
- [ ] CRUD completo com versioning
- [ ] Editor de texto simples (textarea, não rich text ainda)
- [ ] Filtros por tipo de vaga
- [ ] Campo de duração estimada (minutos)
- [ ] Áreas de foco (tags array)
- [ ] Mutations tRPC: create, update, delete, favorite
- [ ] Botão "Gerar versão alternativa com IA" (handler pronto, IA na Fase 3)

### 2.3 Questions [PRIORIDADE MÉDIA]
- [ ] CRUD completo
- [ ] Agrupamento por categoria (já implementado na listagem)
- [ ] Sistema de prioridade (alta/média/baixa)
- [ ] Marcar como favorita
- [ ] Campo de contexto/dica de uso
- [ ] Mutations tRPC: create, update, delete, favorite
- [ ] Botão "Sugerir perguntas com IA" (nice-to-have, Fase 3)

### 2.4 Experiências [PRIORIDADE MÉDIA]
- [ ] CRUD completo
- [ ] Timeline visual com badge "atual"
- [ ] Gerenciar tecnologias (array de strings)
- [ ] Gerenciar STAR Cases (Json array)
- [ ] Campo de pitch elevator + speech completo (Json {pt, en})
- [ ] Mutations tRPC: create, update, delete
- [ ] Botão "Revisar STAR case com IA" (Fase 3)

### 2.5 Competências [PRIORIDADE MÉDIA-BAIXA]
- [ ] CRUD completo
- [ ] Níveis (basic/intermediate/advanced/expert)
- [ ] Categorias (technical/soft_skills/leadership)
- [ ] Ferramentas/tech stack (array)
- [ ] Track record de projetos (Json array)
- [ ] Sistema de evidências (links/descrições)
- [ ] Mutations tRPC: create, update, delete
- [ ] Filtros por categoria e nível

### 2.6 Dashboard Overview [ÚLTIMA PRIORIDADE]
- [ ] Métricas reais: total de items por seção
- [ ] Progresso: % de completude (ex: "5/10 questions com resposta")
- [ ] Ranking de STAR cases (pontuação por completude)
- [ ] Notificações reais:
  - "Há X dias sem praticar"
  - "Y speeches sem revisão"
  - "Z STAR cases incompletos"
- [ ] Ações rápidas: botões para criar novo item
- [ ] Remover "Rebels Ranking" (multi-user, não aplicável)
- [ ] Simplificar chat lateral ou transformar em "Notes"
- [ ] Widget de clima/data (manter ou simplificar)

---

## Fase 3 · Camada de IA & Automação (🤖)

### 3.1 Configuração Base
- [ ] Instalar SDK do Google AI (Gemini 2.5 Pro)
- [ ] Criar módulo `lib/ai/gemini.ts` como provider principal
- [ ] Configurar `GOOGLE_AI_API_KEY` em `.env.local`
- [ ] Sistema básico de rate limiting e retry
- [ ] Error handling e mensagens amigáveis na UI

### 3.2 Prompts Essenciais [ALTA PRIORIDADE]
- [ ] **Gerar Icebreaker**
  - Input: Profile (nome, título, resumo, anos exp)
  - Output: 2-3 versões de apresentação
  - Tipos: elevator_pitch, quick_intro, personal_story
  - Armazenar no campo `versoes` (Json array)

- [ ] **Gerar Speech**
  - Input: Profile + tipo de vaga
  - Output: discurso completo estruturado
  - Considerar: foco, duração, tom
  - Armazenar no campo `conteudo` (Json {pt, en})

- [ ] **Revisar STAR Case**
  - Input: STAR case existente
  - Output: análise + sugestões
  - Validar: tem S, T, A, R?
  - Sugerir: métricas quantificáveis, clareza, impacto
  - Retornar score de qualidade (0-100)

### 3.3 Nice-to-have [BACKLOG]
- [ ] Sugerir perguntas para entrevistadores (baseado em vaga)
- [ ] Analisar competências e sugerir evidências
- [ ] Gerar respostas modelo para questions
- [ ] Traduzir conteúdo PT-BR → EN automaticamente

### 3.4 Integrações
- [ ] Loading states durante geração de IA
- [ ] Botões de "Regenerar" e "Aceitar/Editar"
- [ ] Histórico de gerações (opcional)
- [ ] Métricas de uso (tokens, tempo de resposta)

---

## Fase 4 · Conteúdo, UX e Branding (🎨)

- [ ] Ajustar copy para tom pessoal (singular, não plural)
- [ ] Remover elementos multi-user ("Rebels Ranking", etc)
- [ ] Simplificar/remover chat lateral
- [ ] **i18n preparação**: manter Json schema {pt, en}, popular só PT-BR
- [ ] Assets temporários podem ficar (baixa prioridade)
- [ ] Responsividade: garantir mobile funcional (sem otimizações específicas)
- [ ] Refinar estados vazios com mensagens de orientação
- [ ] Tooltips e hints em formulários
- [ ] Modo dark (já está, manter)

---

## Fase 5 · Qualidade, Observabilidade e Deploy (🚢)

- [ ] Testes básicos: smoke tests de fluxos principais
- [ ] Sentry opcional (fase posterior)
- [ ] **Deploy**: Vercel (recomendado para tRPC/SSR)
  - ⚠️ GitHub Pages só suporta SSG, não funciona com tRPC
- [ ] CI básico: GitHub Actions (lint + typecheck)
- [ ] MongoDB Atlas já configurado (50 USD créditos + free tier)
- [ ] Scripts de manutenção: seed reset, backup manual
- [ ] Documentar endpoints tRPC (opcional)

---

## Estratégia de Internacionalização (i18n)

### Fase atual: PT-BR apenas
- [x] Schema mantém estrutura `{pt: string, en: string}`
- [x] Popular apenas campo `pt`, deixar `en` como string vazia
- [ ] UI: todo conteúdo em português (hardcoded)
- [ ] Sem botão de troca de idioma ainda

### Fase futura: Bilíngue
- [ ] Adicionar biblioteca i18n (next-intl ou next-i18next)
- [ ] Criar arquivos de tradução UI: `locales/pt-BR.json`, `locales/en-US.json`
- [ ] Popular campos `en` na base de dados
- [ ] Adicionar toggle de idioma no header
- [ ] IA pode ajudar: "traduzir meu speech para inglês"

---

## Sistema de Gamificação (Backlog/Futuro)

### Pontuação STAR Cases
- Tem S, T, A, R completos? +25 cada = 100 pontos
- Tem métricas quantificáveis? +20 pontos
- Revisado por IA? +10 pontos
- **Total possível:** 130 pontos por STAR case

### Streaks & Progress
- Dias consecutivos praticando
- % de completude por seção
- Metas personalizadas

---

## Backlog / Ideias Futuras

- [ ] Integração com calendário para agendar sessões de prática
- [ ] Modo "coach" com chat orientado por IA utilizando contexto do usuário
- [ ] Gamificação completa (pontos, badges, níveis)
- [ ] Exportação de relatórios (PDF/Markdown)
- [ ] Conector com plataformas externas (LinkedIn, Google Drive)
- [ ] PWA / modo offline
- [ ] Editor rich text (TipTap) para speeches
- [ ] Compartilhamento público de portfolio

---

### Rotina Sugerida

1. Antes de cada iteração: revisar este TODO e CONTEXT.md
2. Ao finalizar um bloco: rodar `npm run lint`, `npm run typecheck`, `npm run build`
3. Testar endpoints: `npx tsx scripts/test-trpc.ts`
4. Documentar decisões importantes no CONTEXT.md
5. Manter backups sensíveis (env, seeds reais) fora do repositório

---

### Ordem de Implementação Recomendada

**Semana 1-2:** Fase 2.1 + 2.2 (Icebreakers + Speeches CRUD)
**Semana 3:** Fase 3.1 + 3.2 (Setup Gemini + Prompts essenciais)
**Semana 4:** Fase 2.3 + 2.4 (Questions + Experiências CRUD)
**Semana 5:** Fase 3.3 + 2.5 (Revisão STAR + Competências)
**Semana 6:** Fase 2.6 + 4 (Dashboard + UX polish)
**Semana 7:** Fase 5 (Deploy + CI/CD)
