import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Base prompt for generating Task Guides (JSON array of {title, guide})"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "json_array_output", "test": "Specifies JSON-only output with schema", "score": 0.48 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_BASE_CORE: PromptPart = (
  'Generate a JSON array of Task Guides where each item has { "title": string, "guide": Markdown }, strictly outputting only the JSON array.'
) as PromptPart;
