/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Instruct substep to break large inputs into logical manageable chunks"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.92 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.92 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_GENERIC_AGENT_FAILSAFE_CHUNK: PromptPart = 
  'Break large inputs into logical, manageable chunks that can be processed independently while maintaining dependencies and relationships between chunks.' as PromptPart;