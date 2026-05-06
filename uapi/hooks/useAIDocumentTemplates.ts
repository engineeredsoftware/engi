import { useCallback, useEffect, useState } from 'react';
import type { AIDocumentTemplates } from '@/types/templates';

interface ApiTemplate {
  id: string;
  name: string;
  ai_document_type: string;
  template_text: string;
}

interface Hook {
  templates: AIDocumentTemplates | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export const useAIDocumentTemplates = (): Hook => {
  const [templates, setTemplates] = useState<AIDocumentTemplates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/templates/ai-documents');
      if (!res.ok) throw new Error(`Failed to load templates (${res.status})`);
      const data = await res.json();
      const grouped: any = {
        assetPackFeedback: [],
        knowledgeExtension: [],
        mcpConfig: [],
      } as AIDocumentTemplates;

      (data.templates as ApiTemplate[]).forEach((t) => {
        // Normalize former 'mcpIntegration' payloads to 'mcpConfig'
        const typeKey = (t.ai_document_type === 'mcpIntegration' ? 'mcpConfig' : t.ai_document_type) as keyof AIDocumentTemplates;
        const arr = (grouped as any)[typeKey];
        if (arr) arr.push({ id: t.id, name: t.name, text: t.template_text });
      });
      try {
        const stored = localStorage.getItem('bitcode-mcp-configs');
        const mcpConfig = stored ? JSON.parse(stored) : {};
        grouped.mcpConfig = grouped.mcpConfig.filter((t: any) => mcpConfig[t.id]);
      } catch {}
      setTemplates(grouped as AIDocumentTemplates);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  return { templates, isLoading, error, reload: fetchTemplates };
};
