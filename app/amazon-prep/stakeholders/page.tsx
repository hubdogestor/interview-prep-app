import { MessageSquare, Radar, Target } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "../styles.css";

const stakeholderProfiles = [
  {
    id: "andreia",
    name: "Andreia Guarino",
    title: "Sr. Manager · LATAM Payment Ops",
    style: "Data-driven, Lean/Six Sigma e foco em execução semanal.",
    expectations: [
      "Atualizações objetivas com métricas antes das reuniões.",
      "Planos de mitigação claros e owners designados.",
      "Transparência sobre riscos de compliance e custo.",
    ],
    cadence: [
      { label: "Weekly Sync", detail: "Seg · 09h (45min)" },
      { label: "Slack", detail: "Respostas em até 2h para incidentes" },
      { label: "Docs", detail: "2 páginas para decisões >R$250k" },
    ],
    focusAreas: [
      "Automação e redução de custo por transação.",
      "Runbooks auditáveis para PCI/SOX.",
      "Desempenho das integrações PIX e cartões.",
    ],
    watchouts: [
      "Chegar sem dados ou hipóteses validadas.",
      "Escalonar problemas sem plano de contenção.",
    ],
  },
  {
    id: "sujash",
    name: "Sujash Biswas",
    title: "Head LATAM Payments",
    style: "Visão regional, replicabilidade e Think Big.",
    expectations: [
      "Narrativas conectando Brasil com LATAM e UPI (Índia).",
      "Roadmaps escaláveis com premissas financeiras claras.",
      "Insights sobre parcerias estratégicas (Oakberry, adquirentes).",
    ],
    cadence: [
      { label: "WBR LATAM", detail: "Ter · 11h (60min)" },
      { label: "Mensal", detail: "Readout escrito + deep dive" },
      { label: "Ad-hoc", detail: "Pings curtos no Chime com dados" },
    ],
    focusAreas: [
      "Escalar práticas do Brasil para Argentina/México.",
      "Roadmap de AI/ML aplicado a Payments.",
      "Integração com programas globais (Prime, Retail, Ads).",
    ],
    watchouts: [
      "Apresentar iniciativas muito locais sem plano de réplica.",
      "Discussões longas sem ligação com métricas regionais.",
    ],
  },
  {
    id: "oakberry",
    name: "Equipe Oakberry",
    title: "Parceiro estratégico",
    style: "Operating partner exigindo visibilidade total do roadmap.",
    expectations: [
      "Transparência sobre SLAs e status de integrações.",
      "Acesso rápido a owners e timelines.",
      "Modelos de co-inovação com métricas de sucesso compartilhadas.",
    ],
    cadence: [
      { label: "Ops Review", detail: "Qui · 15h" },
      { label: "Canal compartilhado", detail: "Atualizações diárias no Chime" },
      { label: "QBR", detail: "Narrativa + demonstração" },
    ],
    focusAreas: [
      "Integração PIX + wallet proprietária.",
      "Planos de expansão para novos países.",
      "Planos de contingência e auditoria.",
    ],
    watchouts: [
      "Alterar prioridades sem comunicar contrapartidas.",
      "Falta de visibilidade sobre bugs/erros.",
    ],
  },
];

const alignmentChecklist = [
  {
    title: "Antes de reuniões com Andreia",
    items: [
      "Enviar métricas + narrativa 12h antes.",
      "Destacar top 3 riscos e mitigação.",
      "Trazer próximos passos com donos e datas.",
    ],
  },
  {
    title: "Antes de reuniões com Sujash",
    items: [
      "Conectar impacto LATAM e oportunidades de replicação.",
      "Mapear dependências cross-região (Data, Finance, Legal).",
      "Preparar perguntas abertas para feedback estratégico.",
    ],
  },
  {
    title: "Antes de reuniões com Oakberry",
    items: [
      "Atualizar tracker de integrações e SLAs.",
      "Confirmar status das ações conjuntas (marketing, tech).",
      "Registrar compromissos e enviar follow-up em 24h.",
    ],
  },
];

const escalationMatrix = [
  { signal: "Risco de SLA ou incidente crítico", path: "Andreia imediatamente + PagerDuty + nota pós incidente." },
  { signal: "Mudança estratégica ou investimento", path: "Draft 6-pager → revisão com Sujash → fórum executivo." },
  { signal: "Dependência Oakberry", path: "Canal compartilhado + resumo diário até resolução." },
];

export default function StakeholdersPage() {
  return (
    <AmazonPortalSection
      title="Stakeholder Playbooks"
      description="Perfis, expectativas e canais para operar em sintonia com Andreia, Sujash e Oakberry desde o primeiro dia."
      kicker="Relationship OS"
      updatedAt="23·11·2025"
    >
      <Tabs defaultValue="andreia" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 amazon-prep-tabs-list">
          {stakeholderProfiles.map((profile) => (
            <TabsTrigger key={profile.id} value={profile.id} className="amazon-prep-tabs-trigger">
              {profile.name.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {stakeholderProfiles.map((profile) => (
          <TabsContent key={profile.id} value={profile.id} className="amazon-prep-tabs-content">
            <Card className="border-white/10 bg-pop/40">
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{profile.title}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="amazon-portal-card">
                  <p className="amazon-portal-card-title">Estilo de liderança</p>
                  <p className="text-sm text-muted-foreground">{profile.style}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="amazon-portal-card">
                    <p className="amazon-portal-card-title">Expectativas explícitas</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {profile.expectations.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="amazon-portal-card">
                    <p className="amazon-portal-card-title">Cadência combinada</p>
                    <ul className="amazon-portal-list">
                      {profile.cadence.map((touchpoint) => (
                        <li key={touchpoint.label}>
                          <strong>{touchpoint.label}:</strong> {touchpoint.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="amazon-portal-card">
                    <p className="amazon-portal-card-title">Focos prioritários</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {profile.focusAreas.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="amazon-portal-card">
                    <p className="amazon-portal-card-title">Evite</p>
                    <ul className="amazon-portal-list list-disc list-inside">
                      {profile.watchouts.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <section className="grid gap-4 md:grid-cols-3">
        {alignmentChecklist.map((block) => (
          <Card key={block.title} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="text-primary" />
                <CardTitle className="text-base">{block.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="amazon-portal-list list-disc list-inside">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Target className="text-primary" />
          <h3 className="amazon-prep-section-title">Matriz de escalonamento</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="amazon-portal-table min-w-full">
            <thead>
              <tr>
                <th>Sinal</th>
                <th>Caminho</th>
              </tr>
            </thead>
            <tbody>
              {escalationMatrix.map((item) => (
                <tr key={item.signal}>
                  <td className="font-medium pr-4">{item.signal}</td>
                  <td>{item.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Radar className="text-primary" />
          <div>
            <h3 className="amazon-prep-section-title">Sinais de saúde do relacionamento</h3>
            <p className="text-sm text-muted-foreground">Revisar semanalmente para evitar surpresas nos WBRs.</p>
          </div>
        </div>
        <ul className="amazon-portal-list list-disc list-inside">
          <li>Andreia pergunta pelo próximo passo antes mesmo de você apresentar → confiança alta.</li>
          <li>Sujash faz paralelos com outros países e pede replicação → mensagem escalável.</li>
          <li>Oakberry compartilha dados de maneira proativa → parceria equilibrada.</li>
        </ul>
      </section>
    </AmazonPortalSection>
  );
}
