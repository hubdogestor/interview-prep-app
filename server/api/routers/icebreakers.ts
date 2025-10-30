import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const icebreakersRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.icebreaker.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
