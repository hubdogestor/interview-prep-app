/**
 * Selection Store - Gerenciamento de Seleção de Items
 *
 * Gerencia seleção múltipla de items para ações em lote
 * (delete, archive, export, etc.)
 */

import { create } from 'zustand';

// ============================================================
// Types
// ============================================================

export type ItemType = 'icebreaker' | 'speech' | 'competencia' | 'experiencia' | 'question';

export interface SelectionState {
  // Selected items por tipo
  selected: Map<ItemType, Set<string>>;

  // Selection mode
  isSelectionMode: boolean;
  setSelectionMode: (enabled: boolean) => void;

  // Selection actions
  selectItem: (type: ItemType, id: string) => void;
  deselectItem: (type: ItemType, id: string) => void;
  toggleItem: (type: ItemType, id: string) => void;
  selectAll: (type: ItemType, ids: string[]) => void;
  deselectAll: (type: ItemType) => void;
  clearSelection: () => void;

  // Getters
  isSelected: (type: ItemType, id: string) => boolean;
  getSelected: (type: ItemType) => string[];
  getSelectedCount: (type: ItemType) => number;
  hasSelection: () => boolean;
}

// ============================================================
// Store
// ============================================================

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selected: new Map(),
  isSelectionMode: false,

  setSelectionMode: (enabled) => {
    set({ isSelectionMode: enabled });
    if (!enabled) {
      get().clearSelection();
    }
  },

  selectItem: (type, id) =>
    set((state) => {
      const newSelected = new Map(state.selected);
      const typeSet = newSelected.get(type) || new Set();
      typeSet.add(id);
      newSelected.set(type, typeSet);
      return { selected: newSelected };
    }),

  deselectItem: (type, id) =>
    set((state) => {
      const newSelected = new Map(state.selected);
      const typeSet = newSelected.get(type);
      if (typeSet) {
        typeSet.delete(id);
        if (typeSet.size === 0) {
          newSelected.delete(type);
        } else {
          newSelected.set(type, typeSet);
        }
      }
      return { selected: newSelected };
    }),

  toggleItem: (type, id) => {
    const isSelected = get().isSelected(type, id);
    if (isSelected) {
      get().deselectItem(type, id);
    } else {
      get().selectItem(type, id);
    }
  },

  selectAll: (type, ids) =>
    set((state) => {
      const newSelected = new Map(state.selected);
      newSelected.set(type, new Set(ids));
      return { selected: newSelected };
    }),

  deselectAll: (type) =>
    set((state) => {
      const newSelected = new Map(state.selected);
      newSelected.delete(type);
      return { selected: newSelected };
    }),

  clearSelection: () =>
    set({
      selected: new Map(),
      isSelectionMode: false,
    }),

  isSelected: (type, id) => {
    const typeSet = get().selected.get(type);
    return typeSet ? typeSet.has(id) : false;
  },

  getSelected: (type) => {
    const typeSet = get().selected.get(type);
    return typeSet ? Array.from(typeSet) : [];
  },

  getSelectedCount: (type) => {
    const typeSet = get().selected.get(type);
    return typeSet ? typeSet.size : 0;
  },

  hasSelection: () => {
    return get().selected.size > 0;
  },
}));

// ============================================================
// Hooks Customizados
// ============================================================

/**
 * Hook para gerenciar seleção de um tipo específico
 */
export function useSelection(type: ItemType) {
  const store = useSelectionStore();

  return {
    isSelectionMode: store.isSelectionMode,
    setSelectionMode: store.setSelectionMode,
    selected: store.getSelected(type),
    selectedCount: store.getSelectedCount(type),
    isSelected: (id: string) => store.isSelected(type, id),
    selectItem: (id: string) => store.selectItem(type, id),
    deselectItem: (id: string) => store.deselectItem(type, id),
    toggleItem: (id: string) => store.toggleItem(type, id),
    selectAll: (ids: string[]) => store.selectAll(type, ids),
    deselectAll: () => store.deselectAll(type),
    clearSelection: store.clearSelection,
    hasSelection: store.hasSelection(),
  };
}
