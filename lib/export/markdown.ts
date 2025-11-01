export interface ExportItem {
  title: string;
  content: string;
  metadata?: Record<string, string | number | boolean>;
}

interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  periodo?: string;
  descricao?: string;
  tecnologias?: string[];
  starCases: {
    titulo: string;
    situation: string;
    task: string;
    action: string;
    result: string;
    idioma: "pt" | "en";
  }[];
}

interface Competencia {
  id: string;
  nome: string;
  categoria: "technical" | "soft_skills" | "leadership";
  nivel: "basic" | "intermediate" | "advanced" | "expert";
  descricao: {
    pt: string;
    en: string;
  };
  ferramentas?: string[];
  evidencias?: string[];
  trackRecord?: {
    projeto: string;
    resultado: string;
    ano: number;
  }[];
}

export function exportToMarkdown(items: ExportItem[]): string {
  const timestamp = new Date().toISOString().split("T")[0];
  let markdown = `# Export - ${timestamp}\n\n`;

  items.forEach((item, index) => {
    markdown += `## ${item.title}\n\n`;

    if (item.metadata) {
      markdown += `**Metadados:**\n`;
      Object.entries(item.metadata).forEach(([key, value]) => {
        markdown += `- **${key}:** ${value}\n`;
      });
      markdown += `\n`;
    }

    markdown += `${item.content}\n\n`;

    if (index < items.length - 1) {
      markdown += `---\n\n`;
    }
  });

  return markdown;
}

/**
 * Exporta experiências para Markdown
 */
export function exportExperiencias(experiencias: Experiencia[]): string {
  let markdown = `# Experiências Profissionais\n\n`;
  markdown += `*Exportado em: ${new Date().toLocaleDateString("pt-BR", { dateStyle: "long" })}*\n\n`;
  markdown += `---\n\n`;

  experiencias.forEach((exp, index) => {
    markdown += `## ${index + 1}. ${exp.empresa}\n\n`;
    markdown += `**Cargo:** ${exp.cargo}\n\n`;

    if (exp.periodo) {
      markdown += `**Período:** ${exp.periodo}\n\n`;
    }

    if (exp.descricao) {
      markdown += `**Descrição:**\n${exp.descricao}\n\n`;
    }

    if (exp.tecnologias && exp.tecnologias.length > 0) {
      markdown += `**Tecnologias:** ${exp.tecnologias.map((t) => `\`${t}\``).join(", ")}\n\n`;
    }

    // STAR Cases
    if (exp.starCases && exp.starCases.length > 0) {
      markdown += `### 📌 STAR Cases (${exp.starCases.length})\n\n`;

      exp.starCases.forEach((starCase, scIndex) => {
        markdown += `#### ${scIndex + 1}. ${starCase.titulo} [${starCase.idioma.toUpperCase()}]\n\n`;
        markdown += `**🎯 Situation:**\n${starCase.situation}\n\n`;
        markdown += `**📋 Task:**\n${starCase.task}\n\n`;
        markdown += `**⚡ Action:**\n${starCase.action}\n\n`;
        markdown += `**✅ Result:**\n${starCase.result}\n\n`;

        if (scIndex < exp.starCases.length - 1) {
          markdown += `---\n\n`;
        }
      });
    }

    if (index < experiencias.length - 1) {
      markdown += `\n\n`;
    }
  });

  return markdown;
}

/**
 * Exporta competências para Markdown
 */
