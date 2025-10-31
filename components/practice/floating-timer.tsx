"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { X, Pause, Play, RotateCcw, GripVertical } from "lucide-react";

interface FloatingTimerProps {
  targetDuration: number; // in seconds
  onClose: () => void;
}

export function FloatingTimer({ targetDuration, onClose }: FloatingTimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 250, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = window.setInterval(() => {
      setElapsed((prev) => {
        const newValue = prev + 1;
        if (newValue >= targetDuration && !hasFinished) {
          setHasFinished(true);
          playAlert();
        }
        return newValue;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, targetDuration, hasFinished]);

  const playAlert = () => {
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
    if (targetDuration === 0) return 0;
    return Math.min((elapsed / targetDuration) * 100, 100);
  };

  const getStatusColor = () => {
    const progress = getProgress();
    if (progress >= 100) return "bg-destructive";
    if (progress >= 80) return "bg-warning";
    return "bg-chart-1";
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (!mounted) return null;

  const timerContent = (
    <div
      className="fixed z-[9999] bg-background border-2 border-border rounded-lg shadow-2xl"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "220px",
        cursor: isDragging ? "grabbing" : "default",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      {/* Header com drag handle */}
      <div
        className="flex items-center justify-between p-2 border-b border-border cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1 text-xs uppercase font-display text-muted-foreground">
          <GripVertical className="h-3 w-3" />
          Timer
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Timer Display */}
      <div className="p-4 space-y-3">
        <div className="text-center">
          <div className={`text-4xl font-mono font-bold ${
            getProgress() >= 100 ? "text-destructive" :
            getProgress() >= 80 ? "text-warning" : "text-chart-1"
          }`}>
            {formatTime(elapsed)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            / {formatTime(targetDuration)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getStatusColor()}`}
            style={{ width: `${getProgress()}%` }}
          />
        </div>

        {hasFinished && (
          <div className="text-xs font-medium text-destructive text-center animate-pulse">
            ⏰ Tempo atingido!
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            disabled={elapsed === 0}
            className="h-8 w-8"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1"
          >
            {isRunning ? (
              <>
                <Pause className="mr-1 h-3 w-3" />
                Pausar
              </>
            ) : (
              <>
                <Play className="mr-1 h-3 w-3" />
                Iniciar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(timerContent, document.body);
}
