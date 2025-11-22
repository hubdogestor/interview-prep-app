"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { TextStats } from "@/components/ui/text-stats";

interface TeleprompterViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
}

export function TeleprompterView({
  open,
  onOpenChange,
  title,
  content,
}: TeleprompterViewProps) {
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

  // Reset on open usando useLayoutEffect para evitar flicker
  useLayoutEffect(() => {
    if (open) {
      setIsPlaying(false);
      setScrollPosition(0);
      setElapsedTime(0);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  }, [open]);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
      toast.error("Erro ao alternar tela cheia");
    }
  };

  const handleReset = () => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] p-0 bg-black text-white border-none">
        <div ref={containerRef} className="flex flex-col h-[90vh]">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="uppercase font-display text-white">
                {title}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-white/70">
                  {formatTime(elapsedTime)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:bg-white/10"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/10"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="mt-4 space-y-4 p-4 bg-white/5 rounded-lg">
                <div className="space-y-2">
                  <label className="text-xs uppercase text-white/70">
                    Velocidade: {scrollSpeed.toFixed(1)}x
                  </label>
                  <Slider
                    value={[scrollSpeed]}
                    onValueChange={(value) => setScrollSpeed(value[0])}
                    min={0.5}
                    max={5}
                    step={0.5}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-white/70">
                    Tamanho da Fonte: {fontSize}px
                  </label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    min={16}
                    max={48}
                    step={2}
                    className="w-full"
                  />
                </div>
                <TextStats
                  text={content}
                  className="text-white/50 justify-center"
                />
              </div>
            )}
          </DialogHeader>

          {/* Content */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-scroll px-8 py-12"
            style={{ scrollBehavior: "auto" }}
          >
            <div
              className="max-w-4xl mx-auto leading-relaxed"
              style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
            >
              <p className="whitespace-pre-wrap">{content}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-center gap-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="text-white hover:bg-white/10"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:bg-white/10 w-16 h-16 rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>
            <div className="w-8" /> {/* Spacer for symmetry */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
