# 🤖 Setup dos Context Files - IA Personalizada

Este guia te ajuda a configurar os **context files** para que a IA gere conteúdo altamente personalizado usando seus dados reais.

---

## 🎯 O que são Context Files?

São arquivos markdown na pasta `/context-files/` que contêm suas informações profissionais detalhadas. A IA lê TODOS esses arquivos ao gerar:
- Icebreakers
- Speeches
- STAR Cases (futuro)
- Qualquer conteúdo personalizado

---

## 📦 O que você precisa fazer

### 1️⃣ Copiar os Templates

```bash
cd context-files

# Windows (PowerShell)
Copy-Item cv.template.md cv.md
Copy-Item playbook.template.md playbook.md
Copy-Item experiencias.template.md experiencias.md
Copy-Item competencias.template.md competencias.md

# Mac/Linux
cp cv.template.md cv.md
cp playbook.template.md playbook.md
cp experiencias.template.md experiencias.md
cp competencias.template.md competencias.md
```

### 2️⃣ Preencher os Arquivos

Abra cada arquivo `.md` e preencha com suas informações reais:

#### `cv.md` - Seu Currículo
- Dados pessoais
- Resumo profissional
- Experiências (resumidas)
- Formação
- Certificações
- Projetos
- Objetivos de carreira

#### `playbook.md` - Sua Estratégia
- Tom de voz preferido
- Palavras/frases que você usa
- Palavras/frases que você evita
- Estratégias ATS (keywords)
- Como você quer se posicionar
- Histórias favoritas para contar

#### `experiencias.md` - Detalhes Profissionais
- Contexto de cada empresa
- Projetos em profundidade
- STAR cases preparados
- Tecnologias detalhadas
- Desafios superados
- Conquistas e reconhecimentos

#### `competencias.md` - Skills Detalhadas
- Competências técnicas com evidências
- Competências comportamentais
- Projetos que demonstram cada skill
- Como você aprende e ensina

---

## 🔒 Segurança

✅ Os arquivos `.md` (seus dados) estão no `.gitignore`
✅ Apenas os `.template.md` vão para o Git
✅ Suas informações ficam apenas no seu computador

**NUNCA** faça commit dos arquivos sem `.template`!

---

## 🎨 Exemplo de Preenchimento

### cv.md (exemplo parcial)
```markdown
# Curriculum Vitae

## 👤 Dados Pessoais

**Nome:** João Silva
**Título Profissional:** Senior Full-Stack Engineer
**Localização:** São Paulo, SP
**Email:** joao@example.com
**LinkedIn:** linkedin.com/in/joaosilva
**GitHub:** github.com/joaosilva

## 📝 Resumo Profissional

Engenheiro de software com 8+ anos de experiência construindo produtos
escaláveis para milhões de usuários. Especializado em arquitetura de
microsserviços, React, Node.js e AWS. Liderou times de 5+ engenheiros
e mentorou 10+ desenvolvedores júnior. Focado em excelência técnica e
entrega de valor ao negócio.

## 💼 Experiência Profissional

### TechCorp | Senior Software Engineer
**Período:** Jan/2020 - Atual
**Localização:** São Paulo, SP (Remote)

**Contexto:**
Fintech com 2M+ usuários, processando R$500M+ em transações mensais.
Time de 30 engenheiros divididos em 5 squads.

**Principais Realizações:**
- Liderei migração de monolito para microserviços, reduzindo tempo de
  deploy de 2h para 15min e aumentando disponibilidade de 99.5% para 99.9%
- Implementei sistema de processamento de pagamentos em tempo real que
  reduziu fraudes em 40% (R$2M+ economizados/ano)
- Mentorei 3 engenheiros júnior que foram promovidos a pleno em 18 meses

**Tecnologias:**
Node.js, React, TypeScript, AWS (Lambda, ECS, RDS), PostgreSQL, Redis,
Kafka, Docker, Kubernetes, Terraform
```

