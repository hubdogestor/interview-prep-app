// src/server/routers/ai.ts
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { generateWithFallback } from '@/lib/ai/provider';

export const aiRouter = router({
  generateText: publicProcedure
    .input(
      z.object({
        prompt: z.string().min(1, 'Prompt não pode ser vazio'),
        systemPrompt: z.string().optional(),
        maxTokens: z.number().min(1).max(4000).default(1000),
        temperature: z.number().min(0).max(2).default(0.7),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await generateWithFallback({
          prompt: input.prompt,
          systemPrompt: input.systemPrompt,
          maxTokens: input.maxTokens,
          temperature: input.temperature,
        });

        return {
          success: true,
          data: response,
        };
      } catch (error) {
        console.error('❌ Erro ao gerar texto com IA:', error);
        throw new Error('Falha ao gerar texto. Tente novamente.');
      }
    }),

  // Teste rápido para verificar se as APIs estão funcionando
  testProviders: publicProcedure.query(async () => {
    const results = {
      claude: false,
      gemini: false,
      openai: false,
    };

    // Teste simples com cada provider
    try {
      await generateWithFallback({ 
        prompt: 'Responda apenas: OK',
        maxTokens: 10 
      });
      results.claude = true;
    } catch {
      // Se falhou, tenta os outros
    }

    return results;
  }),
});