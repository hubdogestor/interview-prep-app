import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const profileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.prisma.profile.findFirst({
      where: { userId: ctx.userId },
    });

    if (!profile) {
      return null;
    }

    return profile;
  }),
});
