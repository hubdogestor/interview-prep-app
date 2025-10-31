import DashboardPageLayout from "@/components/dashboard/layout";
import QuestionIcon from "@/components/icons/question";
import { QuestionList } from "@/components/questions/question-list";
import { api } from "@/lib/trpc/server";

export default async function QuestionsPage() {
  const caller = await api();
  const allQuestions = await caller.questions.list();

  const questionsData = allQuestions.map((q) => ({
    ...q,
    pergunta: q.pergunta as { pt: string; en: string },
  }));

  return (
    <DashboardPageLayout
      header={{
        title: "My Questions",
        description: "Questions for interviewers",
        icon: QuestionIcon,
      }}
    >
      <QuestionList initialQuestions={questionsData} />
    </DashboardPageLayout>
  );
}
