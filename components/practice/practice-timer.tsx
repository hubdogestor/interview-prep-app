"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Timer as TimerIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PracticeTimerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetDuration?: number; // in seconds
}

export function PracticeTimer({
  open,
  onOpenChange,
  targetDuration = 120,
}: PracticeTimerProps) {
  const [target, setTarget] = useState(targetDuration);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio alert function - declared before useEffect to avoid hoisting issues
  const playAlert = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = window.setInterval(() => {
      setElapsed((prev) => {
        const newValue = prev + 1;
        if (newValue >= target && !hasFinished) {
          setHasFinished(true);
          playAlert();
        }
        return newValue;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, target, hasFinished, playAlert]);

  useEffect(() => {
    if (open) {
      setElapsed(0);
      setIsRunning(false);
      setHasFinished(false);
    }
  }, [open]);

  const handleReset = () => {
    setElapsed(0);
    setIsRunning(false);
    setHasFinished(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    if (target === 0) return 0;
    return Math.min((elapsed / target) * 100, 100);
  };

  const getStatusColor = () => {
    const progress = getProgress();
    if (progress >= 100) return "text-destructive";
    if (progress >= 80) return "text-warning";
    return "text-chart-1";
  };

  const getBackgroundColor = () => {
    const progress = getProgress();
    if (progress >= 100) return "bg-destructive/10";
    if (progress >= 80) return "bg-warning/10";
    return "bg-chart-1/10";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="uppercase font-display flex items-center gap-2">
            <TimerIcon className="h-5 w-5" />
            Timer de Prática
          </DialogTitle>
          <DialogDescription>
            Configure e acompanhe o tempo da sua apresentação
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Target Duration Input */}
          <div className="space-y-2">
            <Label className="uppercase text-xs">Tempo Alvo (segundos)</Label>
            <Input
              type="number"
              value={target}
              onChange={(e) =>
                setTarget(Math.max(1, parseInt(e.target.value) || 1))
              }
              disabled={isRunning}
              min={1}
            />
          </div>

          {/* Timer Display */}
          <div
            className={`flex flex-col items-center justify-center p-8 rounded-lg ${getBackgroundColor()} transition-colors`}
          >
            <div className={`text-6xl font-mono font-bold ${getStatusColor()}`}>
              {formatTime(elapsed)}
            </div>
            <div className="text-sm text-muted-foreground uppercase mt-2">
              Alvo: {formatTime(target)}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-border rounded-full mt-4 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  getProgress() >= 100
                    ? "bg-destructive"
                    : getProgress() >= 80
                      ? "bg-warning"
                      : "bg-chart-1"
                }`}
                style={{ width: `${getProgress()}%` }}
              />
            </div>

            {hasFinished && (
              <div className="mt-4 text-sm font-medium text-destructive uppercase animate-pulse">
                ⏰ Tempo atingido!
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              disabled={elapsed === 0}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              onClick={() => setIsRunning(!isRunning)}
              className="w-32"
            >
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Iniciar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
