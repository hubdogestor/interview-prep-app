import { ArrowUpRight, CalendarDays, CheckCircle2, Clock4, ListChecks } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { operatingRhythmData } from "@/data/amazon/onboarding";

import "../styles.css";
const { cadenceRows, rampPlan, reviewKits, readinessList, commitments, readinessStatusTone } = operatingRhythmData;

export default function OperatingRhythmPage() {
  return (
    <AmazonPortalSection
      title="Operating Rhythm & Ramp Plan"
      description="Plano vivo para conduzir as primeiras 12 semanas no Payment Business Operation. Usa cadência Amazon (WBR, PR/FAQ, 6-pagers) e integra os parceiros Oakberry desde o dia 1."
      kicker="Runbook vivo"
      updatedAt="23·11·2025"
    >
      <Tabs defaultValue="cadence" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 amazon-prep-tabs-list">
          <TabsTrigger value="cadence" className="amazon-prep-tabs-trigger">
            Cadência semanal
          </TabsTrigger>
          <TabsTrigger value="ramp" className="amazon-prep-tabs-trigger">
            Plano 30·60·90
          </TabsTrigger>
          <TabsTrigger value="reviews" className="amazon-prep-tabs-trigger">
            Kits de review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cadence" className="amazon-prep-tabs-content">
          <Card className="amazon-prep-card">
            <CardHeader>
              <CardTitle>Rituais confirmados</CardTitle>
              <CardDescription>Todos os horários já combinados com Andreia, Sujash e Oakberry.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="amazon-portal-table min-w-full">
                  <thead>
                    <tr>
                      <th>Ritual</th>
                      <th>Janela</th>
                      <th>Foco</th>
                      <th>Preparação</th>
                      <th>Sinal crítico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cadenceRows.map((row) => (
                      <tr key={row.ritual}>
                        <td className="font-medium pr-4">{row.ritual}</td>
                        <td className="pr-4">{row.day}</td>
                        <td className="pr-4">{row.focus}</td>
                        <td className="pr-4">{row.prep}</td>
                        <td>{row.signal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ramp" className="amazon-prep-tabs-content">
          <div className="grid gap-4 md:grid-cols-3">
            {rampPlan.map((phase) => (
              <Card key={phase.phase} className="border-white/10 bg-pop/40">
                <CardHeader className="space-y-2">
                  <Badge variant="outline">{phase.phase}</Badge>
                  <CardTitle>{phase.theme}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="amazon-prep-subsection-title">Objetivos</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {phase.objectives.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="amazon-prep-subsection-title">Entregáveis</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {phase.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="amazon-prep-tabs-content">
          <div className="grid gap-4 md:grid-cols-3">
            {reviewKits.map((kit) => (
              <Card key={kit.title} className="border-white/10 bg-pop/40">
                <CardHeader>
                  <CardTitle>{kit.title}</CardTitle>
                  <CardDescription>{kit.window}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="amazon-prep-subsection-title">Inputs</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {kit.inputs.map((input) => (
                        <li key={input}>{input}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="amazon-prep-subsection-title">Outputs</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {kit.outputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-white/10 bg-pop/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ListChecks className="text-primary" />
              <div>
                <CardTitle>Status das readiness items</CardTitle>
                <CardDescription>Atualizado após o Friday Reset.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {readinessList.map((item) => (
              <div key={item.title} className="amazon-portal-card">
                <div className="flex items-center justify-between">
                  <p className="amazon-portal-card-title">{item.title}</p>
                  <span className={`amazon-portal-chip ${readinessStatusTone[item.status] ?? "text-white"}`}>
                    {item.status === "done" && <CheckCircle2 className="mr-2 h-4 w-4" />}
                    {item.status === "risk" && <Clock4 className="mr-2 h-4 w-4" />}
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
                <p className="text-xs text-muted-foreground">Owner: {item.owner}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-pop/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CalendarDays className="text-primary" />
              <div>
                <CardTitle>Compromissos da semana</CardTitle>
                <CardDescription>Itens que desbloqueiam as próximas entregas.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {commitments.map((item) => (
              <div key={item.label} className="amazon-portal-card">
                <p className="amazon-portal-card-title">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
            <Badge asChild variant="outline">
              <a href="/amazon-prep/program-management" className="inline-flex items-center gap-2 text-sm">
                Ver detalhamento completo
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Badge>
          </CardContent>
        </Card>
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3">
          <Clock4 className="text-primary" />
          <h3 className="amazon-prep-section-title">Checklist antes de cada review</h3>
        </div>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Validar métricas no Looker e anexar screenshots no doc de suporte.</li>
          <li>Atualizar riscos/decisões do log compartilhado com Andreia.</li>
          <li>Enviar agenda e materiais com antecedência mínima de 12h.</li>
          <li>Registrar decisões tomadas em até 2h pós-meeting.</li>
        </ol>
      </section>
    </AmazonPortalSection>
  );
}
