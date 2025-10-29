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
      console.log('🔵 [AI Router] Recebeu input:', input);
      
      try {
        const response = await generateWithFallback({
          prompt: input.prompt,
          systemPrompt: input.systemPrompt,
          maxTokens: input.maxTokens,
          temperature: input.temperature,
        });

        console.log('✅ [AI Router] Resposta gerada com sucesso:', {
          provider: response.provider,
          textLength: response.text.length,
        });

        return {
          success: true,
          data: response,
        };
      } catch (error) {
        console.error('❌ [AI Router] Erro ao gerar texto:', error);
        throw new Error('Falha ao gerar texto. Tente novamente.');
      }
    }),

  testProviders: publicProcedure.query(async () => {
    const results = {
      claude: false,
      gemini: false,
      openai: false,
    };

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