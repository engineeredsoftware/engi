/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Agent semantic unit: Deliverablediscoveryanalyzeparallel Ptrrretry Purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "PTRR retry step purpose for Analyze Parallel agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_retry_clarity", "test": "Clear retry purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEDISCOVERYANALYZEPARALLEL_PTRRRETRY_PURPOSE: PromptPart = 
  'PTRR Retry Step: ensure completion with guaranteed success for analyze selected files in parallel for patterns dependencies and constraints' as PromptPart;