"use client";

import { useMemo } from "react";

interface TextStatsProps {
  text: string;
  wordsPerMinute?: number;
  showCharCount?: boolean;
  showWordCount?: boolean;
  showReadTime?: boolean;
  className?: string;
}

export function TextStats({
  text,
  wordsPerMinute = 150,
  showCharCount = true,
  showWordCount = true,
  showReadTime = true,
  className = "",
}: TextStatsProps) {
  const stats = useMemo(() => {
    const charCount = text.length;
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    const readTimeSeconds = Math.ceil((wordCount / wordsPerMinute) * 60);

    return {
      charCount,
      wordCount,
      readTimeMinutes,
      readTimeSeconds,
    };
  }, [text, wordsPerMinute]);

  const parts: string[] = [];

  if (showCharCount) {
    parts.push(`${stats.charCount} caracteres`);
  }

  if (showWordCount) {
    parts.push(`${stats.wordCount} palavras`);
  }

  if (showReadTime && stats.wordCount > 0) {
    if (stats.readTimeSeconds < 60) {
      parts.push(`~${stats.readTimeSeconds}s de leitura`);
    } else {
      parts.push(
        `~${stats.readTimeMinutes} min${stats.readTimeMinutes > 1 ? "" : ""} de leitura`
      );
    }
  }

  if (parts.length === 0) return null;

  return (
    <div
      className={`text-xs text-muted-foreground uppercase flex items-center gap-2 ${className}`}
    >
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-1">•</span>}
          {part}
        </span>
      ))}
    </div>
  );
}
