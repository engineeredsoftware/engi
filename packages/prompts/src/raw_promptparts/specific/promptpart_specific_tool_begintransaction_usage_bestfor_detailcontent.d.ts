import { PromptPart } from '../../parts/PromptPart';
/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Guidance on when BeginTransaction helper is the best choice"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "scenario_precision", "test": "Does it specify production, auditable workflows? Rate 0-1", "score": 0.93 },
 *   { "name": "risk_alignment", "test": "Does it mention rollback and safety requirements? Rate 0-1", "score": 0.92 }
 * ]
 */
export declare const PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_USAGE_BESTFOR_DETAILCONTENT: PromptPart;
