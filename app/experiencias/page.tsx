import DashboardPageLayout from "@/components/dashboard/layout"
import BriefcaseIcon from "@/components/icons/briefcase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const experiencias = [
  {
    id: 1,
    company: "BUSER",
    role: "Senior Full-Stack Engineer",
    period: "2023 - Present",
    current: true,
    technologies: ["React", "Node.js", "AWS", "PostgreSQL"],
    starCases: 5,
    achievements: [
      "Led migration to microservices architecture",
      "Reduced API response time by 60%",
      "Mentored 3 junior developers",
    ],
  },
  {
    id: 2,
    company: "NEON",
    role: "Full-Stack Developer",
    period: "2021 - 2023",
    current: false,
    technologies: ["TypeScript", "React", "GraphQL", "MongoDB"],
    starCases: 4,
    achievements: [
      "Built real-time payment processing system",
      "Implemented fraud detection algorithms",
      "Improved test coverage to 85%",
    ],
  },
  {
    id: 3,
    company: "STARTUP XYZ",
    role: "Frontend Developer",
    period: "2019 - 2021",
    current: false,
    technologies: ["React", "Redux", "REST API"],
    starCases: 3,
    achievements: [
      "Developed responsive dashboard from scratch",
      "Optimized bundle size by 40%",
      "Implemented CI/CD pipeline",
    ],
  },
]

export default function ExperienciasPage() {
  return (
    <DashboardPageLayout
      header={{
        title: "Experiências",
        description: "Your professional journey",
        icon: BriefcaseIcon,
      }}
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="space-y-8">
          {experiencias.map((exp) => (
            <div key={exp.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-6 top-6 size-3 rounded-full bg-primary border-4 border-background hidden md:block -translate-x-1/2" />

              <Card className="md:ml-12 p-6 hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-display">{exp.company}</h3>
                      {exp.current && <Badge className="uppercase bg-success">Current</Badge>}
                    </div>
                    <p className="text-lg text-muted-foreground uppercase mb-1">{exp.role}</p>
                    <p className="text-sm text-muted-foreground uppercase">{exp.period}</p>
                  </div>
                  <BriefcaseIcon className="size-8 text-primary opacity-50" />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">▸</span>
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="default" size="sm">
                    VIEW DETAILS
                  </Button>
                  <Button variant="outline" size="sm">
                    {exp.starCases} STAR CASES
                  </Button>
                  <Button variant="ghost" size="sm">
                    EDIT
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <button className="w-full p-4 border border-dashed border-border hover:border-primary hover:bg-accent/50 rounded-lg transition-colors uppercase text-sm font-display">
          + ADD NEW EXPERIENCE
        </button>
      </div>
    </DashboardPageLayout>
  )
}

