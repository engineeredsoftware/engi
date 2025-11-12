import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_LANGUAGE_PLAN_LINGUISTIC_ANALYSIS)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_LANGUAGE_PLAN_LINGUISTIC_ANALYSIS: PromptPart = 
  'Analyze input linguistics: syntax, semantics, entities, coreference, sentiment, and intent. Consider domain-specific vocabulary and multilingual cues; identify ambiguities and disambiguation strategies.' as PromptPart;