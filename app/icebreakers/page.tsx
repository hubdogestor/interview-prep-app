import DashboardPageLayout from "@/components/dashboard/layout";
import MicrophoneIcon from "@/components/icons/microphone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/trpc/server";

export default async function IcebreakersPage() {
  const caller = await api();
  const icebreakers = await caller.icebreakers.list();

  return (
    <DashboardPageLayout
      header={{
        title: "Icebreakers",
        description: "Your introduction arsenal",
        icon: MicrophoneIcon,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {icebreakers.map((icebreaker) => (
          <Card
            key={icebreaker.id}
            className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-display mb-2 uppercase">
                  {icebreaker.titulo}
                </h3>
                <p className="text-sm text-muted-foreground uppercase">
                  {icebreaker.tipo}
                </p>
              </div>
              <MicrophoneIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="uppercase">
                {icebreaker.versoes.length} versions
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button variant="default" size="sm" className="flex-1">
                VIEW DETAILS
              </Button>
              <Button variant="outline" size="sm">
                PRACTICE
              </Button>
            </div>
          </Card>
        ))}

        {icebreakers.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p className="uppercase">Nenhum icebreaker cadastrado ainda</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Button variant="outline" className="w-full bg-transparent">
          + ADD NEW ICEBREAKER
        </Button>
      </div>
    </DashboardPageLayout>
  );
}
