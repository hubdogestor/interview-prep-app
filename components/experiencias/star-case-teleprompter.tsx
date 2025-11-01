"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Settings,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface StarCase {
  titulo: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  idioma: "pt" | "en";
}

interface StarCaseTeleprompterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  starCase: StarCase;
}

export function StarCaseTeleprompter({
  open,
  onOpenChange,
  starCase,
}: StarCaseTeleprompterProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [fontSize, setFontSize] = useState(24);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const scrollRef = useRef<number | null>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (!isPlaying || !contentRef.current) {
      return;
    }

    const scrollInterval = window.setInterval(() => {
      if (contentRef.current) {
        const container = contentRef.current;
        const currentScroll = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const newScroll = currentScroll + scrollSpeed;

        if (newScroll >= maxScroll) {
          setIsPlaying(false);
          container.scrollTop = maxScroll;
        } else {
          container.scrollTop = newScroll;
          setScrollPosition(newScroll);
        }
      }
    }, 50);

    scrollRef.current = scrollInterval;

    return () => {
      clearInterval(scrollInterval);
    };
  }, [isPlaying, scrollSpeed]);

  // Timer logic
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = window.setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Reset on open
  useEffect(() => {
    if (open) {
      setIsPlaying(false);
      setScrollPosition(0);
      setElapsedTime(0);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  }, [open]);

  // Fullscreen handling
  useEffect(() => {
    if (!containerRef.current) return;

    if (isFullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      }
    }
  }, [isFullscreen]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setScrollPosition(0);
    setElapsedTime(0);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const estimatedDuration = Math.ceil(
    (starCase.situation.split(" ").length +
      starCase.task.split(" ").length +
      starCase.action.split(" ").length +
      starCase.result.split(" ").length) /
      2.5
  ); // ~150 words per minute speaking pace

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={containerRef}
        className={`${
          isFullscreen
            ? "max-w-none w-screen h-screen"
            : "max-w-4xl max-h-[90vh]"
        } p-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="uppercase font-display">
                {starCase.titulo}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Settings Panel */}
          {showSettings && (
            <div className="px-6 py-4 bg-muted border-b space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block uppercase">
                  Velocidade do Scroll
                </label>
                <Slider
                  value={[scrollSpeed]}
                  onValueChange={([value]) => setScrollSpeed(value)}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">
                  {scrollSpeed.toFixed(1)}x
                </span>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block uppercase">
                  Tamanho da Fonte
                </label>
                <Slider
                  value={[fontSize]}
                  onValueChange={([value]) => setFontSize(value)}
                  min={16}
                  max={48}
                  step={2}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{fontSize}px</span>
              </div>
            </div>
          )}

          {/* Content */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto px-8 py-12"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 1.6,
            }}
          >
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Situation */}
              <div>
                <h3
                  className="font-display uppercase mb-3 text-chart-1"
                  style={{ fontSize: `${fontSize + 4}px` }}
                >
                  Situation
                </h3>
                <p className="leading-relaxed">{starCase.situation}</p>
              </div>

              {/* Task */}
              <div>
                <h3
                  className="font-display uppercase mb-3 text-chart-2"
                  style={{ fontSize: `${fontSize + 4}px` }}
                >
                  Task
                </h3>
                <p className="leading-relaxed">{starCase.task}</p>
              </div>

              {/* Action */}
              <div>
                <h3
                  className="font-display uppercase mb-3 text-chart-3"
                  style={{ fontSize: `${fontSize + 4}px` }}
                >
                  Action
                </h3>
                <p className="leading-relaxed">{starCase.action}</p>
              </div>

              {/* Result */}
              <div>
                <h3
                  className="font-display uppercase mb-3 text-chart-4"
                  style={{ fontSize: `${fontSize + 4}px` }}
                >
                  Result
                </h3>
                <p className="leading-relaxed">{starCase.result}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 border-t bg-background">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">
                Tempo: <strong>{formatTime(elapsedTime)}</strong> /{" "}
                <span>~{estimatedDuration}s</span>
              </div>
              <div className="text-xs text-muted-foreground uppercase">
                Idioma: {starCase.idioma.toUpperCase()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={reset}
                disabled={isPlaying}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button onClick={togglePlayPause} className="flex-1">
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    {scrollPosition > 0 ? "Continuar" : "Iniciar"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
