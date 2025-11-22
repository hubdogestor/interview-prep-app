import Image from "next/image";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
  };
  illustration?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  illustration,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn("p-12", className)}>
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
        {/* Icon or Illustration */}
        {illustration ? (
          <div className="w-full max-w-xs relative h-48">
            <Image
              src={illustration}
              alt="Empty state illustration"
              fill
              className="object-contain opacity-50 dark:opacity-30"
            />
          </div>
        ) : (
          <div className="size-20 rounded-full bg-muted flex items-center justify-center">
            <Icon className="size-10 text-muted-foreground/50" />
          </div>
        )}

        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-2xl font-display uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        </div>

        {/* Action Button */}
        {action && action.href && (
          <div className="pt-4">
            <Button asChild size="lg">
              <Link href={action.href}>{action.label}</Link>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
