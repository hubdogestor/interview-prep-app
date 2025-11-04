/**
 * Testes para Selection Store
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectionStore } from '@/lib/stores/selection-store';

describe('Selection Store', () => {
  beforeEach(() => {
    useSelectionStore.getState().clearSelection();
  });

  describe('Selection Mode', () => {
    it('deve iniciar com selection mode desabilitado', () => {
      const { isSelectionMode } = useSelectionStore.getState();
      expect(isSelectionMode).toBe(false);
    });

    it('deve habilitar selection mode', () => {
      const store = useSelectionStore.getState();

      store.setSelectionMode(true);
      expect(useSelectionStore.getState().isSelectionMode).toBe(true);
    });

    it('deve limpar seleção ao desabilitar selection mode', () => {
      const store = useSelectionStore.getState();

      store.setSelectionMode(true);
      store.selectItem('icebreaker', '123');

      expect(store.hasSelection()).toBe(true);

      store.setSelectionMode(false);
      expect(useSelectionStore.getState().isSelectionMode).toBe(false);
      expect(store.hasSelection()).toBe(false);
    });
  });

  describe('Select Item', () => {
    it('deve selecionar item', () => {
      const store = useSelectionStore.getState();

      store.selectItem('icebreaker', '123');

      expect(store.isSelected('icebreaker', '123')).toBe(true);
      expect(store.getSelectedCount('icebreaker')).toBe(1);
    });

    it('deve selecionar múltiplos items', () => {
      const store = useSelectionStore.getState();

      store.selectItem('icebreaker', '123');
      store.selectItem('icebreaker', '456');
      store.selectItem('speech', '789');

      expect(store.getSelectedCount('icebreaker')).toBe(2);
      expect(store.getSelectedCount('speech')).toBe(1);
    });
  });

  describe('Deselect Item', () => {
    it('deve desselecionar item', () => {
      const store = useSelectionStore.getState();

      store.selectItem('icebreaker', '123');
      expect(store.isSelected('icebreaker', '123')).toBe(true);

      store.deselectItem('icebreaker', '123');
      expect(store.isSelected('icebreaker', '123')).toBe(false);
    });

    it('deve não dar erro ao desselecionar item não selecionado', () => {
      const store = useSelectionStore.getState();

      expect(() => {
        store.deselectItem('icebreaker', '999');
      }).not.toThrow();
    });
  });

  describe('Toggle Item', () => {
    it('deve alternar seleção de item', () => {
      const store = useSelectionStore.getState();

      store.toggleItem('icebreaker', '123');
      expect(store.isSelected('icebreaker', '123')).toBe(true);

      store.toggleItem('icebreaker', '123');
      expect(store.isSelected('icebreaker', '123')).toBe(false);
    });
  });

  describe('Select All', () => {
    it('deve selecionar todos os items de um tipo', () => {
      const store = useSelectionStore.getState();
      const ids = ['1', '2', '3', '4', '5'];

      store.selectAll('icebreaker', ids);

      expect(store.getSelectedCount('icebreaker')).toBe(5);
      ids.forEach((id) => {
        expect(store.isSelected('icebreaker', id)).toBe(true);
      });
    });

    it('deve substituir seleção anterior ao selecionar todos', () => {
      const store = useSelectionStore.getState();

      store.selectItem('icebreaker', 'old1');
      store.selectItem('icebreaker', 'old2');

      expect(store.getSelectedCount('icebreaker')).toBe(2);

      store.selectAll('icebreaker', ['new1', 'new2', 'new3']);

      expect(store.getSelectedCount('icebreaker')).toBe(3);
      expect(store.isSelected('icebreaker', 'old1')).toBe(false);
      expect(store.isSelected('icebreaker', 'new1')).toBe(true);
    });
  });

  describe('Deselect All', () => {
    it('deve desselecionar todos os items de um tipo', () => {
      const store = useSelectionStore.getState();

      store.selectAll('icebreaker', ['1', '2', '3']);
      expect(store.getSelectedCount('icebreaker')).toBe(3);

      store.deselectAll('icebreaker');
      expect(store.getSelectedCount('icebreaker')).toBe(0);
    });

    it('deve manter seleção de outros tipos', () => {
      const store = useSelectionStore.getState();

      store.selectAll('icebreaker', ['1', '2']);
      store.selectAll('speech', ['3', '4']);

      store.deselectAll('icebreaker');

      expect(store.getSelectedCount('icebreaker')).toBe(0);
      expect(store.getSelectedCount('speech')).toBe(2);
    });
  });

  describe('Get Selected', () => {
    it('deve retornar array de IDs selecionados', () => {
      const store = useSelectionStore.getState();
      const ids = ['1', '2', '3'];

      store.selectAll('icebreaker', ids);

      const selected = store.getSelected('icebreaker');
      expect(selected).toHaveLength(3);
      expect(selected.sort()).toEqual(ids.sort());
    });

    it('deve retornar array vazio se nenhum item selecionado', () => {
      const store = useSelectionStore.getState();

      const selected = store.getSelected('icebreaker');
      expect(selected).toEqual([]);
    });
  });

  describe('Has Selection', () => {
    it('deve retornar false quando não há seleção', () => {
      const store = useSelectionStore.getState();
      expect(store.hasSelection()).toBe(false);
    });

    it('deve retornar true quando há seleção', () => {
      const store = useSelectionStore.getState();

      store.selectItem('icebreaker', '123');
      expect(store.hasSelection()).toBe(true);
    });
  });

  describe('Clear Selection', () => {
    it('deve limpar toda a seleção', () => {
      const store = useSelectionStore.getState();

      store.selectAll('icebreaker', ['1', '2']);
      store.selectAll('speech', ['3', '4']);
      store.setSelectionMode(true);

      store.clearSelection();

      expect(store.hasSelection()).toBe(false);
      expect(store.isSelectionMode).toBe(false);
    });
  });
});
