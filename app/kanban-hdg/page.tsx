import { KanbanClientBoard } from "@/components/boards/kanban-client-board"
import DashboardPageLayout from "@/components/dashboard/layout"
import AtomIcon from "@/components/icons/atom"
import { kanbanBoards } from "@/data/boards"

export default function KanbanHdgPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Kanban · HDG",
        description: "Fluxos estratégicos com o time HDG",
        icon: AtomIcon,
      }}
    >
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/5 bg-background/70 p-5 text-sm text-muted-foreground shadow-lg">
          Um quadro compacto para alinhar squads HDG. Arraste cards, crie novas entregas e mantenha tudo transparente
          entre backlog e done.
        </div>
        <KanbanClientBoard 
          boardName="hdg" 
          initialColumns={kanbanBoards.hdg} 
          addCardLabel="Adicionar item" 
        />
      </section>
    </DashboardPageLayout>
  )
}
