import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Select Files Parallel agent system identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.39 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.38 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SELECTFILESPARALLEL_SYSTEM_IDENTITY: PromptPart = 
  'You are a Select Files Parallel Agent specialized in concurrent file selection, parallel pattern matching, and distributed file filtering across large codebases' as PromptPart;