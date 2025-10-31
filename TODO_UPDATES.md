# Atualizações TODO.md - 31 de Outubro de 2025 (Noite)

> **Instrução:** Copie e cole essas seções no TODO.md conforme indicado

---

## 🔄 ATUALIZAR HEADER

Substituir linha 3-5 por:

```markdown
**Atualização:** 31 de outubro de 2025 (noite)
**Status atual:** Fase 2.1 + 2.2 + Fase 3 (IA contextual) completas ✅
**Objetivo:** Tornar as seções de "Interview Prep" totalmente funcionais com dados reais e automações de IA personalizadas
```

---

## 🔄 ATUALIZAR SEÇÃO 3.4 (Linha ~143)

Substituir a seção 3.4 Integrações por:

```markdown
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
```

---

## ➕ ADICIONAR NOVA SEÇÃO ANTES DE "Fase 4"

```markdown
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
- [ ] Preencher templates com dados reais (ação do usuário)
- [ ] Migrar para MongoDB (Fase futura)

---
```

---

## 🔄 SUBSTITUIR SEÇÃO "Backlog / Ideias Futuras"

Substituir toda a seção "Backlog / Ideias Futuras" por:

```markdown
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
```

---

## 📝 CHANGELOG DESTA SESSÃO

### Implementado
- ✅ Estrutura /context-files/ com 4 templates completos
- ✅ Sistema de leitura de context files pela IA
- ✅ Prompts atualizados para IA contextual rica
- ✅ Ajuste de durações dos icebreakers (30-60s / 1-2min / 2-4min)
- ✅ Modal de visualização de versões com cards
- ✅ .gitignore configurado para proteger dados pessoais
- ✅ Script de verificação de Profile

### Arquivos Criados/Modificados
```
CRIADOS:
+ context-files/README.md
+ context-files/cv.template.md
+ context-files/playbook.template.md
+ context-files/experiencias.template.md
+ context-files/competencias.template.md
+ components/icebreakers/view-versions-modal.tsx
+ scripts/check-profile.ts
+ TODO_UPDATES.md (este arquivo)

MODIFICADOS:
* lib/ai/gemini.ts (context files + durações)
* components/icebreakers/icebreaker-card.tsx (modal)
* .gitignore (context-files)
```

---

## 🎯 PRÓXIMA AÇÃO DO USUÁRIO

1. **Preencher context files:**
   - Copiar templates
   - Renomear (remover `.template`)
   - Preencher com dados reais

2. **Testar geração com IA:**
   - Gerar Icebreaker com IA
   - Verificar se está usando contexto rico
   - Ajustar playbook se necessário

3. **Aplicar atualizações no TODO.md:**
   - Revisar este arquivo
   - Copiar seções para TODO.md
   - Ou simplesmente substituir TODO.md por versão atualizada
