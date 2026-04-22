/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output description for text editor tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "success_indication", "test": "Does '{{content}}' clearly describe success/failure indication? Rate 0-1", "score": 0.50 },
 *   { "name": "transaction_tracking", "test": "Does '{{content}}' explain transaction ID in output? Rate 0-1", "score": 0.50 },
 *   { "name": "error_details", "test": "Does '{{content}}' mention error information availability? Rate 0-1", "score": 0.50 }
 * ]
 */
import type { PromptPart } from '../../parts/PromptPart';
export declare const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLOUTPUT: PromptPart;
