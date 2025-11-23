"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Edit3, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { SortableItem } from "@/components/ui/sortable-item"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { BoardCard, BoardColumn } from "@/types/boards"

interface TrelloBoardProps {
  initialColumns: BoardColumn[]
  addCardLabel?: string
  className?: string
  onColumnsChange?: (columns: BoardColumn[]) => void
}

type DraftState = Record<
  string,
  {
    title: string
    description: string
    owner: string
    dueDate: string
    metric: string
    items: KrEntry[]
  }
>

type KrEntry = {
  description: string
  metric: string
}

type CardFormState = {
  title: string
  description: string
  owner: string
  dueDate: string
  metric: string
  krs: KrEntry[]
}

const KR_PRESET_COUNT = 3
const KR_MAX_COUNT = 6

export function TrelloBoard({ initialColumns, addCardLabel = "Adicionar card", className, onColumnsChange }: TrelloBoardProps) {
  const [columns, setColumns] = useState<BoardColumn[]>(() => cloneColumns(initialColumns))
  const [activeCard, setActiveCard] = useState<BoardCard | null>(null)
  const [composerColumn, setComposerColumn] = useState<string | null>(null)
  const [drafts, setDrafts] = useState<DraftState>({})
  const [editingCard, setEditingCard] = useState<{
    columnId: string
    cardId: string
    form: CardFormState
  } | null>(null)

  useEffect(() => {
    setColumns(cloneColumns(initialColumns))
  }, [initialColumns])

  // Notificar parent quando colunas mudarem
  useEffect(() => {
    onColumnsChange?.(columns)
  }, [columns, onColumnsChange])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const cardId = String(event.active.id)
    const location = findCardLocation(columns, cardId)
    if (!location) return

    const card = columns[location.columnIndex].cards[location.cardIndex]
    setActiveCard(card ?? null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    const activeContainer = active.data.current?.sortable?.containerId as string | undefined
    const overContainer =
      (over.data.current?.sortable?.containerId as string | undefined) ?? String(over.id)

    if (!activeContainer || !overContainer) return

    if (activeContainer === overContainer) {
      setColumns((prev) => reorderWithinColumn(prev, activeContainer, activeId, overId))
    } else {
      setColumns((prev) => moveBetweenColumns(prev, activeContainer, overContainer, activeId, overId))
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeContainer = active.data.current?.sortable?.containerId as string | undefined
    const overContainer =
      (over.data.current?.sortable?.containerId as string | undefined) ?? String(over.id)

    if (!activeContainer || !overContainer || activeContainer === overContainer) return

    const activeId = String(active.id)
    const overId = String(over.id)

    setColumns((prev) => moveBetweenColumns(prev, activeContainer, overContainer, activeId, overId))
  }

  const handleDragCancel = () => setActiveCard(null)

  const handleDraftChange = (
    columnId: string,
    field: "title" | "description" | "owner" | "dueDate" | "metric",
    value: string,
  ) => {
    setDrafts((prev) => ({
      ...prev,
      [columnId]: {
        title: field === "title" ? value : prev[columnId]?.title ?? "",
        description: field === "description" ? value : prev[columnId]?.description ?? "",
        owner: field === "owner" ? value : prev[columnId]?.owner ?? "",
        dueDate: field === "dueDate" ? value : prev[columnId]?.dueDate ?? "",
        metric: field === "metric" ? value : prev[columnId]?.metric ?? "",
        items: prev[columnId]?.items ?? createEmptyKrEntries(),
      },
    }))
  }

  const resetDraft = (columnId: string) => {
    setDrafts((prev) => ({
      ...prev,
      [columnId]: {
        title: "",
        description: "",
        owner: "",
        dueDate: "",
        metric: "",
        items: createEmptyKrEntries(),
      },
    }))
  }

  const handleDraftKrChange = (
    columnId: string,
    index: number,
    field: "description" | "metric",
    value: string,
  ) => {
    setDrafts((prev) => {
      const current = prev[columnId] ?? {
        title: "",
        description: "",
        owner: "",
        dueDate: "",
        metric: "",
        items: createEmptyKrEntries(),
      }

      const items = ensureKrSlots(current.items)
      const nextItems = items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      )

      return {
        ...prev,
        [columnId]: {
          ...current,
          items: nextItems,
        },
      }
    })
  }

  const addDraftKrRow = (columnId: string) => {
    setDrafts((prev) => {
      const current = prev[columnId]
      const base: KrEntry[] = current?.items ?? createEmptyKrEntries()
      if (base.length >= KR_MAX_COUNT) return prev
      return {
        ...prev,
        [columnId]: {
          ...(current ?? {
            title: "",
            description: "",
            owner: "",
            dueDate: "",
            metric: "",
          }),
          items: [...ensureKrSlots(base), { description: "", metric: "" }],
        },
      }
    })
  }

  const handleCreateCard = (columnId: string) => {
    const draft = drafts[columnId]
    if (!draft?.title?.trim()) return
    const normalizedItems = normalizeKrs(ensureKrSlots(draft.items))

    const newCard: BoardCard = {
      id: generateCardId(),
      title: draft.title.trim(),
      description: draft.description?.trim(),
      owner: draft.owner.trim() || undefined,
      dueDate: draft.dueDate.trim() || undefined,
      metric: draft.metric.trim() || undefined,
      items: normalizedItems.length ? normalizedItems : undefined,
      chips: [
        { label: "Novo", colorClass: "bg-primary/15 text-primary border-primary/20" },
        { label: "OKR", colorClass: "bg-amber-500/15 text-amber-100 border-transparent" },
      ],
      meta: new Date().toLocaleDateString("pt-BR"),
    }

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId ? { ...column, cards: [...column.cards, newCard] } : column,
      ),
    )

    resetDraft(columnId)
    setComposerColumn(null)
  }

  const startEditingCard = (columnId: string, card: BoardCard) => {
    setEditingCard({
      columnId,
      cardId: card.id,
      form: {
        title: card.title,
        description: card.description ?? "",
        owner: card.owner ?? "",
        dueDate: card.dueDate ?? "",
        metric: card.metric ?? "",
        krs: ensureKrSlots(parseItemsToKrs(card.items ?? [])),
      },
    })
  }

  const handleEditChange = (field: keyof CardFormState, value: string) => {
    setEditingCard((prev) => (prev ? { ...prev, form: { ...prev.form, [field]: value } } : prev))
  }

  const handleEditKrChange = (index: number, field: "description" | "metric", value: string) => {
    setEditingCard((prev) => {
      if (!prev) return prev
      const updated = prev.form.krs.map((kr, i) => (i === index ? { ...kr, [field]: value } : kr))
      return { ...prev, form: { ...prev.form, krs: updated } }
    })
  }

  const addEditKrRow = () => {
    setEditingCard((prev) => {
      if (!prev) return prev
      if (prev.form.krs.length >= KR_MAX_COUNT) return prev
      return { ...prev, form: { ...prev.form, krs: [...prev.form.krs, { description: "", metric: "" }] } }
    })
  }

  const handleSaveEdit = () => {
    if (!editingCard) return

    const normalizedKrs = normalizeKrs(editingCard.form.krs)

    setColumns((prev) =>
      prev.map((column) => {
        if (column.id !== editingCard.columnId) return column
        return {
          ...column,
          cards: column.cards.map((card) =>
            card.id === editingCard.cardId
              ? {
                  ...card,
                  title: editingCard.form.title,
                  description: editingCard.form.description || undefined,
                  owner: editingCard.form.owner || undefined,
                  dueDate: editingCard.form.dueDate || undefined,
                  metric: editingCard.form.metric || undefined,
                  items: normalizedKrs.length ? normalizedKrs : undefined,
                }
              : card,
          ),
        }
      }),
    )

    setEditingCard(null)
  }

  const closeEditDialog = () => setEditingCard(null)

  return (
    <div className={cn("space-y-6", className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <BoardColumnCard
              key={column.id}
              column={column}
              isComposerOpen={composerColumn === column.id}
              addCardLabel={addCardLabel}
              onOpenComposer={() => setComposerColumn(column.id)}
              onCloseComposer={() => {
                resetDraft(column.id)
                setComposerColumn(null)
              }}
              draft={
                drafts[column.id] ?? {
                  title: "",
                  description: "",
                  owner: "",
                  dueDate: "",
                  metric: "",
                  items: createEmptyKrEntries(),
                }
              }
              onDraftChange={handleDraftChange}
              onDraftKrChange={handleDraftKrChange}
              onAddDraftKr={() => addDraftKrRow(column.id)}
              onSaveCard={() => handleCreateCard(column.id)}
            >
              <SortableContext
                id={column.id}
                items={column.cards.map((card) => card.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {column.cards.map((card) => (
                    <SortableItem id={card.id} key={card.id}>
                      <BoardCardItem card={card} onEdit={() => startEditingCard(column.id, card)} />
                    </SortableItem>
                  ))}
                  {column.cards.length === 0 && (
                    <div className="rounded-xl border border-dashed border-white/10 bg-background/40 p-4 text-center text-sm text-muted-foreground">
                      Arraste cards para cá
                    </div>
                  )}
                </div>
              </SortableContext>
            </BoardColumnCard>
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="max-w-[320px]">
              <BoardCardItem card={activeCard} isOverlay />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <Dialog
        open={Boolean(editingCard)}
        onOpenChange={(open) => {
          if (!open) {
            closeEditDialog()
          }
        }}
      >
        <DialogContent className="bg-background/95">
          <DialogHeader>
            <DialogTitle>Editar card</DialogTitle>
            <DialogDescription>
              Ajuste título, descrição, responsáveis e KRs. As mudanças são locais para esta sessão.
            </DialogDescription>
          </DialogHeader>
          {editingCard && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="card-title">Título</Label>
                <Input
                  id="card-title"
                  value={editingCard.form.title}
                  onChange={(event) => handleEditChange("title", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-description">Descrição</Label>
                <Textarea
                  id="card-description"
                  rows={4}
                  value={editingCard.form.description}
                  onChange={(event) => handleEditChange("description", event.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="card-owner">Responsável</Label>
                  <Input
                    id="card-owner"
                    value={editingCard.form.owner}
                    onChange={(event) => handleEditChange("owner", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-due">Entrega</Label>
                  <Input
                    id="card-due"
                    value={editingCard.form.dueDate}
                    onChange={(event) => handleEditChange("dueDate", event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-metric">Métrica/Meta</Label>
                <Input
                  id="card-metric"
                  value={editingCard.form.metric}
                  onChange={(event) => handleEditChange("metric", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>KRs</Label>
                {ensureKrSlots(editingCard.form.krs).map((kr, index) => (
                  <div key={`edit-kr-${index}`} className="grid gap-2 md:grid-cols-2">
                    <Input
                      placeholder={`KR${index + 1} - descrição`}
                      value={kr.description}
                      onChange={(event) => handleEditKrChange(index, "description", event.target.value)}
                    />
                    <Input
                      placeholder="Métrica/resultado"
                      value={kr.metric}
                      onChange={(event) => handleEditKrChange(index, "metric", event.target.value)}
                    />
                  </div>
                ))}
                {editingCard.form.krs.length < KR_MAX_COUNT && (
                  <Button type="button" variant="secondary" size="sm" onClick={addEditKrRow}>
                    Adicionar KR extra
                  </Button>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={closeEditDialog}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editingCard?.form.title.trim()}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface BoardColumnCardProps {
  column: BoardColumn
  children: ReactNode
  isComposerOpen: boolean
  addCardLabel: string
  onOpenComposer: () => void
  onCloseComposer: () => void
  onSaveCard: () => void
  draft: {
    title: string
    description: string
    owner: string
    dueDate: string
    metric: string
    items: KrEntry[]
  }
  onDraftChange: (
    columnId: string,
    field: "title" | "description" | "owner" | "dueDate" | "metric",
    value: string,
  ) => void
  onDraftKrChange: (columnId: string, index: number, field: "description" | "metric", value: string) => void
  onAddDraftKr: () => void
}

function BoardColumnCard({
  column,
  children,
  isComposerOpen,
  addCardLabel,
  onOpenComposer,
  onCloseComposer,
  onSaveCard,
  draft,
  onDraftChange,
  onDraftKrChange,
  onAddDraftKr,
}: BoardColumnCardProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-w-[280px] max-w-[320px] flex-1 flex-col gap-4 rounded-3xl border border-white/5 bg-gradient-to-b from-background/80 via-background/70 to-background/90 p-5 shadow-2xl shadow-black/20 backdrop-blur",
        isOver && "ring-1 ring-primary/40",
      )}
    >
      <div className="space-y-1">
        <div className="text-center">
          {column.subtitle && (
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">{column.subtitle}</p>
          )}
          <h3 className="text-2xl font-display tracking-[0.1em]">{column.title}</h3>
        </div>
        {column.accentColor && <div className={cn("h-1 rounded-full bg-gradient-to-r", column.accentColor)} />}
      </div>

      <div className="flex-1 overflow-visible">{children}</div>

      <div className="rounded-2xl border border-dashed border-white/10 bg-background/40 p-3">
        {isComposerOpen ? (
          <div className="space-y-2">
            <Input
              placeholder="Título do card"
              value={draft.title}
              onChange={(event) => onDraftChange(column.id, "title", event.target.value)}
              className="bg-background/40"
            />
            <Textarea
              placeholder="Detalhes rápidos (opcional)"
              value={draft.description}
              onChange={(event) => onDraftChange(column.id, "description", event.target.value)}
              className="bg-background/40"
              rows={3}
            />
            <div className="grid gap-2 md:grid-cols-2">
              <Input
                placeholder="Responsável"
                value={draft.owner}
                onChange={(event) => onDraftChange(column.id, "owner", event.target.value)}
                className="bg-background/40"
              />
              <Input
                placeholder="Entrega (ex: Mar/26)"
                value={draft.dueDate}
                onChange={(event) => onDraftChange(column.id, "dueDate", event.target.value)}
                className="bg-background/40"
              />
            </div>
            <Input
              placeholder="Métrica/Meta (ex: +3 hubs)"
              value={draft.metric}
              onChange={(event) => onDraftChange(column.id, "metric", event.target.value)}
              className="bg-background/40"
            />
            <div className="space-y-2">
              {ensureKrSlots(draft.items).map((kr, index) => (
                <div key={`${column.id}-kr-${index}`} className="grid gap-2 md:grid-cols-2">
                  <Input
                    placeholder={`KR${index + 1} - descrição`}
                    value={kr.description}
                    onChange={(event) => onDraftKrChange(column.id, index, "description", event.target.value)}
                    className="bg-background/40"
                  />
                  <Input
                    placeholder="Métrica/resultado"
                    value={kr.metric}
                    onChange={(event) => onDraftKrChange(column.id, index, "metric", event.target.value)}
                    className="bg-background/40"
                  />
                </div>
              ))}
              {ensureKrSlots(draft.items).length < KR_MAX_COUNT && (
                <Button type="button" variant="secondary" size="sm" onClick={onAddDraftKr}>
                  Adicionar KR extra
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={onSaveCard}>
                Salvar
              </Button>
              <Button size="sm" variant="ghost" onClick={onCloseComposer}>
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={onOpenComposer}>
            <Plus className="h-4 w-4" />
            {addCardLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

interface BoardCardItemProps {
  card: BoardCard
  isOverlay?: boolean
  onEdit?: () => void
}

function BoardCardItem({ card, isOverlay = false, onEdit }: BoardCardItemProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/5 bg-background/80 p-4 shadow-lg shadow-black/15",
        isOverlay && "scale-[1.02] border-primary/30",
      )}
    >
      <div className="flex items-start gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {card.chips?.map((chip) => (
            <Badge
              key={`${card.id}-${chip.label}`}
              variant="outline"
              className={cn("text-[10px] uppercase tracking-widest", chip.colorClass)}
            >
              {chip.label}
            </Badge>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {card.metric && (
            <span className="text-[11px] font-mono uppercase text-muted-foreground">{card.metric}</span>
          )}
          {onEdit && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7 rounded-full text-muted-foreground hover:text-foreground"
              onClick={(event) => {
                event.stopPropagation()
                onEdit()
              }}
            >
              <Edit3 className="h-4 w-4" />
              <span className="sr-only">Editar card</span>
            </Button>
          )}
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <p className="text-base font-semibold leading-snug">{card.title}</p>
        {card.description && <p className="text-sm text-muted-foreground">{card.description}</p>}
        {card.items && (
          <ul className="space-y-1 text-sm text-muted-foreground">
            {card.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/70" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {(card.progress || card.progress === 0) && (
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Status</span>
            <span className="font-mono">{`${card.progress}%`}</span>
          </div>
          <Progress value={card.progress} className="h-1.5 bg-white/10" />
        </div>
      )}
      {(card.owner || card.dueDate || card.meta) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {card.owner && (
            <span className="font-medium uppercase text-foreground/80">
              {card.ownerLabel ? `${card.ownerLabel}: ` : ""}
              {card.owner}
            </span>
          )}
          {card.dueDate && <span>Entrega: {card.dueDate}</span>}
          {card.meta && <span>{card.meta}</span>}
        </div>
      )}
      {card.highlight && (
        <div className="mt-3 rounded-xl bg-primary/10 p-2 text-[13px] text-primary">{card.highlight}</div>
      )}
    </div>
  )
}

function cloneColumns(columns: BoardColumn[]): BoardColumn[] {
  return columns.map((column) => ({
    ...column,
    cards: column.cards.map((card) => ({ ...card })),
  }))
}

function createEmptyKrEntries(count = KR_PRESET_COUNT): KrEntry[] {
  return Array.from({ length: count }, () => ({ description: "", metric: "" }))
}

function ensureKrSlots(items: KrEntry[] = [], count = KR_PRESET_COUNT): KrEntry[] {
  if (items.length >= count) return items
  return [...items, ...createEmptyKrEntries(count - items.length)]
}

function parseItemsToKrs(items: string[]): KrEntry[] {
  if (!items.length) return []

  return items.map((text) => {
    const separators = [" — ", " - ", " – ", " | "]
    for (const sep of separators) {
      if (text.includes(sep)) {
        const [description, metric] = text.split(sep)
        return { description: description.trim(), metric: metric?.trim() ?? "" }
      }
    }

    const match = text.match(/^(.*)\((.*)\)\s*$/)
    if (match) {
      return { description: match[1].trim(), metric: match[2].trim() }
    }

    return { description: text.trim(), metric: "" }
  })
}

function normalizeKrs(items: KrEntry[]): string[] {
  if (!items?.length) return []
  return items
    .map((item) => ({
      description: item.description?.trim() ?? "",
      metric: item.metric?.trim() ?? "",
    }))
    .filter((item) => item.description)
    .map((item) => (item.metric ? `${item.description} — ${item.metric}` : item.description))
}

function reorderWithinColumn(
  columns: BoardColumn[],
  columnId: string,
  activeId: string,
  overId: string,
): BoardColumn[] {
  const columnIndex = columns.findIndex((column) => column.id === columnId)
  if (columnIndex === -1) return columns

  const column = columns[columnIndex]
  const oldIndex = column.cards.findIndex((card) => card.id === activeId)
  let newIndex = column.cards.findIndex((card) => card.id === overId)

  if (oldIndex === -1) return columns

  if (newIndex === -1) {
    newIndex = Math.max(column.cards.length - 1, 0)
  }

  if (oldIndex === newIndex) return columns

  const updatedColumn = {
    ...column,
    cards: arrayMove(column.cards, oldIndex, newIndex),
  }

  const next = [...columns]
  next[columnIndex] = updatedColumn
  return next
}

function moveBetweenColumns(
  columns: BoardColumn[],
  fromColumnId: string,
  toColumnId: string,
  cardId: string,
  overId: string,
): BoardColumn[] {
  if (fromColumnId === toColumnId) return columns

  const updated = cloneColumns(columns)
  const fromIndex = updated.findIndex((column) => column.id === fromColumnId)
  const toIndex = updated.findIndex((column) => column.id === toColumnId)

  if (fromIndex === -1 || toIndex === -1) return columns

  const fromColumn = updated[fromIndex]
  const cardIndex = fromColumn.cards.findIndex((card) => card.id === cardId)
  if (cardIndex === -1) return columns

  const [movingCard] = fromColumn.cards.splice(cardIndex, 1)
  if (!movingCard) return columns

  const destinationColumn = updated[toIndex]
  const overCardIndex = destinationColumn.cards.findIndex((card) => card.id === overId)
  const insertIndex = overCardIndex >= 0 ? overCardIndex : destinationColumn.cards.length

  destinationColumn.cards.splice(insertIndex, 0, movingCard)

  return updated
}

function findCardLocation(columns: BoardColumn[], cardId: string): { columnIndex: number; cardIndex: number } | null {
  for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
    const cardIndex = columns[columnIndex].cards.findIndex((card) => card.id === cardId)
    if (cardIndex !== -1) {
      return { columnIndex, cardIndex }
    }
  }
  return null
}

function generateCardId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `card-${Math.random().toString(36).slice(2, 9)}`
}
