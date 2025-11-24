import Link from "next/link";
import { ArrowLeft, PenTool } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cultureData } from "@/data/amazon/culture";

export default function WritingPage() {
  const { principles, artifacts } = cultureData.writing;

  return (
    <DashboardPageLayout
      header={{
        title: "Writing Culture",
        description: "Clareza de pensamento = Clareza de escrita.",
      }}
    >
      <div className="space-y-8">
        <Button asChild variant="ghost" className="pl-0 text-sm">
          <Link href="/amz-pay-ops/culture">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Cultura
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <Card className="border-border/70">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <PenTool className="size-5 text-primary flex-shrink-0" />
                  Princípios de Escrita
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Na Amazon, escrevemos para sermos entendidos, não para impressionar.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {principles.map((principle, i) => (
                  <div key={i} className="rounded-xl border bg-muted/40 p-3">
                    <h4 className="font-semibold mb-1.5 text-sm">{principle.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{principle.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Tabs defaultValue="6-pager" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="6-pager">6-Pager</TabsTrigger>
                <TabsTrigger value="pr-faq">PR/FAQ</TabsTrigger>
                <TabsTrigger value="2-pager">2-Pager</TabsTrigger>
              </TabsList>
              {artifacts.map((artifact) => {
                const key = artifact.title.toLowerCase().includes("6")
                  ? "6-pager"
                  : artifact.title.toLowerCase().includes("pr")
                  ? "pr-faq"
                  : "2-pager";
                
                return (
                  <TabsContent key={key} value={key}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{artifact.title}</CardTitle>
                        <CardDescription>{artifact.desc}</CardDescription>
                      </CardHeader>
                      {artifact.structure && (
                        <CardContent>
                          <h4 className="text-sm font-semibold mb-3">Estrutura Recomendada:</h4>
                          <div className="flex flex-wrap gap-2">
                            {artifact.structure.map((section, i) => (
                              <Badge key={i} variant="secondary">
                                {i + 1}. {section}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>

          <div className="space-y-5">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Dica de Ouro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Antes de enviar qualquer documento, faça o &quot;So What?&quot; test.
                  <br /><br />
                  Para cada parágrafo, pergunte-se: &quot;E daí?&quot;. Se a resposta não for óbvia, reescreva ou apague.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Checklist &quot;Send&quot;</CardTitle>
                <CardDescription className="text-xs">3 minutos antes de compartilhar qualquer narrativa.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                <p>1. BLUF no primeiro parágrafo?</p>
                <p>2. Métricas com números e fonte?</p>
                <p>3. Perguntas antecipadas respondidas na seção FAQ?</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
