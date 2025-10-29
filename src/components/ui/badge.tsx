import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-brand-blue/20 text-brand-blue",
  success: "bg-brand-green/20 text-brand-green",
  warning: "bg-brand-yellow/20 text-brand-yellow",
  outline: "border border-border-default text-text-primary",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge };
