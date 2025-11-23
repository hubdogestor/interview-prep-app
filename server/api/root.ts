import { aiRouter } from "@/server/api/routers/ai";
import { competenciasRouter } from "@/server/api/routers/competencias";
import { customFlagsRouter } from "@/server/api/routers/custom-flags";
import { dashboardRouter } from "@/server/api/routers/dashboard";
import { experienciasRouter } from "@/server/api/routers/experiencias";
import { icebreakersRouter } from "@/server/api/routers/icebreakers";
import { kanbansRouter } from "@/server/api/routers/kanbans";
import { okrsRouter } from "@/server/api/routers/okrs";
import { practiceRouter } from "@/server/api/routers/practice";
import { profileRouter } from "@/server/api/routers/profile";
import { questionsRouter } from "@/server/api/routers/questions";
import { speechesRouter } from "@/server/api/routers/speeches";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

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
  ai: aiRouter,
  okrs: okrsRouter,
  kanbans: kanbansRouter,
  customFlags: customFlagsRouter,
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
