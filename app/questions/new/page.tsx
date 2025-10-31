import DashboardPageLayout from "@/components/dashboard/layout";
import QuestionIcon from "@/components/icons/question";
import { QuestionForm } from "@/components/questions/question-form";

export default function NewQuestionPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Nova Pergunta",
        description: "Adicione uma nova pergunta para fazer aos entrevistadores",
        icon: QuestionIcon,
      }}
    >
      <div className="max-w-3xl">
        <QuestionForm />
      </div>
    </DashboardPageLayout>
  );
}
