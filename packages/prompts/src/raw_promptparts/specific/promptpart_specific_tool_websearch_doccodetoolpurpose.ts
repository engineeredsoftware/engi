/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Bitcode need-synthesis web search tool purpose"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_actionability", "test": "Explains when Bitcode should use web search", "score": 1.00 },
 *   { "name": "proof_boundary", "test": "States search evidence is auxiliary", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLPURPOSE: PromptPart =
  'Search the web for source-attributed external evidence that supports Bitcode discovery-phase need synthesis; the results are auxiliary context for downstream need and proof owners, not proof closure by themselves' as PromptPart;
