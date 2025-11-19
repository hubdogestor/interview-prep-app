import DashboardPageLayout from "@/components/dashboard/layout"
import BracketsIcon from "@/components/icons/brackets"
import { TrelloBoard } from "@/components/boards/trello-board"
import { kanbanBoards } from "@/data/boards"

export default function KanbanLeoPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Kanban · LEO",
        description: "Backlog curado da operação principal LEOMDS",
        icon: BracketsIcon,
      }}
    >
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/5 bg-background/70 p-5 text-sm text-muted-foreground shadow-lg">
          Estrutura simples com backlog → done. Use drag-and-drop para priorizar iniciativas da frente autoral de
          Leonardo, mantendo uma visão enxuta para 2026.
        </div>
        <TrelloBoard initialColumns={kanbanBoards.leo} addCardLabel="Adicionar item" />
      </section>
    </DashboardPageLayout>
  )
}
