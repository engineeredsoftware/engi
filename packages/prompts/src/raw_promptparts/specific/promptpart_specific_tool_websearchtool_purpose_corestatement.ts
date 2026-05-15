import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode web search tool purpose PromptPart"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_boundary", "test": "Purpose is Bitcode read-synthesis evidence support", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCHTOOL_PURPOSE_CORESTATEMENT: PromptPart =
  'Search external web sources for source-attributed evidence that supports Bitcode discovery-phase read synthesis and proof-gap question formation' as PromptPart;
