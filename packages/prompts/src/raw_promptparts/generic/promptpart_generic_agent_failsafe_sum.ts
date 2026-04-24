/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Instruct substep to summarize multiple outputs into coherent whole"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.90 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.90 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_GENERIC_AGENT_FAILSAFE_SUM: PromptPart = 
  'Summarize multiple outputs into a coherent whole, preserving key information while reducing redundancy and maintaining logical structure.' as PromptPart;