"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ContextualLoadingProps {
  messages: string[];
  cycleDuration?: number;
}

export function ContextualLoading({
  messages,
  cycleDuration = 2000,
}: ContextualLoadingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [messages.length, cycleDuration]);

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-chart-1" />
      <p className="text-sm text-muted-foreground uppercase text-center animate-pulse">
        {messages[currentIndex]}
      </p>
    </div>
  );
}
