import { appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const runtime = 'nodejs';

async function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ [tRPC] Erro no path '${path}':`,
              error.message
            );
          }
        : undefined,
  });
}

export { handler as GET, handler as POST };