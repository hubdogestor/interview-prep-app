import type { ComponentType } from "react";

export type StatIntent = "positive" | "negative" | "neutral";
export type StatDirection = "up" | "down";

export interface DashboardStat {
  label: string;
  value: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  intent: StatIntent;
  direction?: StatDirection;
  tag?: string;
}

export type TimePeriod = "week" | "month" | "year";

export interface PerformancePoint {
  label: string;
  preparation: number;
  confidence: number;
  consistency: number;
}

export type PerformanceChartData = Record<TimePeriod, PerformancePoint[]>;

export interface FocusRankingItem {
  id: number;
  area: string;
  description: string;
  score: number;
  avatar: string;
  featured?: boolean;
  highlight?: string;
}

export type StatusVariant = "success" | "warning" | "destructive";

export interface PreparationStatus {
  title: string;
  value: string;
  status: string;
  variant: StatusVariant;
}

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  priority: "low" | "medium" | "high";
}

export interface FocusWidgetData {
  location: string;
  timezone: string;
  temperature: string;
  weather: string;
  dateLabel: string;
}
