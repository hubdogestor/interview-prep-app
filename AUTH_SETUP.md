# 🔐 Guia de Autenticação - NextAuth.js

## 📋 Visão Geral

Vamos implementar autenticação com **NextAuth.js v5** (Auth.js) para proteger sua aplicação.

### Recursos

- ✅ Login com Google/GitHub
- ✅ Sessão persistente
- ✅ Proteção de rotas
- ✅ Middleware automático
- ✅ Suporte a múltiplos usuários (futuro)

---

## 🚀 Instalação

```bash
npm install next-auth@beta @auth/prisma-adapter
```

---

## 📝 Configuração

### 1. Atualizar Prisma Schema

Adicione os models de autenticação:

```prisma
// prisma/schema.prisma

// Adicione estes models ao final do arquivo

model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.String
  access_token      String? @db.String
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.String
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  sessionToken String   @unique
  userId       String   @db.ObjectId
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verificationtokens")
}

// Atualizar model User existente
model User {
  id               String            @id @default(auto()) @map("_id") @db.ObjectId
  email            String            @unique
  name             String?
  emailVerified    DateTime?
  image            String?           // Adicionar esta linha
  accounts         Account[]         // Adicionar esta linha
  sessions         Session[]         // Adicionar esta linha
  profiles         Profile[]
  icebreakers      Icebreaker[]
  competencias     Competencia[]
  experiencias     Experiencia[]
  speeches         Speech[]
  questions        Question[]
  practiceSessions PracticeSession[]
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt

  @@map("users")
}
```

### 2. Criar Configuração do NextAuth

```typescript
// lib/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute = !nextUrl.pathname.startsWith("/auth");
      
      if (isOnProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redireciona para login
      }
      
      return true;
    },
  },
});
```

### 3. Configurar API Route

```typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

### 4. Criar Middleware de Proteção

```typescript
// middleware.ts
export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (API routes para NextAuth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/* (páginas de autenticação)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|auth).*)',
  ],
};
```

### 5. Criar Página de Login

```tsx
// app/auth/signin/page.tsx
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Interview Prep App
          </CardTitle>
          <CardDescription>
            Faça login para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <Button type="submit" className="w-full" variant="outline">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </Button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/" });
            }}
          >
            <Button type="submit" className="w-full" variant="outline">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continuar com GitHub
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 6. Atualizar Layout para Mostrar Usuário

```tsx
// components/dashboard/sidebar/index.tsx
import { auth } from "@/lib/auth";

export async function DashboardSidebar() {
  const session = await auth();
  
  // Use session.user.name, session.user.email, session.user.image
  
  return (
    <Sidebar>
      {/* ... código existente ... */}
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{session?.user?.name}</p>
            <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
```

---

## 🔑 Obter Credenciais OAuth

### Google OAuth

1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione existente
3. Vá em **APIs & Services** → **Credentials**
4. **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure:
   - Application type: **Web application**
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://leon4rdo.dev/api/auth/callback/google`
6. Copie **Client ID** e **Client Secret**

### GitHub OAuth

1. Acesse: https://github.com/settings/developers
2. **New OAuth App**
3. Configure:
   - Homepage URL: `https://leon4rdo.dev`
   - Authorization callback URL: `https://leon4rdo.dev/api/auth/callback/github`
4. Copie **Client ID** e gere um **Client Secret**

---

## 🔐 Variáveis de Ambiente

Adicione ao `.env.local`:

```env
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere-um-secret-aleatorio-aqui"

# Google OAuth
GOOGLE_CLIENT_ID="seu-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="seu-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="seu-github-client-id"
GITHUB_CLIENT_SECRET="seu-github-client-secret"
```

**Gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 🧪 Testar Localmente

```bash
# Gerar Prisma Client com novos models
npx prisma generate

# Fazer push das mudanças no schema
npx prisma db push

# Iniciar servidor
npm run dev
```

Acesse: http://localhost:3000

Você deve ser redirecionado para a tela de login automaticamente!

---

## 🚀 Deploy com Autenticação

### Na Vercel

Adicione as variáveis de ambiente:

```env
NEXTAUTH_URL=https://leon4rdo.dev
NEXTAUTH_SECRET=seu-secret-gerado
GOOGLE_CLIENT_ID=seu-client-id
GOOGLE_CLIENT_SECRET=seu-secret
GITHUB_CLIENT_ID=seu-client-id
GITHUB_CLIENT_SECRET=seu-secret
```

### Atualizar OAuth Callbacks

Nos consoles do Google e GitHub, adicione:
- `https://leon4rdo.dev/api/auth/callback/google`
- `https://leon4rdo.dev/api/auth/callback/github`

---

## ✅ Resultado Final

- ✅ Apenas usuários autenticados acessam a aplicação
- ✅ Login com Google ou GitHub
- ✅ Sessão persistente
- ✅ Avatar e dados do usuário visíveis
- ✅ Botão de logout

---

## 💡 Próximos Passos

1. **Adicionar roles** (admin, user)
2. **Limitar acesso por email** (whitelist)
3. **Multi-tenancy** (cada usuário vê seus dados)
4. **Audit log** (quem fez o quê)

---

**Estimativa de implementação**: 1-2 horas

**Documentação completa**: https://authjs.dev/
