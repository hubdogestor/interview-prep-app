"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { amazonHubStructure } from "@/data/amazon/hub";
import { cn } from "@/lib/utils";

const workspaceShortcuts = [
  {
    label: "Overview Global",
    description: "Mapa completo dos hubs Amazon e como navegar entre eles.",
    href: "/amz-pay-ops",
  },
  {
    label: "OKRs 2026",
    description: "Resultados globais e dependências críticas.",
    href: "/okrs-2026",
  },
  {
    label: "Kanban - AMZ",
    description: "Execução tática dos squads de Payments.",
    href: "/kanban-amz",
  },
];

export function AmazonHubNavigator() {
  const pathname = usePathname();

  return (
    <Card className="border-border/70">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold">Navegação contextual</CardTitle>
        <CardDescription className="text-xs leading-relaxed">
          Use a aba do hub para alternar entre atalhos globais e o mapa completo de Payment Ops.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="payment">
          <TabsList className="grid grid-cols-2 rounded-xl bg-muted/50 p-1 text-xs font-semibold uppercase tracking-wide">
            <TabsTrigger value="amazon" className="rounded-lg">
              Amazon Hub
            </TabsTrigger>
            <TabsTrigger value="payment" className="rounded-lg">
              Payment Ops
            </TabsTrigger>
          </TabsList>

          <TabsContent value="amazon" className="space-y-3 pt-4 text-sm text-muted-foreground">
            {workspaceShortcuts.map((shortcut) => (
              <Link
                key={shortcut.label}
                href={shortcut.href}
                className="flex items-center justify-between rounded-xl border px-3 py-2 transition-colors hover:border-primary hover:text-primary"
              >
                <div className="space-y-0.5">
                  <p className="font-medium text-foreground">{shortcut.label}</p>
                  <p className="text-xs text-muted-foreground">{shortcut.description}</p>
                </div>
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="payment" className="pt-4">
            <Accordion type="single" collapsible className="space-y-2">
              {amazonHubStructure.navigation.map((section) => (
                <AccordionItem
                  key={section.title}
                  value={section.title}
                  className="rounded-xl border border-border/60 px-2"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold">
                    <div className="flex w-full items-center justify-between gap-2">
                      <span>{section.title}</span>
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                        {section.items.length} links
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pb-4">
                    {section.items.map((item) => (
                      <div key={item.label} className="space-y-1 rounded-lg bg-muted/30 p-2">
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between rounded-md px-2 py-1 text-sm font-medium transition-colors",
                            pathname === item.href ? "text-primary" : "text-foreground"
                          )}
                        >
                          {item.label}
                          <ChevronRight className="size-4" />
                        </Link>
                        {item.children && (
                          <div className="space-y-1 border-l border-border/50 pl-3 text-xs text-muted-foreground">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className={cn(
                                  "flex items-center justify-between rounded-md px-2 py-1 transition-colors hover:text-primary",
                                  pathname === child.href && "text-primary"
                                )}
                              >
                                <span>{child.label}</span>
                                <ArrowRight className="size-3" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
