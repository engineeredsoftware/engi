/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_LANGUAGE_TRY_DIRECTIVES_INSTRUCTIONS)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_LANGUAGE_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart = 
  'Execute the analysis pipeline. Produce structured annotations (entities, relations, keyphrases), concise summaries, and explicit assumptions. Preserve original text references when useful.' as PromptPart;