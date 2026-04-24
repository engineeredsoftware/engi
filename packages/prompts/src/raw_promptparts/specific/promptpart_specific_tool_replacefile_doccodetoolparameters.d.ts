/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter specification for replace file tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Are all parameters clearly specified with types? Rate 0-1", "score": 0.50 },
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' include all necessary parameters? Rate 0-1", "score": 0.50 }
 * ]
 */
import type { PromptPart } from '../../parts/PromptPart';
export declare const PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLPARAMETERS: PromptPart;
