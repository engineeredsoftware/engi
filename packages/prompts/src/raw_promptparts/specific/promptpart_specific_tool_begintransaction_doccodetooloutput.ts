import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Doc-code-tool output contract for BeginTransaction helper"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure", "test": "Does it enumerate each documented artifact? Rate 0-1", "score": 0.93 },
 *   { "name": "rollback_visibility", "test": "Does it surface apply vs rollback readiness? Rate 0-1", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLOUTPUT: PromptPart =
  'Outputs structured plan, diff set, and status for apply/rollback flows' as PromptPart;