export function exportCompetencias(competencias: Competencia[]): string {
  let markdown = `# Competências Profissionais\n\n`;
  markdown += `*Exportado em: ${new Date().toLocaleDateString("pt-BR", { dateStyle: "long" })}*\n\n`;
  markdown += `---\n\n`;

  // Agrupa por categoria
  const porCategoria: Record<string, Competencia[]> = {
    technical: [],
    soft_skills: [],
    leadership: [],
  };

  competencias.forEach((comp) => {
    porCategoria[comp.categoria].push(comp);
  });

  const categoriaLabels = {
    technical: "💻 Competências Técnicas",
    soft_skills: "🤝 Soft Skills",
    leadership: "👔 Liderança",
  };

  const nivelLabels = {
    basic: "Básico",
    intermediate: "Intermediário",
    advanced: "Avançado",
    expert: "Expert",
  };

  Object.entries(porCategoria).forEach(([categoria, comps]) => {
    if (comps.length === 0) return;

    markdown += `## ${categoriaLabels[categoria as keyof typeof categoriaLabels]}\n\n`;

    comps.forEach((comp, index) => {
      markdown += `### ${index + 1}. ${comp.nome}\n\n`;
      markdown += `**Nível:** ${nivelLabels[comp.nivel as keyof typeof nivelLabels]}\n\n`;

      if (comp.descricao.pt) {
        markdown += `**Descrição (PT):**\n${comp.descricao.pt}\n\n`;
      }

      if (comp.descricao.en) {
        markdown += `**Description (EN):**\n${comp.descricao.en}\n\n`;
      }

      if (comp.ferramentas && comp.ferramentas.length > 0) {
        markdown += `**Ferramentas:** ${comp.ferramentas.map((f) => `\`${f}\``).join(", ")}\n\n`;
      }

      if (comp.evidencias && comp.evidencias.length > 0) {
        markdown += `**Evidências:**\n`;
        comp.evidencias.forEach((ev) => {
          markdown += `- ${ev}\n`;
        });
        markdown += `\n`;
      }

      if (comp.trackRecord && comp.trackRecord.length > 0) {
        markdown += `**Track Record:**\n\n`;
        comp.trackRecord.forEach((tr) => {
          markdown += `- **${tr.projeto}** (${tr.ano})\n`;
          markdown += `  ${tr.resultado}\n\n`;
        });
      }

      if (index < comps.length - 1) {
        markdown += `---\n\n`;
      }
    });

    markdown += `\n`;
  });

  return markdown;
}

/**
 * Exporta portfólio completo
 */
export function exportPortfolioCompleto(
  experiencias: Experiencia[],
  competencias: Competencia[]
): string {
  let markdown = `# 📁 Portfólio Profissional Completo\n\n`;
  markdown += `*Gerado automaticamente em: ${new Date().toLocaleDateString("pt-BR", { dateStyle: "full" })}*\n\n`;
  markdown += `---\n\n`;

  // Estatísticas
  const totalStarCases = experiencias.reduce((sum, exp) => sum + exp.starCases.length, 0);
  const competenciasPorNivel = {
    expert: competencias.filter((c) => c.nivel === "expert").length,
    advanced: competencias.filter((c) => c.nivel === "advanced").length,
    intermediate: competencias.filter((c) => c.nivel === "intermediate").length,
    basic: competencias.filter((c) => c.nivel === "basic").length,
  };

  markdown += `## 📊 Estatísticas\n\n`;
  markdown += `- **Experiências Profissionais:** ${experiencias.length}\n`;
  markdown += `- **STAR Cases Documentados:** ${totalStarCases}\n`;
  markdown += `- **Competências Totais:** ${competencias.length}\n`;
  markdown += `  - 💻 Técnicas: ${competencias.filter((c) => c.categoria === "technical").length}\n`;
  markdown += `  - 🤝 Soft Skills: ${competencias.filter((c) => c.categoria === "soft_skills").length}\n`;
  markdown += `  - 👔 Liderança: ${competencias.filter((c) => c.categoria === "leadership").length}\n`;
  markdown += `\n**Distribuição por Nível:**\n`;
  markdown += `- Expert: ${competenciasPorNivel.expert}\n`;
  markdown += `- Avançado: ${competenciasPorNivel.advanced}\n`;
  markdown += `- Intermediário: ${competenciasPorNivel.intermediate}\n`;
  markdown += `- Básico: ${competenciasPorNivel.basic}\n`;
  markdown += `\n---\n\n`;

  // Índice
  markdown += `## 📑 Índice\n\n`;
  markdown += `1. [Competências Profissionais](#competências-profissionais)\n`;
  markdown += `2. [Experiências Profissionais](#experiências-profissionais)\n`;
  markdown += `\n---\n\n`;

  // Competências
  markdown += exportCompetencias(competencias);
  markdown += `\n---\n\n`;

  // Experiências
  markdown += exportExperiencias(experiencias);

  return markdown;
}

export function downloadMarkdown(markdown: string, filename: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
