"use client";

import { useEffect,useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { Check,Loader2, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StreamingFeedbackProps {
  isStreaming: boolean;
  currentStep?: string;
  progress?: number;
  estimatedTime?: number;
  className?: string;
}

const steps = [
  "Analisando contexto...",
  "Gerando conteúdo...",
  "Refinando texto...",
  "Finalizando...",
];

export function StreamingFeedback({
  isStreaming,
  currentStep,
  progress,
  estimatedTime,
  className,
}: StreamingFeedbackProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Update step and time while streaming
  useEffect(() => {
    if (!isStreaming) return;

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    const timeInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(timeInterval);
    };
  }, [isStreaming]);

  if (!isStreaming) return null;

  const displayStep = currentStep || steps[currentStepIndex];
  const displayProgress = progress || (currentStepIndex + 1) * 25;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn("w-full", className)}
      >
        <Card className="p-6 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-950/20 dark:to-indigo-950/20 border-violet-200 dark:border-violet-800">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Loader2 className="size-6 text-violet-600 dark:text-violet-400 animate-spin" />
                <Sparkles className="size-3 text-violet-600 dark:text-violet-400 absolute -top-1 -right-1" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-violet-900 dark:text-violet-100">
                  IA Trabalhando
                </h4>
                <p className="text-xs text-violet-700 dark:text-violet-300">
                  {displayStep}
                </p>
              </div>
              {estimatedTime && (
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">
                    {elapsedTime}s / ~{estimatedTime}s
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={displayProgress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{displayProgress}%</span>
                <span>
                  {currentStepIndex + 1} de {steps.length} etapas
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-4 gap-2">
              {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div
                    key={step}
                    className={cn(
                      "flex flex-col items-center gap-1 text-center p-2 rounded-lg transition-colors",
                      isCurrent && "bg-violet-100 dark:bg-violet-900/30",
                      isCompleted && "bg-green-100 dark:bg-green-900/30"
                    )}
                  >
                    <div
                      className={cn(
                        "size-6 rounded-full flex items-center justify-center transition-all",
                        isCurrent &&
                          "bg-violet-600 dark:bg-violet-400 text-white scale-110",
                        isCompleted && "bg-green-600 dark:bg-green-400 text-white",
                        !isCurrent &&
                          !isCompleted &&
                          "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="size-3" />
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] leading-tight",
                        isCurrent && "font-medium text-violet-900 dark:text-violet-100",
                        isCompleted && "text-green-700 dark:text-green-300",
                        !isCurrent && !isCompleted && "text-muted-foreground"
                      )}
                    >
                      {step.replace("...", "")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
