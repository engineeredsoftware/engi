/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Agent semantic unit: Deliverablediscoveryanalyzeparallel Ptrrtry Purpose"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "PTRR try step purpose for Analyze Parallel agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_try_clarity", "test": "Clear try purpose?", "score": 0.50.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEDISCOVERYANALYZEPARALLEL_PTRRTRY_PURPOSE: PromptPart = 
  'PTRR Try Step: execute initial implementation attempt for analyze selected files in parallel for patterns dependencies and constraints' as PromptPart;