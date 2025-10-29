import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const skeletonClasses =
  "animate-pulse rounded-xl bg-bg-tertiary/60 border border-border-subtle/60 shadow-sm shadow-black/20";

export function ProfileCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border-subtle/60 bg-bg-secondary/80 backdrop-blur">
      <CardHeader className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className={cn("h-20 w-20", skeletonClasses)} />
          <div className="space-y-3">
            <div className={cn("h-3 w-32", skeletonClasses)} />
            <div className={cn("h-3 w-44", skeletonClasses)} />
          </div>
        </div>
        <div className={cn("h-3 w-32", skeletonClasses)} />
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className={cn("h-3 w-full", skeletonClasses)} />
          <div className={cn("h-3 w-3/4", skeletonClasses)} />
          <div className="flex flex-wrap gap-2">
            <div className={cn("h-8 w-24", skeletonClasses)} />
            <div className={cn("h-8 w-20", skeletonClasses)} />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className={cn("h-16 w-full", skeletonClasses)} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
