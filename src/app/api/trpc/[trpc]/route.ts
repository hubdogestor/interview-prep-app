import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

import { appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/context';



const handler = async (req: NextRequest) => {
  // Log apenas para requests POST (mutations)
  if (req.method === 'POST') {
    console.log('🔵 [tRPC Handler] POST request:', {
      url: req.url,
      headers: Object.fromEntries(req.headers.entries())
    });
  }

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(),

    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ [tRPC Handler] Erro: ${
                path ? `{ path: '${path}', error: '${error.message}' }` : error.message
              }`,
            );
          }
        : undefined,
  });
};

export { handler as GET, handler as POST };