import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cultureData } from "@/data/amazon/culture";
import { cn } from "@/lib/utils";

export default function CulturePage() {
  const { hero, sections } = cultureData;
  const focusHighlights = [
    "Dominar 2 histórias de LP para cada mecanismo",
    "Converter insights em ações concretas para Day 1",
    "Praticar escrita narrativa com feedback rápido",
  ];

  return (
    <DashboardPageLayout
      header={{
        title: hero.title,
        description: hero.subtitle,
      }}
    >
      <div className="space-y-8">
        <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Sistema operacional Amazoniano</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {hero.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {focusHighlights.map((item) => (
                  <div key={item} className="rounded-lg border bg-muted/40 px-3 py-2.5 text-xs font-medium text-muted-foreground leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="size-5 text-primary flex-shrink-0" />
                Ritual diário
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Escolha um princípio de liderança, escreva um parágrafo relacionando com sua experiência e compartilhe com um mentor.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Objetivo: criar um banco de histórias autênticas e atualizadas para entrevistas internas, avaliações e WBRs.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
                <Card
                  key={section.id}
                  className="flex flex-col overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                >
                  <div className={cn("h-1.5 w-full", section.bgColor.replace("/10", ""))}></div>
                  <CardHeader className="flex-1 pb-4">
                    <div className={cn("mb-3 flex size-12 items-center justify-center rounded-xl flex-shrink-0", section.bgColor, section.color)}>
                    <Icon className="size-6" />
                  </div>
                    <CardTitle className="text-base mb-2">{section.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">{section.description}</CardDescription>
                </CardHeader>
                  <CardFooter className="mt-auto pt-0 pb-4">
                    <Button asChild variant="secondary" className="w-full group text-sm">
                      <Link href={section.href}>
                        Explorar trilha
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
