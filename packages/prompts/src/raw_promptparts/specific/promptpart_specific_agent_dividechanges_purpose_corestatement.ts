import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of divide changes agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "division_clarity", "test": "Clear work division strategy?", "score": 0.95 },
 *   { "name": "parallelization", "test": "Enables parallel execution?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECHANGES_PURPOSE_CORESTATEMENT: PromptPart = 
  'Divide implementation work into file-level tasks identifying dependencies and parallelization opportunities for efficient execution' as PromptPart;