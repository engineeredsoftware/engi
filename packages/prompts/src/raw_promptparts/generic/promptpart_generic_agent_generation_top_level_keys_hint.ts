/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Hint that only the enumerated top-level keys are allowed in the JSON object"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_GENERIC_AGENT_GENERATION_TOP_LEVEL_KEYS_HINT: PromptPart =
  'Top-level keys (exactly these):' as PromptPart;
