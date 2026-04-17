import type { Execution } from '@bitcode/execution-generics';
import type { Prompt as PromptRegistry, createPromptPart } from '@bitcode/prompts';
import { createPromptPart as cpp } from '@bitcode/prompts';

/**
 * Apply prompt overlays from Execution state into a Prompt registry.
 * This is the single integration point where execution state influences
 * LLM prompts without hardcoding into prompt classes.
 */
export function applyPromptOverlays(execution: Execution, prompt: PromptRegistry): void {
  // AI Documents overlay: list titles + details
  try {
    const list = (execution as any).get?.('ai_documents', 'list') || [];
    if (Array.isArray(list) && list.length) {
      const titles = list.map((u: any, i: number) => `(${i + 1}) ${u.title || 'Untitled'}`).join('\n');
      const details = list.map((u: any, i: number) => `### AI Document ${i + 1}: ${u.title || 'Untitled'}\n${(u.content || u.output || '').slice(0, 1200)}`).join('\n\n');
      prompt.set('preprocess:ai_documents:list', cpp(titles as any));
      prompt.set('preprocess:ai_documents:details', cpp(details as any));
    }
  } catch {}

  // On-the-fly instructions overlay (if any)
  try {
    const list = (execution as any).get?.('otf', 'instructions') || [];
    if (Array.isArray(list) && list.length) {
      const last = list.slice(-5).map((i: any) => `- ${i.content}`).join('\n');
      prompt.set('preprocess:otf:list', cpp(last as any));
    }
  } catch {}
}
