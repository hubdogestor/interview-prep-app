// src/server/routers/_app.ts
import { router } from "../trpc";
import { aiRouter } from "./ai";
import { profileRouter } from "./profile";

/**
 * Main router - aqui você adiciona todos os sub-routers
 */
export const appRouter = router({
  ai: aiRouter,
  profile: profileRouter,
  // Futuramente: icebreakers, competencias, etc.
});

export type AppRouter = typeof appRouter;
