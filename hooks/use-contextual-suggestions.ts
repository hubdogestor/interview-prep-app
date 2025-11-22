import { useRouter } from "next/navigation";
import { useMemo } from "react";

import type { AIContextualSuggestion } from "@/components/ai/contextual-suggestions";

interface PageContext {
  page: "dashboard" | "icebreakers" | "speeches" | "competencias" | "experiencias" | "practice";
  itemCount?: number;
  hasEmptyState?: boolean;
  lastActivityDays?: number;
}

/**
 * Hook to generate contextual AI suggestions based on current page and data
 */
export function useContextualSuggestions(context: PageContext): AIContextualSuggestion[] {
  const router = useRouter();

  return useMemo(() => {
    const suggestions: AIContextualSuggestion[] = [];

    // Dashboard suggestions
    if (context.page === "dashboard") {
      if (context.lastActivityDays && context.lastActivityDays > 7) {
        suggestions.push({
          id: "practice-reminder",
          type: "action",
          priority: "high",
          title: "Hora de praticar!",
          description: `Você não pratica há ${context.lastActivityDays} dias. Que tal fazer uma sessão hoje?`,
          action: {
            label: "Ir para Prática",
            onClick: () => router.push("/practice"),
          },
        });
      }

      suggestions.push({
        id: "complete-profile",
        type: "improvement",
        priority: "medium",
        title: "Complete seu portfólio",
        description: "Adicione mais icebreakers e speeches para ter mais opções nas entrevistas.",
        action: {
          label: "Ver Icebreakers",
          onClick: () => router.push("/icebreakers"),
        },
      });
    }

    // Icebreakers suggestions
    if (context.page === "icebreakers") {
      if (context.hasEmptyState) {
        suggestions.push({
          id: "first-icebreaker",
          type: "action",
          priority: "high",
          title: "Crie seu primeiro Icebreaker",
          description: "Comece com um elevator pitch de 60-90 segundos. A IA pode ajudar!",
          action: {
            label: "Gerar com IA",
            onClick: () => router.push("/icebreakers/novo"),
          },
        });
      } else if (context.itemCount && context.itemCount < 3) {
        suggestions.push({
          id: "more-icebreakers",
          type: "tip",
          priority: "medium",
          title: "Diversifique suas apresentações",
          description: "Tenha pelo menos 3 versões: curta (elevator pitch), média e storytelling.",
          action: {
            label: "Criar Nova Versão",
            onClick: () => router.push("/icebreakers/novo"),
          },
        });
      }

      suggestions.push({
        id: "practice-icebreaker",
        type: "insight",
        priority: "medium",
        title: "Pratique com áudio",
        description: "Grave suas apresentações e analise tempo, fluência e clareza.",
        action: {
          label: "Ir para Prática",
          onClick: () => router.push("/practice"),
        },
      });
    }

    // Speeches suggestions
    if (context.page === "speeches") {
      if (context.hasEmptyState) {
        suggestions.push({
          id: "first-speech",
          type: "action",
          priority: "high",
          title: "Prepare seu primeiro Speech",
          description: "Crie um discurso customizado para uma vaga específica usando IA.",
          action: {
            label: "Gerar Speech",
            onClick: () => router.push("/speeches/novo"),
          },
        });
      }

      suggestions.push({
        id: "target-speech",
        type: "improvement",
        priority: "medium",
        title: "Personalize por empresa",
        description: "Crie speeches específicos para diferentes empresas e culturas organizacionais.",
      });
    }

    // Competências suggestions
    if (context.page === "competencias") {
      suggestions.push({
        id: "link-evidence",
        type: "tip",
        priority: "medium",
        title: "Adicione evidências",
        description: "Vincule experiências e projetos que comprovem cada competência.",
      });

      suggestions.push({
        id: "technical-balance",
        type: "insight",
        priority: "low",
        title: "Balance técnico e soft skills",
        description: "Entrevistadores valorizam tanto competências técnicas quanto comportamentais.",
      });
    }

    // Experiências suggestions
    if (context.page === "experiencias") {
      if (context.hasEmptyState) {
        suggestions.push({
          id: "first-experience",
          type: "action",
          priority: "high",
          title: "Documente sua primeira experiência",
          description: "Use o formato STAR para estruturar suas histórias profissionais.",
          action: {
            label: "Criar Experiência",
            onClick: () => router.push("/experiencias/novo"),
          },
        });
      }

      suggestions.push({
        id: "star-format",
        type: "tip",
        priority: "medium",
        title: "Siga o formato STAR",
        description: "Situation, Task, Action, Result - estrutura comprovadamente eficaz.",
      });
    }

    // Practice suggestions
    if (context.page === "practice") {
      suggestions.push({
        id: "record-audio",
        type: "tip",
        priority: "high",
        title: "Grave em áudio",
        description: "Pratique falando em voz alta. Isso revela problemas que lendo não aparece.",
      });

      suggestions.push({
        id: "time-yourself",
        type: "insight",
        priority: "medium",
        title: "Cronometre suas respostas",
        description: "Respostas ideais: 1-2 min para técnicas, 2-3 min para comportamentais.",
      });
    }

    return suggestions;
  }, [context, router]);
}
