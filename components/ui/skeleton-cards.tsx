/**
 * Skeleton Loading Cards
 *
 * Componentes de skeleton para cada tipo de conteúdo,
 * proporcionando feedback visual durante carregamento.
 */

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

/**
 * Skeleton para Icebreaker Card
 */
export function IcebreakerCardSkeleton() {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-32" /> {/* Badge tipo */}
          <Skeleton className="h-6 w-3/4" /> {/* Título */}
        </div>
        <Skeleton className="h-8 w-8 rounded-full" /> {/* Favorite icon */}
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" /> {/* Tag */}
        <Skeleton className="h-6 w-24" /> {/* Tag */}
        <Skeleton className="h-6 w-16" /> {/* Tag */}
      </div>

      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 flex-1" /> {/* Button */}
        <Skeleton className="h-9 w-24" /> {/* Practice */}
      </div>
    </Card>
  );
}

/**
 * Skeleton para Speech Card
 */
export function SpeechCardSkeleton() {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-24" /> {/* Tipo vaga */}
          <Skeleton className="h-6 w-2/3" /> {/* Título */}
        </div>
        <Skeleton className="h-8 w-8 rounded-full" /> {/* Favorite */}
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Skeleton className="h-4 w-20" /> {/* Duração */}
        <Skeleton className="h-4 w-16" /> {/* Versão */}
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1" /> {/* Edit */}
        <Skeleton className="h-9 w-28" /> {/* Practice */}
      </div>
    </Card>
  );
}

/**
 * Skeleton para Competência Card
 */
export function CompetenciaCardSkeleton() {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20" /> {/* Categoria badge */}
            <Skeleton className="h-5 w-24" /> {/* Nível badge */}
          </div>
          <Skeleton className="h-7 w-2/3" /> {/* Nome */}
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-24" /> {/* Ferramentas label */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-18" />
          <Skeleton className="h-6 w-22" />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 flex-1" /> {/* Edit */}
        <Skeleton className="h-9 w-9" /> {/* Delete */}
      </div>
    </Card>
  );
}

/**
 * Skeleton para Experiência Card
 */
export function ExperienciaCardSkeleton() {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-7 w-48" /> {/* Empresa */}
          <Skeleton className="h-5 w-36" /> {/* Cargo */}
          <Skeleton className="h-4 w-32" /> {/* Período */}
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-20" /> {/* Elevator pitch label */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-28" /> {/* STAR cases label */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5 w-16" /> {/* Tech tag */}
        <Skeleton className="h-5 w-20" /> {/* Tech tag */}
        <Skeleton className="h-5 w-18" /> {/* Tech tag */}
      </div>

      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 flex-1" /> {/* View */}
        <Skeleton className="h-9 w-9" /> {/* Edit */}
      </div>
    </Card>
  );
}

/**
 * Skeleton para Question Item (accordion)
 */
export function QuestionItemSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" /> {/* Categoria badge */}
            <Skeleton className="h-5 w-16" /> {/* Prioridade badge */}
          </div>
          <Skeleton className="h-5 w-4/5" /> {/* Pergunta */}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Favorite */}
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Delete */}
        </div>
      </div>
    </div>
  );
}

/**
 * Grid de Skeleton Cards
 * Wrapper para mostrar múltiplos skeletons em grid
 */
interface SkeletonGridProps {
  count?: number;
  columns?: "1" | "2" | "3";
  type: "icebreaker" | "speech" | "competencia" | "experiencia" | "question";
}

export function SkeletonGrid({ count = 4, columns = "2", type }: SkeletonGridProps) {
  const SkeletonComponent = {
    icebreaker: IcebreakerCardSkeleton,
    speech: SpeechCardSkeleton,
    competencia: CompetenciaCardSkeleton,
    experiencia: ExperienciaCardSkeleton,
    question: QuestionItemSkeleton,
  }[type];

  const gridCols = {
    "1": "grid-cols-1",
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
