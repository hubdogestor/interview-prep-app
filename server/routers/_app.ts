// src/server/routers/_app.ts
import { router } from '../trpc';
import { aiRouter } from './ai';

/**
 * Main router - aqui você adiciona todos os sub-routers
 */
export const appRouter = router({
  ai: aiRouter,
  // Futuramente: profile, icebreakers, competencias, etc.
});

export type AppRouter = typeof appRouter;