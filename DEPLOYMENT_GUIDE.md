# 🚀 Guia de Deploy - leon4rdo.dev

## 📋 Índice
1. [Análise da Infraestrutura](#análise-da-infraestrutura)
2. [Configuração do MongoDB](#configuração-do-mongodb)
3. [Deploy na Vercel](#deploy-na-vercel)
4. [Configuração do Domínio](#configuração-do-domínio)
5. [Testando o Deploy](#testando-o-deploy)

---

## 🔍 Análise da Infraestrutura

### ✅ O que está CORRETO:
- **MongoDB Atlas**: Excelente escolha para banco externo
- **Next.js 14**: Framework moderno com App Router
- **Prisma**: ORM robusto para MongoDB
- **tRPC**: API type-safe para comunicação cliente/servidor
- **Vercel**: Melhor plataforma para Next.js

### ⚠️ Problemas Identificados:

#### 1. **Timeout do MongoDB**
```
Error: Kind: Server selection timeout: No available servers
```

**Causa**: Possível problema de:
- IP não liberado no MongoDB Atlas
- Credenciais incorretas
- Cluster pausado

**Solução**: Verificar e corrigir no MongoDB Atlas

#### 2. **Segurança das Credenciais**
- ❌ Credenciais expostas no `.env.local`
- ❌ Senha com caracteres especiais (`Livia@2701!`) que podem causar problemas

---

## 🗄️ Configuração do MongoDB

### Passo 1: Verificar MongoDB Atlas

1. Acesse https://cloud.mongodb.com/
2. Vá em **Database** → **Clusters**
3. Verifique se o cluster está **ATIVO** (não pausado)

### Passo 2: Liberar IP da Vercel

1. No MongoDB Atlas, vá em **Network Access**
2. Clique em **Add IP Address**
3. Selecione **Allow Access from Anywhere** (0.0.0.0/0)
4. Ou adicione os IPs da Vercel: https://vercel.com/docs/deployments/ip-addresses

### Passo 3: Criar Novo Usuário (Recomendado)

1. Vá em **Database Access**
2. Clique em **Add New Database User**
3. Crie com senha SEM caracteres especiais:
   ```
   Username: interview-prep-prod
   Password: [gere uma senha alfanumérica forte]
   Role: Read and write to any database
   ```

### Passo 4: Atualizar Connection String

```bash
mongodb+srv://interview-prep-prod:SENHA_AQUI@cluster0.dpfuagq.mongodb.net/interview-prep?retryWrites=true&w=majority&appName=Cluster0
```

**IMPORTANTE**: Substitua `SENHA_AQUI` pela senha real (sem caracteres especiais!)

---

## 🚀 Deploy na Vercel

### Passo 1: Instalar Vercel CLI (Opcional)

```bash
npm install -g vercel
```

### Passo 2: Deploy via GitHub (RECOMENDADO)

#### 2.1 Configurar GitHub

1. Commit e push das mudanças:
```bash
git add .
git commit -m "feat: prepare for production deployment"
git push origin main
```

#### 2.2 Conectar à Vercel

1. Acesse https://vercel.com/
2. Clique em **Add New** → **Project**
3. Importe o repositório `hubdogestor/interview-prep-app`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `prisma generate && next build`
   - **Output Directory**: .next

#### 2.3 Configurar Variáveis de Ambiente

Na Vercel, vá em **Settings** → **Environment Variables** e adicione:

```env
DATABASE_URL=mongodb+srv://interview-prep-prod:SENHA@cluster0.dpfuagq.mongodb.net/interview-prep?retryWrites=true&w=majority&appName=Cluster0
ANTHROPIC_API_KEY=sk-ant-api03-nQd2hZ9...
GOOGLE_AI_API_KEY=AIzaSyCZpEMZk7U7VMA1pkoCg0LpMKywV4dl8LE
OPENAI_API_KEY=sk-proj-F3JeKf7LLkTIrl...
NEXT_PUBLIC_APP_URL=https://leon4rdo.dev
```

**⚠️ IMPORTANTE**: 
- Marque todas como **Production**, **Preview** e **Development**
- NÃO compartilhe estas chaves publicamente

#### 2.4 Deploy

1. Clique em **Deploy**
2. Aguarde o build (2-5 minutos)
3. Acesse a URL temporária da Vercel (ex: `interview-prep-app.vercel.app`)

---

## 🌐 Configuração do Domínio (leon4rdo.dev)

### Passo 1: Na Vercel

1. Vá no seu projeto → **Settings** → **Domains**
2. Clique em **Add Domain**
3. Digite: `leon4rdo.dev`
4. Clique em **Add**
5. Adicione também: `www.leon4rdo.dev`

A Vercel vai mostrar os registros DNS necessários.

### Passo 2: No Name.com

#### Configuração DNS

1. Acesse https://www.name.com/account/domain/details/leon4rdo.dev
2. Clique em **Manage DNS Records** (Gerenciar registros DNS)
3. **DELETE** todos os registros A existentes
4. **ADICIONE** os seguintes registros:

**Para domínio raiz (leon4rdo.dev):**
```
Type: A
Host: @
Answer: 76.76.21.21
TTL: 300
```

**Para www (www.leon4rdo.dev):**
```
Type: CNAME
Host: www
Answer: cname.vercel-dns.com
TTL: 300
```

#### Configuração Alternativa (CNAME para ambos)

Se preferir usar CNAME para tudo:

1. **Delete** registros A existentes
2. **Adicione**:

```
Type: CNAME
Host: @
Answer: cname.vercel-dns.com
TTL: 300

Type: CNAME
Host: www
Answer: cname.vercel-dns.com
TTL: 300
```

### Passo 3: Aguardar Propagação

- Propagação DNS: 5 minutos a 48 horas (geralmente 15-30 minutos)
- Verificar em: https://dnschecker.org/#A/leon4rdo.dev

---

## ✅ Testando o Deploy

### 1. Verificar SSL

Acesse: https://leon4rdo.dev

- ✅ Deve ter certificado SSL (cadeado verde)
- ✅ Deve carregar a aplicação

### 2. Testar Funcionalidades

- ✅ Navegação entre páginas (Overview, OKRs, Kanbans)
- ✅ Links do Interview Prep (Icebreakers, Competências, etc)
- ✅ Painéis redimensionáveis
- ✅ Dados carregando do MongoDB

### 3. Verificar Logs

Na Vercel:
- Vá em **Deployments** → Clique no deploy → **Functions**
- Verifique se há erros

---

## 🔧 Troubleshooting

### Problema: "This site can't be reached"

**Solução**: DNS ainda não propagou. Aguarde 30 minutos.

### Problema: "502 Bad Gateway"

**Solução**: 
1. Verifique variáveis de ambiente na Vercel
2. Verifique logs do deployment
3. Confirme que MongoDB está acessível

### Problema: Páginas lentas

**Solução**:
1. Verifique se MongoDB está respondendo
2. Considere adicionar cache com Redis
3. Implemente ISR (Incremental Static Regeneration)

### Problema: Dados não salvam

**Solução**:
1. Verifique permissões do usuário MongoDB
2. Confirme que DATABASE_URL está correta
3. Verifique logs do Prisma na Vercel

---

## 🎯 Próximos Passos (Recomendações)

### 1. **Autenticação** (Alta Prioridade)
```bash
npm install next-auth@latest
```
- Implementar login com Google/GitHub
- Proteger rotas sensíveis
- Vincular dados ao usuário logado

### 2. **Monitoramento**
- Adicionar Sentry para error tracking
- Configurar Vercel Analytics
- Monitorar performance do MongoDB

### 3. **Cache e Performance**
```bash
npm install @vercel/kv redis
```
- Cache de queries frequentes
- ISR para páginas estáticas
- Edge Functions para latência baixa

### 4. **Backup**
- Configurar backup automático no MongoDB Atlas
- Implementar versionamento de dados críticos

### 5. **CI/CD**
- GitHub Actions para testes automatizados
- Deploy automático em cada push para main
- Preview deployments para PRs

---

## 📞 Suporte

- **Vercel**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Next.js**: https://nextjs.org/docs
- **Name.com DNS**: https://www.name.com/support

---

## ⚠️ SEGURANÇA - AÇÃO IMEDIATA NECESSÁRIA

### 🚨 URGENTE: Credenciais Expostas

Suas chaves de API estão no arquivo `.env.local` que pode ter sido commitado!

**Ações imediatas:**

1. **Verificar se foi commitado**:
```bash
git log --all --full-history -- .env.local
```

2. **Se SIM, REGENERAR TODAS AS CHAVES**:
   - Anthropic: https://console.anthropic.com/settings/keys
   - Google AI: https://makersuite.google.com/app/apikey
   - OpenAI: https://platform.openai.com/api-keys
   - MongoDB: Trocar senha do usuário

3. **Remover do histórico**:
```bash
# CUIDADO: Isso reescreve o histórico
git filter-branch --force --index-filter \
"git rm --cached --ignore-unmatch .env.local" \
--prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

4. **Adicionar ao .gitignore** (já deve estar):
```bash
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "chore: ensure .env.local is ignored"
git push
```

---

**Criado em**: 22 de novembro de 2025  
**Última atualização**: 22 de novembro de 2025  
**Versão**: 1.0.0
