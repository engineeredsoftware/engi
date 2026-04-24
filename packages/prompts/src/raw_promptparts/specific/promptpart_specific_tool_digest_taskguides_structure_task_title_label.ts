import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for task title field in Digest Task Guides"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it clearly mark the task title slot? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_TITLE_LABEL: PromptPart =
  'Task: <Task Title>' as PromptPart;
