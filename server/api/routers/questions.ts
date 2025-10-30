import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.question.findMany({
      orderBy: [
        { prioridade: "asc" },
        { createdAt: "desc" },
      ],
    });
  }),
});
