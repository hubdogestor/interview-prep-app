/**
 * UI Store - Gerenciamento de Estado da Interface
 *
 * Gerencia estado global da UI como modais, sidebars, themes, etc.
 * Usa Zustand para state management eficiente e type-safe.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================================
// Types
// ============================================================

export type ModalType =
  | 'ai-generate'
  | 'confirm-delete'
  | 'export'
  | 'practice'
  | 'job-fit'
  | 'share'
  | null;

export interface ModalState {
  type: ModalType;
  data?: Record<string, unknown>;
  isOpen: boolean;
}

export interface UIState {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Modals
  modal: ModalState;
  openModal: (type: ModalType, data?: Record<string, unknown>) => void;
  closeModal: () => void;

  // Command Palette
  commandPaletteOpen: boolean;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;

  // Loading States
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;

  // Toast/Notifications (para controle programático)
  toastQueue: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>;
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Mobile Menu
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;

  // View Preferences
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;

  // Reset
  reset: () => void;
}

// ============================================================
// Initial State
// ============================================================

const initialState = {
  sidebarCollapsed: false,
  modal: {
    type: null as ModalType,
    data: undefined,
    isOpen: false,
  },
  commandPaletteOpen: false,
  globalLoading: false,
  toastQueue: [],
  mobileMenuOpen: false,
  viewMode: 'grid' as const,
};

// ============================================================
// Store
// ============================================================

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Sidebar
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Modals
      openModal: (type, data) =>
        set({
          modal: {
            type,
            data,
            isOpen: true,
          },
        }),
      closeModal: () =>
        set({
          modal: {
            type: null,
            data: undefined,
            isOpen: false,
          },
        }),

      // Command Palette
      toggleCommandPalette: () =>
        set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      // Loading
      setGlobalLoading: (loading) => set({ globalLoading: loading }),

      // Toasts
      addToast: (message, type = 'info') => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        set((state) => ({
          toastQueue: [...state.toastQueue, { id, message, type }],
        }));
        // Auto-remove após 5 segundos
        setTimeout(() => get().removeToast(id), 5000);
      },
      removeToast: (id) =>
        set((state) => ({
          toastQueue: state.toastQueue.filter((t) => t.id !== id),
        })),

      // Mobile Menu
      toggleMobileMenu: () =>
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      // View Mode
      setViewMode: (mode) => set({ viewMode: mode }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Apenas persistir preferências, não estado transitório
        sidebarCollapsed: state.sidebarCollapsed,
        viewMode: state.viewMode,
      }),
    }
  )
);

// ============================================================
// Selectors (para performance)
// ============================================================

export const selectSidebarCollapsed = (state: UIState) => state.sidebarCollapsed;
export const selectModal = (state: UIState) => state.modal;
export const selectCommandPaletteOpen = (state: UIState) => state.commandPaletteOpen;
export const selectGlobalLoading = (state: UIState) => state.globalLoading;
export const selectToastQueue = (state: UIState) => state.toastQueue;
export const selectMobileMenuOpen = (state: UIState) => state.mobileMenuOpen;
export const selectViewMode = (state: UIState) => state.viewMode;

// ============================================================
// Hooks Customizados
// ============================================================

/**
 * Hook para gerenciar modais
 */
export function useModal() {
  const modal = useUIStore(selectModal);
  const openModal = useUIStore((state) => state.openModal);
  const closeModal = useUIStore((state) => state.closeModal);

  return {
    modal,
    openModal,
    closeModal,
    isOpen: modal.isOpen,
    type: modal.type,
    data: modal.data,
  };
}

/**
 * Hook para gerenciar sidebar
 */
export function useSidebar() {
  const collapsed = useUIStore(selectSidebarCollapsed);
  const toggle = useUIStore((state) => state.toggleSidebar);
  const setCollapsed = useUIStore((state) => state.setSidebarCollapsed);

  return {
    collapsed,
    toggle,
    setCollapsed,
  };
}

/**
 * Hook para gerenciar toasts
 */
export function useToasts() {
  const queue = useUIStore(selectToastQueue);
  const add = useUIStore((state) => state.addToast);
  const remove = useUIStore((state) => state.removeToast);

  return {
    toasts: queue,
    addToast: add,
    removeToast: remove,
  };
}
