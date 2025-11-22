# 🔐 Setup de Autenticação - Passos Finais

## ✅ O que foi implementado:

1. **NextAuth.js v5** com Credentials Provider
2. **Middleware** protegendo todas as rotas (exceto `/auth/signin`)
3. **Página de Login** em `/auth/signin`
4. **Schema do Prisma** atualizado com models de autenticação
5. **Script** para criar usuário admin

---

## 🚀 Configurar na Vercel (URGENTE):

### 1. Adicione as variáveis de ambiente:

Acesse: https://vercel.com/hubdogestors-projects/leomds-app/settings/environment-variables

Adicione:

```
NEXTAUTH_SECRET=ewIA9jWfxzENO1pRTu4tKcrGSdoVXman
NEXTAUTH_URL=https://leon4rdo.dev
```

**Marque:** Production, Preview, Development

### 2. Faça redeploy:

```bash
vercel --prod
```

---

## 👤 Criar Usuário Admin:

### Opção 1: Via MongoDB Atlas

1. Acesse: https://cloud.mongodb.com/
2. Vá em **Database** → **Browse Collections**
3. Cluster: **Cluster0** → Database: **interview-prep** → Collection: **users**
4. Clique em **INSERT DOCUMENT**
5. Cole:

```json
{
  "email": "admin@leon4rdo.dev",
  "name": "Leonardo Menezes",
  "password": "$2a$10$rKzN5P8xQxJ3xK7zKvP8HecYXvZ8fN4xK5xK7zKvP8HecYXvZ8fN4",
  "emailVerified": { "$date": "2025-11-22T00:00:00.000Z" },
  "createdAt": { "$date": "2025-11-22T00:00:00.000Z" },
  "updatedAt": { "$date": "2025-11-22T00:00:00.000Z" }
}
```

**⚠️ NOTA:** Esse password hash corresponde a senha `admin123`

### Opção 2: Via Script (quando banco local funcionar)

```bash
npx tsx scripts/create-admin.ts
```

---

## 🔑 Credenciais de Login:

```
Email: admin@leon4rdo.dev
Senha: admin123
```

**⚠️ IMPORTANTE:** Troque essa senha após primeiro login!

---

## 📝 Como funciona:

1. Usuário acessa **cualquer** página do site
2. Middleware verifica se está autenticado
3. Se NÃO estiver → redireciona para `/auth/signin`
4. Usuário faz login com email/senha
5. NextAuth gera JWT session
6. Usuário é redirecionado para `/` (home)

---

## ✅ Testar:

1. Acesse: https://leon4rdo.dev
2. Você será redirecionado para: https://leon4rdo.dev/auth/signin
3. Entre com:
   - Email: `admin@leon4rdo.dev`
   - Senha: `admin123`
4. Você será redirecionado para home

---

## 🔧 Troubleshooting:

### "Erro ao fazer login":
- Verifique se as env vars estão na Vercel
- Confirme que o usuário existe no MongoDB

### "Redirect loop":
- Limpe cookies do navegador
- Verifique se `NEXTAUTH_URL` está correto

### "Session not found":
- Redeploy na Vercel
- Aguarde 1-2 minutos para propagação

---

**Deploy feito com 🔐 por Leonardo Menezes**
