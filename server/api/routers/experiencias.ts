import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const experienciasRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.experiencia.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
