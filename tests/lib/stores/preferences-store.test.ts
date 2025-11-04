/**
 * Testes para Preferences Store
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { usePreferencesStore } from '@/lib/stores/preferences-store';

describe('Preferences Store', () => {
  beforeEach(() => {
    usePreferencesStore.getState().reset();
  });

  describe('Language', () => {
    it('deve iniciar com português', () => {
      const { language } = usePreferencesStore.getState();
      expect(language).toBe('pt');
    });

    it('deve alterar idioma', () => {
      const store = usePreferencesStore.getState();

      store.setLanguage('en');
      expect(usePreferencesStore.getState().language).toBe('en');

      store.setLanguage('pt');
      expect(usePreferencesStore.getState().language).toBe('pt');
    });
  });

  describe('Theme', () => {
    it('deve iniciar com tema system', () => {
      const { theme } = usePreferencesStore.getState();
      expect(theme).toBe('system');
    });

    it('deve alterar tema', () => {
      const store = usePreferencesStore.getState();

      store.setTheme('dark');
      expect(usePreferencesStore.getState().theme).toBe('dark');

      store.setTheme('light');
      expect(usePreferencesStore.getState().theme).toBe('light');
    });
  });

  describe('AI Preferences', () => {
    it('deve ter preferências AI padrão', () => {
      const { aiPreferences } = usePreferencesStore.getState();

      expect(aiPreferences.defaultMode).toBe('auto');
      expect(aiPreferences.autoTranslate).toBe(false);
      expect(aiPreferences.verboseOutput).toBe(false);
    });

    it('deve atualizar preferências AI parcialmente', () => {
      const store = usePreferencesStore.getState();

      store.setAIPreferences({ autoTranslate: true });

      const { aiPreferences } = usePreferencesStore.getState();
      expect(aiPreferences.autoTranslate).toBe(true);
      expect(aiPreferences.defaultMode).toBe('auto'); // Não alterado
    });

    it('deve atualizar múltiplas preferências AI', () => {
      const store = usePreferencesStore.getState();

      store.setAIPreferences({
        defaultMode: 'guided',
        verboseOutput: true,
      });

      const { aiPreferences } = usePreferencesStore.getState();
      expect(aiPreferences.defaultMode).toBe('guided');
      expect(aiPreferences.verboseOutput).toBe(true);
    });
  });

  describe('Practice Preferences', () => {
    it('deve ter preferências de prática padrão', () => {
      const { practicePreferences } = usePreferencesStore.getState();

      expect(practicePreferences.autoRecord).toBe(false);
      expect(practicePreferences.showTranscription).toBe(true);
      expect(practicePreferences.targetDuration).toBe(180);
      expect(practicePreferences.enableAIFeedback).toBe(true);
    });

    it('deve atualizar preferências de prática', () => {
      const store = usePreferencesStore.getState();

      store.setPracticePreferences({
        autoRecord: true,
        targetDuration: 300,
      });

      const { practicePreferences } = usePreferencesStore.getState();
      expect(practicePreferences.autoRecord).toBe(true);
      expect(practicePreferences.targetDuration).toBe(300);
      expect(practicePreferences.showTranscription).toBe(true); // Não alterado
    });
  });

  describe('Notifications', () => {
    it('deve iniciar com notificações habilitadas', () => {
      const { notificationsEnabled } = usePreferencesStore.getState();
      expect(notificationsEnabled).toBe(true);
    });

    it('deve desabilitar notificações', () => {
      const store = usePreferencesStore.getState();

      store.setNotificationsEnabled(false);
      expect(usePreferencesStore.getState().notificationsEnabled).toBe(false);
    });
  });

  describe('Analytics', () => {
    it('deve iniciar com analytics habilitado', () => {
      const { analyticsEnabled } = usePreferencesStore.getState();
      expect(analyticsEnabled).toBe(true);
    });

    it('deve desabilitar analytics', () => {
      const store = usePreferencesStore.getState();

      store.setAnalyticsEnabled(false);
      expect(usePreferencesStore.getState().analyticsEnabled).toBe(false);
    });
  });

  describe('Reset', () => {
    it('deve resetar todas as preferências', () => {
      const store = usePreferencesStore.getState();

      // Modificar preferências
      store.setLanguage('en');
      store.setTheme('dark');
      store.setNotificationsEnabled(false);
      store.setAIPreferences({ autoTranslate: true });

      // Reset
      store.reset();

      const state = usePreferencesStore.getState();
      expect(state.language).toBe('pt');
      expect(state.theme).toBe('system');
      expect(state.notificationsEnabled).toBe(true);
      expect(state.aiPreferences.autoTranslate).toBe(false);
    });
  });
});
