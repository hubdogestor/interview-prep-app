;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="0ba6b81e-de92-2da1-6f27-d8fcdd54bba6")}catch(e){}}();
module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/server/trpc.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "publicProcedure",
    ()=>publicProcedure,
    "router",
    ()=>router
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$CB9uBez5$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/initTRPC-CB9uBez5.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superjson$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superjson/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/errors.js [app-route] (ecmascript)");
;
;
;
const t = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$CB9uBez5$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initTRPC"].context().create({
    transformer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superjson$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    errorFormatter ({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodError"] ? error.cause.flatten() : null
            }
        };
    }
});
const router = t.router;
const publicProcedure = t.procedure;
}),
"[project]/src/lib/ai/provider.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/ai/provider.ts
__turbopack_context__.s([
    "generateWithFallback",
    ()=>generateWithFallback,
    "generateWithSpecificProvider",
    ()=>generateWithSpecificProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/client.mjs [app-route] (ecmascript) <export Anthropic as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
;
;
// Ordem de prioridade: Gemini > OpenAI > Claude
const PROVIDER_PRIORITY = [
    'gemini',
    'openai',
    'claude'
];
// Clientes das APIs
const claudeClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__["default"]({
    apiKey: process.env.ANTHROPIC_API_KEY
});
const geminiClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GOOGLE_AI_API_KEY || '');
const openaiClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
});
async function generateWithFallback(request) {
    const errors = {
        claude: null,
        gemini: null,
        openai: null
    };
    // Tenta cada provider na ordem de prioridade
    for (const provider of PROVIDER_PRIORITY){
        try {
            console.log(`🤖 Tentando provider: ${provider}`);
            const response = await generateWithProvider(provider, request);
            console.log(`✅ Sucesso com ${provider}`);
            return response;
        } catch (error) {
            errors[provider] = error;
            console.log(`❌ Falha com ${provider}:`, error);
        // Continua para o próximo provider
        }
    }
    // Se todos falharem, lança erro com detalhes
    throw new Error(`Todos os providers de IA falharam:\n${Object.entries(errors).map(([provider, error])=>`${provider}: ${error?.message}`).join('\n')}`);
}
/**
 * Combina system prompt com user prompt
 */ function buildPrompt(prompt, systemPrompt) {
    return systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
}
/**
 * Valida resposta do provider
 */ function validateResponse(text, provider) {
    if (!text) {
        throw new Error(`${provider} retornou resposta vazia`);
    }
    return text;
}
/**
 * Gera resposta usando Gemini 2.5 Flash-Lite
 */ async function generateWithGemini(request) {
    const { prompt, systemPrompt, maxTokens = 1000, temperature = 0.7 } = request;
    const model = geminiClient.getGenerativeModel({
        model: 'gemini-2.5-flash-lite'
    });
    const result = await model.generateContent({
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: buildPrompt(prompt, systemPrompt)
                    }
                ]
            }
        ],
        generationConfig: {
            maxOutputTokens: maxTokens,
            temperature
        }
    });
    return {
        text: validateResponse(result.response.text(), 'Gemini'),
        provider: 'gemini'
    };
}
/**
 * Gera resposta usando OpenAI GPT-4o-mini
 */ async function generateWithOpenAI(request) {
    const { prompt, systemPrompt, maxTokens = 1000, temperature = 0.7 } = request;
    const messages = [
        ...systemPrompt ? [
            {
                role: 'system',
                content: systemPrompt
            }
        ] : [],
        {
            role: 'user',
            content: prompt
        }
    ];
    const response = await openaiClient.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: maxTokens,
        temperature,
        messages
    });
    return {
        text: validateResponse(response.choices[0]?.message?.content, 'OpenAI'),
        provider: 'openai',
        usage: {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0
        }
    };
}
/**
 * Gera resposta usando Claude 3.5 Sonnet
 */ async function generateWithClaude(request) {
    const { prompt, systemPrompt, maxTokens = 1000, temperature = 0.7 } = request;
    const response = await claudeClient.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: maxTokens,
        temperature,
        system: systemPrompt,
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]
    });
    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return {
        text: validateResponse(text, 'Claude'),
        provider: 'claude',
        usage: {
            promptTokens: response.usage.input_tokens,
            completionTokens: response.usage.output_tokens
        }
    };
}
/**
 * Gera resposta usando um provider específico
 */ async function generateWithProvider(provider, request) {
    switch(provider){
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
async function generateWithSpecificProvider(provider, request) {
    return generateWithProvider(provider, request);
}
}),
"[project]/src/server/routers/ai.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aiRouter",
    ()=>aiRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$provider$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai/provider.ts [app-route] (ecmascript)");
;
;
;
const aiRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["router"])({
    generateText: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        prompt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Prompt não pode ser vazio'),
        systemPrompt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        maxTokens: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(1).max(4000).default(1000),
        temperature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).max(2).default(0.7)
    })).mutation(async ({ input })=>{
        console.log('🔵 [AI Router] Recebeu input:', input);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$provider$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateWithFallback"])({
                prompt: input.prompt,
                systemPrompt: input.systemPrompt,
                maxTokens: input.maxTokens,
                temperature: input.temperature
            });
            console.log('✅ [AI Router] Resposta gerada com sucesso:', {
                provider: response.provider,
                textLength: response.text.length
            });
            return {
                success: true,
                data: response
            };
        } catch (error) {
            console.error('❌ [AI Router] Erro ao gerar texto:', error);
            throw new Error('Falha ao gerar texto. Tente novamente.');
        }
    }),
    testProviders: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].query(async ()=>{
        const results = {
            claude: false,
            gemini: false,
            openai: false
        };
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$provider$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateWithFallback"])({
                prompt: 'Responda apenas: OK',
                maxTokens: 10
            });
            results.claude = true;
        } catch  {
        // Se falhou, tenta os outros
        }
        return results;
    })
});
}),
"[project]/src/server/routers/_app.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/server/routers/_app.ts
__turbopack_context__.s([
    "appRouter",
    ()=>appRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routers$2f$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/routers/ai.ts [app-route] (ecmascript)");
;
;
const appRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["router"])({
    ai: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routers$2f$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiRouter"]
});
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/prisma.ts
__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'query',
        'error',
        'warn'
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/src/server/context.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/server/context.ts
__turbopack_context__.s([
    "createContext",
    ()=>createContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
async function createContext() {
    return {
        prisma: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"]
    };
}
}),
"[project]/src/app/api/trpc/[trpc]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>handler,
    "POST",
    ()=>handler,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routers$2f$_app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/routers/_app.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/context.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$adapters$2f$fetch$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/adapters/fetch/index.mjs [app-route] (ecmascript)");
;
;
;
const runtime = 'nodejs';
async function handler(req) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$adapters$2f$fetch$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchRequestHandler"])({
        endpoint: '/api/trpc',
        req,
        router: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routers$2f$_app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appRouter"],
        createContext: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createContext"],
        onError: ("TURBOPACK compile-time truthy", 1) ? ({ path, error })=>{
            console.error(`❌ [tRPC] Erro no path '${path}':`, error.message);
        } : "TURBOPACK unreachable"
    });
}
;
}),
];

//# debugId=0ba6b81e-de92-2da1-6f27-d8fcdd54bba6
//# sourceMappingURL=%5Broot-of-the-server%5D__92cd8fe1._.js.map