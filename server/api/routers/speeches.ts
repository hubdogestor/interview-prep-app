import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const speechesRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.speech.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
