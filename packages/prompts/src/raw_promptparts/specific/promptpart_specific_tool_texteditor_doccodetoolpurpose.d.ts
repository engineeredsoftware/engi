/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Purpose statement for text editor tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "atomic_emphasis", "test": "Does '{{content}}' emphasize atomic operations for safety? Rate 0-1", "score": 0.50 },
 *   { "name": "transaction_support", "test": "Does '{{content}}' mention transaction support capability? Rate 0-1", "score": 0.50 },
 *   { "name": "reliability_focus", "test": "Does '{{content}}' convey production-grade reliability? Rate 0-1", "score": 0.50 }
 * ]
 */
import type { PromptPart } from '../../parts/PromptPart';
export declare const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLPURPOSE: PromptPart;
