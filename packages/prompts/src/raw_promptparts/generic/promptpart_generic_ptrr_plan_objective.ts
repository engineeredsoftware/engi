import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: ptrr
 * intent: "Generic PLAN step objective statement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "objective_clarity", "test": "Does it clearly state PLAN step purpose?", "score": 0.50 },
 *   { "name": "strategic_focus", "test": "Does it emphasize strategic planning?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_GENERIC_PTRR_PLAN_OBJECTIVE: PromptPart = 
  'analyze requirements and context to create a comprehensive execution strategy' as PromptPart;