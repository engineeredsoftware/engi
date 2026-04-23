/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Instruct substep to apply systematic logical reasoning to solve problems"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_GENERIC_AGENT_GENERATION_REASON: PromptPart = 
  'Apply systematic logical reasoning to analyze the problem, identify solution paths, determine the optimal approach with clear step-by-step analysis, and select any tools needed from the available usable tools.' as PromptPart;