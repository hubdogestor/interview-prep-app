import { initTRPC, TRPCError } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

type CreateContextOptions = {
  headers: Headers;
  session?: Awaited<ReturnType<typeof auth>> | null;
};

export const createContextInner = async (_opts: CreateContextOptions) => {
  const session =
    typeof _opts.session === "undefined"
      ? await auth()
      : _opts.session ?? null;

  return {
    prisma,
    headers: _opts.headers,
    session,
  };
};

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await auth();
  
  return createContextInner({
    headers: opts.req.headers,
    session,
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

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user?.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Você precisa estar autenticado para realizar esta ação",
    });
  }
  
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      userId: ctx.session.user.id,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure.use(loggerMiddleware);
export const protectedProcedure = t.procedure.use(loggerMiddleware).use(isAuthed);
export const createCallerFactory = t.createCallerFactory;
