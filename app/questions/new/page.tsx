"use client";

import { useRouter } from "next/navigation";
import DashboardPageLayout from "@/components/dashboard/layout";
import QuestionIcon from "@/components/icons/question";
import { QuestionForm } from "@/components/questions/question-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewQuestionPage() {
  const router = useRouter();

  return (
    <DashboardPageLayout
      header={{
        title: "Nova Pergunta",
        description: "Adicione uma nova pergunta para fazer aos entrevistadores",
        icon: QuestionIcon,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/questions")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
      }}
    >
      <div className="max-w-3xl">
        <QuestionForm />
      </div>
    </DashboardPageLayout>
  );
}
