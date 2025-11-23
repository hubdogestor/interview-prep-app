import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const sections = [
  {
    id: "leadership-principles",
    title: "Leadership Principles",
    description: "Os 16 princípios de liderança da Amazon com exemplos práticos",
    status: "Em Progresso",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    items: 16,
  },
  {
    id: "technical-deep-dive",
    title: "Technical Deep Dive",
    description: "Arquitetura de pagamentos, AWS services e fraud detection",
    status: "Planejado",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    items: 8,
  },
  {
    id: "market-knowledge",
    title: "Market Knowledge",
    description: "PIX, mercado brasileiro e regulamentação LATAM",
    status: "Planejado",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    items: 5,
  },
  {
    id: "program-management",
    title: "Program Management",
    description: "6-Pagers, Working Backwards, KPIs e Lean/Six Sigma",
    status: "Planejado",
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    items: 12,
  },
  {
    id: "stakeholders",
    title: "Stakeholder Analysis",
    description: "Perfis de Andreia Guarino e Sujash Biswas",
    status: "Planejado",
    color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    items: 2,
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    description: "Mock interviews, perguntas e plano 30-60-90 dias",
    status: "Planejado",
    color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    items: 6,
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.id} href={`/amazon-prep/${section.id}`}>
              <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer group border-2 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`${section.color} px-3 py-1`} variant="outline">
                      {section.status}
                    </Badge>
                    <ArrowRightIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-xl mb-2">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center text-base text-muted-foreground">
                    <span>{section.items} tópicos</span>
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
