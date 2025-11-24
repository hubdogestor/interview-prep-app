import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

import { Countdown } from "@/components/amazon/countdown";
import DashboardPageLayout from "@/components/dashboard/layout";
import ProcessorIcon from "@/components/icons/proccesor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { dayOneData } from "@/data/amazon/day-one";

export default function AmazonHubPage() {
  const { hero, modules, quickLinks, dayOneChecklist } = dayOneData;

  return (
    <DashboardPageLayout
      header={{
        title: hero.title,
        description: hero.subtitle,
        icon: ProcessorIcon,
      }}
    >
      <div className="space-y-8">
        {/* Hero Section with Countdown */}
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-background/50 backdrop-blur">
                {hero.role} · {hero.team}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Day 1 is coming.
              </h2>
              <p className="text-muted-foreground max-w-md">
                Prepare-se para liderar a transformação em Payments Business Operations.
                Seu foco agora é absorver a cultura, dominar o negócio e afiar suas ferramentas.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Card className="w-full max-w-sm border-primary/20 bg-background/50 backdrop-blur shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    Time to Launch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Countdown targetDate={hero.targetDate} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Modules Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.id} className="flex flex-col transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="size-1.5 rounded-full bg-primary/50" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild className="w-full group" variant="outline">
                    <Link href={module.href}>
                      Start Module
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          {/* Day 1 Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Day 1 Checklist</CardTitle>
              <CardDescription>Tarefas essenciais para sua primeira semana.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dayOneChecklist.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                    {item.completed ? (
                      <CheckCircle2 className="size-5 text-primary mt-0.5" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className={item.completed ? "line-through text-muted-foreground" : "font-medium"}>
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links / Tools Simulation */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold px-1">Tool Simulators</h3>
            <div className="grid gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-accent/50"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium">{link.label}</p>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowRight className="ml-auto size-4 text-muted-foreground" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
