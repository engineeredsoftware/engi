import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of correct changes agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "harmonization", "test": "Harmonizes parallel changes?", "score": 0.95 },
 *   { "name": "issue_resolution", "test": "Fixes integration issues?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCHANGES_PURPOSE_CORESTATEMENT: PromptPart = 
  'Harmonize parallel file changes resolving conflicts, fixing inconsistencies, and ensuring cohesive implementation across all modified files' as PromptPart;