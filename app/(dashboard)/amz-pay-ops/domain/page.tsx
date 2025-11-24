import Link from "next/link";
import { ArrowRight, Radar } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";
import { cn } from "@/lib/utils";

export default function DomainPage() {
  const { hero, sections } = domainData;
  const domainSignals = [
    "Conectar Auth Rate às alavancas de CoP",
    "Mapear dependências com Tech e Risk",
    "Preparar perguntas para a rotina WBR",
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
              <CardTitle className="text-2xl">Playbook de domínio</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {hero.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                {domainSignals.map((signal) => (
                  <div key={signal} className="rounded-lg border bg-muted/40 px-3 py-2 text-sm font-medium text-muted-foreground">
                    {signal}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radar className="size-5 text-primary" />
                Radar de riscos
              </CardTitle>
              <CardDescription>
                Atualize semanalmente os riscos por produto (Wallet, BNPL, Amazon One) e amarre correções ao roadmap.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section>
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
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
                    <CardDescription className="leading-relaxed text-sm">{section.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-0">
                    <Button asChild variant="secondary" className="w-full group">
                      <Link href={section.href}>
                        Acessar trilha
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
