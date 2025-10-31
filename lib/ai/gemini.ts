import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Configuração do cliente Gemini
const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GOOGLE_AI_API_KEY não encontrada. Adicione ao arquivo .env.local"
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

// Helper para ler context files
function loadContextFiles(): string {
  const contextDir = path.join(process.cwd(), "context-files");
  let contextData = "";

  try {
    // Tenta ler os arquivos de contexto
    const files = ["cv.md", "playbook.md", "experiencias.md", "competencias.md"];

    for (const file of files) {
      const filePath = path.join(contextDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        contextData += `\n\n### ${file.replace(".md", "").toUpperCase()}\n${content}`;
      }
    }

    if (!contextData) {
      console.warn(
        "⚠️  Nenhum context file encontrado. A IA usará apenas dados do perfil."
      );
    }
  } catch (error) {
    console.warn("⚠️  Erro ao carregar context files:", error);
  }

  return contextData;
}

// Rate limiting simples (em memória)
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_REQUESTS_PER_MINUTE = 10;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  entry.count++;
  return true;
}

// Configuração do modelo
export const getModel = (modelName: string = "gemini-2.0-flash-exp") => {
  return genAI.getGenerativeModel({ model: modelName });
};

// Tipos para respostas
export interface IcebreakerVersion {
  nome: string;
  conteudo: {
    pt: string;
    en: string;
  };
  duracao: number;
  tags: string[];
}

export interface SpeechContent {
  pt: string;
  en: string;
}

export interface StarCaseReview {
  score: number;
  feedback: string;
  sugestoes: string[];
  temSituation: boolean;
  temTask: boolean;
  temAction: boolean;
  temResult: boolean;
  temMetricas: boolean;
}

/**
 * Gera versões de icebreaker baseado no perfil do usuário
 */
export async function generateIcebreaker(
  profile: {
    nome: string;
    titulo: string;
    resumo: { pt: string; en: string };
    anosExperiencia: number;
  },
  tipo: "elevator_pitch" | "quick_intro" | "personal_story",
  userId: string = "default"
): Promise<IcebreakerVersion[]> {
  // Rate limiting
  if (!checkRateLimit(`icebreaker-${userId}`)) {
    throw new Error(
      "Limite de requisições excedido. Tente novamente em alguns minutos."
    );
  }

  const model = getModel();

  const contextData = loadContextFiles();

  const tipoConfig = {
    elevator_pitch: {
      descricao: "um elevator pitch",
      duracaoMin: 60,
      duracaoMedia: 90,
      duracaoMax: 120,
      instruction: "Apresentação persuasiva e impactante, foco em destaque profissional"
    },
    quick_intro: {
      descricao: "uma apresentação rápida",
      duracaoMin: 30,
      duracaoMedia: 45,
      duracaoMax: 60,
      instruction: "Apresentação concisa e direta, apenas essencial"
    },
    personal_story: {
      descricao: "uma história pessoal impactante",
      duracaoMin: 120,
      duracaoMedia: 180,
      duracaoMax: 240,
      instruction: "Narrativa envolvente com storytelling, contexto + jornada + aprendizado"
    },
  };

  const config = tipoConfig[tipo];

  const prompt = `
Você é um especialista em preparação para entrevistas de emprego e construção de personal branding.

**Perfil básico do candidato:**
- Nome: ${profile.nome}
- Título: ${profile.titulo}
- Anos de experiência: ${profile.anosExperiencia}
- Resumo: ${profile.resumo.pt}

${contextData ? `**CONTEXTO ADICIONAL (use TODAS essas informações):**${contextData}` : ""}

**Tarefa:** Crie ${config.descricao} em português brasileiro para uso em entrevistas.

**Tipo:** ${tipo} - ${config.instruction}

**Instruções CRÍTICAS:**
1. Gere EXATAMENTE 3 versões com durações diferentes
2. Use TODOS os dados do contexto adicional para criar apresentações RICAS e PERSONALIZADAS
3. Inclua realizações REAIS e MÉTRICAS CONCRETAS do histórico do candidato
4. Adapte o TOM DE VOZ conforme especificado no playbook (se disponível)
5. Use PALAVRAS-CHAVE estratégicas para ATS (se especificadas no playbook)
6. Seja NATURAL, CONFIANTE e AUTÊNTICO - evite clichês corporativos
7. Para personal_story: inclua contexto, desafio, ação, resultado e aprendizado

**Durações alvo:**
- Versão Curta: ${config.duracaoMin}s
- Versão Média: ${config.duracaoMedia}s
- Versão Longa: ${config.duracaoMax}s

**Formato de resposta (JSON):**
[
  {
    "nome": "Versão Curta",
    "conteudo": "... (texto natural e fluido em primeira pessoa) ...",
    "duracao": ${config.duracaoMin},
    "tags": ["concisa", "impactante"]
  },
  {
    "nome": "Versão Média",
    "conteudo": "... (texto natural e fluido em primeira pessoa) ...",
    "duracao": ${config.duracaoMedia},
    "tags": ["equilibrada", "profissional"]
  },
  {
    "nome": "Versão Longa",
    "conteudo": "... (texto natural e fluido em primeira pessoa) ...",
    "duracao": ${config.duracaoMax},
    "tags": ["completa", "storytelling"]
  }
]

Responda APENAS com o JSON válido, sem markdown ou texto adicional.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse do JSON (removendo markdown se houver)
    const jsonText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    const versions = JSON.parse(jsonText);

    // Mapeia para o formato esperado
    return versions.map((v: any) => ({
      nome: v.nome,
      conteudo: {
        pt: v.conteudo,
        en: "",
      },
      duracao: v.duracao,
      tags: v.tags || [],
    }));
  } catch (error: any) {
    console.error("Erro ao gerar icebreaker:", error);
    throw new Error(
      `Erro ao gerar icebreaker: ${error.message || "Erro desconhecido"}`
    );
  }
}

/**
 * Gera um speech completo baseado no perfil e tipo de vaga
 */
export async function generateSpeech(
  profile: {
    nome: string;
    titulo: string;
    resumo: { pt: string; en: string };
    anosExperiencia: number;
  },
  tipoVaga: string,
  foco: string[],
  duracaoDesejada: number,
  userId: string = "default"
): Promise<{ conteudo: SpeechContent; duracaoEstimada: number }> {
  // Rate limiting
  if (!checkRateLimit(`speech-${userId}`)) {
    throw new Error(
      "Limite de requisições excedido. Tente novamente em alguns minutos."
    );
  }

  const model = getModel();
  const contextData = loadContextFiles();

  const prompt = `
Você é um especialista em preparação para entrevistas de emprego e construção de narrativas profissionais persuasivas.

**Perfil básico do candidato:**
- Nome: ${profile.nome}
- Título: ${profile.titulo}
- Anos de experiência: ${profile.anosExperiencia}
- Resumo: ${profile.resumo.pt}

${contextData ? `**CONTEXTO ADICIONAL (use TODAS essas informações):**${contextData}` : ""}

**Contexto da vaga:**
- Tipo de vaga: ${tipoVaga}
- Áreas de foco: ${foco.join(", ") || "Não especificadas"}
- Duração desejada: ${duracaoDesejada} minutos

**Tarefa:** Crie um speech completo, estruturado e ALTAMENTE PERSONALIZADO em português brasileiro para uma entrevista.

**Instruções CRÍTICAS:**
1. Use TODOS os dados do contexto adicional - experiências, projetos, competências, realizações
2. O speech deve ter EXATAMENTE ${duracaoDesejada} minutos de duração (considere ~150 palavras por minuto)
3. Inclua MÉTRICAS REAIS e RESULTADOS QUANTIFICÁVEIS do histórico do candidato
4. Adapte o TOM DE VOZ conforme especificado no playbook (se disponível)
5. Use PALAVRAS-CHAVE relevantes para ${tipoVaga} e estratégias ATS (se especificadas)
6. Seja NATURAL, AUTÊNTICO e evite clichês corporativos genéricos
7. Conecte experiências passadas com os requisitos da vaga ${tipoVaga}
8. ${foco.length > 0 ? `Enfatize especialmente: ${foco.join(", ")}` : ""}

**Estrutura sugerida:**
1. **Introdução** (15%): Quem você é, contexto atual, gancho interessante
2. **Jornada Profissional** (35%): Trajetória, evolução, principais experiências
3. **Competências & Realizações** (35%): Projetos relevantes, impacto, resultados com métricas
4. **Motivação & Fit** (15%): Por que essa vaga, o que você traz de único, entusiasmo

**Formato de resposta (JSON):**
{
  "conteudo": "... (texto completo do speech em primeira pessoa, com parágrafos bem estruturados, natural e fluido como uma conversa preparada) ...",
  "duracaoEstimada": ${duracaoDesejada}
}

Responda APENAS com o JSON válido, sem markdown ou texto adicional.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse do JSON (removendo markdown se houver)
    const jsonText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    const speechData = JSON.parse(jsonText);

    return {
      conteudo: {
        pt: speechData.conteudo,
        en: "",
      },
      duracaoEstimada: speechData.duracaoEstimada || duracaoDesejada,
    };
  } catch (error: any) {
    console.error("Erro ao gerar speech:", error);
    throw new Error(
      `Erro ao gerar speech: ${error.message || "Erro desconhecido"}`
    );
  }
}

