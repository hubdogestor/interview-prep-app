"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCountdown } from "./hooks";

const TIMER_OPTIONS = [
  { label: "Pitch", seconds: 5 * 60, color: "bg-brand-green" },
  { label: "STAR case", seconds: 8 * 60, color: "bg-brand-blue" },
  { label: "Pomodoro", seconds: 15 * 60, color: "bg-brand-purple" },
  { label: "Full speech", seconds: 20 * 60, color: "bg-brand-orange" },
  { label: "Rest 30", seconds: 30 * 60, color: "bg-brand-yellow" },
  { label: "Rest 60", seconds: 60 * 60, color: "bg-brand-gray" },
] as const;

function formatSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

type TimerWidgetProps = {
  className?: string;
};

export function TimerWidget({ className }: TimerWidgetProps) {
  const [selectedTime, setSelectedTime] = useState(0);
  const [notifications, setNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  
  // Usar o timer selecionado como base
  const currentTimerOption = TIMER_OPTIONS[selectedTime];
  const countdown = useCountdown(currentTimerOption.seconds);
  
  const progress = useMemo(() => 
    1 - countdown.seconds / currentTimerOption.seconds, 
    [countdown.seconds, currentTimerOption.seconds]
  );

  // Notificação quando o timer acaba
  useEffect(() => {
    if (countdown.seconds === 0 && countdown.running === false && countdown.seconds !== currentTimerOption.seconds) {
      if (notifications && "Notification" in window && Notification.permission === "granted") {
        new Notification("Timer finalizado!", {
          body: `Sua sessão de ${currentTimerOption.label} terminou.`,
          icon: "/favicon-32x32.png",
          tag: "timer-finished"
        });
      }
      
      if (soundEnabled) {
        // Tocar som de notificação (seria necessário ter o arquivo de áudio)
        const audio = new Audio("/notification-sound.mp3");
        audio.play().catch(() => {
          // Fallback para som de beep do sistema
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);
          oscillator.frequency.setValueAtTime(800, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          oscillator.start();
          setTimeout(() => {
            oscillator.stop();
          }, 500);
        });
      }
    }
  }, [countdown.seconds, countdown.running, currentTimerOption, notifications, soundEnabled]);

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        setNotifications(permission === "granted");
      });
    } else {
      setNotifications(Notification.permission === "granted");
    }
  };

  const handleTimerSelect = (index: number) => {
    if (index === selectedTime) return;
    
    setSelectedTime(index);
    setShowOptions(false);
    // Não precisa chamar countdown.reset() aqui, pois o useCountdown será reiniciado automaticamente
    // quando selectedTime mudar, devido ao currentTimerOption.seconds na dependência
  };

  const getTimerStatus = () => {
    if (countdown.seconds === 0) return "finished";
    if (countdown.running) return "running";
    return "paused";
  };

  const status = getTimerStatus();
  const currentTimer = currentTimerOption;

  return (
    <div className={cn("relative", className)}>
      <div 
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-tertiary/60 p-3 transition-all duration-300",
          status === "running" && "border-brand-green/60 bg-brand-green/5",
          status === "finished" && "border-brand-yellow/60 bg-brand-yellow/5",
          showOptions && "rounded-b-none"
        )}
      >
        {/* Timer Options Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 rounded-full border border-border-subtle/60 p-0 text-xs font-semibold",
              currentTimer.color,
              "hover:scale-110 transition-transform duration-200"
            )}
            onClick={() => setShowOptions(!showOptions)}
            title="Opções de tempo"
            aria-label="Opções de tempo"
          >
            {currentTimer.label.charAt(0)}
          </Button>

          {/* Timer Options Dropdown */}
          {showOptions && (
            <div className="absolute top-full left-0 mt-1 z-50 min-w-[140px] rounded-xl border border-border-subtle/60 bg-bg-secondary/95 p-2 shadow-xl backdrop-blur">
              {TIMER_OPTIONS.map((option, index) => (
                <Button
                  key={option.seconds}
                  variant={index === selectedTime ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-xs",
                    index === selectedTime && "bg-brand-green/10 text-brand-green"
                  )}
                  onClick={() => handleTimerSelect(index)}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", option.color)} />
                    {option.label}
                    <span className="ml-auto text-text-muted">
                      {Math.floor(option.seconds / 60)}min
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Timer Display */}
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 36 36" className="h-12 w-12">
            {/* Background circle */}
            <path
              className="text-border-subtle"
              strokeWidth="3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
              opacity={0.35}
            />
            
            {/* Progress circle */}
            <path
              className={cn(
                "transition-colors duration-300",
                status === "running" && "text-brand-green",
                status === "paused" && "text-brand-blue", 
                status === "finished" && "text-brand-yellow"
              )}
              strokeWidth="3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
              strokeDasharray={100}
              strokeDashoffset={100 - Math.floor(progress * 100)}
              style={{
                filter: status === "running" ? "drop-shadow(0 0 4px currentColor)" : undefined
              }}
            />
          </svg>
          
          {/* Time display */}
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-text-primary">
            {formatSeconds(countdown.seconds)}
          </span>

          {/* Running indicator */}
          {status === "running" && (
            <div className="absolute -top-1 -right-1 h-3 w-3">
              <div className="h-full w-full animate-pulse rounded-full bg-brand-green" />
              <div className="absolute inset-0 h-full w-full rounded-full bg-brand-green/60 animate-ping" />
            </div>
          )}
        </div>

        {/* Timer Info */}
        <div className="flex flex-col gap-2 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={cn(
                "text-[10px] px-1.5 py-0",
                currentTimer.color.replace("bg-", "border-").replace("-500", "-400")
              )}
            >
              {currentTimer.label}
            </Badge>
            {status === "running" && (
              <div className="flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-brand-green animate-pulse" />
                <span className="text-[10px] text-brand-green">ativo</span>
              </div>
            )}
            {status === "finished" && (
              <div className="flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-brand-yellow animate-pulse" />
                <span className="text-[10px] text-brand-yellow">pronto!</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button 
              size="sm" 
              onClick={countdown.toggle}
              className={cn(
                "h-6 px-2 text-[10px]",
                status === "running" 
                  ? "bg-brand-green/20 text-brand-green hover:bg-brand-green/30" 
                  : "hover:bg-border-subtle"
              )}
            >
              {status === "running" ? "Pausar" : "Iniciar"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                // Reset para o Pitch (5 min) como padrão
                countdown.reset();
                setSelectedTime(0); // Garantir que volte para Pitch como padrão
              }}
              className="h-6 px-2 text-[10px] hover:bg-border-subtle"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Bar */}
      <div className="mt-1 flex items-center justify-between rounded-b-xl border-x border-b border-border-subtle/60 bg-bg-tertiary/40 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-5 w-5 p-0 text-[10px]",
              notifications ? "text-brand-blue" : "text-text-muted"
            )}
            onClick={requestNotificationPermission}
            title="Notificações"
          >
            🔔
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-5 w-5 p-0 text-[10px]",
              soundEnabled ? "text-brand-green" : "text-text-muted"
            )}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title="Som"
          >
            🔊
          </Button>
        </div>
        
        <div className="text-[10px] text-text-muted">
          {Math.round(progress * 100)}% completo
        </div>
      </div>
    </div>
  );
}
