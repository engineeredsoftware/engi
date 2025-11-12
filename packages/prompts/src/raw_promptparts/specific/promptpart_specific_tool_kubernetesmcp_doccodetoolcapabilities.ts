import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool-specific semantic unit (PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLCAPABILITIES)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Provide concrete, domain‑appropriate content for this specific prompt segment. Use precise, operational language and ensure it integrates coherently with adjacent prompt parts.' as PromptPart;