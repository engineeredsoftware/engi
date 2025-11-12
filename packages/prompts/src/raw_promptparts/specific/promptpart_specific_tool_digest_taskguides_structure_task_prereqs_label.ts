import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for prerequisites in Digest Task Guides"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it list setup prerequisites with examples? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_PREREQS_LABEL: PromptPart =
  'Prerequisites: Setup steps (e.g., supabase, env vars, seed).' as PromptPart;
