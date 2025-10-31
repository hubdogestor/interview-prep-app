"use client";

import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Edit, Heart, Trash2 } from "lucide-react";

const priorityColors: Record<string, string> = {
  alta: "bg-destructive",
  media: "bg-warning",
  baixa: "bg-muted",
};

const categoryIcons: Record<string, string> = {
  tecnica: "🚀",
  comportamental: "🎯",
  cultura: "👥",
  carreira: "📈",
};

interface Question {
  id: string;
  categoria: string;
  pergunta: { pt: string; en: string } | string;
  contexto: string | null;
  prioridade: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function QuestionList({ initialQuestions }: { initialQuestions: Question[] }) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data: questionsRaw } = trpc.questions.list.useQuery();

  const questions = questionsRaw
    ? questionsRaw.map((q) => ({
        ...q,
        pergunta: q.pergunta as { pt: string; en: string },
      }))
    : initialQuestions;

  const toggleFavoriteMutation = trpc.questions.toggleFavorite.useMutation({
    onSuccess: () => {
      utils.questions.list.invalidate();
      toast.success("Favorito atualizado!");
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const deleteMutation = trpc.questions.delete.useMutation({
    onSuccess: () => {
      utils.questions.list.invalidate();
      toast.success("Pergunta removida com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao remover: ${error.message}`);
    },
  });

  function handleToggleFavorite(id: string) {
    toggleFavoriteMutation.mutate({ id });
  }

  function handleDelete(id: string) {
    if (
      confirm(
        "Tem certeza que deseja remover esta pergunta? Esta ação não pode ser desfeita."
      )
    ) {
      deleteMutation.mutate({ id });
    }
  }

  function handleEdit(id: string) {
    router.push(`/questions/${id}/edit`);
  }

  // Group questions by category
  const questionsByCategory = questions.reduce(
    (acc, question) => {
      const category = question.categoria;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(question);
      return acc;
    },
    {} as Record<string, Question[]>
  );

  return (
    <>
      <Accordion type="multiple" className="space-y-4">
        {Object.entries(questionsByCategory).map(([category, categoryQuestions]) => (
          <AccordionItem
            key={category}
            value={`category-${category}`}
            className="border border-border rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-accent/50 hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {categoryIcons[category] ?? "❓"}
                </span>
                <span className="text-xl font-display uppercase">
                  {category}
                </span>
                <Badge variant="outline" className="ml-2">
                  {categoryQuestions.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="space-y-4 pt-2">
                {categoryQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`uppercase text-xs ${priorityColors[q.prioridade] ?? "bg-muted"}`}
                          >
                            {q.prioridade}
                          </Badge>
                          {q.favorite && (
                            <Badge variant="outline" className="text-xs">
                              ⭐ Favorita
                            </Badge>
                          )}
                        </div>
                        <p className="text-base mb-2 font-medium">
                          {typeof q.pergunta === "string"
                            ? q.pergunta
                            : q.pergunta.pt}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleFavorite(q.id)}
                          className={q.favorite ? "text-yellow-500" : ""}
                        >
                          <Heart
                            className="h-4 w-4"
                            fill={q.favorite ? "currentColor" : "none"}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(q.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(q.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {q.contexto && (
                      <div className="text-xs text-muted-foreground uppercase border-t border-border pt-3 mt-3">
                        💡 {q.contexto}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {Object.keys(questionsByCategory).length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="uppercase">Nenhuma pergunta cadastrada ainda</p>
          </div>
        )}
      </Accordion>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => router.push("/questions/new")}
          className="p-4 border border-dashed border-border hover:border-primary hover:bg-accent/50 rounded-lg transition-colors uppercase text-sm font-display"
        >
          + ADD NEW QUESTION
        </button>
        <button className="p-4 border border-dashed border-border hover:border-chart-1 hover:bg-chart-1/10 rounded-lg transition-colors uppercase text-sm font-display text-chart-1">
          ✨ SUGGEST QUESTIONS WITH AI
        </button>
      </div>
    </>
  );
}
