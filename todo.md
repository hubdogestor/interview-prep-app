# Plano de Entrega · Interview Prep App

**Atualização:** 1 de novembro de 2025 (Sessão 5 - STAR CASES IA + PRÁTICA ✅)
**Status atual:** Fase 2 COMPLETA ✅ + Fase 3 (IA + UX) ✅ + STAR Cases IA + Prática ✅
**Objetivo:** Tornar as seções de "Interview Prep" totalmente funcionais com dados reais e automações de IA personalizadas

## ✅ Sessão 3 - CONCLUÍDA COM SUCESSO

**4 melhorias UX implementadas:**
1. ✅ Pré-visualização para Speeches (loading contextual + preview antes de salvar)
2. ✅ Contadores de texto (TextStats) em todos os formulários
3. ✅ Botões de Export (Markdown + PDF) nas 3 listagens
4. ✅ Suggest with AI em Questions (8 perguntas personalizadas com IA)

**Correções adicionais (Sessão 3.1):**
1. ✅ Fix: Scroll no preview de Speeches (botões ficavam escondidos atrás do texto)
2. ✅ Fix: Scroll no modal de Sugerir Perguntas (mesmo problema)
3. ✅ Adicionado botão Voltar em todas as páginas de criação (Icebreaker, Speech, Question)
4. ✅ Todas as tags agora exibem formato #hashtag em todos os componentes
5. ✅ Múltiplas tags já funcionam (separar por vírgula no formulário)
6. ✅ Export funcional em Icebreakers, Speeches e Questions

**Implementações autônomas (Sessões B → C → A):**
### OPÇÃO B - CRUD Restante ✅
1. ✅ Questions CRUD já estava completo (favoritar já funcionava)
2. ✅ Experiências e Competências implementados (Sessão 4)

### OPÇÃO C - Dashboard Funcional ✅
1. ✅ Dashboard com métricas reais (Icebreakers, Speeches, Questions, Experiências)
2. ✅ Componente "Atividades Recentes" mostrando últimas 10 atualizações
3. ✅ Componente "Favoritos" mostrando items favoritados
4. ✅ Backend expandido com `recentItems` e `favoriteItems`
5. ✅ Links clicáveis para cada item com ícones por tipo

### OPÇÃO A - Bugs Modo Prática ✅
1. ✅ Timer corrigido - não fecha mais o modal (usou `onClickCapture` + `stopPropagation`)
2. ✅ Fullscreen corrigido - moveu ref para div interna (fora de DialogContent)

### Build Status ✅
1. ✅ Dev server funciona perfeitamente (localhost:3000)
2. ✅ Build completa com warnings de SSG esperados (client components em server pages)
3. ℹ️ Warnings de prerendering são comportamento normal do Next.js 14 - não impedem funcionalidade

## ✅ Sessão 4 - CRUD Experiências & Competências COMPLETO

**CRUD de Experiências ✅**
1. ✅ Router tRPC completo (`server/api/routers/experiencias.ts`)
   - `list()` - Listagem ordenada por data
   - `getById(id)` - Buscar por ID
   - `create(data)` - Criar nova experiência
   - `update(id, data)` - Atualizar experiência
   - `delete(id)` - Deletar experiência

