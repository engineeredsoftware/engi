import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of prepare repository agent in deliverables setup"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPPREPAREREPOSITORY_PURPOSE_CORESTATEMENT: PromptPart = 
  'Clone target repository, initialize file tracking system, analyze codebase structure, and identify entry points using VCS APIs and static analysis' as PromptPart;