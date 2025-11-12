import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Specify DoD analysis output expectations for deliverables comprehend-task agent"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Return a summary", "reason": "Too vague, missing required fields and format" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Explicit, minimal, implementable format?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Actionable for LLM formatting?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_OUTPUT_DODANALYSIS_SPEC: PromptPart =
  'dod_analysis: concise analysis of the task/DoD covering intent, scope boundaries, implicit requirements, and key success conditions' as PromptPart;
