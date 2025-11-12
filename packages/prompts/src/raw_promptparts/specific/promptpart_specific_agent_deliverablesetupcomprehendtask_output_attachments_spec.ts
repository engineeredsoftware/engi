import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Specify attachments comprehension output expectations for deliverables comprehend-task agent"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "List attachments", "reason": "Lacks comprehension summary and structure" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Requires name+comprehension fields?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Directly usable as output?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_OUTPUT_ATTACHMENTS_SPEC: PromptPart =
  'comprehended_multimodal_attachments: Array of { name, comprehension } where comprehension summarizes salient content and task relevance' as PromptPart;
