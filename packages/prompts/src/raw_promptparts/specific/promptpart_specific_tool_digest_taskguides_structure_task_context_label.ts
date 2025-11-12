import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for task context description in Digest Task Guides"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it capture the context requirement (location + importance)? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_CONTEXT_LABEL: PromptPart =
  'Context: Where it lives and why it matters.' as PromptPart;
