import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { generateWithFallback } from '@/lib/ai/provider';

export const aiRouter = router({
  generateText: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
        systemPrompt: z.string().optional(),
        maxTokens: z.number().default(1000),
      })
    )
    .mutation(async ({ input }) => {
      const response = await generateWithFallback({
        prompt: input.prompt,
        systemPrompt: input.systemPrompt,
        maxTokens: input.maxTokens,
      });

      return response;
    }),
});