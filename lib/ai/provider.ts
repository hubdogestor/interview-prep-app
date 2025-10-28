// lib/ai/provider.ts
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export type AIProvider = 'claude' | 'gemini' | 'openai';

// Ordem de prioridade: Claude > Gemini > OpenAI
const PROVIDER_PRIORITY: AIProvider[] = ['claude', 'gemini', 'openai'];

// Clientes das APIs
const claudeClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const geminiClient = new GoogleGenerativeAI(
  process.env.GOOGLE_AI_API_KEY || ''
);

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AIRequest {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

interface AIResponse {
  text: string;
  provider: AIProvider;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

/**
 * Tenta usar Claude, se falhar usa Gemini, se falhar usa OpenAI
 */
export async function generateWithFallback(
  request: AIRequest
): Promise<AIResponse> {
  const errors: Record<AIProvider, Error | null> = {
    claude: null,
    gemini: null,
    openai: null,
  };

  // Tenta cada provider na ordem de prioridade
  for (const provider of PROVIDER_PRIORITY) {
    try {
      console.log(`🤖 Tentando provider: ${provider}`);
      const response = await generateWithProvider(provider, request);
      console.log(`✅ Sucesso com ${provider}`);
      return response;
    } catch (error) {
      errors[provider] = error as Error;
      console.log(`❌ Falha com ${provider}:`, error);
      // Continua para o próximo provider
    }
  }

  // Se todos falharem, lança erro com detalhes
  throw new Error(
    `Todos os providers de IA falharam:\n${Object.entries(errors)
      .map(([provider, error]) => `${provider}: ${error?.message}`)
      .join('\n')}`
  );
}

/**
 * Gera resposta usando um provider específico
 */
async function generateWithProvider(
  provider: AIProvider,
  request: AIRequest
): Promise<AIResponse> {
  const { prompt, systemPrompt, maxTokens = 1000, temperature = 0.7 } = request;

  switch (provider) {
    case 'claude': {
      const response = await claudeClient.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        temperature,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }],
      });

      return {
        text: response.content[0].type === 'text' 
          ? response.content[0].text 
          : '',
        provider: 'claude',
        usage: {
          promptTokens: response.usage.input_tokens,
          completionTokens: response.usage.output_tokens,
        },
      };
    }

    case 'gemini': {
      const model = geminiClient.getGenerativeModel({ 
        model: 'gemini-1.5-pro' 
      });
      
      const fullPrompt = systemPrompt 
        ? `${systemPrompt}\n\n${prompt}` 
        : prompt;
      
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;

      return {
        text: response.text(),
        provider: 'gemini',
      };
    }

    case 'openai': {
      const response = await openaiClient.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: maxTokens,
        temperature,
        messages: [
          ...(systemPrompt 
            ? [{ role: 'system' as const, content: systemPrompt }] 
            : []),
          { role: 'user' as const, content: prompt },
        ],
      });

      return {
        text: response.choices[0]?.message?.content || '',
        provider: 'openai',
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
        },
      };
    }

    default:
      throw new Error(`Provider não suportado: ${provider}`);
  }
}

/**
 * Força uso de um provider específico (útil para testes)
 */
export async function generateWithSpecificProvider(
  provider: AIProvider,
  request: AIRequest
): Promise<AIResponse> {
  return generateWithProvider(provider, request);
}