import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR Retry step generic purpose"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.47 },
 *   { "name": "minimal_scope", "test": "Is it minimal and broadly applicable?", "score": 0.48 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_STEP_RETRY_PURPOSE: PromptPart = 
  'Finalize with comprehensive results' as PromptPart;