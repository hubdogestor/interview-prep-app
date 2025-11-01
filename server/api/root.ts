import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { profileRouter } from "@/server/api/routers/profile";
import { dashboardRouter } from "@/server/api/routers/dashboard";
import { icebreakersRouter } from "@/server/api/routers/icebreakers";
import { competenciasRouter } from "@/server/api/routers/competencias";
import { experienciasRouter } from "@/server/api/routers/experiencias";
import { speechesRouter } from "@/server/api/routers/speeches";
import { questionsRouter } from "@/server/api/routers/questions";
import { practiceRouter } from "@/server/api/routers/practice";

/**
 * Root router - combina todos os routers por domínio
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  dashboard: dashboardRouter,
  icebreakers: icebreakersRouter,
  competencias: competenciasRouter,
  experiencias: experienciasRouter,
  speeches: speechesRouter,
  questions: questionsRouter,
  practice: practiceRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const profile = await trpc.profile.get();
 */
export const createCaller = createCallerFactory(appRouter);
