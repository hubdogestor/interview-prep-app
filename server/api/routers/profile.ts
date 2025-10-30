import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const profileRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const profile = await ctx.prisma.profile.findFirst();

    if (!profile) {
      return null;
    }

    return profile;
  }),
});
