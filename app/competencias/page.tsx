import DashboardPageLayout from "@/components/dashboard/layout"
import StarIcon from "@/components/icons/star"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const competencias = [
  {
    id: 1,
    name: "FULL-STACK DEVELOPMENT",
    category: "Technical",
    level: 90,
    tools: ["React", "Node.js", "TypeScript", "Next.js"],
    projects: 12,
  },
  {
    id: 2,
    name: "SYSTEM ARCHITECTURE",
    category: "Technical",
    level: 85,
    tools: ["AWS", "Microservices", "Docker", "Kubernetes"],
    projects: 8,
  },
  {
    id: 3,
    name: "TEAM LEADERSHIP",
    category: "Management",
    level: 80,
    tools: ["Agile", "Scrum", "Mentoring", "1-on-1s"],
    projects: 15,
  },
  {
    id: 4,
    name: "PRODUCT STRATEGY",
    category: "Product",
    level: 75,
    tools: ["User Research", "Roadmapping", "OKRs", "Analytics"],
    projects: 10,
  },
  {
    id: 5,
    name: "DATA ENGINEERING",
    category: "Technical",
    level: 70,
    tools: ["Python", "SQL", "ETL", "Data Pipelines"],
    projects: 6,
  },
]

const categoryColors: Record<string, string> = {
  Technical: "bg-chart-1",
  Management: "bg-chart-2",
  Product: "bg-chart-3",
}

export default function CompetenciasPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Competências",
        description: "Your skills arsenal",
        icon: StarIcon,
      }}
    >
      <div className="space-y-4">
        {competencias.map((comp) => (
          <Card key={comp.id} className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-display">{comp.name}</h3>
                  <Badge variant="outline" className={`uppercase ${categoryColors[comp.category]}/20`}>
                    {comp.category}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {comp.tools.map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
              <StarIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground uppercase">Proficiency Level</span>
                <span className="font-display text-lg">{comp.level}%</span>
              </div>
              <Progress value={comp.level} className="h-2" />
              <div className="text-xs text-muted-foreground uppercase">{comp.projects} projects completed</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full p-4 border border-dashed border-border hover:border-primary hover:bg-accent/50 rounded-lg transition-colors uppercase text-sm font-display">
          + ADD NEW COMPETÊNCIA
        </button>
      </div>
    </DashboardPageLayout>
  )
}
