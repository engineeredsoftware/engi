import { useCallback, useEffect, useState } from 'react';

interface UserTemplatePreferencesApiResponse {
  deliverable_templates?: Record<string, string[]>;
  ai_document_templates?: Record<string, string[]>;
}

export interface UserTemplatePreferences {
  deliverable_templates: Record<string, string[]>;
  ai_document_templates: Record<string, string[]>;
}

interface UseTemplatePreferencesHook {
  preferences: UserTemplatePreferences | null;
  isLoading: boolean;
  error: string | null;
  /**
   * Manually trigger a reload of the preferences from the API.
   */
  reload: () => Promise<void>;
}

/**
 * Client-side hook that fetches the current user's saved template
 * preferences (deliverable & AI Document) from `/api/orbitals/template-preferences`.
 *
 * It automatically fetches once on mount but also returns a `reload`
 * function should the caller need to refresh the data (e.g. after a
 * successful template save).
 */
export const useTemplatePreferences = (): UseTemplatePreferencesHook => {
  const [preferences, setPreferences] = useState<UserTemplatePreferences | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreferences = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/orbitals/template-preferences');
      if (res.status === 401 || res.status === 404) {
        setPreferences({
          deliverable_templates: {},
          ai_document_templates: {},
        });
        return;
      }
      if (!res.ok) {
        // Non-2xx response – surface message returned by the API when
        // possible to aid debugging.
        let msg = `Failed to load template preferences (${res.status})`;
        try {
          const errPayload = await res.json();
          if (errPayload?.error) msg = errPayload.error as string;
        } catch (_) {
          /* swallow json parse errors */
        }
        throw new Error(msg);
      }

      const data = (await res.json()) as UserTemplatePreferencesApiResponse;

      // Normalise the response so that we always have object shapes –
      // avoids a lot of optional-chaining in consumers.
      setPreferences({
        deliverable_templates: data.deliverable_templates ?? {},
        ai_document_templates: data.ai_document_templates ?? {},
      });
    } catch (err) {
      setPreferences({
        deliverable_templates: {},
        ai_document_templates: {},
      });
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return {
    preferences,
    isLoading,
    error,
    reload: fetchPreferences,
  };
};
