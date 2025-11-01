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

export interface SuggestedQuestion {
  categoria: "tecnica" | "comportamental" | "cultura" | "carreira";
  pergunta: {
    pt: string;
    en: string;
  };
  contexto: string;
  prioridade: "alta" | "media" | "baixa";
}

export interface StarCase {
  titulo: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  idioma: "pt" | "en";
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
  userId: string = "default",
  categoria?: string,
  orientacoesCustomizadas?: string
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
      instruction: "Apresentação persuasiva e impactante, foco em destaque profissional (1-2 minutos)"
    },
    quick_intro: {
      descricao: "uma apresentação rápida",
      duracaoMin: 120,
      duracaoMedia: 180,
      duracaoMax: 240,
      instruction: "Apresentação equilibrada e completa, com contexto e destaques (2-4 minutos)"
    },
    personal_story: {
      descricao: "uma história pessoal impactante",
      duracaoMin: 240,
      duracaoMedia: 300,
      duracaoMax: 360,
      instruction: "Narrativa envolvente e profunda com storytelling, contexto detalhado + jornada + aprendizados (4-6 minutos)"
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

${categoria ? `**Categoria/Foco:** ${categoria}` : ""}

${orientacoesCustomizadas ? `**ORIENTAÇÕES ESPECÍFICAS DO USUÁRIO (PRIORIDADE MÁXIMA):**\n${orientacoesCustomizadas}\n` : ""}

**Instruções CRÍTICAS:**
1. Gere EXATAMENTE 3 versões com durações diferentes
2. ${orientacoesCustomizadas ? "Siga FIELMENTE as orientações específicas fornecidas pelo usuário" : ""}
3. ${categoria ? `Adapte o conteúdo para responder especificamente à categoria: "${categoria}"` : ""}
4. IMPORTANTE: Icebreakers devem ser LEVES, CONVERSACIONAIS e NATURAIS - como uma conversa genuína, não um roteiro ou CV recitado
5. Use dados do contexto adicional, MAS de forma seletiva e orgânica - não liste tudo
6. Mencione 1-2 realizações específicas com métricas, mas de forma fluida e contextual
7. Evite clichês corporativos e jargões vazios - seja direto e autêntico
8. O tom deve ser confiante mas acessível, profissional mas humano
9. Para personal_story: conte uma HISTÓRIA real com narrativa envolvente (contexto, desafio, solução, impacto, aprendizado)
10. Adapte o TOM DE VOZ conforme especificado no playbook, mas mantendo naturalidade

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
  userId: string = "default",
  nomeEmpresa?: string,
  descricaoVaga?: string
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
${nomeEmpresa ? `- Empresa: ${nomeEmpresa}` : ""}
${descricaoVaga ? `- Descrição da vaga:\n${descricaoVaga}` : ""}
- Áreas de foco: ${foco.join(", ") || "Não especificadas"}
- Duração desejada: ${duracaoDesejada} minutos

**Tarefa:** Crie um speech completo, estruturado e ALTAMENTE PERSONALIZADO em português brasileiro para uma entrevista.

**Instruções CRÍTICAS:**
1. Use TODOS os dados do contexto adicional - experiências, projetos, competências, realizações
2. O speech deve ter EXATAMENTE ${duracaoDesejada} minutos de duração (considere ~150 palavras por minuto)
3. ${nomeEmpresa ? `Conecte suas experiências com os valores e cultura da empresa ${nomeEmpresa}` : ""}
4. ${descricaoVaga ? "Adapte o speech para responder aos requisitos ESPECÍFICOS da vaga fornecida" : ""}
5. Inclua MÉTRICAS REAIS e RESULTADOS QUANTIFICÁVEIS do histórico do candidato
6. Adapte o TOM DE VOZ conforme especificado no playbook (se disponível)
7. Use PALAVRAS-CHAVE relevantes para ${tipoVaga} e estratégias ATS (se especificadas)
8. Seja NATURAL, AUTÊNTICO e evite clichês corporativos genéricos
9. Conecte experiências passadas com os requisitos da vaga ${tipoVaga}
10. ${foco.length > 0 ? `Enfatize especialmente: ${foco.join(", ")}` : ""}

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
 * Edita um icebreaker baseado em instruções do usuário
 */
export async function editIcebreaker(
  conteudoAtual: string,
  instrucoes: string,
  userId: string = "default"
): Promise<string> {
  // Rate limiting
  if (!checkRateLimit(`edit-icebreaker-${userId}`)) {
    throw new Error(
      "Limite de requisições excedido. Tente novamente em alguns minutos."
    );
  }

  const model = getModel();

  const prompt = `
Você é um especialista em preparação para entrevistas de emprego e edição de textos profissionais.

**Conteúdo atual do icebreaker:**
${conteudoAtual}

**Instruções de edição do usuário:**
${instrucoes}

**Tarefa:** Edite o icebreaker seguindo EXATAMENTE as instruções fornecidas pelo usuário.

**Instruções CRÍTICAS:**
1. Mantenha o tom LEVE, CONVERSACIONAL e NATURAL - como se fosse uma conversa genuína, não um roteiro robotizado
2. Aplique APENAS as mudanças solicitadas pelo usuário
3. Preserve o estilo e estrutura original, a menos que o usuário peça para mudar
4. O icebreaker deve soar como algo que você realmente falaria em uma entrevista, não como um CV recitado
5. Evite clichês corporativos e frases genéricas - seja autêntico e direto
6. Mantenha a duração similar ao original, a menos que seja pedido para alterar

**Formato de resposta (apenas o texto editado, sem JSON ou markdown):**
[texto editado do icebreaker em primeira pessoa]

Responda APENAS com o texto editado, sem explicações adicionais.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch (error: any) {
    console.error("Erro ao editar icebreaker:", error);
    throw new Error(
      `Erro ao editar icebreaker: ${error.message || "Erro desconhecido"}`
    );
  }
}

/**
 * Edita um speech baseado em instruções do usuário
 */
export async function editSpeech(
  conteudoAtual: string,
  instrucoes: string,
  userId: string = "default"
): Promise<string> {
  // Rate limiting
  if (!checkRateLimit(`edit-speech-${userId}`)) {
    throw new Error(
      "Limite de requisições excedido. Tente novamente em alguns minutos."
    );
  }

  const model = getModel();

  const prompt = `
Você é um especialista em preparação para entrevistas de emprego e edição de discursos profissionais.

**Conteúdo atual do speech:**
${conteudoAtual}

**Instruções de edição do usuário:**
${instrucoes}

**Tarefa:** Edite o speech seguindo EXATAMENTE as instruções fornecidas pelo usuário.

**Instruções CRÍTICAS:**
1. Este é um CV speech completo - deve ser estruturado e profissional
2. Aplique APENAS as mudanças solicitadas pelo usuário
3. Preserve a estrutura original (introdução, jornada, competências, motivação), a menos que o usuário peça para mudar
4. Mantenha métricas e realizações quantificáveis
5. O speech deve soar natural e fluido, como uma apresentação preparada
6. Mantenha a duração similar ao original, a menos que seja pedido para alterar

**Formato de resposta (apenas o texto editado, sem JSON ou markdown):**
[texto editado do speech em primeira pessoa]

Responda APENAS com o texto editado, sem explicações adicionais.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch (error: any) {
    console.error("Erro ao editar speech:", error);
    throw new Error(
      `Erro ao editar speech: ${error.message || "Erro desconhecido"}`
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

/**
 * Sugere perguntas para fazer ao entrevistador baseado no perfil e vaga
 */
export async function suggestQuestions(
  profile: {
    nome: string;
    titulo: string;
    resumo: { pt: string; en: string };
    anosExperiencia: number;
  },
  tipoVaga?: string,
  empresaAlvo?: string,
  userId: string = "default"
): Promise<SuggestedQuestion[]> {
  // Rate limiting
  if (!checkRateLimit(`questions-${userId}`)) {
    throw new Error(
      "Limite de requisições excedido. Tente novamente em alguns minutos."
    );
  }

  const model = getModel();

  const contextData = loadContextFiles();

  const prompt = `
Você é um especialista em preparação para entrevistas de emprego e carreira em tecnologia.

**Perfil do candidato:**
- Nome: ${profile.nome}
- Título: ${profile.titulo}
- Anos de experiência: ${profile.anosExperiencia}
- Resumo: ${profile.resumo.pt}

${contextData ? `**CONTEXTO ADICIONAL (use TODAS essas informações):**${contextData}` : ""}

${tipoVaga ? `**Tipo de vaga:** ${tipoVaga}` : ""}
${empresaAlvo ? `**Empresa alvo:** ${empresaAlvo}` : ""}

**Tarefa:** Sugira 8 perguntas estratégicas que o candidato deve fazer ao entrevistador.

**Categorias:**
- **tecnica**: Perguntas sobre tecnologias, arquitetura, processos de desenvolvimento
- **comportamental**: Perguntas sobre cultura de trabalho, dinâmica de equipe, estilo de liderança
- **cultura**: Perguntas sobre valores, diversidade, ambiente de trabalho
- **carreira**: Perguntas sobre crescimento, desenvolvimento profissional, oportunidades

**Instruções CRÍTICAS:**
1. Gere EXATAMENTE 8 perguntas distribuídas entre as 4 categorias (2 por categoria)
2. As perguntas devem ser RELEVANTES ao perfil e experiência do candidato
3. ${tipoVaga ? `Adapte as perguntas para a vaga de ${tipoVaga}` : "Adapte ao nível de senioridade do candidato"}
4. ${empresaAlvo ? `Considere o contexto da empresa ${empresaAlvo}` : ""}
5. Cada pergunta deve ter um contexto explicando QUANDO e POR QUE fazer essa pergunta
6. Perguntas técnicas devem ser específicas (não genéricas como "qual stack?")
7. Priorize perguntas que DIFERENCIEM o candidato e demonstrem maturidade profissional
8. Evite perguntas óbvias que estão no site da empresa
9. Use dados do contexto adicional para criar perguntas personalizadas
10. A pergunta em inglês deve ser uma tradução natural e profissional

**Prioridades:**
- alta: Perguntas essenciais, demonstram profissionalismo, sempre relevantes
- media: Perguntas importantes mas contextuais
- baixa: Perguntas opcionais, usar se houver tempo

**Formato de resposta (JSON array):**
[
  {
    "categoria": "tecnica",
    "pergunta": {
      "pt": "Como vocês balanceiam débito técnico com entrega de novas features?",
      "en": "How do you balance technical debt with delivering new features?"
    },
    "contexto": "Usar após discutir arquitetura do sistema. Demonstra preocupação com qualidade a longo prazo.",
    "prioridade": "alta"
  },
  ...
]

Responda APENAS com o JSON array válido, sem markdown ou texto adicional.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse do JSON (removendo markdown se houver)
    const jsonText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    return JSON.parse(jsonText);
  } catch (error: any) {
    console.error("Erro ao sugerir perguntas:", error);
    throw new Error(
      `Erro ao sugerir perguntas: ${error.message || "Erro desconhecido"}`
    );
  }
}

/**
 * Gera um STAR Case baseado no perfil e experiência
 */
export async function generateStarCase(
  mode: "auto" | "guided" | "rewrite",
  idioma: "pt" | "en",
  experienciaContext?: {
    empresa?: string;
    cargo?: string;
  },
  guidedInputs?: {
    titulo?: string;
    contexto?: string;
    competenciaFoco?: string;
  },
  existingCase?: StarCase,
  rewriteInstructions?: string,
  userId: string = "default"
): Promise<StarCase> {
  // Rate limiting
  if (!checkRateLimit(`starcase-generate-${userId}`)) {
    throw new Error(
      "Limite de requisições excedido. Tente novamente em alguns minutos."
    );
  }

  const model = getModel();
  const contextData = loadContextFiles();

  let prompt = "";

  if (mode === "rewrite" && existingCase) {
    prompt = `
Você é um especialista em preparação para entrevistas comportamentais usando o método STAR.

**STAR Case atual:**
- Título: ${existingCase.titulo}
- Situation: ${existingCase.situation}
- Task: ${existingCase.task}
- Action: ${existingCase.action}
- Result: ${existingCase.result}
- Idioma atual: ${existingCase.idioma}

**Idioma desejado:** ${idioma}

${rewriteInstructions ? `**Instruções específicas do usuário:**\n${rewriteInstructions}` : "**Tarefa:** Reescreva este STAR Case melhorando clareza, impacto e resultados quantificáveis."}

**Instruções CRÍTICAS:**
1. ${idioma !== existingCase.idioma ? `TRADUZA para ${idioma === "pt" ? "português" : "inglês"}` : "Mantenha o idioma"}
2. ${rewriteInstructions ? "Siga FIELMENTE as instruções do usuário" : "Melhore a clareza e impacto"}
3. Mantenha a estrutura STAR completa
4. Adicione ou enfatize métricas quantificáveis nos resultados
5. Torne a narrativa mais convincente e profissional
6. Mantenha a autenticidade - deve soar real, não inventado
7. Use primeira pessoa ("eu fiz", "eu liderei")

**Formato de resposta (JSON):**
{
  "titulo": "Título do case",
  "situation": "Descrição da situação/contexto...",
  "task": "Qual era o desafio/objetivo...",
  "action": "Ações específicas que você tomou...",
  "result": "Resultados alcançados com métricas...",
  "idioma": "${idioma}"
}

Responda APENAS com o JSON válido, sem markdown ou texto adicional.
`;
  } else if (mode === "guided" && guidedInputs) {
    prompt = `
Você é um especialista em preparação para entrevistas comportamentais usando o método STAR.

${contextData ? `**CONTEXTO DO PERFIL (use essas informações):**${contextData}` : ""}

${experienciaContext?.empresa && experienciaContext?.cargo ? `**Contexto da experiência:**\n- Empresa: ${experienciaContext.empresa}\n- Cargo: ${experienciaContext.cargo}` : ""}

**Inputs do usuário:**
- Título do case: ${guidedInputs.titulo}
- Contexto/Situação: ${guidedInputs.contexto}
${guidedInputs.competenciaFoco ? `- Competência em foco: ${guidedInputs.competenciaFoco}` : ""}

**Idioma:** ${idioma === "pt" ? "português" : "inglês"}

**Tarefa:** Crie um STAR Case completo baseado nos inputs do usuário e contexto do perfil.

**Instruções CRÍTICAS:**
1. Use o título e contexto fornecidos pelo usuário como base
2. ${guidedInputs.competenciaFoco ? `Enfatize a competência: ${guidedInputs.competenciaFoco}` : ""}
3. Complete a estrutura STAR de forma coerente e convincente
4. Inclua MÉTRICAS QUANTIFICÁVEIS nos resultados (use dados do contexto se disponíveis)
5. ${experienciaContext?.empresa ? `Contextualize na experiência da empresa ${experienciaContext.empresa}` : ""}
6. A narrativa deve ser autêntica e realista
7. Use primeira pessoa ("eu fiz", "eu liderei")
8. Seja específico - evite generalidades

**Formato de resposta (JSON):**
{
  "titulo": "${guidedInputs.titulo}",
  "situation": "Descrição detalhada da situação/contexto...",
  "task": "Qual era o desafio/objetivo específico...",
  "action": "Ações específicas que você tomou (detalhadas)...",
  "result": "Resultados alcançados com métricas quantificáveis...",
  "idioma": "${idioma}"
}

Responda APENAS com o JSON válido, sem markdown ou texto adicional.
`;
  } else {
    // Auto mode
    prompt = `
Você é um especialista em preparação para entrevistas comportamentais usando o método STAR.

${contextData ? `**CONTEXTO DO PERFIL (use TODAS essas informações):**${contextData}` : ""}

${experienciaContext?.empresa && experienciaContext?.cargo ? `**Contexto da experiência:**\n- Empresa: ${experienciaContext.empresa}\n- Cargo: ${experienciaContext.cargo}` : ""}

**Idioma:** ${idioma === "pt" ? "português" : "inglês"}

**Tarefa:** Crie um STAR Case completo e impactante automaticamente baseado no perfil do candidato${experienciaContext?.empresa ? ` e sua experiência na ${experienciaContext.empresa}` : ""}.

**Instruções CRÍTICAS:**
1. Use informações REAIS do contexto fornecido (experiências, projetos, competências)
2. ${experienciaContext?.empresa && experienciaContext?.cargo ? `Baseie o STAR Case na experiência como ${experienciaContext.cargo} na ${experienciaContext.empresa}` : "Escolha a experiência mais relevante"}
3. Inclua MÉTRICAS QUANTIFICÁVEIS nos resultados
4. O case deve demonstrar impacto real e competências técnicas/comportamentais
5. Escolha um projeto ou situação que seja destacável em entrevistas
6. A narrativa deve ser autêntica e realista - não invente informações não presentes no contexto
7. Use primeira pessoa ("eu fiz", "eu liderei")
8. Título deve ser descritivo e impactante

**Estrutura STAR:**
- **Situation**: Contexto e cenário do desafio (2-3 sentenças)
- **Task**: Objetivo específico ou desafio a resolver (1-2 sentenças)
- **Action**: Ações específicas tomadas, metodologia, liderança (3-4 sentenças)
- **Result**: Resultados quantificáveis, impacto, aprendizados (2-3 sentenças com métricas)

**Formato de resposta (JSON):**
{
  "titulo": "Título impactante do case",
  "situation": "Descrição da situação/contexto...",
  "task": "Qual era o desafio/objetivo...",
  "action": "Ações específicas que você tomou...",
  "result": "Resultados alcançados com métricas...",
  "idioma": "${idioma}"
}

Responda APENAS com o JSON válido, sem markdown ou texto adicional.
`;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse do JSON (removendo markdown se houver)
    const jsonText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    return JSON.parse(jsonText);
  } catch (error: any) {
    console.error("Erro ao gerar STAR Case:", error);
    throw new Error(
      `Erro ao gerar STAR Case: ${error.message || "Erro desconhecido"}`
    );
  }
}
