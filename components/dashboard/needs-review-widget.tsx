"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/react";
import { AlertCircle, Mic, MessageSquare, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const tipoConfig = {
  icebreaker: {
    icon: Mic,
    label: "Icebreaker",
    color: "text-chart-1",
    href: (id: string) => `/icebreakers/${id}`,
  },
  speech: {
    icon: MessageSquare,
    label: "Speech",
    color: "text-chart-2",
    href: (id: string) => `/speeches/${id}`,
  },
  star_case: {
    icon: Briefcase,
    label: "STAR Case",
    color: "text-chart-3",
    href: (id: string, experienciaId?: string) =>
      `/experiencias/${experienciaId}`,
  },
};

export function NeedsReviewWidget() {
  const { data: items = [], isLoading } = trpc.dashboard.needsReview.useQuery();

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-display uppercase">Próximas Revisões</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-display uppercase">Próximas Revisões</h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-20 text-green-600" />
          <p className="text-sm uppercase">Tudo em dia!</p>
          <p className="text-xs mt-1">
            Não há itens pendentes de revisão
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-display uppercase">Próximas Revisões</h3>
        </div>
        <Badge variant="outline" className="text-orange-600 border-orange-600">
          {items.length} {items.length === 1 ? "item" : "itens"}
        </Badge>
      </div>

      <div className="space-y-2">
        {items.slice(0, 5).map((item) => {
          const config = tipoConfig[item.tipo];
          const Icon = config.icon;
          const href = config.href(
            item.id,
            "experienciaId" in item ? item.experienciaId : undefined
          );

          return (
            <Link key={`${item.tipo}-${item.id}`} href={href}>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group">
                <div className={`size-10 rounded-lg bg-muted flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium truncate">{item.titulo}</h4>
                    <Badge variant="outline" className="text-xs">
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.diasSemPraticar} {item.diasSemPraticar === 1 ? "dia" : "dias"} sem praticar
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {items.length > 5 && (
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/practice">
              Ver todos ({items.length})
            </Link>
          </Button>
        </div>
      )}
    </Card>
  );
}
