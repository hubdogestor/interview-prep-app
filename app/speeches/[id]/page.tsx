import Link from "next/link";
import DashboardPageLayout from "@/components/dashboard/layout";
import MessageIcon from "@/components/icons/message";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/trpc/server";
import { notFound } from "next/navigation";

export default async function SpeechViewPage({
  params,
}: {
  params: { id: string };
}) {
  const caller = await api();
  const speech = await caller.speeches.getById({ id: params.id });

  if (!speech) {
    notFound();
  }

  const conteudo = speech.conteudo as { pt: string; en: string };

  return (
    <DashboardPageLayout
      header={{
        title: speech.titulo,
        description: speech.tipoVaga,
        icon: MessageIcon,
      }}
    >
      <div className="max-w-4xl space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Badge variant="outline" className="uppercase">
              v{speech.versao}
            </Badge>
            <Badge variant="secondary" className="uppercase">
              {speech.duracaoEstimada}min
            </Badge>
            {speech.favorite && (
              <Badge variant="default" className="uppercase bg-yellow-600">
                ⭐ Favorito
              </Badge>
            )}
            {speech.archived && (
              <Badge variant="secondary" className="uppercase">
                📦 Arquivado
              </Badge>
            )}
          </div>

          {speech.foco && speech.foco.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-display uppercase mb-3">
                Áreas de Foco
              </h3>
              <div className="flex flex-wrap gap-2">
                {speech.foco.map((item) => (
                  <Badge key={item} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-display uppercase mb-3 text-muted-foreground">
                Conteúdo
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {conteudo.pt}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Link href={`/speeches/${speech.id}/editar`} className="flex-1">
            <Button variant="default" className="w-full">
              Editar Speech
            </Button>
          </Link>
          <Link href="/speeches">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
