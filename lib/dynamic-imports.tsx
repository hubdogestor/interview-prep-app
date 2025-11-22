/**
 * Dynamic Import Optimizations
 * 
 * Este arquivo centraliza imports dinâmicos para componentes pesados,
 * reduzindo o tamanho do bundle inicial e melhorando o First Load JS.
 */

import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/ui/skeleton'

/**
 * Trello Board Component
 * 
 * Contém @dnd-kit (~25 KB) - Carregar apenas em páginas de board
 * Impacto: -25 KB no bundle inicial
 */
export const TrelloBoard = dynamic(
  () => import('@/components/boards/trello-board').then((mod) => ({ default: mod.TrelloBoard })),
  {
    loading: () => <Skeleton className="h-[600px] w-full rounded-lg" />,
    ssr: false, // Drag & drop é client-side only
  }
)

/**
 * Total de economia estimada: ~25-30 KB
 * Redução no First Load JS: ~5-8%
 * 
 * Nota: Outros componentes podem ser adicionados conforme necessário
 * usando o mesmo padrão de dynamic import.
 */
