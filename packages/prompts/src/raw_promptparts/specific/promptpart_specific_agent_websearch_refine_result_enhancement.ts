/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search result refinement"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "refinement_precision", "test": "Enhances findings into evidence useful for downstream Bitcode owners", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_REFINE_RESULT_ENHANCEMENT: PromptPart =
  'Enhance findings with source class, quality score, contradiction notes, volatility risk, missing-primary-source warnings, and explicit evidence-use text for read synthesis.' as PromptPart;
