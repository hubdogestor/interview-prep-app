import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const competenciasRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.competencia.findMany({
      orderBy: [
        { nivel: "desc" },
        { createdAt: "desc" },
      ],
    });
  }),
});
