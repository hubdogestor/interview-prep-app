import DashboardPageLayout from "@/components/dashboard/layout";
import QuestionIcon from "@/components/icons/question";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/trpc/server";

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

export default async function QuestionsPage() {
  const caller = await api();
  const allQuestions = await caller.questions.list();

  // Group questions by category
  const questionsByCategory = allQuestions.reduce(
    (acc, question) => {
      const category = question.categoria;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(question);
      return acc;
    },
    {} as Record<string, typeof allQuestions>,
  );
  return (
    <DashboardPageLayout
      header={{
        title: "My Questions",
        description: "Questions for interviewers",
        icon: QuestionIcon,
      }}
    >
      <Accordion type="multiple" className="space-y-4">
        {Object.entries(questionsByCategory).map(([category, questions]) => (
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
                  {questions.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="space-y-4 pt-2">
                {questions.map((q) => (
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
                        </div>
                        <p className="text-base mb-2 font-medium">
                          {typeof q.pergunta === "string"
                            ? q.pergunta
                            : JSON.stringify(q.pergunta)}
                        </p>
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
        <button className="p-4 border border-dashed border-border hover:border-primary hover:bg-accent/50 rounded-lg transition-colors uppercase text-sm font-display">
          + ADD NEW QUESTION
        </button>
        <button className="p-4 border border-dashed border-border hover:border-chart-1 hover:bg-chart-1/10 rounded-lg transition-colors uppercase text-sm font-display text-chart-1">
          ✨ SUGGEST QUESTIONS WITH AI
        </button>
      </div>
    </DashboardPageLayout>
  )
}
