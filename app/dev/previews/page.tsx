import { notFound } from "next/navigation";

import { ContextFilesSync } from "@/components/ai/context-files-sync";
import { CompetenciaForm } from "@/components/competencias/competencia-form";
import { ExperienciaForm } from "@/components/experiencias/experiencia-form";

const MOCK_CONTEXT_FILES = {
  files: [
    {
      name: "context-files/competencias.md",
      path: "context-files/competencias.md",
      lastModified: new Date().toISOString(),
      size: 2456,
    },
    {
      name: "context-files/experiencias.md",
      path: "context-files/experiencias.md",
      lastModified: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      size: 3890,
    },
  ],
  outdatedFiles: ["context-files/competencias.md", "context-files/experiencias.md"],
};

const COMPETENCIA_DEFAULTS = {
  nome: "Liderança de Programas",
  categoria: "leadership",
  nivel: "advanced",
  descricao: {
    pt: "Coordeno programas complexos envolvendo múltiplas equipes globais, mantendo alinhamento estratégico e governança clara.",
    en: "Lead multi-team programs ensuring governance and predictable delivery.",
  },
  ferramentas: ["Jira", "Notion", "Confluence"],
  evidencias: [
    "https://example.com/playbook",
    "https://example.com/leadership-case",
  ],
  trackRecord: [
    {
      projeto: "Amazon Payments Ops",
      resultado: "Unificou 4 fluxos reduzindo 32% do SLA",
      ano: 2024,
    },
  ],
};

const EXPERIENCIA_DEFAULTS = {
  id: "exp-preview",
  empresa: "Amazon Payments",
  cargo: "Sr. Program Manager",
  periodo: { inicio: "2023-01", fim: null },
  pitchElevator: {
    pt: "Liderei a expansão do programa de monitoramento antifraude na América Latina, conectando times de Produto, Engenharia e Operações.",
    en: "Led the fraud monitoring expansion across LATAM, partnering with product and ops teams.",
  },
  speechCompleto: {
    pt: "Durante 18 meses conduzi um roadmap de 12 iniciativas críticas, garantindo governança executiva e entregas alinhadas ao P&L regional...",
    en: "Over 18 months I drove a 12-initiative roadmap, ensuring executive governance and measurable ROI...",
  },
  starCases: [
    {
      titulo: "Redução de chargebacks",
      situation: "Chargebacks crescentes em sellers enterprise.",
      task: "Reduzir 20% em dois trimestres.",
      action: "Implementei playbook com automações de detecção e squads dedicados por categoria.",
      result: "Redução de 27% e economia anual de US$12M.",
      idioma: "pt",
    },
  ],
  tecnologias: ["AWS", "Step Functions", "Looker"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const NOOP_SUBMIT = async () => {
  // Página de preview não persiste dados
};

export default function DevPreviewsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="space-y-10 p-6">
      <section className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Context Files</p>
          <h1 className="text-2xl font-display">Preview do ContextFilesSync</h1>
          <p className="text-sm text-muted-foreground">
            Use este painel para validar visualmente o alerta de arquivos desatualizados sem precisar chamar a API.
          </p>
        </div>
        <div className="relative rounded-lg border bg-background/50 p-6">
          <ContextFilesSync
            className="static w-full"
            previewData={{
              ...MOCK_CONTEXT_FILES,
              visible: true,
            }}
          />
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Formulários</p>
          <h2 className="text-xl font-display">Watchers das Competências</h2>
          <p className="text-sm text-muted-foreground">
            Ajuste as tags de ferramentas ou evidências abaixo para verificar se os chips e contagens continuam reagindo aos inputs.
          </p>
        </div>
        <div className="rounded-lg border bg-background/50 p-4">
          <CompetenciaForm defaultValues={COMPETENCIA_DEFAULTS} onSubmit={NOOP_SUBMIT} />
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Formulários</p>
          <h2 className="text-xl font-display">Watchers das Experiências</h2>
          <p className="text-sm text-muted-foreground">
            Edite tecnologias e STAR cases nesta prévia para confirmar que as mudanças aparecem em tempo real.
          </p>
        </div>
        <div className="rounded-lg border bg-background/50 p-4">
          <ExperienciaForm defaultValues={EXPERIENCIA_DEFAULTS} onSubmit={NOOP_SUBMIT} />
        </div>
      </section>
    </div>
  );
}
