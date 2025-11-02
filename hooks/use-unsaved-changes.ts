import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook to warn user before leaving page with unsaved changes
 *
 * @param hasUnsavedChanges - Boolean indicating if there are unsaved changes
 * @param message - Custom warning message (optional)
 *
 * @example
 * ```tsx
 * const form = useForm();
 * useUnsavedChanges(form.formState.isDirty);
 * ```
 */
export function useUnsavedChanges(
  hasUnsavedChanges: boolean,
  message: string = "Você tem alterações não salvas. Deseja realmente sair?"
) {
  // Warn before closing/refreshing browser tab
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges, message]);

  // For Next.js navigation, we can't easily block it, but we can show a confirmation
  // This is a limitation of Next.js App Router
  // In a production app, you might want to use a modal confirmation instead
}

/**
 * Hook to show confirmation dialog before navigation with unsaved changes
 * Returns a function to wrap navigation actions
 *
 * @param hasUnsavedChanges - Boolean indicating if there are unsaved changes
 * @param message - Custom warning message (optional)
 *
 * @example
 * ```tsx
 * const confirmNavigation = useNavigationPrompt(isDirty);
 *
 * <Button onClick={() => confirmNavigation(() => router.push('/'))}>
 *   Cancel
 * </Button>
 * ```
 */
export function useNavigationPrompt(
  hasUnsavedChanges: boolean,
  message: string = "Você tem alterações não salvas. Deseja realmente sair?"
) {
  const confirmNavigation = useCallback(
    (callback: () => void) => {
      if (hasUnsavedChanges) {
        if (window.confirm(message)) {
          callback();
        }
      } else {
        callback();
      }
    },
    [hasUnsavedChanges, message]
  );

  return confirmNavigation;
}
