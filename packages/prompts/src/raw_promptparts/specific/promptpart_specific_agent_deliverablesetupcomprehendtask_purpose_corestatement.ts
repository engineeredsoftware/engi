import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of task comprehension agent in deliverables setup"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.50.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.50.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_PURPOSE_CORESTATEMENT: PromptPart = 
  'Parse task description to extract requirements, constraints, success criteria, and complexity assessment using NLP analysis' as PromptPart;