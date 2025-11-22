import { z } from "zod";

/**
 * Schema de validação para variáveis de ambiente
 * Garante que variáveis obrigatórias estejam definidas no startup
 */
const envSchema = z.object({
  // Database (obrigatório)
  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatória"),

  // Node Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Next.js
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  VERCEL_URL: z.string().optional(),

  // AI Providers (opcional, mas recomendado para features de IA)
  GOOGLE_AI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),

  // Monitoring (opcional)
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_AI_FEATURES: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});

/**
 * Tipo inferido do schema para usar em toda aplicação
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validação e parsing das variáveis de ambiente
 * Falha o processo se variáveis obrigatórias não estiverem presentes
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Erro na validação de variáveis de ambiente:");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Configuração de ambiente inválida");
  }

  return parsed.data;
}

/**
 * Variáveis de ambiente validadas e tipadas
 * Use este objeto ao invés de process.env diretamente
 */
export const env = validateEnv();

/**
 * Helper para verificar se features de IA estão habilitadas
 */
export const isAIEnabled = () => {
  return !!(
    env.NEXT_PUBLIC_ENABLE_AI_FEATURES !== false &&
    (env.GOOGLE_AI_API_KEY || env.ANTHROPIC_API_KEY || env.OPENAI_API_KEY)
  );
};

/**
 * Helper para obter base URL da aplicação
 */
export const getBaseUrl = () => {
  if (env.NEXT_PUBLIC_APP_URL) return env.NEXT_PUBLIC_APP_URL;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return "http://localhost:3000";
};
