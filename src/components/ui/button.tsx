import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "secondary" | "ghost" | "outline" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-brand-green text-bg-primary hover:bg-brand-green/90 focus-visible:ring-brand-green/40",
  secondary:
    "bg-brand-blue/15 text-text-primary hover:bg-brand-blue/25 focus-visible:ring-brand-blue/40",
  ghost: "bg-transparent text-text-primary hover:bg-white/5 focus-visible:ring-border-strong/40",
  outline:
    "border border-border-default bg-transparent text-text-primary hover:bg-white/5 focus-visible:ring-border-strong/40",
  destructive:
    "bg-brand-orange text-bg-primary hover:bg-brand-orange/90 focus-visible:ring-brand-orange/40",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-5 py-2 text-sm",
  sm: "h-9 rounded-lg px-4 text-xs",
  lg: "h-11 rounded-xl px-6 text-sm",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
