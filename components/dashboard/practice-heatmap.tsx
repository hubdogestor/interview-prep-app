"use client";

import { Calendar } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trpc } from "@/lib/trpc/react";

export function PracticeHeatmap() {
  const { data: stats, isLoading } = trpc.practice.stats.useQuery();

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-chart-3" />
          <h3 className="text-lg font-display uppercase">Heatmap de Atividade</h3>
        </div>
        <Skeleton className="h-[120px] w-full" />
      </Card>
    );
  }

  if (!stats || stats.practicesByDay.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-chart-3" />
          <h3 className="text-lg font-display uppercase">Heatmap de Atividade</h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm uppercase">Nenhuma atividade registrada</p>
        </div>
      </Card>
    );
  }

  // Get intensity color based on count
  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count === 1) return "bg-chart-3/20";
    if (count === 2) return "bg-chart-3/40";
    if (count === 3) return "bg-chart-3/60";
    if (count >= 4) return "bg-chart-3/80";
    return "bg-chart-3";
  };

  // Get last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split("T")[0],
      dayOfWeek: date.getDay(),
      dayOfMonth: date.getDate(),
    };
  });

  // Map practice data to days
  const heatmapData = last30Days.map((day) => {
    const practiceDay = stats.practicesByDay.find((p) => p.date === day.date);
    return {
      ...day,
      count: practiceDay?.count || 0,
    };
  });

  // Split into weeks (7 rows)
  const weeks: typeof heatmapData[] = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  const activeDays = heatmapData.filter((d) => d.count > 0).length;
  const totalPractices = heatmapData.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-chart-3" />
          <h3 className="text-lg font-display uppercase">Heatmap de Atividade</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display">{activeDays}</div>
          <div className="text-xs text-muted-foreground uppercase">
            Dias Ativos
          </div>
        </div>
      </div>

      <TooltipProvider>
        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex gap-2">
              {week.map((day) => (
                <Tooltip key={day.date}>
                  <TooltipTrigger asChild>
                    <div
                      className={`h-7 flex-1 rounded ${getIntensityColor(
                        day.count
                      )} hover:ring-2 hover:ring-primary transition-all cursor-pointer`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {new Date(day.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                    <p className="text-xs font-medium">
                      {day.count} {day.count === 1 ? "prática" : "práticas"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </TooltipProvider>

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Menos</span>
          <div className="flex gap-1">
            <div className="size-4 rounded bg-muted" />
            <div className="size-4 rounded bg-chart-3/20" />
            <div className="size-4 rounded bg-chart-3/40" />
            <div className="size-4 rounded bg-chart-3/60" />
            <div className="size-4 rounded bg-chart-3/80" />
          </div>
          <span>Mais</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {totalPractices} práticas nos últimos 30 dias
        </div>
      </div>
    </Card>
  );
}
