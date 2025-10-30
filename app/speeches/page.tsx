import DashboardPageLayout from "@/components/dashboard/layout";
import MessageIcon from "@/components/icons/message";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/trpc/server";

export default async function SpeechesPage() {
  const caller = await api();
  const speeches = await caller.speeches.list();
  return (
    <DashboardPageLayout
      header={{
        title: "Speeches",
        description: "Your complete narratives",
        icon: MessageIcon,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {speeches.map((speech) => (
          <Card
            key={speech.id}
            className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-display mb-2 uppercase">
                  {speech.titulo}
                </h3>
                <p className="text-sm text-muted-foreground uppercase mb-2">
                  {speech.tipoVaga}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="uppercase">
                    v{speech.versao}
                  </Badge>
                  <Badge variant="secondary" className="uppercase">
                    {speech.duracaoEstimada}min
                  </Badge>
                </div>
              </div>
              <MessageIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            {speech.foco && speech.foco.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {speech.foco.map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="default" size="sm" className="flex-1">
                VIEW
              </Button>
              <Button variant="outline" size="sm">
                TELEPROMPTER
              </Button>
              <Button variant="ghost" size="sm">
                EDIT
              </Button>
            </div>
          </Card>
        ))}

        {speeches.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p className="uppercase">Nenhum speech cadastrado ainda</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="p-4 border border-dashed border-border hover:border-primary hover:bg-accent/50 rounded-lg transition-colors uppercase text-sm font-display">
          + CREATE NEW SPEECH
        </button>
        <button className="p-4 border border-dashed border-border hover:border-chart-1 hover:bg-chart-1/10 rounded-lg transition-colors uppercase text-sm font-display text-chart-1">
          ✨ GENERATE WITH AI
        </button>
      </div>
    </DashboardPageLayout>
  )
}
