import Link from "next/link";
import DashboardPageLayout from "@/components/dashboard/layout";
import MicrophoneIcon from "@/components/icons/microphone";
import { Button } from "@/components/ui/button";
import { IcebreakerCard } from "@/components/icebreakers/icebreaker-card";
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
          <IcebreakerCard key={icebreaker.id} icebreaker={icebreaker} />
        ))}

        {icebreakers.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p className="uppercase">Nenhum icebreaker cadastrado ainda</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link href="/icebreakers/novo">
          <Button variant="outline" className="w-full bg-transparent">
            + Adicionar Novo Icebreaker
          </Button>
        </Link>
      </div>
    </DashboardPageLayout>
  );
}
