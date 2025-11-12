import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_REFINE_ACCURACY_CRITERIA)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_REFINE_ACCURACY_CRITERIA: PromptPart = 
  'Accuracy criteria: precision/recall across tech labels, minimal misclassification, and explainability (why a label was chosen).' as PromptPart;