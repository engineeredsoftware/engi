/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Ptrr semantic unit: Try Substep Judge"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: ptrr
 * intent: "Generic judge substep for try step"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "substep_clarity", "test": "Clear substep purpose?", "score": 0.95 },
 *   { "name": "execution_guidance", "test": "Provides execution guidance?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_GENERIC_PTRR_TRY_SUBSTEP_JUDGE: PromptPart = 
  'PTRR Try SubStep judge: evaluate quality and correctness of reasoning output' as PromptPart;