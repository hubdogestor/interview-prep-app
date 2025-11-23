import { OKRClientBoard } from "@/components/boards/okr-client-board"
import DashboardPageLayout from "@/components/dashboard/layout"
import StarIcon from "@/components/icons/star"
import { okr2026Columns } from "@/data/boards"

export default function Okrs2026Page() {
  return (
    <DashboardPageLayout
      header={{
        title: "OKRs 2026",
        description: "Mapa anual com quatro trimestres e key results locais",
        icon: StarIcon,
      }}
    >
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/5 bg-background/70 p-5 text-sm text-muted-foreground shadow-lg shadow-black/10">
          Arraste e reorganize os objetivos por trimestre. Cada coluna aceita novos cards e mantém o contexto visual
          inspirado em quadros Trello, perfeito para revisões rápidas com o time.
        </div>
        <OKRClientBoard 
          quarter="2026" 
          initialColumns={okr2026Columns} 
          addCardLabel="Adicionar OKR" 
        />
      </section>
    </DashboardPageLayout>
  )
}
