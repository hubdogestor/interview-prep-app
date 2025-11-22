# 🚀 Deploy Rápido - leon4rdo.dev

## ⚡ Guia em 5 Minutos

### 1️⃣ MongoDB Atlas (2 min)

Acesse: <https://cloud.mongodb.com/>

**Network Access:**

- Add IP Address → `0.0.0.0/0` (Allow from anywhere)

**Database Access:**

- Criar novo usuário: `interview-prod`
- Senha: **SEM** caracteres especiais (ex: `MyP4ssw0rd2025`)
- Role: `Read and write to any database`

**Connection String:**

```text
mongodb+srv://interview-prod:MyP4ssw0rd2025@cluster0.dpfuagq.mongodb.net/interview-prep?retryWrites=true&w=majority
```

---

### 2️⃣ Vercel Deploy (2 min)

Acesse: <https://vercel.com/>

1. **New Project** → Import `hubdogestor/interview-prep-app`
2. **Environment Variables** (copie e cole):

```env
DATABASE_URL=mongodb+srv://SEU_USUARIO:SUA_SENHA@cluster0.dpfuagq.mongodb.net/interview-prep?retryWrites=true&w=majority
ANTHROPIC_API_KEY=sk-ant-api03-SEU_TOKEN_AQUI
GOOGLE_AI_API_KEY=SEU_GOOGLE_AI_KEY_AQUI
OPENAI_API_KEY=sk-proj-SEU_OPENAI_KEY_AQUI
NEXT_PUBLIC_APP_URL=https://leon4rdo.dev
```

**⚠️ IMPORTANTE**: Copie as chaves do seu `.env.local` - NUNCA exponha chaves reais em documentação!

3. **Deploy** → Aguardar build

---

### 3️⃣ Name.com DNS (1 min)

Acesse: <https://www.name.com/account/domain/details/leon4rdo.dev#dns>

**Gerenciar DNS → Adicionar Registros:**

```text
Type: A
Host: @
Answer: 76.76.21.21
TTL: 300

Type: CNAME  
Host: www
Answer: cname.vercel-dns.com
TTL: 300
```

**Salvar mudanças**

---

### 4️⃣ Vercel - Adicionar Domínio (30 seg)

No projeto Vercel:

1. **Settings** → **Domains**
2. Add: `leon4rdo.dev`
3. Add: `www.leon4rdo.dev`

---

### 5️⃣ Aguardar & Testar (15-30 min)

**DNS Propagation:** 15-30 minutos

**Verificar:**

- <https://leon4rdo.dev> ✅
- <https://www.leon4rdo.dev> ✅
- SSL ativo (cadeado) ✅

---

## 🎯 Pronto!

Seu site está no ar em **leon4rdo.dev**

### 📱 Teste Agora

1. Navegação entre páginas
2. Links do Interview Prep
3. Painéis redimensionáveis
4. Criar/editar dados (Kanbans, Speeches)

---

## ❓ Problemas?

### Site não abre

- Aguarde 30min (DNS propagation)
- Verifique DNS: <https://dnschecker.org/#A/leon4rdo.dev>

### Erro 502

- Verifique MongoDB Atlas está ativo
- Confirme variáveis de ambiente na Vercel
- Veja logs: Vercel → Deployments → Functions

### Dados não salvam

- Teste connection string localmente
- Verifique IP liberado no MongoDB
- Confirme permissões do usuário

---

## 🔐 IMPORTANTE - Segurança

**Após deploy, REGENERE estas chaves:**

- [ ] Anthropic API Key
- [ ] Google AI API Key
- [ ] OpenAI API Key
- [ ] Senha MongoDB

**As chaves neste documento são PÚBLICAS agora!**

---

## 📚 Documentação Completa

Para guia detalhado: `DEPLOYMENT_GUIDE.md`

Para troubleshooting avançado: <https://vercel.com/docs>

---

**Deploy feito com ❤️ por Leonardo Menezes**
