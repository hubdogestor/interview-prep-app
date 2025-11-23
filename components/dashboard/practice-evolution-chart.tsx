"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc/react";

export function PracticeEvolutionChart() {
  const isClient = useMemo(() => typeof window !== "undefined", []);
  const { data: stats, isLoading } = trpc.practice.stats.useQuery(undefined, { enabled: isClient });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-chart-2" />
          <h3 className="text-lg font-display uppercase">Evolução de Práticas</h3>
        </div>
        <Skeleton className="h-[250px] w-full" />
      </Card>
    );
  }

  if (!stats || stats.practicesByDay.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-chart-2" />
          <h3 className="text-lg font-display uppercase">Evolução de Práticas</h3>
        </div>
        <div className="text-center py-12 text-muted-foreground">
          <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm uppercase">Nenhuma prática registrada</p>
          <p className="text-xs mt-1">
            Comece praticando para ver sua evolução
          </p>
        </div>
      </Card>
    );
  }

  // Format data for chart
  const chartData = stats.practicesByDay.map((item) => ({
    date: new Date(item.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    }),
    práticas: item.count,
  }));

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-chart-2" />
          <h3 className="text-lg font-display uppercase">Evolução de Práticas</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display">{stats.totalSessions}</div>
          <div className="text-xs text-muted-foreground uppercase">
            Total de Práticas
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Line
            type="monotone"
            dataKey="práticas"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--chart-2))" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
