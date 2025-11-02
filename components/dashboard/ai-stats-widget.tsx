"use client";

import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";
import { Sparkles, TrendingUp, Calendar, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function AIStatsWidget() {
  const { data: stats, isLoading } = trpc.dashboard.aiStats.useQuery();

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-chart-1" />
          <h3 className="text-lg font-display uppercase">Estatísticas IA</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-3 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-chart-1" />
        <h3 className="text-lg font-display uppercase">Estatísticas IA</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="size-12 rounded-lg bg-chart-1/20 flex items-center justify-center mx-auto mb-2">
            <Calendar className="h-6 w-6 text-chart-1" />
          </div>
          <div className="text-2xl font-display">{stats.thisWeek}</div>
          <div className="text-xs text-muted-foreground uppercase">
            Esta Semana
          </div>
        </div>

        <div className="text-center">
          <div className="size-12 rounded-lg bg-chart-2/20 flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="h-6 w-6 text-chart-2" />
          </div>
          <div className="text-2xl font-display">{stats.thisMonth}</div>
          <div className="text-xs text-muted-foreground uppercase">
            Este Mês
          </div>
        </div>

        <div className="text-center">
          <div className="size-12 rounded-lg bg-chart-3/20 flex items-center justify-center mx-auto mb-2">
            <Zap className="h-6 w-6 text-chart-3" />
          </div>
          <div className="text-2xl font-display">{stats.total}</div>
          <div className="text-xs text-muted-foreground uppercase">Total</div>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="pt-4 border-t">
          <div className="text-xs text-muted-foreground uppercase mb-3">
            Gerações por Tipo
          </div>
          <div className="space-y-2">
            {Object.entries(stats.byType)
              .filter(([_, count]) => count > 0)
              .map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm capitalize">
                    {type === "competencias"
                      ? "Competências"
                      : type === "experiencias"
                      ? "Experiências"
                      : type === "starCases"
                      ? "STAR Cases"
                      : type === "icebreakers"
                      ? "Icebreakers"
                      : "Speeches"}
                  </span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {stats.total === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <Sparkles className="h-10 w-10 mx-auto mb-2 opacity-20" />
          <p className="text-xs uppercase">Nenhuma geração IA ainda</p>
          <p className="text-xs mt-1">
            Use os botões "Gerar com IA" nos formulários
          </p>
        </div>
      )}
    </Card>
  );
}
