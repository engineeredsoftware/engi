import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode web search tool identity compatibility PromptPart"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_boundary", "test": "Identity states Bitcode evidence support", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCHTOOL_IDENTITY_CORESTATEMENT: PromptPart =
  'a Bitcode discovery-phase web search evidence support tool' as PromptPart;
