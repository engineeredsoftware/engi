/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TRY_DIRECTIVES_INSTRUCTIONS)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart = 
  'Search text within provided inputs using exact, regex, and fuzzy strategies as needed. Respect case sensitivity flags and path filters; do not read outside allowed scope.' as PromptPart;