import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function useSortableList<T extends { id?: string }>(
  items: T[],
  onReorder: (items: T[]) => void
) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item, index) =>
        item.id ? item.id === active.id : index.toString() === active.id
      );
      const newIndex = items.findIndex((item, index) =>
        item.id ? item.id === over.id : index.toString() === over.id
      );

      const reorderedItems = arrayMove(items, oldIndex, newIndex);
      onReorder(reorderedItems);
    }
  };

  return {
    sensors,
    handleDragEnd,
  };
}

export { DndContext, SortableContext, verticalListSortingStrategy };
