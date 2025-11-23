"use client";

import { useState } from "react";
import {motion } from "framer-motion";
import { Loader2, Mic, Pause, Play, RotateCcw, Sparkles,Square } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { fadeIn, scaleIn } from "@/lib/animations";
import { trpc } from "@/lib/trpc/react";

interface PracticeEvaluation {
  clareza: number;
  fluencia: number;
  completude: number;
  pontosFortes: string[];
  areasAMelhorar: string[];
  feedback: string;
}

interface AudioPracticeProps {
  tipo: "icebreaker" | "speech" | "star_case";
  itemId: string;
  itemTitle: string;
  conteudoOriginal: string;
  onComplete?: () => void;
}

export function AudioPractice({
  tipo,
  itemId,
  itemTitle,
  conteudoOriginal,
  onComplete,
}: AudioPracticeProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [evaluation, setEvaluation] = useState<PracticeEvaluation | null>(null);

  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioURL,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
  } = useAudioRecorder();

  const createSessionMutation = trpc.practice.create.useMutation();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnalyze = async () => {
    if (!audioBlob) {
      toast.error("Nenhuma gravação disponível");
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simular transcrição (em produção, você usaria uma API de Speech-to-Text)
      // Por enquanto, vamos criar uma análise baseada apenas na duração e conteúdo original
      const mockTranscricao = `[Transcrição simulada da prática de ${recordingTime} segundos]`;

      // Criar sessão de prática
      const session = await createSessionMutation.mutateAsync({
        tipo,
        itemId,
        itemTitle,
        duracao: recordingTime,
        transcricao: mockTranscricao,
        // Em produção, você faria upload do audioBlob para storage (S3, Cloudinary, etc)
        // audioUrl: uploadedUrl,
      });

      // Simular análise de IA (em produção, chamaria a API)
      const mockEvaluation: PracticeEvaluation = {
        clareza: Math.floor(70 + Math.random() * 30),
        fluencia: Math.floor(65 + Math.random() * 35),
        completude: Math.floor(60 + Math.random() * 40),
        pontosFortes: [
          "Boa estruturação do conteúdo",
          "Tom de voz adequado",
          "Uso de exemplos concretos",
        ],
        areasAMelhorar: [
          "Reduzir palavras de preenchimento",
          "Melhorar as transições entre seções",
          "Adicionar mais pausas estratégicas",
        ],
        feedback:
          "Sua prática demonstrou uma boa base. Continue praticando para aprimorar a fluência e reduzir hesitações. Pontos fortes incluem a estrutura clara e exemplos concretos.",
      };

      setEvaluation(mockEvaluation);
      setShowResults(true);
      toast.success("Análise concluída!");
    } catch (error) {
      console.error("Erro ao analisar:", error);
      toast.error("Erro ao analisar a prática");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartOver = () => {
    resetRecording();
    setShowResults(false);
    setEvaluation(null);
  };

  if (showResults && evaluation) {
    return (
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display uppercase flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-chart-1" />
              Análise de Performance
            </h3>
            <Button variant="ghost" size="sm" onClick={handleStartOver}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Nova Prática
            </Button>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div variants={scaleIn}>
              <Card className="p-4 text-center">
                <div className="text-3xl font-display text-chart-1 mb-1">
                  {evaluation.clareza}
                </div>
                <div className="text-xs text-muted-foreground uppercase">
                  Clareza
                </div>
              </Card>
            </motion.div>
            <motion.div variants={scaleIn}>
              <Card className="p-4 text-center">
                <div className="text-3xl font-display text-chart-2 mb-1">
                  {evaluation.fluencia}
                </div>
                <div className="text-xs text-muted-foreground uppercase">
                  Fluência
                </div>
              </Card>
            </motion.div>
            <motion.div variants={scaleIn}>
              <Card className="p-4 text-center">
                <div className="text-3xl font-display text-chart-3 mb-1">
                  {evaluation.completude}
                </div>
                <div className="text-xs text-muted-foreground uppercase">
                  Completude
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Feedback */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium uppercase text-sm mb-2 text-green-600">
                ✓ Pontos Fortes
              </h4>
              <ul className="space-y-1">
                {evaluation.pontosFortes.map((ponto, i) => (
                  <li key={i} className="text-sm pl-4">
                    • {ponto}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium uppercase text-sm mb-2 text-orange-600">
                → Áreas para Melhorar
              </h4>
              <ul className="space-y-1">
                {evaluation.areasAMelhorar.map((area: string, i: number) => (
                  <li key={i} className="text-sm pl-4">
                    • {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium uppercase text-sm mb-2">
                Feedback Geral
              </h4>
              <p className="text-sm text-muted-foreground">
                {evaluation.feedback}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center gap-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className="text-6xl font-display tabular-nums mb-2">
            {formatTime(recordingTime)}
          </div>
          <Badge variant={isRecording ? "default" : "outline"} className="uppercase">
            {isRecording ? (isPaused ? "Pausado" : "Gravando") : "Pronto"}
          </Badge>
        </div>

        {/* Recording Controls */}
        <div className="flex gap-3">
          {!isRecording && !audioBlob && (
            <Button
              size="lg"
              onClick={startRecording}
              className="w-32"
            >
              <Mic className="h-5 w-5 mr-2" />
              Gravar
            </Button>
          )}

          {isRecording && (
            <>
              {!isPaused ? (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={pauseRecording}
                  className="w-32"
                >
                  <Pause className="h-5 w-5 mr-2" />
                  Pausar
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={resumeRecording}
                  className="w-32"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Retomar
                </Button>
              )}
              <Button
                size="lg"
                variant="destructive"
                onClick={stopRecording}
                className="w-32"
              >
                <Square className="h-4 w-4 mr-2" />
                Finalizar
              </Button>
            </>
          )}

          {audioBlob && !isRecording && (
            <>
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-40"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Analisar com IA
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={handleStartOver}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar
              </Button>
            </>
          )}
        </div>

        {/* Audio Playback */}
        {audioURL && !isRecording && (
          <div className="w-full">
            <audio src={audioURL} controls className="w-full" />
          </div>
        )}

        {/* Instructions */}
        {!isRecording && !audioBlob && (
          <div className="text-center text-sm text-muted-foreground max-w-md">
            <p>
              Clique em &apos;Gravar&apos; quando estiver pronto. Pratique seu {tipo === "icebreaker" ? "icebreaker" : tipo === "speech" ? "speech" : "STAR Case"} como se estivesse em uma entrevista real.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
