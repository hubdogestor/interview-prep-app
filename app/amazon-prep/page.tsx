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
    <div className="container max-w-7xl py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Amazon Payment Ops Preparation
            </h1>
            <p className="text-muted-foreground text-lg">
              Preparação completa para Program Manager na Amazon Payments
            </p>
          </div>
          <Badge variant="outline" className="text-sm px-4 py-2">
            Job ID: {jobInfo.jobId}
          </Badge>
        </div>

        {/* Job Info Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl">{jobInfo.title}</CardTitle>
                <CardDescription className="text-base">
                  {jobInfo.company} • {jobInfo.location}
                </CardDescription>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600">
                {jobInfo.partnership}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Foco Principal</p>
                <p className="font-medium">Transformação com AI/ML</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Metodologias</p>
                <p className="font-medium">Lean, Six Sigma, Working Backwards</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Escopo</p>
                <p className="font-medium">LATAM Payment Operations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Geral</CardTitle>
          <CardDescription>Acompanhamento do material de preparação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Estrutura Base</span>
                <span className="font-medium">100%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Conteúdo Principal</span>
                <span className="font-medium">0%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-0" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Preparação Prática</span>
                <span className="font-medium">0%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-0" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Módulos de Preparação</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Link key={section.id} href={`/amazon-prep/${section.id}`}>
              <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={section.color} variant="outline">
                      {section.status}
                    </Badge>
                    <ArrowRightIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
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
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/amazon-prep/leadership-principles" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="font-medium mb-1">📚 Revisar Leadership Principles</div>
              <div className="text-sm text-muted-foreground">Estudar os 16 princípios com exemplos STAR</div>
            </Link>
            <Link href="/amazon-prep/interview-prep" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="font-medium mb-1">🎯 Mock Interview</div>
              <div className="text-sm text-muted-foreground">Praticar perguntas comportamentais</div>
            </Link>
            <Link href="/amazon-prep/technical-deep-dive" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="font-medium mb-1">⚙️ Technical Review</div>
              <div className="text-sm text-muted-foreground">Revisar arquitetura de pagamentos</div>
            </Link>
            <Link href="/amazon-prep/stakeholders" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="font-medium mb-1">👥 Stakeholder Profiles</div>
              <div className="text-sm text-muted-foreground">Andreia Guarino e Sujash Biswas</div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
