"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  amount: string;
  change: string;
  gradientId: string;
  gradientStops: Array<{
    offset: string;
    color: string;
  }>;
  label: string;
  path: string;
  trend: "positive" | "warning";
};

export function StatCard({ amount, change, gradientId, gradientStops, label, path, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">{label}</span>
          <CardTitle className="text-lg text-text-primary">{amount}</CardTitle>
        </div>
        <Badge variant={trend === "positive" ? "success" : "warning"} className="text-xs normal-case">
          {change}
        </Badge>
      </CardHeader>
      <CardContent className="mt-4">
        <svg viewBox="0 0 320 80" className="h-20 w-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
              {gradientStops.map((stop) => (
                <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>
          <path d={path} stroke={`url(#${gradientId})`} strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>
      </CardContent>
    </Card>
  );
}
