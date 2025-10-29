"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCountdown } from "./hooks";
import "./timer-animations.css";

const TIMER_OPTIONS = [
  { label: "Pitch", seconds: 5 * 60, color: "bg-emerald-400", icon: "🎯" },
  { label: "STAR case", seconds: 8 * 60, color: "bg-blue-400", icon: "⭐" },
  { label: "Pomodoro", seconds: 15 * 60, color: "bg-red-500", icon: "🍅" },
  { label: "Full speech", seconds: 20 * 60, color: "bg-orange-400", icon: "🎤" },
  { label: "Rest 30", seconds: 30 * 60, color: "bg-yellow-400", icon: "☕" },
  { label: "Rest 60", seconds: 60 * 60, color: "bg-gray-400", icon: "🛌" },
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
  const [isClient, setIsClient] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  
  // Usar o timer selecionado como base - RESET quando selectedTime muda
  const currentTimerOption = TIMER_OPTIONS[selectedTime];
  
  // key força recriar o hook quando selectedTime muda
  const countdown = useCountdown(currentTimerOption.seconds);
  
  const progress = useMemo(() => 
    1 - countdown.seconds / currentTimerOption.seconds, 
    [countdown.seconds, currentTimerOption.seconds]
  );

  // Determinar o status do timer
  const getTimerStatus = () => {
    if (countdown.seconds === 0) return "finished";
    if (countdown.running) return "running";
    return "paused";
  };

  const status = getTimerStatus();
  const currentTimer = currentTimerOption;

  // Reset countdown quando a opção selecionada muda
  useEffect(() => {
    countdown.reset();
  }, [selectedTime]); // eslint-disable-line react-hooks/exhaustive-deps

  // Verificar se estamos no cliente para evitar problemas de hidratação
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Efeito de pulse mais intenso quando está rodando
  useEffect(() => {
    if (!isClient || status !== "running") return;

    const interval = setInterval(() => {
      setPulseIntensity(prev => (prev + 1) % 3);
    }, 800);

    return () => clearInterval(interval);
  }, [status, isClient]);

  // Notificação quando o timer acaba - apenas no cliente
  useEffect(() => {
    if (!isClient) return;
    
    if (countdown.seconds === 0 && countdown.running === false && countdown.seconds !== currentTimerOption.seconds) {
      // Vibração tátil se suportada
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }

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
          // Fallback para som de beep do sistema - apenas no cliente
          try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
              const ctx = new AudioContextClass();
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
            }
          } catch (error) {
            // Silently fail if Web Audio API is not available
            console.warn("Web Audio API not available:", error);
          }
        });
      }
    }
  }, [countdown.seconds, countdown.running, currentTimerOption, notifications, soundEnabled, isClient]);

  const requestNotificationPermission = () => {
    if (!isClient) return;
    
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
  };

  // Acessibilidade - suporte para keyboard
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowOptions(false);
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      countdown.toggle();
    }
  };

  // Extrair cor neon da opção atual para usar no progresso
  const getProgressNeonColor = (colorClass: string) => {
    switch (colorClass) {
      case "bg-emerald-400": return "#10b981";
      case "bg-blue-400": return "#3b82f6";
      case "bg-red-500": return "#ef4444";
      case "bg-orange-400": return "#fb923c";
      case "bg-yellow-400": return "#facc15";
      case "bg-gray-400": return "#9ca3af";
      default: return "#10b981";
    }
  };

  // Extrair cor neon da opção atual para usar na badge
  const getNeonColor = (colorClass: string) => {
    switch (colorClass) {
      case "bg-emerald-400": return "border-emerald-400/30 shadow-emerald-400/20";
      case "bg-blue-400": return "border-blue-400/30 shadow-blue-400/20";
      case "bg-red-500": return "border-red-400/30 shadow-red-400/20";
      case "bg-orange-400": return "border-orange-400/30 shadow-orange-400/20";
      case "bg-yellow-400": return "border-yellow-400/30 shadow-yellow-400/20";
      case "bg-gray-400": return "border-gray-400/30 shadow-gray-400/20";
      default: return "border-brand-green/30 shadow-brand-green/20";
    }
  };

  // Não renderizar completamente até estar no cliente para evitar problemas de hidratação
  if (!isClient) {
    return (
      <div className={cn("relative", className)}>
        <div className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-tertiary/60 p-3">
          <div className="h-8 w-8 rounded-full border border-border-subtle/60 p-0 text-lg font-semibold bg-transparent">
            <span className="text-xl leading-none">⏱️</span>
          </div>
          <div className="relative h-12 w-12">
            <svg viewBox="0 0 36 36" className="h-12 w-12">
              <path
                className="text-border-subtle"
                strokeWidth="5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
                opacity={0.35}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
              25:00
            </span>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <Badge variant="outline" className="text-[8px] px-2 py-0.5 bg-transparent">
              Carregando...
            </Badge>
            <div className="flex gap-1">
              <Button size="sm" className="h-5 px-1.5 text-[8px]">
                Iniciar
              </Button>
              <Button variant="ghost" size="sm" className="h-5 px-1.5 text-[8px]">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative", className)} 
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label={`Timer de ${currentTimer.label}, ${formatSeconds(countdown.seconds)} restantes, ${status === 'running' ? 'em execução' : status === 'paused' ? 'pausado' : 'finalizado'}`}
    >
      <div 
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-tertiary/60 p-3 transition-all duration-300",
          // Melhor feedback visual quando está rodando com múltiplas intensidades
          status === "running" && [
            "border-emerald-400/60 bg-emerald-400/5",
            "shadow-lg shadow-emerald-400/10", 
            `animate-pulse-${pulseIntensity + 1}`
          ],
          status === "finished" && "border-yellow-400/60 bg-yellow-400/5",
          showOptions && "rounded-b-none"
        )}
      >
        {/* Timer Options Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 rounded-full border border-border-subtle/60 p-0 text-lg font-semibold bg-transparent hover:bg-transparent",
              "hover:scale-110 transition-transform duration-200 focus:ring-2 focus:ring-brand-green/40 focus:ring-offset-2"
            )}
            onClick={() => setShowOptions(!showOptions)}
            title="Opções de tempo"
            aria-label="Opções de tempo"
            aria-expanded={showOptions}
            aria-haspopup="true"
          >
            <span className={cn(
              "text-xl leading-none transition-all duration-300",
              status === "running" && "animate-bounce-subtle"
            )}>{currentTimer.icon}</span>
          </Button>

          {/* Timer Options Dropdown */}
          {showOptions && (
            <div 
              className="absolute top-full left-0 mt-1 z-50 min-w-[160px] rounded-xl border border-border-subtle/60 bg-bg-secondary/95 p-2 shadow-xl backdrop-blur"
              role="menu"
              aria-label="Opções de tempo"
            >
              {TIMER_OPTIONS.map((option, index) => (
                <Button
                  key={option.seconds}
                  variant={index === selectedTime ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-xs h-8 bg-transparent hover:bg-transparent focus:ring-2 focus:ring-brand-green/40",
                    index === selectedTime && "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  )}
                  onClick={() => handleTimerSelect(index)}
                  role="menuitem"
                  aria-selected={index === selectedTime}
                >
                  <div className="flex items-center gap-3 w-full">
                    {/* Ícone maior sem fundo */}
                    <div className="flex h-7 w-7 items-center justify-center text-lg bg-transparent">
                      <span className="text-lg leading-none">{option.icon}</span>
                    </div>
                    
                    {/* Label da opção */}
                    <span className="flex-1 text-left">{option.label}</span>
                    
                    {/* Duração da opção */}
                    <span className="text-text-muted text-xs ml-auto">
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
          <svg viewBox="0 0 36 36" className="h-12 w-12" aria-hidden="true">
            {/* Background circle */}
            <path
              className="text-border-subtle"
              strokeWidth="5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
              opacity={0.35}
            />
            
            {/* Progress circle - cor neon dinâmica baseada na opção selecionada */}
            <path
              stroke={getProgressNeonColor(currentTimer.color)}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
              strokeDasharray={100}
              strokeDashoffset={100 - Math.floor(progress * 100)}
              style={{
                filter: status === "running" 
                  ? `drop-shadow(0 0 8px ${getProgressNeonColor(currentTimer.color)}80)` 
                  : undefined,
                opacity: progress > 0 ? 1 : 0.7,
                transition: "all 0.3s ease-in-out"
              }}
            />
            
            {/* Glow effect quando está rodando */}
            {status === "running" && (
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke={getProgressNeonColor(currentTimer.color)}
                strokeWidth="1"
                opacity={0.3}
                style={{
                  filter: `blur(1px)`,
                  animation: "pulse-glow 2s ease-in-out infinite alternate"
                }}
              />
            )}
          </svg>
          
          {/* Time display */}
          <span className={cn(
            "absolute inset-0 flex items-center justify-center text-xs font-semibold transition-colors duration-300",
            status === "running" ? "text-emerald-400" : "text-text-primary",
            status === "finished" && "text-yellow-400"
          )} aria-live="polite">
            {formatSeconds(countdown.seconds)}
          </span>
        </div>

        {/* Timer Info */}
        <div className="flex flex-col gap-2 text-xs text-text-secondary">
          {/* Título centralizado corretamente */}
          <div className="flex items-center justify-center w-full">
            <Badge 
              variant="outline" 
              className={cn(
                "text-[8px] px-2 py-0.5 text-center border shadow-sm bg-transparent",
                "whitespace-nowrap min-w-max", // Garante centralização adequada
                getNeonColor(currentTimer.color)
              )}
            >
              {currentTimer.label}
            </Badge>
          </div>
          
          {/* Botões centralizados com cor do texto corrigida */}
          <div className="flex gap-1 justify-center">
            <Button 
              size="sm" 
              onClick={countdown.toggle}
              className={cn(
                "h-5 px-1.5 text-[8px] text-center transition-all duration-200 focus:ring-2 focus:ring-brand-green/40",
                "bg-bg-tertiary/60 hover:bg-bg-tertiary/80 border border-border-subtle/50",
                status === "running" 
                  ? "text-emerald-400 border-emerald-400/50 hover:bg-emerald-400/10" 
                  : "text-text-primary hover:border-brand-green/60"
              )}
              aria-label={status === "running" ? "Pausar timer" : "Iniciar timer"}
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
              className="h-5 px-1.5 text-[8px] text-center bg-bg-tertiary/60 hover:bg-bg-tertiary/80 border border-border-subtle/50 hover:border-brand-green/60 focus:ring-2 focus:ring-brand-green/40"
              aria-label="Resetar timer"
            >
              Reset
            </Button>
          </div>
          
          {/* Status "ativo" abaixo dos botões, na esquerda */}
          {status === "running" && (
            <div className="flex items-center justify-center gap-1">
              <div className={cn(
                "h-1 w-1 rounded-full animate-pulse",
                "bg-emerald-400 shadow-sm shadow-emerald-400/50"
              )} />
              <span className="text-[8px] text-emerald-400 font-medium">ativo</span>
            </div>
          )}
          
          {status === "finished" && (
            <div className="flex items-center justify-center gap-1">
              <div className={cn(
                "h-1 w-1 rounded-full animate-pulse",
                "bg-yellow-400 shadow-sm shadow-yellow-400/50"
              )} />
              <span className="text-[8px] text-yellow-400 font-medium">pronto!</span>
            </div>
          )}
        </div>
      </div>

      {/* Settings Bar */}
      <div className="mt-1 flex items-center justify-between rounded-b-xl border-x border-b border-border-subtle/60 bg-bg-tertiary/40 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-5 w-5 p-0 text-[10px] bg-transparent hover:bg-transparent transition-all duration-200 focus:ring-2 focus:ring-brand-green/40",
              notifications ? "text-blue-400" : "text-text-muted hover:text-blue-400"
            )}
            onClick={requestNotificationPermission}
            title={notifications ? "Notificações ativas" : "Ativar notificações"}
            aria-label={notifications ? "Desativar notificações" : "Ativar notificações"}
            aria-pressed={notifications}
          >
            <span className={cn(
              "transition-transform duration-200",
              notifications && "scale-110"
            )}>🔔</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-5 w-5 p-0 text-[10px] bg-transparent hover:bg-transparent transition-all duration-200 focus:ring-2 focus:ring-brand-green/40",
              soundEnabled ? "text-emerald-400" : "text-text-muted hover:text-emerald-400"
            )}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Som ativado" : "Ativar som"}
            aria-label={soundEnabled ? "Desativar som" : "Ativar som"}
            aria-pressed={soundEnabled}
          >
            <span className={cn(
              "transition-transform duration-200",
              soundEnabled && "scale-110"
            )}>🔊</span>
          </Button>
        </div>
        
        <div className="text-[10px] text-text-muted">
          {Math.round(progress * 100)}% completo
        </div>
      </div>
    </div>
  );
}
