import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define VCS agent PTRR steps"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0", "V26.47.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VCS_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Execute API status checks, history analysis to determine repository state and branch strategy
Try: Execute provider API calls (merge, rebase, branch) with conflict detection via API algorithms
Refine: Validate operations using API validation endpoints, diff analysis, and webhook validation
Retry: Re-execute failed operations with API error handling and merge conflict resolution` as PromptPart;