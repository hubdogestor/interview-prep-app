"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft,Briefcase, Calendar, Clock, MessageSquare, Mic, Target, TrendingUp } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp,staggerContainer } from "@/lib/animations";
import { trpc } from "@/lib/trpc/react";
import { isAvaliacaoIA } from "@/lib/type-guards";

const tipoConfig = {
  icebreaker: {
    icon: Mic,
    label: "Icebreaker",
    color: "text-chart-1",
    bgColor: "bg-chart-1/20",
  },
  speech: {
    icon: MessageSquare,
    label: "Speech",
    color: "text-chart-2",
    bgColor: "bg-chart-2/20",
  },
  star_case: {
    icon: Briefcase,
    label: "STAR Case",
    color: "text-chart-3",
    bgColor: "bg-chart-3/20",
  },
};

export default function PracticeHistoryPage() {
  const router = useRouter();
  const { data: sessions = [], isLoading: sessionsLoading } = trpc.practice.list.useQuery();
  const { data: stats, isLoading: statsLoading } = trpc.practice.stats.useQuery();

  const formatDuracao = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}min ${secs}s`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (sessionsLoading || statsLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Histórico de Práticas",
          description: "Acompanhe sua evolução",
          icon: Target,
        }}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </Card>
            ))}
          </div>
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      header={{
        title: "Histórico de Práticas",
        description: "Acompanhe sua evolução",
        icon: Target,
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        ),
      }}
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-display">{stats?.totalSessions || 0}</div>
              <div className="text-xs text-muted-foreground uppercase">
                Total de Práticas
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-lg bg-chart-1/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-chart-1" />
            </div>
            <div>
              <div className="text-2xl font-display">
                {Math.floor((stats?.totalDuracao || 0) / 60)}min
              </div>
              <div className="text-xs text-muted-foreground uppercase">
                Tempo Total
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <div className="text-2xl font-display">{stats?.avgScore || 0}</div>
              <div className="text-xs text-muted-foreground uppercase">
                Score Médio
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <div className="text-2xl font-display">
                {stats?.practicesByDay?.filter((d) => d.count > 0).length || 0}
              </div>
              <div className="text-xs text-muted-foreground uppercase">
                Dias Ativos
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sessions List */}
      <Card className="p-6">
        <h3 className="text-lg font-display uppercase mb-4">
          Sessões Recentes
        </h3>

        {sessions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="uppercase">Nenhuma prática realizada ainda</p>
            <p className="text-sm mt-2">
              Comece praticando seus icebreakers, speeches ou STAR cases!
            </p>
          </div>
        ) : (
          <motion.div
            className="space-y-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {sessions.map((session, index) => {
              const config = tipoConfig[session.tipo as keyof typeof tipoConfig];
              const Icon = config.icon;

              return (
                <motion.div key={session.id} variants={fadeInUp} custom={index}>
                  <Card className="p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`size-12 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${config.color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate">{session.itemTitle}</h4>
                          <Badge variant="outline" className="text-xs">
                            {config.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDuracao(session.duracao)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(session.createdAt)}
                          </span>
                        </div>
                      </div>

                      {session.score && (
                        <div className="text-right">
                          <div className="text-2xl font-display text-chart-1">
                            {session.score}
                          </div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                      )}
                    </div>

                    {/* Avaliação IA */}
                    {isAvaliacaoIA(session.avaliacaoIA) && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="text-center">
                            <div className="text-lg font-display text-chart-1">
                              {session.avaliacaoIA.clareza}
                            </div>
                            <div className="text-xs text-muted-foreground">Clareza</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-display text-chart-2">
                              {session.avaliacaoIA.fluencia}
                            </div>
                            <div className="text-xs text-muted-foreground">Fluência</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-display text-chart-3">
                              {session.avaliacaoIA.completude}
                            </div>
                            <div className="text-xs text-muted-foreground">Completude</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </Card>
    </DashboardPageLayout>
  );
}
