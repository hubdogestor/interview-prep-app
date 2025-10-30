# Plano de Entrega · Interview Prep App

**Atualização:** 30 de outubro de 2025  
**Status atual:** Template v0 ativo com base visual final; tooling (ESLint, Prettier, scripts npm, build) validado  
**Objetivo:** Tornar as seções de “Interview Prep” totalmente funcionais com dados reais e automações de IA, mantendo o layout atual

---

## Fase 0 · Template & Tooling (✅ concluída)

- Importar layout do v0.app e ajustar assets
- Configurar scripts (`lint`, `typecheck`, `format`) e padronizar ESLint
- Garantir build Next.js 14 + Tailwind v4 funcionando

---

## Fase 1 · Infraestrutura de Dados & Serviços (🚧 em andamento)

1. **Base de dados** ✅
   - [x] Reinstalar Prisma + driver MongoDB (ou stack equivalente) e recriar `.env.local`
   - [x] Recriar schema das coleções principais (Profile, Icebreaker, Competencia, Experiencia, Speech, Question)
   - [x] Implementar seeds mínimos para desenvolvimento (dados reais ou mock enriquecido)
   - [x] Configurar scripts `prisma generate`, `prisma db push` e política de migrations
2. **Camada de serviços**
   - Reconfigurar cliente Prisma compartilhado (`lib/db` ou similar)
   - Reinstalar tRPC v11 e expor router raiz no App Router (`app/api/trpc/[trpc]/route.ts`)
   - Criar routers por domínio (`profile`, `dashboard`, `icebreakers`, `competencias`, `experiencias`, `speeches`, `questions`)
   - Implementar modelos de erro/respostas tipadas + middlewares (ex.: rate limit, logs)
3. **Integração com layout**
   - Substituir `mock.json` por loaders RSC consumindo as queries tRPC
   - Definir estado de loading/fallback para cards, gráficos e notificações
   - Mapear navegação server/client (ex.: sidebar server, formulários client)

---

## Fase 2 · Funcionalidades Interview Prep (🔄 em planejamento)

1. **Dashboard Overview**
   - Consolidar métricas reais (stats, gráficos, ranking, segurança, widget)
   - Conectar notificações e chat lateral a fontes reais ou mocks evoluídos
   - Adicionar ações rápidas (ex.: “Nova pergunta”, “Gerar speech”) com handlers preparados
2. **Icebreakers**
   - CRUD completo (listagem, criação, edição, arquivamento)
   - Formulário com React Hook Form + Zod e validações específicas
   - Gatilho para gerar novos icebreakers via IA; armazenar histórico por usuário
3. **Competências**
   - Modelar categorias, níveis, tags e casos STAR
   - Interface para priorizar competências e anexar evidências
   - Filtro por nível/stack + comparação entre competências
4. **Experiências**
   - Persistir histórico profissional (empresa, período, conquistas, cases STAR)
   - Suporte a anexos/links de portfolio (campo opcional)
   - Visualização em timeline com estados “Atual”/“Anterior”
5. **Speeches**
   - Editor rich text (TipTap) com snippets pré-definidos
   - Versões e histórico de revisões; botão “gerar versão alternativa” via IA
   - Exportar speech (PDF/Markdown) para compartilhamento
6. **Questions**
   - Banco de perguntas personalizadas e curadas
   - Marcar como respondida, favorita ou “praticar depois”
   - Geração de respostas modelo + sugestões de follow-ups

---

## Fase 3 · Camada de IA & Automação (🤖)

- Reinstalar SDKs (Anthropic, Google, OpenAI) com failover automático
- Criar módulo `lib/ai/providers` gerenciando prioridades, limites e telemetria
- Implementar prompts específicos por funcionalidade (icebreaker, competência, speech, perguntas)
- Cachear respostas e registrar métricas de uso (tokens, provider escolhido)
- Lidar com fallback manual e mensagens de erro amigáveis em UI

---

## Fase 4 · Conteúdo, UX e Branding (🎨)

- Revisar copy completa para PT-BR/EN (priorizar PT-BR primeiro)
- Substituir assets temporários (logos, avatars, ícones) por versões do projeto
- Ajustar responsividade mobile (sidebar, header, chat, modais)
- Refinar estados vazios, mensagens de orientação e tooltips
- Implementar controle de tema, acessibilidade (aria, foco, contraste) e atalhos

---

## Fase 5 · Qualidade, Observabilidade e Deploy (🚢)

- Configurar Vitest + Testing Library (unidade) e Playwright (fluxos críticos)
- Reinstalar Sentry (edge/server) com DSN real e mapear eventos customizados
- Criar pipeline CI (lint, typecheck, testes, build) + deploy contínuo (Vercel)
- Scripts de manutenção (seed reset, backups, monitoramento do banco)
- Checklist de release (rotina de QA, ensaios de rollback, documentação de endpoints)

---

## Backlog / Ideias Futuras

- Integração com calendário para agendar sessões de prática
- Modo “coach” com chat orientado por IA utilizando contexto do usuário
- Gamificação (pontos, badges) baseada no progresso em cada seção
- Exportação de relatórios personalizados para entrevistas específicas
- Conector com plataformas externas (LinkedIn, Google Drive) para importar dados

---

### Rotina Sugerida

1. Antes de cada iteração: revisar este TODO, alinhar prioridades e atualizar status
2. Ao finalizar um bloco: rodar `npm run lint`, `npm run typecheck`, `npm run build`
3. Documentar decisões relevantes no README ou em docs específicos
4. Manter backups sensíveis (env, seeds reais) fora do repositório público
