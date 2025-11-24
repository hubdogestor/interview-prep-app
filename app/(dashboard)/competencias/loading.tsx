import { CompetenciaCardSkeleton } from "@/components/loading/card-skeletons";

export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded" />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <CompetenciaCardSkeleton />
        <CompetenciaCardSkeleton />
        <CompetenciaCardSkeleton />
        <CompetenciaCardSkeleton />
      </div>
    </div>
  );
}
