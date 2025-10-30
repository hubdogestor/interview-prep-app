import { initTRPC } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import { ZodError } from "zod";

import prisma from "@/lib/db";

type CreateContextOptions = {
  headers: Headers;
};

export const createContextInner = async (_opts: CreateContextOptions) => {
  return {
    prisma,
    headers: _opts.headers,
  };
};

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  return createContextInner({
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

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure.use(loggerMiddleware);
export const createCallerFactory = t.createCallerFactory;
