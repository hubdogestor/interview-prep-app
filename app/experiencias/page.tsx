import DashboardPageLayout from "@/components/dashboard/layout";
import BriefcaseIcon from "@/components/icons/briefcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/trpc/server";

export default async function ExperienciasPage() {
  const caller = await api();
  const experiencias = await caller.experiencias.list();
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
                      <h3 className="text-2xl font-display uppercase">
                        {exp.empresa}
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground uppercase mb-1">
                      {exp.cargo}
                    </p>
                  </div>
                  <BriefcaseIcon className="size-8 text-primary opacity-50" />
                </div>

                {exp.tecnologias && exp.tecnologias.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tecnologias.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <p className="text-xs text-muted-foreground uppercase">
                    {exp.starCases.length} STAR CASES
                  </p>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="default" size="sm">
                    VIEW DETAILS
                  </Button>
                  <Button variant="ghost" size="sm">
                    EDIT
                  </Button>
                </div>
              </Card>
            </div>
          ))}

          {experiencias.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="uppercase">Nenhuma experiência cadastrada ainda</p>
            </div>
          )}
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

