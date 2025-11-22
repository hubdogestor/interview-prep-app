import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface FormErrorProps {
  error?: string;
  className?: string;
}

/**
 * Enhanced form error message component
 * Shows validation errors with icon
 */
export function FormError({ error, className }: FormErrorProps) {
  if (!error) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-2 text-sm text-destructive mt-1.5",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="size-4 mt-0.5 shrink-0" />
      <span>{error}</span>
    </div>
  );
}
