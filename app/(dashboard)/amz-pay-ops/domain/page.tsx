import Link from "next/link";
import { ArrowRight } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { domainData } from "@/data/amazon/domain";
import { cn } from "@/lib/utils";

export default function DomainPage() {
  const { hero, sections } = domainData;

  return (
    <DashboardPageLayout
      header={{
        title: hero.title,
        description: hero.subtitle,
      }}
    >
      <div className="space-y-8">
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <p className="text-lg text-muted-foreground max-w-3xl">
            {hero.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/20 group">
                <div className={cn("h-2 w-full", section.bgColor.replace("/10", ""))}></div>
                <CardHeader>
                  <div className={cn("mb-4 flex size-12 items-center justify-center rounded-lg", section.bgColor, section.color)}>
                    <Icon className="size-6" />
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription className="text-sm">{section.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-0">
                  <Button asChild variant="ghost" className="w-full justify-between group-hover:bg-accent">
                    <Link href={section.href}>
                      Acessar
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardPageLayout>
  );
}
