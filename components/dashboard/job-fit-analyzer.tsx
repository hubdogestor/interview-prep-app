"use client";

import { useState } from "react";
import { AlertTriangle, Lightbulb, Loader2,Sparkles, Star, Target, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import type { JobFitAnalysis } from "@/lib/ai/gemini";
import { trpc } from "@/lib/trpc/react";

interface JobFitAnalyzerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobFitAnalyzer({ open, onOpenChange }: JobFitAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<JobFitAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeJobFitMutation = trpc.dashboard.analyzeJobFit.useMutation();

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error("Por favor, insira uma descrição de vaga");
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await analyzeJobFitMutation.mutateAsync({
        jobDescription,
      });

      setAnalysis(result);
      toast.success("Análise concluída!");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao analisar fit com a vaga";
      toast.error(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excelente Fit";
    if (score >= 70) return "Bom Fit";
    if (score >= 50) return "Fit Moderado";
    return "Fit Baixo";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Análise de Fit com Vaga
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {!analysis ? (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Descrição da Vaga
                </label>
                <Textarea
                  placeholder="Cole aqui a descrição completa da vaga (requisitos, responsabilidades, tecnologias, etc)..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !jobDescription.trim()}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analisando com IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Analisar Fit com IA
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* Match Score */}
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-display ${getScoreColor(analysis.matchScore)}`}>
                    {analysis.matchScore}%
                  </div>
                  <div className="text-lg font-medium text-muted-foreground uppercase">
                    {getScoreLabel(analysis.matchScore)}
                  </div>
                  <Progress value={analysis.matchScore} className="h-3" />
                </div>
              </Card>

              {/* Pontos Fortes de Alinhamento */}
              <Card className="p-6">
                <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Pontos Fortes de Alinhamento
                </h3>
                <ul className="space-y-2">
                  {analysis.forteAlinhamento.map((ponto, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{ponto}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Gaps Identificados */}
              {analysis.gaps.length > 0 && (
                <Card className="p-6 border-orange-500/20">
                  <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Gaps Identificados
                  </h3>
                  <ul className="space-y-2">
                    {analysis.gaps.map((gap, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-orange-500 mt-0.5">→</span>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Competências a Destacar */}
              <Card className="p-6">
                <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-chart-1" />
                  Competências a Destacar
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.competenciasDestaque.map((comp, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {comp}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* STAR Cases Recomendados */}
              {analysis.starCasesRecomendados.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-chart-2" />
                    STAR Cases Recomendados
                  </h3>
                  <ul className="space-y-2">
                    {analysis.starCasesRecomendados.map((starCase, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-chart-2 mt-0.5">★</span>
                        <span>{starCase}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Sugestões de Preparação */}
              <Card className="p-6 bg-chart-1/10 border-chart-1">
                <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-chart-1" />
                  Sugestões de Preparação
                </h3>
                <ol className="space-y-3">
                  {analysis.sugestoesPreparacao.map((sugestao, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="font-display text-chart-1 font-bold shrink-0">
                        {index + 1}.
                      </span>
                      <span>{sugestao}</span>
                    </li>
                  ))}
                </ol>
              </Card>

              {/* Feedback Geral */}
              <Card className="p-6">
                <h3 className="text-sm font-display uppercase mb-3 text-muted-foreground">
                  Feedback Geral
                </h3>
                <p className="text-sm leading-relaxed">{analysis.feedback}</p>
              </Card>

              {/* Ações */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAnalysis(null);
                    setJobDescription("");
                  }}
                  className="flex-1"
                >
                  Nova Análise
                </Button>
                <Button
                  variant="default"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Fechar
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
