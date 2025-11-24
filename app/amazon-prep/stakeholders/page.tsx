import { MessageSquare, Radar, Target } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stakeholdersData } from "@/data/amazon/onboarding";

import "../styles.css";
const { stakeholderProfiles, alignmentChecklist, escalationMatrix } = stakeholdersData;

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
