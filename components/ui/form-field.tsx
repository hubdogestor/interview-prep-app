"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  success?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Enhanced form field wrapper with label, hints, and validation states
 */
export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  success,
  children,
  className,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors",
          isFocused && !error && "text-primary",
          error && "text-destructive"
        )}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      <div
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "relative",
          error && "animate-shake"
        )}
      >
        {children}
      </div>

      {hint && !error && !success && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}

      {error && (
        <div
          className="flex items-start gap-2 text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          <span>{error}</span>
        </div>
      )}

      {success && !error && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="size-4" />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
}
