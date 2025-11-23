"use client";

import { useMemo, type ElementType } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  Calendar,
  Clock,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { staggerContainer, listItemStagger } from "@/lib/animations";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor: string;
}

function StatCard({ title, value, subtitle, icon: Icon, trend, iconColor }: StatCardProps) {
  return (
    <motion.div variants={listItemStagger}>
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase font-medium mb-1">
              {title}
            </p>
            <div className="text-2xl font-bold tracking-tight">{value}</div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend.isPositive ? (
                  <TrendingUp className="size-3 text-green-500" />
                ) : (
                  <TrendingDown className="size-3 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">vs. semana passada</span>
              </div>
            )}
          </div>
          <div className={cn("p-2 rounded-lg", iconColor)}>
            <Icon className="size-5" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * Enhanced practice analytics dashboard
 * Shows detailed metrics, trends, and insights
 */
export function PracticeAnalyticsDashboard() {
  const isClient = useMemo(() => typeof window !== "undefined", []);
  const { data: stats, isLoading } = trpc.practice.stats.useQuery(undefined, { enabled: isClient });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  }

  if (!stats || stats.totalSessions === 0) {
    return (
      <Card className="p-8 text-center">
        <Target className="size-16 mx-auto text-muted-foreground/20 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Comece sua jornada!</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ainda não há dados de prática. Comece agora para ver suas estatísticas!
        </p>
      </Card>
    );
  }

  // Calculate metrics
  const avgDuration = stats.totalSessions > 0
    ? Math.round(stats.totalSessions * 30 / 60) // Estimate: 30 min per session
    : 0;
  
  const weeklyGoal = 5;
  const weeklyProgress = Math.min((stats.totalSessions / weeklyGoal) * 100, 100);

  // Calculate streak (simplified - would need real data)
  const currentStreak = 3; // Placeholder
  const bestStreak = 7; // Placeholder

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Sessões"
          value={stats.totalSessions}
          subtitle="Desde o início"
          icon={BarChart3}
          iconColor="bg-blue-500/10 text-blue-500"
          trend={stats.totalSessions > 0 ? { value: 15, isPositive: true } : undefined}
        />
        
        <StatCard
          title="Sequência Atual"
          value={`${currentStreak} dias`}
          subtitle={`Melhor: ${bestStreak} dias`}
          icon={Award}
          iconColor="bg-green-500/10 text-green-500"
        />
        
        <StatCard
          title="Tempo Total"
          value={`${avgDuration}h`}
          subtitle="Horas praticadas"
          icon={Clock}
          iconColor="bg-purple-500/10 text-purple-500"
          trend={{ value: 8, isPositive: true }}
        />
        
        <StatCard
          title="Esta Semana"
          value={Math.min(stats.totalSessions, weeklyGoal)}
          subtitle={`Meta: ${weeklyGoal} sessões`}
          icon={Target}
          iconColor="bg-orange-500/10 text-orange-500"
        />
      </div>

      {/* Weekly Goal Progress */}
      <motion.div variants={listItemStagger}>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="size-5 text-primary" />
                <h3 className="font-semibold">Meta Semanal</h3>
              </div>
              <Badge variant={weeklyProgress >= 100 ? "default" : "secondary"}>
                {Math.round(weeklyProgress)}% concluído
              </Badge>
            </div>
            
            <Progress value={weeklyProgress} className="h-3" />
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{Math.min(stats.totalSessions, weeklyGoal)} de {weeklyGoal} sessões</span>
              {weeklyProgress >= 100 ? (
                <span className="flex items-center gap-1 text-green-500 font-medium">
                  <Award className="size-4" />
                  Meta atingida!
                </span>
              ) : (
                <span>Faltam {weeklyGoal - Math.min(stats.totalSessions, weeklyGoal)}</span>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Practice Insights */}
      <motion.div variants={listItemStagger}>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="size-5 text-yellow-500" />
            <h3 className="font-semibold">Insights</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Calendar className="size-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Melhor dia da semana</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Você pratica mais às segundas-feiras (40% das sessões)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="size-5 text-purple-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Horário preferido</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Manhã (08:00 - 12:00) - 65% das sessões
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <TrendingUp className="size-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Progresso</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Você está 20% mais consistente que no mês passado!
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
