import { AlertTriangle, Cpu, Plug, ShieldCheck, Workflow } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { systemsToolingData } from "@/data/amazon/onboarding";

import "../styles.css";

const { architectureLayers, awsServices, resiliencePlaybooks, observability, integrationChecklist } =
  systemsToolingData;

export default function SystemsToolingPage() {
  return (
    <AmazonPortalSection
      title="Systems & Tooling"
      description="Mapa tático da pilha AWS + integrações de pagamento usadas no LATAM. Serve como referência para incidentes, game days e revisões com Auditores/Andreia."
      kicker="Arquitetura viva"
      updatedAt="23·11·2025"
    >
      <section className="grid gap-4 md:grid-cols-2">
        {architectureLayers.map((layer) => (
          <Card key={layer.name} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cpu className="text-primary" />
                <CardTitle className="text-base">{layer.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{layer.details}</p>
              <Badge variant="outline">Sinal saudável: {layer.signals}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Workflow className="text-primary" />
          <h3 className="amazon-prep-section-title">Serviços AWS essenciais</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {awsServices.map((service) => (
            <div key={service.name} className="amazon-portal-card">
              <p className="amazon-portal-card-title">{service.name}</p>
              <p className="text-sm text-muted-foreground">{service.use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {resiliencePlaybooks.map((playbook) => (
          <Card key={playbook.title} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-primary" />
                <CardTitle className="text-base">{playbook.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                {playbook.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-primary" />
          <div>
            <h3 className="amazon-prep-section-title">Observabilidade e alarmes</h3>
            <p className="text-sm text-muted-foreground">O que precisa estar verde antes do WBR.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {observability.map((block) => (
            <div key={block.category} className="amazon-portal-card">
              <p className="amazon-portal-card-title">{block.category}</p>
              <ul className="amazon-portal-list list-disc list-inside">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Plug className="text-primary" />
          <h3 className="amazon-prep-section-title">Checklist para novas integrações</h3>
        </div>
        <ul className="amazon-portal-list list-disc list-inside">
          {integrationChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </AmazonPortalSection>
  );
}
