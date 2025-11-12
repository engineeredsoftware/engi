import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR steps for VCS clone agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_clarity", "test": "Each step clearly defined?", "score": 0.95 },
 *   { "name": "ptrr_alignment", "test": "Follows PTRR pattern correctly?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVSREPOSITORY_PTRRSTEPS_LIST: PromptPart = 
  'Plan: Analyze repository URL and determine clone strategy. Try: Execute git clone with appropriate depth and authentication. Refine: Verify checkout and handle submodules. Retry: Resolve any clone failures with fallback strategies' as PromptPart;