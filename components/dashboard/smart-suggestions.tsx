"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight,Lightbulb, Sparkles, Target, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";

export function SmartSuggestions() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: needsReview = [] } = trpc.dashboard.needsReview.useQuery(undefined, { enabled: mounted });
  const { data: stats } = trpc.practice.stats.useQuery(undefined, { enabled: mounted });
  const { data: dashboard } = trpc.dashboard.overview.useQuery(undefined, { enabled: mounted });

  const suggestions = [];

  // Suggestion 1: Items needing review
  if (needsReview.length > 0) {
    suggestions.push({
      id: "needs-review",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-600/10",
      title: "Revisar Conteúdo Antigo",
      description: `Você tem ${needsReview.length} ${
        needsReview.length === 1 ? "item" : "itens"
      } sem prática há mais de 7 dias`,
      action: {
        label: "Ver Lista",
        href: "/practice",
      },
    });
  }

  // Suggestion 2: Low practice frequency
  if (stats && stats.totalSessions < 5) {
    suggestions.push({
      id: "practice-more",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      title: "Aumente sua Frequência",
      description: "Pratique pelo menos 3x por semana para melhores resultados",
      action: {
        label: "Começar Prática",
        href: "/practice",
      },
    });
  }

  // Suggestion 3: Add more competências
  if (dashboard && dashboard.totals.competencias < 5) {
    suggestions.push({
      id: "add-competencias",
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
      title: "Documente suas Competências",
      description: "Adicione ao menos 5 competências para um portfólio completo",
      action: {
        label: "Adicionar Competência",
        href: "/competencias/novo",
      },
    });
  }

  // Suggestion 4: Add STAR Cases
  if (dashboard && dashboard.totals.experiencias < 3) {
    suggestions.push({
      id: "add-experiences",
      icon: Sparkles,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      title: "Crie Experiências STAR",
      description: "Documente suas principais experiências profissionais com STAR Cases",
      action: {
        label: "Criar Experiência",
        href: "/experiencias/novo",
      },
    });
  }

  // Suggestion 5: Prepare icebreaker
  if (dashboard && dashboard.totals.icebreakers === 0) {
    suggestions.push({
      id: "create-icebreaker",
      icon: Lightbulb,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      title: "Prepare seu Icebreaker",
      description: "Crie uma apresentação de 30-60 segundos para começar entrevistas",
      action: {
        label: "Criar Icebreaker",
        href: "/icebreakers/novo",
      },
    });
  }

  // Suggestion 6: Use AI features
  if (stats && stats.totalSessions > 0 && suggestions.length < 3) {
    suggestions.push({
      id: "use-ai",
      icon: Sparkles,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      title: "Use a IA para Melhorar",
      description: "Aprimore suas competências e experiências com sugestões de IA",
      action: {
        label: "Explorar IA",
        href: "/competencias",
      },
    });
  }

  // If all is good
  if (suggestions.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-display uppercase">Sugestões Inteligentes</h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-20 text-green-600" />
          <p className="text-sm uppercase font-medium text-green-600">
            Excelente trabalho!
          </p>
          <p className="text-xs mt-1">
            Continue praticando regularmente para manter seu desempenho
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-chart-1" />
          <h3 className="text-lg font-display uppercase">Sugestões Inteligentes</h3>
        </div>
        <Badge variant="outline">{suggestions.length}</Badge>
      </div>

      <div className="space-y-3">
        {suggestions.slice(0, 4).map((suggestion) => {
          const Icon = suggestion.icon;
          return (
            <Link key={suggestion.id} href={suggestion.action.href}>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group">
                <div
                  className={`size-10 rounded-lg ${suggestion.bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`h-5 w-5 ${suggestion.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium mb-1">{suggestion.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {suggestion.description}
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-2" />
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
