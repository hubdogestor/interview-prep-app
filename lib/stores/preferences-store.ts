/**
 * Preferences Store - Preferências do Usuário
 *
 * Gerencia preferências persistentes do usuário como idioma,
 * configurações de AI, tema, etc.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================================
// Types
// ============================================================

export type Language = 'pt' | 'en';
export type Theme = 'light' | 'dark' | 'system';

export interface AIPreferences {
  defaultMode: 'auto' | 'guided' | 'rewrite';
  autoTranslate: boolean;
  verboseOutput: boolean;
}

export interface PracticePreferences {
  autoRecord: boolean;
  showTranscription: boolean;
  targetDuration: number; // segundos
  enableAIFeedback: boolean;
}

export interface PreferencesState {
  // Idioma
  language: Language;
  setLanguage: (lang: Language) => void;

  // Tema
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // AI Preferences
  aiPreferences: AIPreferences;
  setAIPreferences: (prefs: Partial<AIPreferences>) => void;

  // Practice Preferences
  practicePreferences: PracticePreferences;
  setPracticePreferences: (prefs: Partial<PracticePreferences>) => void;

  // Notifications
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;

  // Analytics
  analyticsEnabled: boolean;
  setAnalyticsEnabled: (enabled: boolean) => void;

  // Reset
  reset: () => void;
}

// ============================================================
// Initial State
// ============================================================

const initialState = {
  language: 'pt' as Language,
  theme: 'system' as Theme,
  aiPreferences: {
    defaultMode: 'auto' as const,
    autoTranslate: false,
    verboseOutput: false,
  },
  practicePreferences: {
    autoRecord: false,
    showTranscription: true,
    targetDuration: 180, // 3 minutos
    enableAIFeedback: true,
  },
  notificationsEnabled: true,
  analyticsEnabled: true,
};

// ============================================================
// Store
// ============================================================

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...initialState,

      setLanguage: (lang) => set({ language: lang }),
      setTheme: (theme) => set({ theme }),

      setAIPreferences: (prefs) =>
        set((state) => ({
          aiPreferences: { ...state.aiPreferences, ...prefs },
        })),

      setPracticePreferences: (prefs) =>
        set((state) => ({
          practicePreferences: { ...state.practicePreferences, ...prefs },
        })),

      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setAnalyticsEnabled: (enabled) => set({ analyticsEnabled: enabled }),

      reset: () => set(initialState),
    }),
    {
      name: 'preferences-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ============================================================
// Selectors
// ============================================================

export const selectLanguage = (state: PreferencesState) => state.language;
export const selectTheme = (state: PreferencesState) => state.theme;
export const selectAIPreferences = (state: PreferencesState) => state.aiPreferences;
export const selectPracticePreferences = (state: PreferencesState) =>
  state.practicePreferences;

// ============================================================
// Hooks Customizados
// ============================================================

/**
 * Hook para gerenciar idioma
 */
export function useLanguage() {
  const language = usePreferencesStore(selectLanguage);
  const setLanguage = usePreferencesStore((state) => state.setLanguage);

  return {
    language,
    setLanguage,
    isPortuguese: language === 'pt',
    isEnglish: language === 'en',
  };
}

/**
 * Hook para gerenciar tema
 */
export function useTheme() {
  const theme = usePreferencesStore(selectTheme);
  const setTheme = usePreferencesStore((state) => state.setTheme);

  return {
    theme,
    setTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isSystem: theme === 'system',
  };
}

/**
 * Hook para preferências de AI
 */
export function useAIPreferences() {
  const prefs = usePreferencesStore(selectAIPreferences);
  const setPrefs = usePreferencesStore((state) => state.setAIPreferences);

  return {
    preferences: prefs,
    setPreferences: setPrefs,
  };
}

/**
 * Hook para preferências de prática
 */
export function usePracticePreferences() {
  const prefs = usePreferencesStore(selectPracticePreferences);
  const setPrefs = usePreferencesStore((state) => state.setPracticePreferences);

  return {
    preferences: prefs,
    setPreferences: setPrefs,
  };
}
