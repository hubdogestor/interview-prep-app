import { initTRPC, TRPCError } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { type Session } from "next-auth";

import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth/auth-options";

type CreateContextOptions = {
  session: Session | null;
  headers: Headers;
};

export const createContextInner = async (_opts: CreateContextOptions) => {
  return {
    session: _opts.session,
    prisma,
    headers: _opts.headers,
  };
};

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  // Obter sessão do NextAuth
  const session = await getServerSession(authOptions);

  return createContextInner({
    session,
    headers: opts.req.headers,
  });
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

const loggerMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  if (process.env.NODE_ENV === "development") {
    const duration = Date.now() - start;
    console.log(`[tRPC] ${type} ${path} (${duration}ms)`);
  }
  return result;
});

/**
 * Middleware de autenticação
 * Garante que o usuário está autenticado antes de executar o procedimento
 */
const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }

  return next({
    ctx: {
      // Infer que session e user não são null
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const createTRPCRouter = t.router;

/**
 * Public procedure - não requer autenticação
 */
export const publicProcedure = t.procedure.use(loggerMiddleware);

/**
 * Protected procedure - requer autenticação
 * Use este para endpoints que devem ser acessíveis apenas por usuários autenticados
 */
export const protectedProcedure = t.procedure
  .use(loggerMiddleware)
  .use(enforceUserIsAuthed);

export const createCallerFactory = t.createCallerFactory;
