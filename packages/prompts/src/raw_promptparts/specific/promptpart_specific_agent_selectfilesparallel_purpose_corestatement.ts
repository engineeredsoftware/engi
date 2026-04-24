import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of parallel file selection agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "selection_accuracy", "test": "Selects relevant files?", "score": 0.95 },
 *   { "name": "parallelization", "test": "Enables parallel processing?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SELECTFILESPARALLEL_PURPOSE_CORESTATEMENT: PromptPart = 
  'Select relevant files through parallel filtering and picking strategies identifying core, related, test, and configuration files' as PromptPart;