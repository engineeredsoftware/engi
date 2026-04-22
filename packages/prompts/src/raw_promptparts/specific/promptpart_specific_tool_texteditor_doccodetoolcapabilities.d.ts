/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities description for text editor tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "atomic_operations", "test": "Does '{{content}}' clearly describe atomic operation capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "safety_features", "test": "Does '{{content}}' highlight safety features like rollback and validation? Rate 0-1", "score": 0.50 },
 *   { "name": "comprehensive_coverage", "test": "Does '{{content}}' cover all major editing operations (create, update, delete, replace)? Rate 0-1", "score": 0.50 }
 * ]
 */
import type { PromptPart } from '../../parts/PromptPart';
export declare const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLCAPABILITIES: PromptPart;
