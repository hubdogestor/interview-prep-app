import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const sections = [
  {
    id: "technical-deep-dive",
    title: "Technical Deep Dive",
    description: "Domine a arquitetura de sistemas de pagamento, AWS services essenciais, segurança PCI-DSS e integração de APIs. Prepare-se para discussões técnicas profundas sobre escalabilidade e resiliência.",
    status: "Completo",
    color: "bg-blue-500",
    icon: "⚙️",
    items: 4,
  },
  {
    id: "market-knowledge",
    title: "Market Knowledge",
    description: "Entenda o ecossistema completo de pagamentos no Brasil e LATAM: PIX, cartões, fintechs e regulamentação. Dados atualizados e insights sobre tendências do mercado.",
    status: "Completo",
    color: "bg-green-500",
    icon: "📊",
    items: 4,
  },
  {
    id: "program-management",
    title: "Program Management",
    description: "Aprenda as metodologias Amazon (Working Backwards, 6-Pagers), KPIs críticos de pagamentos e frameworks Lean/Six Sigma para excelência operacional.",
    status: "Completo",
    color: "bg-purple-500",
    icon: "📋",
    items: 3,
  },
  {
    id: "stakeholders",
    title: "Stakeholders",
    description: "Conheça profundamente seus futuros gestores: Andreia Guarino (Manager direto) e Sujash Biswas (Head LATAM). Background, estilo de liderança e perguntas estratégicas.",
    status: "Completo",
    color: "bg-orange-500",
    icon: "👥",
    items: 2,
  },
  {
    id: "leadership-principles",
    title: "Leadership Principles",
    description: "Os 16 princípios que definem a cultura Amazon. Cada um com exemplos STAR estruturados, perguntas típicas de entrevista e pontos-chave para demonstração.",
    status: "Completo",
    color: "bg-red-500",
    icon: "⭐",
    items: 16,
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    description: "Preparação final com mock interviews por Leadership Principle, perguntas técnicas de payment ops, case studies e plano detalhado para os primeiros 90 dias.",
    status: "Completo",
    color: "bg-indigo-500",
    icon: "🎯",
    items: 3,
  },
];

const jobInfo = {
  title: "Program Manager, Payment Business Operation",
  company: "Amazon",
  location: "São Paulo, Brasil",
  jobId: "3059488",
  partnership: "Oakberry Strategic Partnership",
};

export default function AmazonPrepPage() {
  return (
    <div className="container max-w-7xl py-10 px-6 space-y-10">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">
              Amazon Payment Ops Preparation
            </h1>
            <p className="text-muted-foreground text-xl">
              Preparação completa para Program Manager na Amazon Payments
            </p>
          </div>
          <Badge variant="outline" className="text-base px-6 py-2">
            Job ID: {jobInfo.jobId}
          </Badge>
        </div>

        {/* Job Info Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="pb-6">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-2">
                <CardTitle className="text-3xl">{jobInfo.title}</CardTitle>
                <CardDescription className="text-lg">
                  {jobInfo.company} • {jobInfo.location}
                </CardDescription>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600 text-base px-4 py-2">
                {jobInfo.partnership}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6 text-base">
              <div>
                <p className="text-muted-foreground mb-2">Foco Principal</p>
                <p className="font-semibold">Transformação com AI/ML</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Metodologias</p>
                <p className="font-semibold">Lean, Six Sigma, Working Backwards</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Escopo</p>
                <p className="font-semibold">LATAM Payment Operations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl">Progresso Geral</CardTitle>
          <CardDescription className="text-base">Acompanhamento do material de preparação</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="font-medium">Estrutura Base</span>
                <span className="font-bold">100%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="font-medium">Conteúdo Principal</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-0 transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="font-medium">Preparação Prática</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-0 transition-all" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Grid */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Módulos de Preparação</h2>
        <p className="text-muted-foreground text-lg">
          Explore cada categoria para acessar conteúdo detalhado e preparação focada
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link key={section.id} href={`/amazon-prep/${section.id}`}>
              <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group border-2 hover:border-primary/40 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="pb-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-4 rounded-xl ${section.color} bg-opacity-10`}>
                      <div className="text-3xl">{section.icon}</div>
                    </div>
                    <ArrowRightIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                        {section.title}
                      </CardTitle>
                      <Badge className={`${section.color} px-3 py-1 text-sm`} variant="secondary">
                        {section.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed min-h-[60px]">
                      {section.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">{section.items} tópicos disponíveis</span>
                    <span className="text-primary font-semibold group-hover:underline">Explorar →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid md:grid-cols-2 gap-5">
            <Link href="/amazon-prep/leadership-principles" className="p-5 border-2 rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-all group">
              <div className="font-semibold mb-2 text-lg group-hover:text-primary transition-colors">📚 Revisar Leadership Principles</div>
              <div className="text-base text-muted-foreground">Estudar os 16 princípios com exemplos STAR</div>
            </Link>
            <Link href="/amazon-prep/interview-prep" className="p-5 border-2 rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-all group">
              <div className="font-semibold mb-2 text-lg group-hover:text-primary transition-colors">🎯 Mock Interview</div>
              <div className="text-base text-muted-foreground">Praticar perguntas comportamentais</div>
            </Link>
            <Link href="/amazon-prep/technical-deep-dive" className="p-5 border-2 rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-all group">
              <div className="font-semibold mb-2 text-lg group-hover:text-primary transition-colors">⚙️ Technical Review</div>
              <div className="text-base text-muted-foreground">Revisar arquitetura de pagamentos</div>
            </Link>
            <Link href="/amazon-prep/stakeholders" className="p-5 border-2 rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-all group">
              <div className="font-semibold mb-2 text-lg group-hover:text-primary transition-colors">👥 Stakeholder Profiles</div>
              <div className="text-base text-muted-foreground">Andreia Guarino e Sujash Biswas</div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
