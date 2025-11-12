import { useCallback, useEffect, useState } from 'react';
import type { DeliverableTemplates, DeliverableTemplate } from '@/types/templates';

interface ApiTemplate {
  id: string;
  name: string;
  deliverable_type: keyof DeliverableTemplates;
  template_text: string;
}

interface Hook {
  templates: DeliverableTemplates | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export const useDeliverableTemplates = (): Hook => {
  const [templates, setTemplates] = useState<DeliverableTemplates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/templates/deliverables');
      if (!res.ok) throw new Error(`Failed to load templates (${res.status})`);
      const data = await res.json();
      const grouped: DeliverableTemplates = {
        pullRequests: [],
        pullRequestReviews: [],
        issues: [],
        comments: [],
      };
      (data.templates as ApiTemplate[]).forEach(t => {
        const category = t.deliverable_type;
        const arr = grouped[category];
        if (arr) arr.push({ id: t.id, name: t.name, text: t.template_text });
      });
      setTemplates(grouped);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  return { templates, isLoading, error, reload: fetchTemplates };
};
