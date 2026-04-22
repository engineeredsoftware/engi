/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output specification for replace file tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_clarity", "test": "Does '{{content}}' clearly describe what the tool returns? Rate 0-1", "score": 0.50 },
 *   { "name": "error_handling", "test": "Does '{{content}}' explain error cases? Rate 0-1", "score": 0.50 }
 * ]
 */
import type { PromptPart } from '../../parts/PromptPart';
export declare const PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLOUTPUT: PromptPart;
