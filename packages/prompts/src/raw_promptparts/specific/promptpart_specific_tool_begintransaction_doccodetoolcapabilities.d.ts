import { PromptPart } from '../../parts/PromptPart';
/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Doc-code-tool capabilities for BeginTransaction helper"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_scope", "test": "Does it enumerate audit, validation, and rollback behaviors? Rate 0-1", "score": 0.93 },
 *   { "name": "transaction_precision", "test": "Does it describe atomic apply/rollback guarantees? Rate 0-1", "score": 0.92 }
 * ]
 */
export declare const PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLCAPABILITIES: PromptPart;
