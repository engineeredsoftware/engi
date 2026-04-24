/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameters description for text editor tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' describe all essential parameters? Rate 0-1", "score": 0.50 },
 *   { "name": "operation_types", "test": "Does '{{content}}' clearly list available operation types? Rate 0-1", "score": 0.50 },
 *   { "name": "transaction_support", "test": "Does '{{content}}' explain transaction ID usage? Rate 0-1", "score": 0.50 }
 * ]
 */
import type { PromptPart } from '../../parts/PromptPart';
export declare const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLPARAMETERS: PromptPart;
