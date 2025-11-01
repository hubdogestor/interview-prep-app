"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Mic,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Star,
} from "lucide-react";

const quickActions = [
  {
    label: "Novo Icebreaker",
    href: "/icebreakers/novo",
    icon: Mic,
    color: "text-chart-1",
  },
  {
    label: "Novo Speech",
    href: "/speeches/novo",
    icon: MessageSquare,
    color: "text-chart-2",
  },
  {
    label: "Nova Question",
    href: "/questions/new",
    icon: HelpCircle,
    color: "text-chart-3",
  },
  {
    label: "Nova Experiência",
    href: "/experiencias/novo",
    icon: Briefcase,
    color: "text-chart-4",
  },
  {
    label: "Nova Competência",
    href: "/competencias/novo",
    icon: Star,
    color: "text-chart-1",
  },
];

export function QuickActions() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display uppercase">Quick Actions</h2>
        <Plus className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Button
              variant="outline"
              className="w-full h-auto flex flex-col items-center gap-2 py-4 hover:bg-accent/50 hover:border-primary transition-colors"
            >
              <action.icon className={`h-6 w-6 ${action.color}`} />
              <span className="text-xs font-medium text-center">
                {action.label}
              </span>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
}
