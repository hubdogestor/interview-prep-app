import DashboardPageLayout from "@/components/dashboard/layout";
import QuestionIcon from "@/components/icons/question";
import { QuestionForm } from "@/components/questions/question-form";
import { api } from "@/lib/trpc/server";
import { notFound } from "next/navigation";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caller = await api();
  const question = await caller.questions.getById({ id });

  if (!question) {
    notFound();
  }

  const questionData = {
    ...question,
    pergunta: question.pergunta as { pt: string; en: string },
  };

  return (
    <DashboardPageLayout
      header={{
        title: "Editar Pergunta",
        description: "Atualize sua pergunta",
        icon: QuestionIcon,
      }}
    >
      <div className="max-w-3xl">
        <QuestionForm initialData={questionData} />
      </div>
    </DashboardPageLayout>
  );
}
