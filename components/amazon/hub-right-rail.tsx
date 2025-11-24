import Link from "next/link";

import { Countdown } from "@/components/amazon/countdown";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dayOneData } from "@/data/amazon/day-one";
import { amazonHubStructure } from "@/data/amazon/hub";

export function AmazonHubRightRail() {
  const { hero } = dayOneData;

  return (
    <aside className="hidden xl:flex flex-col gap-4 sticky top-[104px]">
      <Card className="border-primary/30 bg-background/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Launch Clock
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {hero.team}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-1">
          <Countdown targetDate={hero.targetDate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Rituais Diários</CardTitle>
          <CardDescription className="text-xs">
            Mantêm o foco em cultura, domínio e execução.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {amazonHubStructure.rituals.map((ritual) => {
            const Icon = ritual.icon;
            return (
              <div key={ritual.title} className="flex items-start gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-tight">{ritual.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {ritual.description}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Docs Essenciais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {amazonHubStructure.referenceDocs.map((doc) => (
            <Link
              key={doc.label}
              href={doc.href}
              className="block rounded-xl border border-dashed px-3 py-2 text-sm transition-colors hover:border-primary"
            >
              <p className="font-medium">{doc.label}</p>
              <p className="text-xs text-muted-foreground">{doc.description}</p>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Stakeholders</CardTitle>
          <CardDescription className="text-xs">Alinhe cadência e timezone.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {amazonHubStructure.contacts.map((contact) => (
            <div key={contact.name} className="rounded-xl border p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{contact.name}</p>
                <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                  {contact.timezone}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {contact.role} · {contact.focus}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
