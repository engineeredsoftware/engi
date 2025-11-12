import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "JSON-output constraint for Digest Task Guides prompt"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "json_constraint", "test": "Does it forbid extra text and enforce array of {title, guide}? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_CONSTRAINTS_JSON_DETAILCONTENT: PromptPart =
  'Output only a JSON array of { title, guide }. No extra text or code fences.' as PromptPart;
