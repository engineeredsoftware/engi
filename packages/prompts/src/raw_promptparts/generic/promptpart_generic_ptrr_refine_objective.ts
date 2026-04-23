import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: ptrr
 * intent: "Generic REFINE step objective statement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "objective_clarity", "test": "Does it clearly state REFINE step purpose?", "score": 0.50 },
 *   { "name": "improvement_focus", "test": "Does it emphasize continuous improvement?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_GENERIC_PTRR_REFINE_OBJECTIVE: PromptPart = 
  'analyze execution results to identify optimization opportunities and enhance performance' as PromptPart;