import DashboardPageLayout from "@/components/dashboard/layout";
import StarIcon from "@/components/icons/star";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/trpc/server";

const categoryColors: Record<string, string> = {
  tecnica: "bg-chart-1",
  comportamental: "bg-chart-2",
  lideranca: "bg-chart-3",
};

export default async function CompetenciasPage() {
  const caller = await api();
  const competencias = await caller.competencias.list();

  return (
    <DashboardPageLayout
      header={{
        title: "Competências",
        description: "Your skills arsenal",
        icon: StarIcon,
      }}
    >
      <div className="space-y-4">
        {competencias.map((comp) => (
          <Card
            key={comp.id}
            className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-display uppercase">{comp.nome}</h3>
                  <Badge
                    variant="outline"
                    className={`uppercase ${categoryColors[comp.categoria] ?? "bg-chart-1"}/20`}
                  >
                    {comp.categoria}
                  </Badge>
                </div>
                {comp.ferramentas && comp.ferramentas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {comp.ferramentas.map((ferramenta) => (
                      <Badge key={ferramenta} variant="secondary" className="text-xs">
                        {ferramenta}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <StarIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground uppercase">
                  Proficiency Level
                </span>
                <span className="font-display text-lg uppercase">{comp.nivel}</span>
              </div>
            </div>
          </Card>
        ))}

        {competencias.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="uppercase">Nenhuma competência cadastrada ainda</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button className="w-full p-4 border border-dashed border-border hover:border-primary hover:bg-accent/50 rounded-lg transition-colors uppercase text-sm font-display">
          + ADD NEW COMPETÊNCIA
        </button>
      </div>
    </DashboardPageLayout>
  );
}
