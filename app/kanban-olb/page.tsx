import { TrelloBoard } from "@/components/boards/trello-board"
import DashboardPageLayout from "@/components/dashboard/layout"
import BriefcaseIcon from "@/components/icons/briefcase"
import { kanbanBoards } from "@/data/boards"

export default function KanbanOlbPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Kanban · OLB",
        description: "Stream voltado às operações/logística",
        icon: BriefcaseIcon,
      }}
    >
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/5 bg-background/70 p-5 text-sm text-muted-foreground shadow-lg">
          Quadro feito para acompanhar demandas do cliente OLB com a mesma lógica Trello: quatro estágios claros e cards
          fáceis de mover ou criar.
        </div>
        <TrelloBoard initialColumns={kanbanBoards.olb} addCardLabel="Adicionar item" />
      </section>
    </DashboardPageLayout>
  )
}