### playbook.md (exemplo parcial)
```markdown
# Playbook Pessoal

## 🎯 Tom de Voz

### Como eu me comunico:
- [x] Equilibrado (profissional mas humano)

### Palavras/frases que EU uso:
- "impacto mensurável"
- "entrega de valor"
- "excelência técnica"
- "times de alta performance"

### Palavras que EU EVITO:
- "Sou apaixonado por..." (muito clichê)
- "Ninja", "rockstar", "guru" (termos datados)
- Jargões corporativos vazios

## 💼 Estratégia de Posicionamento

### Meu diferencial:
Combino profundidade técnica (arquitetura, performance) com habilidade
de comunicação e liderança. Consigo traduzir requisitos complexos de
negócio em soluções técnicas elegantes e vice-versa.

### Quero ser reconhecido por:
- Excelência em arquitetura de sistemas escaláveis
- Liderança técnica e mentoria efetiva
- Foco em resultados mensuráveis para o negócio
```

---

## ✅ Checklist de Preenchimento

- [ ] Copiei todos os templates
- [ ] Preenchidos dados básicos (nome, título, contato)
- [ ] cv.md: resumo profissional completo
- [ ] cv.md: pelo menos 3 experiências detalhadas
- [ ] playbook.md: tom de voz definido
- [ ] playbook.md: palavras-chave para ATS listadas
- [ ] experiencias.md: pelo menos 2 projetos em profundidade
- [ ] experiencias.md: pelo menos 2 STAR cases preparados
- [ ] competencias.md: top 5 competências técnicas detalhadas
- [ ] competencias.md: top 3 competências comportamentais com evidências

---

## 🧪 Testando

Após preencher os arquivos:

1. **Gere um Icebreaker com IA:**
   - Acesse `/icebreakers`
   - Clique em "Gerar com IA"
   - Escolha um tipo
   - Aguarde a geração

2. **Verifique o resultado:**
   - ✅ Deve incluir informações REAIS do seu CV
   - ✅ Deve incluir MÉTRICAS dos seus projetos
   - ✅ Deve usar seu TOM DE VOZ do playbook
   - ✅ Deve soar NATURAL e PERSONALIZADO

3. **Se estiver genérico:**
   - Revise seus context files
   - Adicione mais detalhes e métricas
   - Ajuste o playbook com mais instruções
   - Tente novamente

---

## 🔄 Mantendo Atualizado

**A cada novo projeto/conquista:**
1. Adicione em `experiencias.md`
2. Atualize `cv.md` se relevante
3. Adicione nova competência em `competencias.md` se aplicável

**A cada nova estratégia/aprendizado:**
1. Atualize `playbook.md`
2. Adicione novas palavras-chave
3. Refine seu tom de voz

---

## 💡 Dicas Pro

### Para Icebreakers mais impactantes:
- Liste suas 3 maiores conquistas com métricas em `experiencias.md`
- Defina seu "gancho" único em `playbook.md`
- Mencione tecnologias de ponta que domina

### Para Speeches mais persuasivos:
- Prepare pelo menos 5 STAR cases completos
- Documente resultados quantificáveis
- Liste palavras-chave específicas da área alvo

### Para melhor personalização:
- Seja específico (evite generalizações)
- Use números e métricas reais
- Conte histórias concretas, não abstratas
- Defina claramente o que te torna único

---

## ❓ FAQ

**Q: Preciso preencher TODOS os templates?**
A: Não, mas quanto mais contexto, melhor a IA gera. Mínimo recomendado: cv.md + playbook.md

**Q: Posso editar depois?**
A: Sim! E deve. Mantenha sempre atualizado.

**Q: A IA vai usar TUDO que escrevi?**
A: Não necessariamente. Ela selecionará o mais relevante para cada tipo de conteúdo.

**Q: E se eu não tiver métricas?**
A: Tente estimar ou usar proxies (ex: "time de 5 pessoas", "projeto de 6 meses")

**Q: Posso adicionar mais arquivos?**
A: Tecnicamente sim, mas por ora mantenha os 4 principais.

---

## 🚀 Próximos Passos

Após configurar os context files:

1. ✅ Testar geração de Icebreakers
2. ✅ Testar geração de Speeches
3. ⏭️ Gerar STAR cases (quando implementado)
4. ⏭️ Migrar dados para MongoDB (fase futura)

---

**🎉 Pronto!** Agora a IA tem todo o contexto necessário para gerar conteúdo ALTAMENTE personalizado para você.
