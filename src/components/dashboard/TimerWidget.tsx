"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCountdown } from "./hooks";

const TIMER_DEFAULT_SECONDS = 25 * 60;

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
  const countdown = useCountdown();
  const progress = useMemo(() => 1 - countdown.seconds / TIMER_DEFAULT_SECONDS, [countdown.seconds]);

  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-tertiary/60 p-3", className)}>
      <div className="relative h-12 w-12">
        <svg viewBox="0 0 36 36" className="h-12 w-12">
          <path
            className="text-border-subtle"
            strokeWidth="3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
            opacity={0.35}
          />
          <path
            className="text-brand-green"
            strokeWidth="3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
            strokeDasharray={100}
            strokeDashoffset={100 - Math.floor(progress * 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-text-primary">
          {formatSeconds(countdown.seconds)}
        </span>
      </div>
      <div className="flex flex-col gap-2 text-xs text-text-secondary">
        <div className="flex gap-2">
          <Button size="sm" onClick={countdown.toggle}>
            {countdown.running ? "Pausar" : "Iniciar"}
          </Button>
          <Button variant="ghost" size="sm" onClick={countdown.reset}>
            Resetar
          </Button>
        </div>
      </div>
    </div>
  );
}
