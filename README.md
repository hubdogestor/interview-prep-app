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
- `npm run typecheck` valida os tipos com TypeScript
- `npm run format` confere arquivos `md` e `json` com Prettier

## Qualidade e fluxo local

Antes de commit ou PR execute:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run format`
4. `npm run build` (para garantir que o template segue compilando)

## Variaveis de ambiente

| Variavel              | Status   | Descricao                                                         |
| --------------------- | -------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL` | opcional | URL base usada para gerar metadata quando nao estamos em Vercel   |
| `VERCEL_URL`          | opcional | Variavel definida automaticamente na Vercel para URLs temporarias |
| `DATABASE_URL`        | fase 2   | String de conexao MongoDB (Prisma) a ser reinstalada              |
| `ANTHROPIC_API_KEY`   | fase 3   | Chave do provider primario de IA (Claude)                         |
| `GOOGLE_API_KEY`      | fase 3   | Chave do provider Gemini (fallback)                               |
| `OPENAI_API_KEY`      | fase 3   | Chave do provider OpenAI (fallback)                               |
| `SENTRY_DSN`          | fase 5   | DSN do Sentry para monitoramento                                  |
| `SENTRY_AUTH_TOKEN`   | fase 5   | Token do wizard do Sentry (util para setup local)                 |

Crie um arquivo `.env.local` na raiz seguindo o necessario para cada fase. Mantenha segredos fora de commits.

## Documentacao adicional

- `todo-template-v0.md` guarda o plano atualizado por fase para reinstalar toda a infraestrutura.
- `todo29-10.md` permanece como referencia historica do planejamento antigo.
