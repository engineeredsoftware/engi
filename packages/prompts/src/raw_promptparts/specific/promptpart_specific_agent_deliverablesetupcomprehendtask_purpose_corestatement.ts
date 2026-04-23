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
  'Interpret the expressed need to extract constraints, satisfaction criteria, shipping expectations, and complexity posture using structured analysis' as PromptPart;
