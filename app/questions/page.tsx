"use client";

import DashboardPageLayout from "@/components/dashboard/layout";
import QuestionIcon from "@/components/icons/question";
import { QuestionList } from "@/components/questions/question-list";
import { ExportButton } from "@/components/export/export-button";
import { SkeletonGrid } from "@/components/ui/skeleton-cards";
import { trpc } from "@/lib/trpc/client";

export default function QuestionsPage() {
  const { data, isLoading } = trpc.questions.list.useQuery();
  const allQuestions = data?.items ?? [];

  const questionsData = allQuestions.map((q) => ({
    ...q,
    pergunta: q.pergunta as { pt: string; en: string },
  }));

  // Prepare export data
  const exportItems = questionsData.map((question) => ({
    title: question.pergunta.pt,
    content: question.contexto || "",
    metadata: {
      Categoria: question.categoria,
      Prioridade: question.prioridade,
      "Pergunta (EN)": question.pergunta.en || "",
    },
  }));

  return (
    <DashboardPageLayout
      header={{
        title: "My Questions",
        description: "Questions for interviewers",
        icon: QuestionIcon,
        action: <ExportButton items={exportItems} filename="questions" />,
      }}
    >
      {isLoading ? (
        <SkeletonGrid type="question" count={6} columns="1" />
      ) : (
        <QuestionList initialQuestions={questionsData} />
      )}
    </DashboardPageLayout>
  );
}
