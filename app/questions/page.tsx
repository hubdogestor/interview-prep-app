import DashboardPageLayout from "@/components/dashboard/layout"
import QuestionIcon from "@/components/icons/question"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const questionsByCategory = [
  {
    category: "CULTURE & VALUES",
    icon: "🎯",
    questions: [
      {
        id: 1,
        question: "What does success look like in this role after 6 months?",
        questionPT: "Como é o sucesso nesta posição após 6 meses?",
        priority: "high",
        context: "Great for understanding expectations early",
      },
      {
        id: 2,
        question: "How does the company support work-life balance?",
        questionPT: "Como a empresa apoia o equilíbrio vida-trabalho?",
        priority: "medium",
        context: "Important for long-term sustainability",
      },
      {
        id: 3,
        question: "What are the company's core values in practice?",
        questionPT: "Quais são os valores centrais da empresa na prática?",
        priority: "high",
        context: "Understand if values match yours",
      },
    ],
  },
  {
    category: "TEAM & COLLABORATION",
    icon: "👥",
    questions: [
      {
        id: 4,
        question: "How is the team structured? Who would I work with directly?",
        questionPT: "Como o time é estruturado? Com quem eu trabalharia diretamente?",
        priority: "high",
        context: "Essential for understanding dynamics",
      },
      {
        id: 5,
        question: "What's the team's approach to code reviews and feedback?",
        questionPT: "Qual a abordagem do time para code reviews e feedback?",
        priority: "medium",
        context: "Shows engineering culture",
      },
    ],
  },
  {
    category: "PRODUCT & TECHNOLOGY",
    icon: "🚀",
    questions: [
      {
        id: 6,
        question: "What's the current tech stack and why was it chosen?",
        questionPT: "Qual a stack tecnológica atual e por que foi escolhida?",
        priority: "high",
        context: "Understand technical decisions",
      },
      {
        id: 7,
        question: "How does the company approach technical debt?",
        questionPT: "Como a empresa lida com débito técnico?",
        priority: "medium",
        context: "Shows engineering maturity",
      },
      {
        id: 8,
        question: "What's the product roadmap for the next 6-12 months?",
        questionPT: "Qual o roadmap do produto para os próximos 6-12 meses?",
        priority: "high",
        context: "Understand product direction",
      },
    ],
  },
  {
    category: "GROWTH & CAREER",
    icon: "📈",
    questions: [
      {
        id: 9,
        question: "What does the career progression look like here?",
        questionPT: "Como é a progressão de carreira aqui?",
        priority: "high",
        context: "Important for long-term planning",
      },
      {
        id: 10,
        question: "Are there opportunities for learning and development?",
        questionPT: "Há oportunidades de aprendizado e desenvolvimento?",
        priority: "medium",
        context: "Shows investment in people",
      },
    ],
  },
]

const priorityColors: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-muted",
}

export default function QuestionsPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "My Questions",
        description: "Questions for interviewers",
        icon: QuestionIcon,
      }}
    >
      <Accordion type="multiple" className="space-y-4">
        {questionsByCategory.map((category, index) => (
          <AccordionItem
            key={index}
            value={`category-${index}`}
            className="border border-border rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-accent/50 hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xl font-display">{category.category}</span>
                <Badge variant="outline" className="ml-2">
                  {category.questions.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="space-y-4 pt-2">
                {category.questions.map((q) => (
                  <div key={q.id} className="p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`uppercase text-xs ${priorityColors[q.priority]}`}>{q.priority}</Badge>
                        </div>
                        <p className="text-base mb-2 font-medium">🇺🇸 {q.question}</p>
                        <p className="text-base text-muted-foreground">🇧🇷 {q.questionPT}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground uppercase border-t border-border pt-3 mt-3">
                      💡 {q.context}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
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
