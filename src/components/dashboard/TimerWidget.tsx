"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCountdown } from "./hooks";
import "./timer-animations.css";

// Hook para spring animations personalizado
function useSpring(value: number, config = { tension: 300, friction: 25 }) {
  const [spring, setSpring] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const startSpring = useCallback((target: number) => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      const force = (target - spring) * (config.tension / 1000);
      const velocity = (spring - valueRef.current) * 60;
      const damping = velocity * (config.friction / 1000);

      const newSpring = spring + (force - damping) * (deltaTime / 16);

      setSpring(newSpring);

      if (Math.abs(newSpring - target) > 0.1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setSpring(target);
        lastTimeRef.current = undefined;
      }
    };

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    lastTimeRef.current = undefined;
    rafRef.current = requestAnimationFrame(animate);
  }, [spring, config.tension, config.friction]);

  useEffect(() => {
    startSpring(value);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, startSpring]);

  return spring;
}

// Hook para Haptic Feedback
function useHapticFeedback() {
  const isSupported = 'vibrate' in navigator;

  const vibrate = useCallback((pattern: number | number[]) => {
    if (isSupported) {
      navigator.vibrate(pattern);
    }
  }, [isSupported]);

  return { vibrate, isSupported };
}

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
  const [focusedElement, setFocusedElement] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<string>("");

  const { vibrate, isSupported: hapticSupported } = useHapticFeedback();
  
  // Spring animations para elementos interativos
  const buttonSpring = useSpring(1, { tension: 400, friction: 25 });
  const iconSpring = useSpring(0, { tension: 300, friction: 20 });
  const progressSpring = useSpring(0, { tension: 200, friction: 30 });
  
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

  // Acessibilidade - Announce timer changes
  useEffect(() => {
    if (!isClient || !announcements) return;
    
    const timer = setTimeout(() => {
      setAnnouncements("");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [announcements, isClient]);

  // Progressive enhancement para browsers modernos
  useEffect(() => {
    if (!isClient) return;
    
    // Feature detection para APIs avançadas
    const features = {
      vibration: 'vibrate' in navigator,
      notification: 'Notification' in window,
      intersectionObserver: 'IntersectionObserver' in window,
      webAudio: 'AudioContext' in window || 'webkitAudioContext' in window,
      webShare: 'share' in navigator,
    };

    // Log feature support para debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('TimerWidget features:', features);
    }
  }, [isClient]);

  // Reset countdown quando a opção selecionada muda
  useEffect(() => {
    countdown.reset();
  }, [selectedTime]); // eslint-disable-line react-hooks/exhaustive-deps

  // Verificar se estamos no cliente para evitar problemas de hidratação
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animações baseadas no status
  useEffect(() => {
    if (!isClient) return;
    
    switch (status) {
      case "running":
        iconSpring(1); // Ativar bounce no ícone
        break;
      case "finished":
        // Animação de confete
        iconSpring(1.2);
        setTimeout(() => iconSpring(0), 600);
        vibrate([200, 100, 200, 100, 200]);
        break;
      default:
        iconSpring(0); // Voltar ao normal
    }
  }, [status, isClient, iconSpring, vibrate]);

  // Notificação quando o timer acaba - apenas no cliente
  useEffect(() => {
    if (!isClient) return;
    
    if (countdown.seconds === 0 && countdown.running === false && countdown.seconds !== currentTimerOption.seconds) {
      setAnnouncements(`Timer finalizado! Sua sessão de ${currentTimerOption.label} terminou.`);

      if (hapticSupported) {
        vibrate([300, 100, 300]);
      }

      if (notifications && "Notification" in window && Notification.permission === "granted") {
        new Notification("Timer finalizado!", {
          body: `Sua sessão de ${currentTimerOption.label} terminou.`,
          icon: "/favicon-32x32.png",
          tag: "timer-finished",
          silent: !soundEnabled
        });
      }
      
      if (soundEnabled) {
        try {
          const audio = new Audio("/notification-sound.mp3");
          audio.volume = 0.7;
          audio.play().catch(() => {
            // Fallback para som de beep do sistema
            try {
              const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
              if (AudioContextClass) {
                const ctx = new AudioContextClass();
                const oscillator = ctx.createOscillator();
                const gainNode = ctx.createGain();
                const filter = ctx.createBiquadFilter();
                
                oscillator.connect(filter);
                filter.connect(gainNode);
                gainNode.connect(ctx.destination);
                
                oscillator.frequency.setValueAtTime(800, ctx.currentTime);
                filter.frequency.setValueAtTime(2000, ctx.currentTime);
                filter.type = 'lowpass';
                gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                
                oscillator.start();
                setTimeout(() => {
                  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                  setTimeout(() => oscillator.stop(), 600);
                }, 100);
              }
            } catch (error) {
              console.warn('Web Audio API not available:', error);
            }
          });
        } catch (error) {
          console.warn('Audio playback failed:', error);
        }
      }
    }
  }, [countdown.seconds, countdown.running, currentTimerOption, notifications, soundEnabled, isClient, hapticSupported, vibrate]);

  const requestNotificationPermission = () => {
    if (!isClient) return;
    
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        setNotifications(permission === "granted");
        if (permission === "granted") {
          vibrate(50);
          setAnnouncements("Notificações ativadas");
        }
      });
    } else {
      setNotifications(Notification.permission === "granted");
    }
  };

  const handleTimerSelect = (index: number) => {
    if (index === selectedTime) return;
    
    setSelectedTime(index);
    setShowOptions(false);
    vibrate(100);
    setAnnouncements(`Timer alterado para ${TIMER_OPTIONS[index].label}`);
  };

  // Navegação por teclado avançada
  const handleKeyDown = useCallback((event: React.KeyboardEvent, elementType?: string) => {
    if (!isClient) return;
    
    const { key, metaKey, ctrlKey, shiftKey } = event;
    
    // Skip to main content
    if ((metaKey && key === 'ArrowDown') || (ctrlKey && shiftKey && key === 'M')) {
      event.preventDefault();
      document.getElementById('main-content')?.focus();
      return;
    }
    
    // Timer controls
    if (elementType === 'timer') {
      switch (key) {
        case ' ':
        case 'Enter':
          event.preventDefault();
          countdown.toggle();
          vibrate(50);
          break;
        case 'Escape':
          setShowOptions(false);
          break;
        case 'r':
        case 'R':
          if (shiftKey) {
            event.preventDefault();
            countdown.reset();
            setSelectedTime(0);
            vibrate(150);
            setAnnouncements("Timer resetado para Pitch");
          }
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault();
          const direction = key === 'ArrowUp' ? 1 : -1;
          const newIndex = (selectedTime + direction + TIMER_OPTIONS.length) % TIMER_OPTIONS.length;
          handleTimerSelect(newIndex);
          break;
      }
    }
  }, [isClient, selectedTime, countdown, vibrate]);

  // Announce para screen readers
  const announceToScreenReader = useCallback((message: string) => {
    setAnnouncements(message);
  }, []);

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
      case "bg-emerald-400": return "border-emerald-400/30 shadow-emerald-400/20 shadow-lg shadow-emerald-400/10";
      case "bg-blue-400": return "border-blue-400/30 shadow-blue-400/20 shadow-lg shadow-blue-400/10";
      case "bg-red-500": return "border-red-400/30 shadow-red-400/20 shadow-lg shadow-red-400/10";
      case "bg-orange-400": return "border-orange-400/30 shadow-orange-400/20 shadow-lg shadow-orange-400/10";
      case "bg-yellow-400": return "border-yellow-400/30 shadow-yellow-400/20 shadow-lg shadow-yellow-400/10";
      case "bg-gray-400": return "border-gray-400/30 shadow-gray-400/20 shadow-lg shadow-gray-400/10";
      default: return "border-brand-green/30 shadow-brand-green/20 shadow-lg shadow-brand-green/10";
    }
  };

  // Contraste otimizado para acessibilidade
  const getHighContrastColor = (color: string) => {
    switch (color) {
      case "text-emerald-400": return "text-emerald-300";
      case "text-brand-green": return "text-emerald-200";
      case "text-brand-blue": return "text-blue-200";
      case "text-yellow-400": return "text-yellow-200";
      default: return color;
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
      role="application"
      aria-label={`Timer de ${currentTimer.label}, ${formatSeconds(countdown.seconds)} restantes, ${status === 'running' ? 'em execução' : status === 'paused' ? 'pausado' : 'finalizado'}`}
    >
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        role="status"
      >
        {announcements}
      </div>

      <div 
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-tertiary/60 p-3 transition-all duration-500",
          // Melhor feedback visual quando está rodando com múltiplas intensidades
          status === "running" && [
            "border-emerald-400/60 bg-emerald-400/5",
            "shadow-xl shadow-emerald-400/20", 
            "shadow-2xl shadow-emerald-400/10"
          ],
          status === "finished" && [
            "border-yellow-400/60 bg-yellow-400/5",
            "shadow-xl shadow-yellow-400/20"
          ],
          showOptions && "rounded-b-none"
        )}
        style={{
          transform: `scale(${buttonSpring})`,
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Timer Options Button com animações avançadas */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 rounded-full border border-border-subtle/60 p-0 text-lg font-semibold bg-transparent hover:bg-transparent",
              "hover:scale-110 active:scale-95 transition-all duration-300",
              "focus:ring-2 focus:ring-brand-green/40 focus:ring-offset-2 focus:outline-none",
              "hover:border-brand-green/60 hover:shadow-lg hover:shadow-brand-green/20"
            )}
            onClick={() => {
              setShowOptions(!showOptions);
              vibrate(50);
            }}
            title="Opções de tempo (pressione ↑ ou ↓ para navegar)"
            aria-label="Opções de tempo"
            aria-expanded={showOptions}
            aria-haspopup="true"
            onFocus={() => setFocusedElement('options')}
            onBlur={() => setFocusedElement(null)}
            onKeyDown={(e) => handleKeyDown(e, 'timer')}
          >
            <span 
              className={cn(
                "text-xl leading-none transition-all duration-500",
                status === "running" && "animate-bounce-subtle"
              )}
              style={{
                transform: `scale(${1 + iconSpring * 0.1})`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {currentTimer.icon}
            </span>
          </Button>

          {/* Timer Options Dropdown com animações suaves */}
          <div 
            className={cn(
              "absolute top-full left-0 mt-1 z-50 min-w-[160px] rounded-xl border border-border-subtle/60 bg-bg-secondary/95 p-2 shadow-xl backdrop-blur",
              "transition-all duration-300 ease-out",
              showOptions 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
            )}
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
                  "transition-all duration-200 hover:scale-105 active:scale-95",
                  index === selectedTime && [
                    "bg-emerald-400/10 text-emerald-300 border border-emerald-400/30",
                    "shadow-md shadow-emerald-400/20"
                  ],
                  index === focusedElement && "ring-2 ring-brand-green/60 ring-offset-2 ring-offset-bg-secondary"
                )}
                onClick={() => handleTimerSelect(index)}
                role="menuitem"
                aria-selected={index === selectedTime}
                onFocus={() => setFocusedElement(`option-${index}`)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const direction = e.key === 'ArrowDown' ? 1 : -1;
                    const nextIndex = (index + direction + TIMER_OPTIONS.length) % TIMER_OPTIONS.length;
                    const nextButton = document.querySelector(`[data-option-index="${nextIndex}"]`) as HTMLElement;
                    nextButton?.focus();
                  }
                }}
                data-option-index={index}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex h-7 w-7 items-center justify-center text-lg bg-transparent">
                    <span className="text-lg leading-none transition-transform duration-200 hover:scale-110">
                      {option.icon}
                    </span>
                  </div>
                  <span className="flex-1 text-left">{option.label}</span>
                  <span className="text-text-muted text-xs ml-auto">
                    {Math.floor(option.seconds / 60)}min
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Timer Display com animações spring */}
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 36 36" className="h-12 w-12" aria-hidden="true">
            <path
              className="text-border-subtle"
              strokeWidth="5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
              opacity={0.35}
            />
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
                transition: 'stroke-dashoffset 0.5s ease-in-out, filter 0.3s ease-in-out'
              }}
            />
            {status === "running" && (
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke={getProgressNeonColor(currentTimer.color)}
                strokeWidth="1"
                opacity={0.4}
                style={{
                  filter: `blur(1px)`,
                  animation: "pulse-glow 2s ease-in-out infinite alternate"
                }}
              />
            )}
          </svg>
          
          <span 
            className={cn(
              "absolute inset-0 flex items-center justify-center text-xs font-semibold transition-colors duration-300",
              getHighContrastColor(
                status === "running" ? "text-emerald-400" : "text-text-primary"
              ),
              status === "finished" && "text-yellow-300"
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            {formatSeconds(countdown.seconds)}
          </span>
        </div>

        {/* Timer Info com micro-interações */}
        <div className="flex flex-col gap-2 text-xs text-text-secondary">
          <div className="flex items-center justify-center w-full">
            <Badge 
              variant="outline" 
              className={cn(
                "text-[8px] px-2 py-0.5 text-center border shadow-sm bg-transparent",
                "whitespace-nowrap min-w-max transition-all duration-300",
                "hover:scale-105 active:scale-95",
                getNeonColor(currentTimer.color),
                getHighContrastColor("text-text-primary")
              )}
            >
              {currentTimer.label}
            </Badge>
          </div>
          
          <div className="flex gap-1 justify-center">
            <Button 
              size="sm" 
              onClick={() => {
                countdown.toggle();
                announceToScreenReader(status === "running" ? "Timer pausado" : "Timer iniciado");
                vibrate(50);
              }}
              className={cn(
                "h-5 px-1.5 text-[8px] text-center transition-all duration-300 focus:ring-2 focus:ring-brand-green/40",
                "bg-bg-tertiary/60 hover:bg-bg-tertiary/80 border border-border-subtle/50",
                "hover:scale-105 active:scale-95 hover:shadow-md",
                status === "running" 
                  ? getHighContrastColor("text-emerald-400") + " border-emerald-400/50 hover:bg-emerald-400/10" 
                  : getHighContrastColor("text-text-primary") + " hover:border-brand-green/60"
              )}
              aria-label={status === "running" ? "Pausar timer (barra de espaço)" : "Iniciar timer (barra de espaço)"}
              aria-keyshortcuts="Space Enter"
              onFocus={() => setFocusedElement('play-pause')}
              onKeyDown={(e) => handleKeyDown(e, 'timer')}
            >
              {status === "running" ? "Pausar" : "Iniciar"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                countdown.reset();
                setSelectedTime(0);
                announceToScreenReader("Timer resetado para Pitch");
                vibrate(150);
              }}
              className="h-5 px-1.5 text-[8px] text-center bg-bg-tertiary/60 hover:bg-bg-tertiary/80 border border-border-subtle/50 hover:border-brand-green/60 focus:ring-2 focus:ring-brand-green/40 transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Resetar timer (R)"
              aria-keyshortcuts="R"
              onFocus={() => setFocusedElement('reset')}
              onKeyDown={(e) => handleKeyDown(e, 'timer')}
            >
              Reset
            </Button>
          </div>
          
          {status === "running" && (
            <div className="flex items-center justify-center gap-1">
              <div className={cn(
                "h-1 w-1 rounded-full animate-pulse shadow-sm",
                "bg-emerald-300 shadow-emerald-300/50"
              )} />
              <span className={cn(
                "text-[8px] font-medium",
                getHighContrastColor("text-emerald-400")
              )}>
                ativo
              </span>
            </div>
          )}
          
          {status === "finished" && (
            <div className="flex items-center justify-center gap-1">
              <div className={cn(
                "h-1 w-1 rounded-full animate-pulse shadow-sm",
                "bg-yellow-300 shadow-yellow-300/50"
              )} />
              <span className={cn(
                "text-[8px] font-medium",
                getHighContrastColor("text-yellow-400")
              )}>
                pronto!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Settings Bar com animações sofisticadas */}
      <div className={cn(
        "mt-1 flex items-center justify-between rounded-b-xl border-x border-b border-border-subtle/60 bg-bg-tertiary/40 px-3 py-1.5",
        "transition-all duration-300 ease-out",
        showOptions ? "rounded-tr-none" : ""
      )}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-5 w-5 p-0 text-[10px] bg-transparent hover:bg-transparent transition-all duration-300 focus:ring-2 focus:ring-brand-green/40",
              "hover:scale-110 active:scale-95",
              notifications ? "text-blue-300" : "text-text-muted hover:text-blue-300"
            )}
            onClick={() => {
              requestNotificationPermission();
            }}
            title={notifications ? "Notificações ativas - clique para desativar" : "Ativar notificações"}
            aria-label={notifications ? "Desativar notificações" : "Ativar notificações"}
            aria-pressed={notifications}
            onFocus={() => setFocusedElement('notifications')}
          >
            <span 
              className={cn(
                "transition-transform duration-300",
                notifications && "scale-110"
              )}
            >
              {notifications ? "🔔" : "🔕"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-5 w-5 p-0 text-[10px] bg-transparent hover:bg-transparent transition-all duration-300 focus:ring-2 focus:ring-brand-green/40",
              "hover:scale-110 active:scale-95",
              soundEnabled ? "text-emerald-300" : "text-text-muted hover:text-emerald-300"
            )}
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              vibrate(50);
              announceToScreenReader(soundEnabled ? "Som desativado" : "Som ativado");
            }}
            title={soundEnabled ? "Som ativado - clique para desativar" : "Ativar som"}
            aria-label={soundEnabled ? "Desativar som" : "Ativar som"}
            aria-pressed={soundEnabled}
            onFocus={() => setFocusedElement('sound')}
          >
            <span 
              className={cn(
                "transition-transform duration-300",
                soundEnabled && "scale-110"
              )}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </span>
          </Button>
        </div>
        
        <div className={cn(
          "text-[10px] transition-colors duration-300",
          getHighContrastColor("text-text-muted")
        )}>
          {Math.round(progress * 100)}% completo
        </div>
      </div>

      {/* Skip link para acessibilidade */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-green text-white px-4 py-2 rounded-lg z-50"
        onFocus={() => announceToScreenReader("Navegando para o conteúdo principal")}
      >
        Pular para conteúdo principal
      </a>
    </div>
  );
}
