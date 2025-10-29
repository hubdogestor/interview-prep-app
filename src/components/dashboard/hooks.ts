"use client";

import { useEffect, useState } from "react";

const TIMER_DEFAULT_SECONDS = 25 * 60;

type CountdownControls = {
  seconds: number;
  running: boolean;
  toggle: () => void;
  reset: () => void;
};

export function useCountdown(initialSeconds: number = TIMER_DEFAULT_SECONDS): CountdownControls {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [running]);

  const toggle = () => setRunning((prev) => !prev);
  const reset = () => {
    setSeconds(initialSeconds);
    setRunning(false);
  };

  return { seconds, running, toggle, reset };
}

export function useLanguage() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const handleToggle = () => setLanguage((prev) => (prev === "pt" ? "en" : "pt"));

  return { language, toggleLanguage: handleToggle };
}
