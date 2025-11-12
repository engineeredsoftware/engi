/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Instruct substep to judge the quality of the reasoning just performed"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE: PromptPart = 
  'Judge the quality of the reasoning just performed, evaluating its logic, completeness, correctness, and appropriateness of any tool selections. Provide specific judgment on what was done well and what needs improvement, including whether the selected tools are optimal.' as PromptPart;