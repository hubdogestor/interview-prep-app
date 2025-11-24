"use client";

import { useEffect, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

interface CountdownProps {
  targetDate: string;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate);

    const interval = setInterval(() => {
      const now = new Date();
      if (now >= target) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: differenceInDays(target, now),
        hours: differenceInHours(target, now) % 24,
        minutes: differenceInMinutes(target, now) % 60,
        seconds: differenceInSeconds(target, now) % 60,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      <div className="flex flex-col">
        <span className="text-4xl font-bold font-mono">{timeLeft.days}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Days</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl font-bold font-mono">{timeLeft.hours}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Hours</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl font-bold font-mono">{timeLeft.minutes}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Mins</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl font-bold font-mono">{timeLeft.seconds}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Secs</span>
      </div>
    </div>
  );
}
