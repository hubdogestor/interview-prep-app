// lib/ai/provider.ts
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export type AIProvider = 'gemini' | 'openai' | 'claude';

// Ordem de prioridade: Gemini > OpenAI > Claude
const PROVIDER_PRIORITY: AIProvider[] = ['gemini', 'openai', 'claude'];

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
 * Sistema híbrido com fallback automático
 * 1. Gemini 2.5 Flash-Lite (Primário - Gratuito, super rápido, sem thinking mode)
 * 2. OpenAI GPT-4o-mini (Secundário - Melhor custo-benefício)
 * 3. Claude 3.5 Sonnet (Terciário - Alta qualidade, requer créditos)
 *
 * Nota: Flash-Lite é otimizado para velocidade/custo, sem thinking mode.
 * Flash e Pro usam thinking que consome tokens sem gerar resposta visível.
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
 * Combina system prompt com user prompt
 */
function buildPrompt(prompt: string, systemPrompt?: string): string {
  return systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
}

/**
 * Valida resposta do provider
 */
function validateResponse(text: string | null | undefined, provider: string): string {
  if (!text) {
    throw new Error(`${provider} retornou resposta vazia`);
  }
  return text;
}

/**
 * Gera resposta usando Gemini 2.5 Flash-Lite
 */
async function generateWithGemini(request: AIRequest): Promise<AIResponse> {
  const { prompt, systemPrompt, maxTokens = 1000, temperature = 0.7 } = request;

  const model = geminiClient.getGenerativeModel({
    model: 'gemini-2.5-flash-lite',
  });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: buildPrompt(prompt, systemPrompt) }] }],
    generationConfig: { maxOutputTokens: maxTokens, temperature },
  });

  return {
    text: validateResponse(result.response.text(), 'Gemini'),
    provider: 'gemini',
  };
}

/**
 * Gera resposta usando OpenAI GPT-4o-mini
 */
async function generateWithOpenAI(request: AIRequest): Promise<AIResponse> {
  const { prompt, systemPrompt, maxTokens = 1000, temperature = 0.7 } = request;

  const messages = [
    ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
    { role: 'user' as const, content: prompt },
  ];

  const response = await openaiClient.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: maxTokens,
    temperature,
    messages,
  });

  return {
    text: validateResponse(response.choices[0]?.message?.content, 'OpenAI'),
    provider: 'openai',
    usage: {
      promptTokens: response.usage?.prompt_tokens || 0,
      completionTokens: response.usage?.completion_tokens || 0,
    },
  };
}

/**
 * Gera resposta usando Claude 3.5 Sonnet
 */
async function generateWithClaude(request: AIRequest): Promise<AIResponse> {
  const { prompt, systemPrompt, maxTokens = 1000, temperature = 0.7 } = request;

  const response = await claudeClient.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  return {
    text: validateResponse(text, 'Claude'),
    provider: 'claude',
    usage: {
      promptTokens: response.usage.input_tokens,
      completionTokens: response.usage.output_tokens,
    },
  };
}

/**
 * Gera resposta usando um provider específico
 */
async function generateWithProvider(
  provider: AIProvider,
  request: AIRequest
): Promise<AIResponse> {
  switch (provider) {
    case 'gemini':
      return generateWithGemini(request);
    case 'openai':
      return generateWithOpenAI(request);
    case 'claude':
      return generateWithClaude(request);
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