2. ✅ Componente ExperienciaForm (`components/experiencias/experiencia-form.tsx`)
   - Informações básicas (empresa, cargo, período)
   - Tecnologias com tags (#hashtag)
   - Elevator Pitch (PT/EN)
   - Speech Completo (PT/EN)
   - **STAR Cases** com dialog modal completo:
     - Título, Idioma (PT/EN)
     - Situation, Task, Action, Result
     - TextStats em cada campo
     - Edição e remoção de cases

3. ✅ Páginas criadas:
   - `/experiencias` - Listagem com timeline visual
   - `/experiencias/novo` - Criar nova experiência
   - `/experiencias/[id]` - Visualizar/Editar com botão de exclusão

4. ✅ Features:
   - Timeline visual com dots e linha
   - Cards com hover effects
   - Badges para tecnologias (#hashtag)
   - Contador de STAR Cases
   - AlertDialog para confirmação de exclusão
   - Loading states
   - Toast notifications

**CRUD de Competências ✅**
1. ✅ Router tRPC completo (`server/api/routers/competencias.ts`)
   - `list()` - Listagem ordenada por nível + data
   - `getById(id)` - Buscar por ID
   - `create(data)` - Criar nova competência
   - `update(id, data)` - Atualizar competência
   - `delete(id)` - Deletar competência

2. ✅ Componente CompetenciaForm (`components/competencias/competencia-form.tsx`)
   - Informações básicas (nome, categoria, nível)
   - Categorias: Technical, Soft Skills, Leadership
   - Níveis: Basic, Intermediate, Advanced, Expert
   - Descrição (PT/EN) com TextStats
   - Ferramentas & Tecnologias com tags (#hashtag)
   - Evidências (URLs, certificados)
   - **Track Record**:
     - Projeto, Resultado, Ano
     - Múltiplos projetos por competência
     - Cards individuais com edição/remoção

3. ✅ Páginas criadas:
   - `/competencias` - Listagem em grid
   - `/competencias/novo` - Criar nova competência
   - `/competencias/[id]` - Visualizar/Editar com botão de exclusão

4. ✅ Features:
   - Badges coloridos por categoria
   - Display de nível de proficiência
   - Tags para ferramentas (#hashtag)
   - Lista de evidências
   - AlertDialog para confirmação de exclusão
   - Loading states
   - Toast notifications

**Arquivos criados/modificados:**
- ✅ `server/api/routers/experiencias.ts` - Router completo
- ✅ `server/api/routers/competencias.ts` - Router completo
- ✅ `components/experiencias/experiencia-form.tsx` - Form com STAR Cases
- ✅ `components/competencias/competencia-form.tsx` - Form com Track Record
- ✅ `app/experiencias/page.tsx` - Listagem client component
- ✅ `app/experiencias/novo/page.tsx` - Criar
- ✅ `app/experiencias/[id]/page.tsx` - Editar/Visualizar
- ✅ `app/competencias/page.tsx` - Listagem client component
- ✅ `app/competencias/novo/page.tsx` - Criar
- ✅ `app/competencias/[id]/page.tsx` - Editar/Visualizar

## ✅ Sessão 5 - STAR CASES IA + MODO PRÁTICA COMPLETO

**Melhorias UX em Experiências ✅**
1. ✅ Botão "Voltar" adicionado em Experiências e Competências
2. ✅ Layout de 2 colunas nos cards de Experiências
   - Coluna esquerda: Info + Tecnologias + Botões
   - Coluna direita: Contador visual de STAR Cases (estilo icebreakers)
3. ✅ Botão "PRACTICE" nos cards (desabilitado se sem STAR Cases)

**Geração de STAR Cases com IA ✅**
1. ✅ Componente `StarCaseAIButton` criado
   - **Modo Automático**: Gera STAR Case 100% baseado no perfil
   - **Modo Guiado**: Usuário fornece título + contexto + competência foco
   - **Modo Reescrever**: Reescreve case existente com instruções customizadas
2. ✅ Endpoint tRPC `generateStarCaseWithAI` implementado
3. ✅ Função `generateStarCase()` em `lib/ai/gemini.ts` (3 modos)
4. ✅ Integrado no formulário de Experiências:
   - Botão ao final da lista (criar novo)
   - Botão "Reescrever com IA" em cada card existente
   - Contexto automático (empresa + cargo)

**Modo Prática para STAR Cases ✅**
1. ✅ Componente `StarCaseTeleprompter` criado
   - Auto-scroll com velocidade ajustável (0.5x a 3x)
   - Timer integrado com duração estimada
   - Controles: Play/Pause, Reset, Fullscreen, Settings
   - Formatação STAR: cada seção com cor diferente
   - Tamanho de fonte ajustável (16px a 48px)
   - Fullscreen nativo
2. ✅ Página `/experiencias/[id]/practice` criada
   - Lista todos STAR Cases da experiência
   - Botões: TELEPROMPTER e TIMER por case
   - Preview de cada case (Situation + Result)
3. ✅ `PracticeTimer` reutilizado (já existente)
   - Timer de 3 minutos padrão para STAR Cases

**Arquivos criados/modificados (Sessão 5):**
- ✅ `components/experiencias/star-case-ai-button.tsx` - Componente IA (3 modos)
- ✅ `components/experiencias/star-case-teleprompter.tsx` - Teleprompter formatado
- ✅ `app/experiencias/[id]/practice/page.tsx` - Página de prática
- ✅ `lib/ai/gemini.ts` - Função `generateStarCase()` adicionada
- ✅ `server/api/routers/experiencias.ts` - Endpoint `generateStarCaseWithAI`
- ✅ `components/experiencias/experiencia-form.tsx` - Integração botões IA
- ✅ `app/experiencias/page.tsx` - Layout 2 colunas + botão Practice
- ✅ `app/competencias/page.tsx` - Botão Voltar

## 🧪 TESTES PENDENTES (Para o Usuário)

### Testes de Geração de STAR Cases com IA
- [ ] **Teste 1: Modo Automático**
  1. Ir em Experiências → Editar uma experiência
  2. Na seção STAR Cases, clicar em "GERAR STAR CASE COM IA"
  3. Escolher tab "Automático"
  4. Selecionar idioma (PT ou EN)
  5. Clicar em "Gerar STAR Case"
  6. Verificar se:
     - Loading contextual aparece com mensagens
     - STAR Case gerado tem todos os campos (S, T, A, R)
     - Conteúdo é relevante à experiência (empresa + cargo)
     - Idioma está correto

- [ ] **Teste 2: Modo Guiado**
  1. Ir em Experiências → Editar uma experiência
  2. Na seção STAR Cases, clicar em "GERAR STAR CASE COM IA"
  3. Escolher tab "Guiado"
  4. Preencher:
     - Título: "Ex: Migração de Sistema Legacy"
     - Contexto: "Ex: Sistema antigo causava lentidão..."
     - Competência (opcional): "Ex: Liderança Técnica"
  5. Clicar em "Gerar STAR Case"
  6. Verificar se:
     - IA usou os inputs fornecidos
     - Título é o mesmo fornecido
     - Contexto/Situação incorpora o input

- [ ] **Teste 3: Reescrever STAR Case**
  1. Ter um STAR Case já criado
  2. No card do STAR Case, clicar em "Reescrever com IA"
  3. (Opcional) Adicionar instruções: "Ex: enfatize mais os resultados quantitativos"
  4. Clicar em "Reescrever"
  5. Verificar se:
     - STAR Case foi atualizado
     - Instruções foram seguidas
     - Estrutura STAR mantida

- [ ] **Teste 4: Tradução ao Reescrever**
  1. Ter STAR Case em PT
  2. Reescrever com idioma EN
  3. Verificar se foi traduzido
  4. Vice-versa (EN → PT)

### Testes de Modo Prática
- [ ] **Teste 5: Teleprompter**
  1. Ir em Experiências → Card com STAR Cases → "PRACTICE"
  2. Clicar em "TELEPROMPTER" em um STAR Case
  3. Verificar se:
     - Modal abre em tela grande
     - Conteúdo está formatado (S, T, A, R com cores)
     - Botão Play inicia scroll automático
     - Velocidade pode ser ajustada (Settings)
     - Tamanho de fonte pode ser ajustado
     - Timer conta tempo decorrido
     - Fullscreen funciona
     - Pausar/Reset funcionam

- [ ] **Teste 6: Timer de Prática**
  1. Ir em Experiências → Card com STAR Cases → "PRACTICE"
  2. Clicar em "TIMER" em um STAR Case
  3. Verificar se:
     - Modal de timer abre
     - Timer padrão é 3 minutos (180s)
     - Start/Stop funcionam
     - Reset funciona
     - Modal fecha corretamente

### Testes de UI/UX
- [ ] **Teste 7: Layout de 2 Colunas**
  1. Ir em Experiências (listagem)
  2. Verificar se:
     - Cards têm 2 colunas no desktop
     - Coluna direita mostra contador de STAR Cases
     - Número é correto
     - Responsivo em mobile (1 coluna)

- [ ] **Teste 8: Botão Practice Desabilitado**
  1. Criar experiência SEM STAR Cases
  2. Verificar se botão "PRACTICE" está desabilitado/cinza
  3. Adicionar 1 STAR Case
  4. Verificar se botão ficou habilitado

- [ ] **Teste 9: Botões Voltar**
  1. Ir em Experiências → "Voltar" deve ir para Dashboard
  2. Ir em Competências → "Voltar" deve ir para Dashboard
  3. Verificar navegação correta

### Testes de Integração
- [ ] **Teste 10: Fluxo Completo**
  1. Criar nova Experiência
  2. Adicionar info básica (empresa, cargo, período)
  3. Gerar STAR Case com IA (modo automático)
  4. Editar STAR Case gerado
  5. Reescrever com IA adicionando instruções
  6. Salvar experiência
  7. Ir para página de prática
  8. Testar teleprompter
  9. Testar timer
  10. Voltar e editar novamente

### Testes de Erro
- [ ] **Teste 11: Sem API Key**
  1. Remover `GOOGLE_AI_API_KEY` do `.env.local`
  2. Tentar gerar STAR Case
  3. Verificar mensagem de erro amigável

- [ ] **Teste 12: Rate Limiting**
  1. Gerar múltiplos STAR Cases rapidamente (>10 em 1 minuto)
  2. Verificar mensagem de rate limit

- [ ] **Teste 13: Sem Contexto**
  1. Limpar context-files (renomear .md para .bak)
  2. Gerar STAR Case
  3. Verificar se funciona apenas com Profile básico
  4. Restaurar context-files

## 🎯 Próximos Passos (Sessão 6)

**Status atual:** Fase 2 100% completa! Todas as seções têm CRUD funcional + IA integrada.

**Opções de continuação:**

### Opção A: Geração IA para Competências 🤖
**O que falta:**

- [ ] Gerar Competência com IA (baseado em cv.md e competencias.md)
- [ ] Sugerir Track Record para competência existente
- [ ] Gerar descrições bilíngues (PT/EN)
- [ ] Sugerir evidências baseadas em experiências cadastradas
- [ ] Integração com context-files

**Complexidade:** Média | **Impacto:** Alto | **Tempo estimado:** 2-3h

### Opção B: Melhorias no Dashboard 📊
**O que falta:**

- [ ] Gráfico de progresso (quantos items por seção)
- [ ] Widget "Próximas revisões" (STAR Cases sem prática há X dias)
- [ ] Estatísticas de uso da IA (quantas gerações por semana)
- [ ] Quick actions (botões para criar novo item de cada tipo)
- [ ] Últimos 5 items editados (atualmente mostra 10)
- [ ] Filtro de favoritos no dashboard

**Complexidade:** Baixa-Média | **Impacto:** Médio | **Tempo estimado:** 1-2h

### Opção C: Export & Sharing 📤
**O que falta:**

- [ ] Export de Experiências (PDF/Markdown) - similar aos já implementados
- [ ] Export de Competências (PDF/Markdown)
- [ ] Export consolidado: "Meu Portfólio Completo" (todas as seções)
- [ ] Preview antes do export
- [ ] Formatação customizada (com/sem versões, com/sem drafts)

**Complexidade:** Baixa | **Impacto:** Médio | **Tempo estimado:** 1-2h

### Opção D: Modo Prática Avançado 🎯
**O que falta:**

- [ ] Gravação de áudio durante prática
- [ ] Análise de performance (tempo, pausas, velocidade de fala)
- [ ] Histórico de práticas (quantas vezes praticou cada item)
- [ ] Feedback visual após prática (score, sugestões)
- [ ] Modo "Entrevista simulada" (perguntas aleatórias + timer)

**Complexidade:** Alta | **Impacto:** Alto | **Tempo estimado:** 4-5h

### Opção E: UX Polish & Refinamentos 🎨
**O que falta:**

- [ ] Loading skeletons em vez de texto "Carregando..."
- [ ] Animações de transição entre páginas
- [ ] Tooltips explicativos em formulários
- [ ] Mensagens de estado vazio mais amigáveis
- [ ] Atalhos de teclado (criar novo, buscar, etc)
- [ ] Breadcrumbs de navegação
- [ ] Dark mode refinements (se necessário)

**Complexidade:** Baixa-Média | **Impacto:** Médio | **Tempo estimado:** 2-3h

### Opção F: Busca & Filtros 🔍
**O que falta:**

- [ ] Busca global (search bar no header)
- [ ] Busca por seção (filtrar icebreakers, speeches, etc)
- [ ] Filtros avançados (favoritos, arquivados, por tag, por data)
- [ ] Ordenação customizada (alfabética, data, mais praticados)
- [ ] Paginação ou scroll infinito (se muitos items)

**Complexidade:** Média | **Impacto:** Alto (melhora muito UX) | **Tempo estimado:** 2-3h

---

### 💡 Recomendação

**Prioridade 1 (Essencial):** Opção A - Geração IA para Competências
- Completa a paridade de features de IA entre todas as seções
- Competências é a única seção sem IA ainda
- Aproveita context-files já configurados

**Prioridade 2 (Alta):** Opção F - Busca & Filtros
- Fundamental quando houver muitos items cadastrados
- Melhora muito a usabilidade
- Relativamente rápido de implementar

**Prioridade 3 (Média):** Opção B - Melhorias no Dashboard
- Dashboard é a primeira tela que o usuário vê
- Mostra progresso e motiva uso contínuo
- Rápido de implementar

---

### 📋 Checklist Pós-Implementação

Sempre que concluir uma sessão:

- [ ] Rodar `npm run lint` e corrigir warnings
- [ ] Rodar `npm run typecheck` e garantir sem erros
- [ ] Testar fluxo completo na UI
- [ ] Atualizar TODO.md com status
- [ ] Commitar mudanças com mensagem descritiva

---

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

### 2.1 Icebreakers [PRIORIDADE ALTA] ✅ COMPLETO
- [x] CRUD completo (criar, editar, listar, arquivar)
- [x] Formulário com React Hook Form + Zod
- [x] Favoritar icebreakers
- [x] Tipos: elevator_pitch, quick_intro, personal_story
- [x] Gerenciar múltiplas versões (Json array no schema)
- [x] Mutations tRPC: create, update, delete, archive, favorite
- [x] Botão "Gerar com IA" (UI completa + endpoint integrado)
- [x] Modal de visualização de versões
- [x] Durações ajustadas (1-2min / 2-4min / 4-6min)
- [x] Configuração de geração: categoria + orientações customizadas
- [x] Botão "Editar com IA" para ajustes granulares de versões
- [x] Prompts otimizados para tom LEVE e CONVERSACIONAL

### 2.2 Speeches [PRIORIDADE ALTA] ✅ COMPLETO
- [x] CRUD completo com versioning
- [x] Editor de texto simples (textarea, não rich text ainda)
- [x] Página de visualização de speech
- [x] Campo de duração estimada (minutos)
- [x] Áreas de foco (tags array)
- [x] Mutations tRPC: create, update, delete, favorite, archive
- [x] Botão "Gerar com IA" (UI completa + endpoint integrado)
- [x] Configuração de geração: nome empresa + descrição vaga
- [x] Botão "Editar com IA" para refinamento de conteúdo
- [x] Prompts otimizados para tom ESTRUTURADO e PROFISSIONAL

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

## Fase 3 · Camada de IA & Automação (🤖 parcialmente completo)

### 3.1 Configuração Base ✅ COMPLETO
- [x] Instalar SDK do Google AI (Gemini 2.5 Pro) - `@google/generative-ai`
- [x] Criar módulo `lib/ai/gemini.ts` como provider principal
- [x] Configurar `GOOGLE_AI_API_KEY` em `.env.local`
- [x] Sistema básico de rate limiting em memória (10 req/min)
- [x] Error handling e mensagens amigáveis na UI

### 3.2 Prompts Essenciais [ALTA PRIORIDADE] ✅ COMPLETO
- [x] **Gerar Icebreaker**
  - [x] Input: Profile + categoria (8 opções) + orientações customizadas
  - [x] Output: 3 versões de apresentação (Curta, Média, Longa)
  - [x] Tipos: elevator_pitch, quick_intro, personal_story
  - [x] Endpoint tRPC: `icebreakers.generateWithAI`
  - [x] UI: Dialog com seleção de tipo + categoria + instruções
  - [x] Cria automaticamente icebreaker com versões geradas
  - [x] Tom LEVE e CONVERSACIONAL para uso com teleprompter

- [x] **Editar Icebreaker**
  - [x] Input: Conteúdo atual + instruções de edição
  - [x] Output: Versão editada mantendo tom conversacional
  - [x] Endpoint tRPC: `icebreakers.editWithAI`
  - [x] UI: Botão ao lado de "Remover" + Dialog com textarea
  - [x] Permite ajustes granulares: "fale da empresa X", "foram 14 anos, não 15"

- [x] **Gerar Speech**
  - [x] Input: Profile + tipo de vaga + foco + duração + empresa + descrição vaga
  - [x] Output: discurso completo estruturado
  - [x] Considerar: foco, duração, tom profissional
  - [x] Endpoint tRPC: `speeches.generateWithAI`
  - [x] UI: Dialog com inputs de configuração
  - [x] Cria automaticamente speech com conteúdo gerado
  - [x] Tom ESTRUTURADO e PROFISSIONAL para CV speech genérico

- [x] **Editar Speech**
  - [x] Input: Conteúdo atual + instruções de edição
  - [x] Output: Versão editada mantendo tom profissional
  - [x] Endpoint tRPC: `speeches.editWithAI`
  - [x] UI: Botão no topo do campo de conteúdo + Dialog
  - [x] Permite refinamentos mantendo estrutura profissional

- [x] **Revisar STAR Case** (função implementada, UI pendente)
  - [x] Função `reviewStarCase()` em `lib/ai/gemini.ts`
  - [x] Validar: tem S, T, A, R?
  - [x] Sugerir: métricas quantificáveis, clareza, impacto
  - [x] Retornar score de qualidade (0-100)
  - [ ] Integrar endpoint tRPC
  - [ ] Criar UI de revisão

### 3.3 Nice-to-have [BACKLOG]
- [ ] Sugerir perguntas para entrevistadores (baseado em vaga)
- [ ] Analisar competências e sugerir evidências
- [ ] Gerar respostas modelo para questions
- [ ] Traduzir conteúdo PT-BR → EN automaticamente

### 3.4 Integrações
- [x] Loading states durante geração de IA (spinner + mensagens)
- [x] Botão "Gerar com IA" nas páginas de Icebreakers e Speeches
- [x] Redirecionamento automático para edição após geração
- [x] Toast feedback de sucesso/erro
- [x] Modal de visualização de versões de Icebreakers
- [x] Context files para personalização da IA (/context-files/)
- [x] Prompts adaptados para usar contexto rico (CV, playbook, experiências, competências)
- [ ] Botões de "Regenerar" (dentro do formulário de edição)
- [ ] Histórico de gerações (opcional)
- [ ] Métricas de uso (tokens, tempo de resposta)

---

## Context Files · Sistema de IA Contextual (✅ implementado)

### Estrutura
```
/context-files/
├── README.md                    # Documentação
├── cv.template.md               # Template de CV
├── playbook.template.md         # Template de estratégias
├── experiencias.template.md     # Template de experiências
├── competencias.template.md     # Template de competências
├── cv.md                        # Seus dados (gitignored)
├── playbook.md                  # Seus dados (gitignored)
├── experiencias.md              # Seus dados (gitignored)
└── competencias.md              # Seus dados (gitignored)
```

### Como funciona
1. Preencha os templates `.template.md` com suas informações reais
2. Salve como `.md` (sem .template)
3. A IA lerá TODOS esses arquivos durante geração de conteúdo
4. Resultado: **apresentações altamente personalizadas** com métricas, realizações e tom de voz autêntico

### Benefícios
- ✅ Dados centralizados e versionáveis
- ✅ Fácil de editar (Markdown)
- ✅ Seguro (gitignored)
- ✅ IA usa contexto RICO em vez de apenas Profile básico
- ✅ Preparado para migração futura ao MongoDB

### Status
- [x] Estrutura criada com templates completos
- [x] .gitignore configurado (arquivos .md são privados)
- [x] Prompts da IA adaptados para ler context-files
- [x] Funções `generateIcebreaker` e `generateSpeech` integradas
- [x] **cv.md** preenchido com dados completos (202 linhas)
- [x] **playbook.md** preenchido com estratégias e tom de voz (366 linhas)
- [x] **experiencias.md** preenchido com STAR cases detalhados (687 linhas)
- [x] **competencias.md** preenchido com skills e evidências (711 linhas)
- [ ] Testar geração de IA com contexto rico
- [ ] Limpar pasta /temp (opcional)
- [ ] Migrar para MongoDB (Fase futura)

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

### 🎯 Melhorias UX (Alta Prioridade)
- [ ] **Pré-visualização** de conteúdo gerado antes de salvar
- [ ] **Comparação lado a lado** de versões (diff view)
- [ ] **Modo Teleprompter** para speeches (tela cheia, auto-scroll, controle de velocidade)
- [ ] **Export para PDF/Markdown** de Icebreakers e Speeches
- [ ] **Timer de prática** para speeches com controle de pausas
- [ ] **Gravação de áudio** para auto-avaliação e análise de tom

### 🔧 Melhorias Técnicas (Média Prioridade)
- [ ] **Rate Limiting com Redis/Upstash** (atual é em memória)
- [ ] **Filtros avançados** nas listagens (favoritos, arquivados, por tipo, por tags)
- [ ] **Busca full-text** de icebreakers/speeches por título ou conteúdo
- [ ] **Tracking de tokens** consumidos do Gemini para monitorar custos
- [ ] **Health check** da Google AI API Key
- [ ] **Testes unitários** do módulo de IA

### 📊 Dashboard & Métricas
- [ ] **Widgets de progresso** no dashboard inicial
  - Total de items por seção
  - Últimas criações/edições
  - Items favoritos em destaque
  - Streak de dias praticando
- [ ] **Estatísticas de uso da IA**
  - Gerações por semana
  - Tipos de conteúdo mais gerados
  - Taxa de aprovação (editados vs descartados)

### 🤖 IA Avançada
- [ ] **Perguntas interativas** da IA durante criação de conteúdo
  - "Qual foi o maior desafio desse projeto?"
  - "Que métricas você tem desse resultado?"
  - "Como isso se conecta com a vaga X?"
- [ ] **Sugestões proativas** de melhorias em conteúdo existente
- [ ] **Análise de fit** com descrição de vaga (match score + sugestões)
- [ ] **Modo "coach"** com chat orientado por IA usando contexto do usuário
- [ ] **Tradução automática** PT-BR → EN dos conteúdos
- [ ] Integração com calendário para agendar sessões de prática
- [ ] Conector com plataformas externas (LinkedIn, Google Drive)

### 🎮 Gamificação
- [ ] Pontos, badges, níveis por completude
- [ ] Ranking de STAR cases por qualidade
- [ ] Conquistas desbloqueáveis
- [ ] Desafios semanais de prática

### 🌐 Compartilhamento & Colaboração
- [ ] PWA / modo offline
- [ ] Compartilhamento público de portfolio
- [ ] Links compartilháveis de speeches (view-only)
- [ ] Modo de revisão por pares (feedback de colegas)

### ✏️ Edição Avançada
- [ ] Editor rich text (TipTap) para speeches
- [ ] Markdown support nativo
- [ ] Templates customizáveis por tipo de vaga
- [ ] Sistema de snippets/blocos reutilizáveis

---

### Rotina Sugerida

1. Antes de cada iteração: revisar este TODO e CONTEXT.md
2. Ao finalizar um bloco: rodar `npm run lint`, `npm run typecheck`, `npm run build`
3. Testar endpoints: `npx tsx scripts/test-trpc.ts`
4. Documentar decisões importantes no CONTEXT.md
5. Manter backups sensíveis (env, seeds reais) fora do repositório

---

### Ordem de Implementação Recomendada

**Semana 1-2:** Fase 2.1 + 2.2 (Icebreakers + Speeches CRUD) ✅
**Semana 3:** Fase 3.1 + 3.2 (Setup Gemini + Prompts essenciais) ✅
**Semana 4:** Fase 2.3 + 2.4 + 2.5 (Questions + Experiências + Competências CRUD)
**Semana 5:** Fase 3.3 + UI de revisão STAR
**Semana 6:** Fase 2.6 + 4 (Dashboard + UX polish)
**Semana 7:** Fase 5 (Deploy + CI/CD)
