import { ArrowLeft, FileText, PenTool } from "lucide-react";
import Link from "next/link";

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
      <div className="space-y-6">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/amz-pay-ops/culture">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Cultura
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="size-5 text-primary" />
                  Princípios de Escrita
                </CardTitle>
                <CardDescription>
                  Na Amazon, escrevemos para sermos entendidos, não para impressionar.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {principles.map((principle, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <h4 className="font-semibold mb-1">{principle.title}</h4>
                    <p className="text-sm text-muted-foreground">{principle.desc}</p>
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

          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Dica de Ouro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Antes de enviar qualquer documento, faça o "So What?" test.
                  <br /><br />
                  Para cada parágrafo, pergunte-se: "E daí?". Se a resposta não for óbvia, reescreva ou apague.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
