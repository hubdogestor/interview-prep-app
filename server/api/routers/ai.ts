import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { translateContent, generateProactiveSuggestions } from "@/lib/ai/gemini";

export const aiRouter = createTRPCRouter({
  // Translate content between PT-BR and EN
  translateContent: publicProcedure
    .input(
      z.object({
        content: z.string().min(1, "Conteúdo vazio"),
        from: z.enum(["pt", "en"]),
        to: z.enum(["pt", "en"]),
        context: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.from === input.to) {
        throw new Error("Idiomas de origem e destino devem ser diferentes");
      }

      const result = await translateContent(
        input.content,
        input.from,
        input.to,
        input.context
      );

      return result;
    }),

  // Generate proactive suggestions based on portfolio
  getProactiveSuggestions: publicProcedure
    .input(
      z.object({
        competenciasCount: z.number(),
        experienciasCount: z.number(),
        icebreakersCount: z.number(),
        speechesCount: z.number(),
        hasStarCases: z.boolean(),
        lastPracticeDays: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const suggestions = await generateProactiveSuggestions(input);
      return suggestions;
    }),
});
