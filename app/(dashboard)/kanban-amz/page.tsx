import { KanbanClientBoard } from "@/components/boards/kanban-client-board"
import DashboardPageLayout from "@/components/dashboard/layout"
import ProcessorIcon from "@/components/icons/proccesor"
import { kanbanBoards } from "@/data/boards"

export default function KanbanAmzPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Kanban · AMZ",
        description: "Tribo dedicada ao programa Amazon/Bar Raiser",
        icon: ProcessorIcon,
      }}
    >
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/5 bg-background/70 p-5 text-sm text-muted-foreground shadow-lg">
          Monitoramento rápido das entregas que suportam AMZ LATAM. Arraste cards entre backlog, to-do, doing e done para
          acompanhar o pulso de cada trilha.
        </div>
        <KanbanClientBoard 
          boardName="amz" 
          initialColumns={kanbanBoards.amz} 
          addCardLabel="Adicionar item"
          showKRs={false}
        />
      </section>
    </DashboardPageLayout>
  )
}
