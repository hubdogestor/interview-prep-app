import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { roleData } from "@/data/amazon/role";
import { cn } from "@/lib/utils";

export default function RolePage() {
  const { hero, sections } = roleData;
  const toolkitFocus = [
    "Clarificar fronteiras entre PgM/PM/Tech",
    "Mapear stakeholders críticos e estratégia",
    "Preparar artefatos (WBR, Roadmap, OP1)",
  ];

  return (
    <DashboardPageLayout
      header={{
        title: hero.title,
        description: hero.subtitle,
      }}
    >
      <div className="space-y-10">
        <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-2xl">Como operar como PgM</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {hero.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                {toolkitFocus.map((item) => (
                  <div key={item} className="rounded-lg border bg-muted/40 px-3 py-2 text-sm font-medium text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="size-5 text-primary" />
                Toolkit Sprint
              </CardTitle>
              <CardDescription>
                Escolha um artefato por semana para refinar (Status Report, Roadmap, Mechanism doc) e peça feedback para Andreia.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
                <Card
                  key={section.id}
                  className="flex flex-col overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                >
                  <div className={cn("h-1.5 w-full", section.bgColor.replace("/10", ""))}></div>
                  <CardHeader className="flex-1">
                    <div className={cn("mb-4 flex size-12 items-center justify-center rounded-xl", section.bgColor, section.color)}>
                      <Icon className="size-6" />
                    </div>
                    <CardTitle className="text-base">{section.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{section.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-0">
                    <Button asChild variant="secondary" className="w-full group">
                      <Link href={section.href}>
                        Abrir toolkit
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
            );
          })}
          </div>
        </section>
      </div>
    </DashboardPageLayout>
  );
}
