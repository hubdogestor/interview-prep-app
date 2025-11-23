# 🔒 Guia de Configuração para Produção

## ✅ O que foi implementado

Seu sistema agora possui **autenticação completa** e os dados são salvos **por usuário** no banco de dados MongoDB.

### Mudanças realizadas:

1. ✅ **Middleware de autenticação** (`protectedProcedure`) adicionado ao tRPC
2. ✅ **Todos os routers principais** agora exigem autenticação:
   - Questions
   - Icebreakers
   - Competências
   - Experiências
   - Speeches
3. ✅ **Dados isolados por usuário** - cada usuário vê apenas seus próprios dados
4. ✅ **userId associado automaticamente** em todas as criações

---

## 🚀 Configuração no Ambiente de Produção (Vercel)

### 1. Banco de Dados MongoDB

Você precisa de um banco MongoDB. Recomendo usar o **MongoDB Atlas** (gratuito):

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita
3. Crie um **novo cluster** (tier gratuito M0)
4. Em **Database Access**, crie um usuário com permissões de leitura/escrita
5. Em **Network Access**, adicione `0.0.0.0/0` (permitir todos os IPs) ou IPs específicos da Vercel
6. Clique em **Connect** → **Connect your application**
7. Copie a string de conexão (parecida com):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database_name>?retryWrites=true&w=majority
   ```

### 2. Configurar Variáveis de Ambiente na Vercel

Acesse seu projeto na Vercel e vá em **Settings** → **Environment Variables**

Adicione as seguintes variáveis:

#### **Obrigatórias:**

| Nome | Valor | Descrição |
|------|-------|-----------|
| `DATABASE_URL` | `mongodb+srv://...` | String de conexão do MongoDB Atlas |
| `NEXTAUTH_SECRET` | (gerar novo) | Chave secreta para JWT do NextAuth |
| `NEXTAUTH_URL` | `https://seu-site.vercel.app` | URL do seu site em produção |

#### **Opcionais (para funcionalidades de IA):**

| Nome | Valor | Descrição |
|------|-------|-----------|
| `GOOGLE_AI_API_KEY` | `sua-chave` | Para Gemini AI (sugestões) |
| `ANTHROPIC_API_KEY` | `sua-chave` | Para Claude (opcional) |
| `OPENAI_API_KEY` | `sua-chave` | Para ChatGPT (opcional) |

**Para gerar o `NEXTAUTH_SECRET`**, execute no terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Ou use este site: https://generate-secret.vercel.app/32

### 3. Configurar Variáveis Localmente (Desenvolvimento)

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/interview_prep

# Authentication
NEXTAUTH_SECRET=sua-chave-secreta-gerada
NEXTAUTH_URL=http://localhost:3000

# AI APIs (Opcional)
GOOGLE_AI_API_KEY=sua-chave-gemini
ANTHROPIC_API_KEY=sua-chave-anthropic
OPENAI_API_KEY=sua-chave-openai

# Environment
NODE_ENV=development
```

### 4. Sincronizar o Schema do Prisma

Após configurar o banco de dados, você precisa sincronizar o schema:

```bash
# Gerar cliente Prisma
npx prisma generate

# Sincronizar schema com o banco (MongoDB não usa migrations)
npx prisma db push
```

### 5. Criar o Primeiro Usuário

Execute o script de seed ou crie manualmente via código:

```bash
# Opção 1: Seed (se existir)
npx prisma db seed

# Opção 2: Criar via página de registro
# Acesse http://localhost:3000/auth/signin e crie uma conta
```

---

## 🔐 Como Funciona a Autenticação

### Login
- Usuários fazem login em `/auth/signin`
- NextAuth.js gerencia a sessão via JWT
- Token armazenado em cookie seguro (httpOnly)

### Proteção de Rotas
- Todas as APIs tRPC agora usam `protectedProcedure`
- Se não houver sessão válida, retorna erro `UNAUTHORIZED`
- Frontend deve redirecionar para login quando receber erro 401

### Isolamento de Dados
- Cada query/mutation filtra automaticamente por `userId`
- Usuário A não consegue ver/editar dados do Usuário B
- `userId` é extraído da sessão JWT no servidor

---

## 🧪 Testar Localmente

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse `http://localhost:3000`

3. Faça login (se não tiver conta, crie uma)

4. Crie alguns conteúdos (questions, icebreakers, etc.)

5. Verifique no MongoDB Atlas se os dados estão sendo salvos com `userId`

---

## 📊 Verificar no MongoDB Atlas

1. Acesse MongoDB Atlas
2. Vá em **Browse Collections**
3. Selecione seu database
4. Verifique as collections: `questions`, `icebreakers`, `competencias`, etc.
5. Cada documento deve ter um campo `userId` associado

---

## ⚠️ Problemas Comuns

### "UNAUTHORIZED" nas requisições
- **Causa**: Usuário não está autenticado
- **Solução**: Verificar se o login está funcionando e se o token JWT está sendo enviado

### Dados não aparecem após login
- **Causa**: `userId` não está sendo filtrado corretamente
- **Solução**: Verificar se o código está usando `ctx.userId` nas queries

### Erro de conexão com banco de dados
- **Causa**: `DATABASE_URL` incorreta ou IP não liberado no MongoDB Atlas
- **Solução**: Verificar string de conexão e configurações de Network Access

### Múltiplos usuários veem os mesmos dados
- **Causa**: Filtro por `userId` não implementado
- **Solução**: Já implementado! Verifique se está usando a versão atualizada do código

---

## 🎯 Próximos Passos

- [ ] Criar página de registro (`/auth/signup`)
- [ ] Adicionar recuperação de senha
- [ ] Implementar email de verificação (opcional)
- [ ] Adicionar perfil do usuário
- [ ] Implementar soft delete (arquivar ao invés de deletar)
- [ ] Adicionar logs de auditoria

---

## 📚 Recursos Úteis

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma with MongoDB](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [tRPC Authentication](https://trpc.io/docs/server/middlewares)

---

## 🆘 Suporte

Se encontrar problemas, verifique:
1. Logs do Vercel (Runtime Logs)
2. Console do navegador (erros de rede)
3. MongoDB Atlas logs
4. Variáveis de ambiente estão corretas

---

**Feito! Seus dados agora estão sendo salvos de forma segura e isolada por usuário.** 🎉
