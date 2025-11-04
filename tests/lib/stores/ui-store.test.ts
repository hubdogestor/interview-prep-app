/**
 * Testes para UI Store
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '@/lib/stores/ui-store';

describe('UI Store', () => {
  beforeEach(() => {
    useUIStore.getState().reset();
  });

  describe('Sidebar', () => {
    it('deve iniciar com sidebar expandida', () => {
      const { sidebarCollapsed } = useUIStore.getState();
      expect(sidebarCollapsed).toBe(false);
    });

    it('deve alternar estado da sidebar', () => {
      const store = useUIStore.getState();

      store.toggleSidebar();
      expect(useUIStore.getState().sidebarCollapsed).toBe(true);

      store.toggleSidebar();
      expect(useUIStore.getState().sidebarCollapsed).toBe(false);
    });

    it('deve definir estado da sidebar diretamente', () => {
      const store = useUIStore.getState();

      store.setSidebarCollapsed(true);
      expect(useUIStore.getState().sidebarCollapsed).toBe(true);

      store.setSidebarCollapsed(false);
      expect(useUIStore.getState().sidebarCollapsed).toBe(false);
    });
  });

  describe('Modals', () => {
    it('deve abrir modal com tipo e dados', () => {
      const store = useUIStore.getState();
      const data = { id: '123', name: 'Test' };

      store.openModal('ai-generate', data);

      const { modal } = useUIStore.getState();
      expect(modal.isOpen).toBe(true);
      expect(modal.type).toBe('ai-generate');
      expect(modal.data).toEqual(data);
    });

    it('deve fechar modal', () => {
      const store = useUIStore.getState();

      store.openModal('confirm-delete');
      expect(useUIStore.getState().modal.isOpen).toBe(true);

      store.closeModal();
      const { modal } = useUIStore.getState();
      expect(modal.isOpen).toBe(false);
      expect(modal.type).toBeNull();
      expect(modal.data).toBeUndefined();
    });
  });

  describe('Command Palette', () => {
    it('deve alternar command palette', () => {
      const store = useUIStore.getState();

      store.toggleCommandPalette();
      expect(useUIStore.getState().commandPaletteOpen).toBe(true);

      store.toggleCommandPalette();
      expect(useUIStore.getState().commandPaletteOpen).toBe(false);
    });

    it('deve definir estado do command palette', () => {
      const store = useUIStore.getState();

      store.setCommandPaletteOpen(true);
      expect(useUIStore.getState().commandPaletteOpen).toBe(true);

      store.setCommandPaletteOpen(false);
      expect(useUIStore.getState().commandPaletteOpen).toBe(false);
    });
  });

  describe('Loading', () => {
    it('deve gerenciar estado de loading global', () => {
      const store = useUIStore.getState();

      store.setGlobalLoading(true);
      expect(useUIStore.getState().globalLoading).toBe(true);

      store.setGlobalLoading(false);
      expect(useUIStore.getState().globalLoading).toBe(false);
    });
  });

  describe('Toasts', () => {
    it('deve adicionar toast à fila', () => {
      const store = useUIStore.getState();

      store.addToast('Test message', 'success');

      const { toastQueue } = useUIStore.getState();
      expect(toastQueue).toHaveLength(1);
      expect(toastQueue[0].message).toBe('Test message');
      expect(toastQueue[0].type).toBe('success');
    });

    it('deve remover toast da fila', () => {
      const store = useUIStore.getState();

      store.addToast('Test 1');
      store.addToast('Test 2');

      const { toastQueue } = useUIStore.getState();
      expect(toastQueue).toHaveLength(2);

      const firstId = toastQueue[0].id;
      store.removeToast(firstId);

      expect(useUIStore.getState().toastQueue).toHaveLength(1);
    });
  });

  describe('Mobile Menu', () => {
    it('deve alternar mobile menu', () => {
      const store = useUIStore.getState();

      store.toggleMobileMenu();
      expect(useUIStore.getState().mobileMenuOpen).toBe(true);

      store.toggleMobileMenu();
      expect(useUIStore.getState().mobileMenuOpen).toBe(false);
    });
  });

  describe('View Mode', () => {
    it('deve alternar entre grid e list', () => {
      const store = useUIStore.getState();

      expect(useUIStore.getState().viewMode).toBe('grid');

      store.setViewMode('list');
      expect(useUIStore.getState().viewMode).toBe('list');

      store.setViewMode('grid');
      expect(useUIStore.getState().viewMode).toBe('grid');
    });
  });

  describe('Reset', () => {
    it('deve resetar todo o estado', () => {
      const store = useUIStore.getState();

      // Modificar vários estados
      store.toggleSidebar();
      store.openModal('ai-generate');
      store.setGlobalLoading(true);
      store.addToast('Test');

      // Reset
      store.reset();

      const state = useUIStore.getState();
      expect(state.sidebarCollapsed).toBe(false);
      expect(state.modal.isOpen).toBe(false);
      expect(state.globalLoading).toBe(false);
      expect(state.toastQueue).toHaveLength(0);
    });
  });
});
