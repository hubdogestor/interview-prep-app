# Interview Prep App - Template v0

## Visao geral

Stack reconstruida com o layout importado do v0.app. O objetivo desta fase e preparar a base de tooling e organizacao para reintroduzir as funcionalidades de dados, IA e automacao das iteracoes anteriores.

## Requisitos

- Node.js 22.x
- npm 10.x

Confirme as versoes com `node -v` e `npm -v` antes de iniciar.

## Passos iniciais

1. Instale dependencias: `npm install`
2. Rode em desenvolvimento: `npm run dev`
3. Abra http://localhost:3000 para ver o novo dashboard

## Scripts uteis

- `npm run dev` inicia o servidor de desenvolvimento
- `npm run build` gera build de producao
- `npm run start` sobe o build gerado
- `npm run lint` roda ESLint
- `npm run lint:fix` aplica correcoes automaticas do ESLint
- `npm run db:push` sincroniza o schema Prisma com o banco (`prisma db push`)
- `npm run db:generate` regenera o cliente Prisma
- `npm run db:seed` popula dados de desenvolvimento (usa `prisma/seed.ts`)
- `npm run db:studio` abre o Prisma Studio para inspecionar os dados
- `npm run typecheck` valida os tipos com TypeScript
- `npm run format` confere arquivos `md` e `json` com Prettier

## Qualidade e fluxo local

Antes de commit ou PR execute:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run format`
4. `npm run build` (para garantir que o template segue compilando)

## Variaveis de ambiente

| Variavel                         | Status      | Descricao                                                         |
| -------------------------------- | ----------- | ----------------------------------------------------------------- |
| `DATABASE_URL`                   | obrigatoria | String de conexao MongoDB usada pelo Prisma                       |
| `NEXT_PUBLIC_APP_URL`            | opcional    | URL base usada para gerar metadata quando nao estamos em Vercel   |
| `VERCEL_URL`                     | opcional    | Variavel definida automaticamente na Vercel para URLs temporarias |
| `ANTHROPIC_API_KEY`              | fase 3      | Chave do provider primario de IA (Claude)                         |
| `GOOGLE_AI_API_KEY`              | fase 3      | Chave do provider Gemini (fallback)                               |
| `OPENAI_API_KEY`                 | fase 3      | Chave do provider OpenAI (fallback)                               |
| `SENTRY_AUTH_TOKEN`              | fase 5      | Token do wizard do Sentry (util para setup local)                 |
| `NEXT_PUBLIC_SENTRY_DSN`         | fase 5      | DSN do Sentry para monitoramento                                  |
| `NEXT_PUBLIC_ENABLE_AI_FEATURES` | opcional    | Flag para habilitar funcoes de IA experimental                    |

Use `.env.example` como referencia e crie um `.env.local` na raiz antes de rodar os comandos. Mantenha segredos fora de commits.

## Documentacao adicional

- `todo.md` concentra o plano atual dividido em fases (dados, servicos, IA, UX e deploy).
