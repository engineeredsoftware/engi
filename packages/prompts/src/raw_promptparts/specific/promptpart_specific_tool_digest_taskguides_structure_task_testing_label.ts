import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for testing guidance in Digest Task Guides"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it require unit/integration/e2e steps, flags, snapshots? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_TESTING_LABEL: PromptPart =
  'Testing: Unit/integration/e2e steps, flags, snapshots.' as PromptPart;
