"use client";

import DashboardPageLayout from "@/components/dashboard/layout";
import BriefcaseIcon from "@/components/icons/briefcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";
import { useRouter } from "next/navigation";
import { Plus, ArrowLeft, Play } from "lucide-react";

export default function ExperienciasPage() {
  const router = useRouter();
  const { data: experiencias = [], isLoading } = trpc.experiencias.list.useQuery();

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Experiências",
          description: "Your professional journey",
          icon: BriefcaseIcon,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Carregando experiências...</p>
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      header={{
        title: "Experiências",
        description: "Your professional journey",
        icon: BriefcaseIcon,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
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
                <div className="grid md:grid-cols-[1fr_auto] gap-6">
                  {/* Left Column - Main Info */}
                  <div>
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
                      <BriefcaseIcon className="size-8 text-primary opacity-50 md:hidden" />
                    </div>

                    {exp.tecnologias && exp.tecnologias.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.tecnologias.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            #{tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => router.push(`/experiencias/${exp.id}/practice`)}
                        disabled={exp.starCases.length === 0}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        PRACTICE
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/experiencias/${exp.id}`)}
                      >
                        EDIT
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - STAR Cases */}
                  <div className="md:border-l md:border-border md:pl-6 flex flex-col items-center justify-center min-w-[120px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="size-16 rounded-lg bg-chart-1/20 flex items-center justify-center">
                        <span className="text-2xl font-display text-chart-1">
                          {exp.starCases.length}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground uppercase text-center">
                        STAR Cases
                      </span>
                    </div>
                  </div>
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
        <button
          onClick={() => router.push("/experiencias/novo")}
          className="w-full p-4 border border-dashed border-border hover:border-primary hover:bg-accent/50 rounded-lg transition-colors uppercase text-sm font-display flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          ADD NEW EXPERIENCE
        </button>
      </div>
    </DashboardPageLayout>
  );
}
