import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/context';

const handler = async (req: Request) => {
  console.log('🟡 [tRPC Handler] Recebendo request:', req.method, req.url);
  
  try {
    return await fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext,
      onError({ error, path }) {
        console.error('❌ [tRPC Handler] Erro:', {
          path,
          error: error.message,
          code: error.code,
        });
      },
    });
  } catch (error) {
    console.error('❌ [tRPC Handler] Erro fatal:', error);
    throw error;
  }
};

export { handler as GET, handler as POST };