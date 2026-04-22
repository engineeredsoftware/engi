/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TRY_SEARCH_TECHNIQUES)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TRY_SEARCH_TECHNIQUES: PromptPart = 
  'Search techniques: line‑by‑line scan, regex capture groups, word boundary checks, and relevance ranking. Provide matched lines with file paths and offsets.' as PromptPart;