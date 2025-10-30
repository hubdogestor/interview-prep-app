"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bullet } from "@/components/ui/bullet";
import type { PerformanceChartData, TimePeriod } from "@/types/dashboard";

type SeriesKey = "preparation" | "confidence" | "consistency";

const defaultChartConfig: Record<SeriesKey, { label: string; color: string }> = {
  preparation: {
    label: "Preparacao",
    color: "var(--chart-1)",
  },
  confidence: {
    label: "Confianca",
    color: "var(--chart-2)",
  },
  consistency: {
    label: "Consistencia",
    color: "var(--chart-3)",
  },
};

type ChartProps = {
  data: PerformanceChartData;
  initialPeriod?: TimePeriod;
  config?: Record<SeriesKey, { label: string; color: string }>;
};

export default function DashboardChart({
  data,
  initialPeriod = "week",
  config = defaultChartConfig,
}: ChartProps) {
  const [activeTab, setActiveTab] = React.useState<TimePeriod>(initialPeriod);
  const chartConfig = config as ChartConfig;

  const handleTabChange = (value: string) => {
    if (value === "week" || value === "month" || value === "year") {
      setActiveTab(value as TimePeriod);
    }
  };

  const formatYAxisValue = (value: number) => {
    if (value === 0) {
      return "";
    }

    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(0)}M`;
    }

    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(0)}K`;
    }

    return value.toString();
  };

  const renderChart = (points: PerformanceChartData[TimePeriod]) => (
    <div className="bg-accent rounded-lg p-3">
      <ChartContainer className="md:aspect-[3/1] w-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={points}
          margin={{ left: -12, right: 12, top: 12, bottom: 12 }}
        >
          <CartesianGrid
            horizontal={false}
            strokeDasharray="8 8"
            strokeWidth={2}
            stroke="var(--muted-foreground)"
            opacity={0.3}
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={12}
            strokeWidth={1.5}
            className="uppercase text-sm fill-muted-foreground"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={0}
            tickCount={6}
            className="text-sm fill-muted-foreground"
            tickFormatter={formatYAxisValue}
            domain={[0, "dataMax"]}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="dot"
                className="min-w-[200px] px-4 py-3"
              />
            }
          />
          {(Object.keys(config) as SeriesKey[]).map((key) => {
            const gradientId = `fill-${key}`;
            return (
              <React.Fragment key={key}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config[key].color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={config[key].color} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey={key}
                  type="linear"
                  fill={`url(#${gradientId})`}
                  fillOpacity={0.4}
                  stroke={config[key].color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </React.Fragment>
            );
          })}
        </AreaChart>
      </ChartContainer>
    </div>
  );

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="max-md:gap-4">
      <div className="flex items-center justify-between mb-4 max-md:contents">
        <TabsList className="max-md:w-full">
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mes</TabsTrigger>
          <TabsTrigger value="year">Ano</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-6 max-md:order-1">
          {(Object.entries(config) as Array<[SeriesKey, { label: string; color: string }]>).map(
            ([key, value]) => (
              <ChartLegend key={key} label={value.label} color={value.color} />
            ),
          )}
        </div>
      </div>
      <TabsContent value="week" className="space-y-4">
        {renderChart(data.week)}
      </TabsContent>
      <TabsContent value="month" className="space-y-4">
        {renderChart(data.month)}
      </TabsContent>
      <TabsContent value="year" className="space-y-4">
        {renderChart(data.year)}
      </TabsContent>
    </Tabs>
  );
}

export const ChartLegend = ({
  label,
  color,
}: {
  label: string;
  color: string;
}) => {
  return (
    <div className="flex items-center gap-2 uppercase">
      <Bullet style={{ backgroundColor: color }} className="rotate-45" />
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
};