/**
 * Revisa um STAR case e fornece feedback
 */
export async function reviewStarCase(
  starCase: {
    titulo: string;
    situation: string;
    task: string;
    action: string;
    result: string;
  },
  userId: string = "default"
): Promise<StarCaseReview> {
  // Rate limiting
  if (!checkRateLimit(`starcase-${userId}`)) {
    throw new Error(
      "Limite de requisições excedido. Tente novamente em alguns minutos."
    );
  }

  const model = getModel();

  const prompt = `
Você é um especialista em preparação para entrevistas comportamentais usando o método STAR.

**STAR Case para revisão:**
- Título: ${starCase.titulo}
- Situation: ${starCase.situation}
- Task: ${starCase.task}
- Action: ${starCase.action}
- Result: ${starCase.result}

**Tarefa:** Analise este STAR case e forneça feedback detalhado.

**Critérios de avaliação:**
1. Cada componente (S, T, A, R) está presente e completo?
2. Há métricas quantificáveis nos resultados?
3. A história é clara e convincente?
4. O impacto está bem demonstrado?
5. A linguagem é profissional e concisa?

**Formato de resposta (JSON):**
{
  "score": 85,
  "feedback": "Análise geral do STAR case...",
  "sugestoes": [
    "Sugestão 1...",
    "Sugestão 2...",
    "Sugestão 3..."
  ],
  "temSituation": true,
  "temTask": true,
  "temAction": true,
  "temResult": true,
  "temMetricas": false
}

O score deve ser de 0 a 100.
Responda APENAS com o JSON válido, sem markdown ou texto adicional.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse do JSON (removendo markdown se houver)
    const jsonText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    return JSON.parse(jsonText);
  } catch (error: any) {
    console.error("Erro ao revisar STAR case:", error);
    throw new Error(
      `Erro ao revisar STAR case: ${error.message || "Erro desconhecido"}`
    );
  }
}
