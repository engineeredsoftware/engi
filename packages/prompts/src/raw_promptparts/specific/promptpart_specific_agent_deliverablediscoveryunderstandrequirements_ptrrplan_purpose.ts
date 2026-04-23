/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Agent semantic unit: Deliverablediscoveryunderstandrequirements Ptrrplan Purpose"
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
 * intent: "PTRR plan step purpose for Understand Requirements agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_plan_clarity", "test": "Clear plan purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEDISCOVERYUNDERSTANDREQUIREMENTS_PTRRPLAN_PURPOSE: PromptPart = 
  'PTRR Plan Step: analyze context and create strategic approach for extract functional and non-functional requirements from task description' as PromptPart;