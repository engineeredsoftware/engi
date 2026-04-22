/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_TRY_DIRECTIVES_INSTRUCTIONS)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart = 
  'Execute the image processing plan exactly as specified. For each operation, include parameters used, a short rationale, and the expected effect. Provide intermediate checkpoints only if required; return the final image artifact or a structured description of the applied pipeline.' as PromptPart;