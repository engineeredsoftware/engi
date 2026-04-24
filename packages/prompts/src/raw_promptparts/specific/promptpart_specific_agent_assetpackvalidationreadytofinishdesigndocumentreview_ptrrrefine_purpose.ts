/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack validation PromptPart for design-review written assets entering Finish: agent assetpackvalidationreadytofinishdesigndocumentreview ptrrrefine purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack validation PromptPart for design-review written assets entering Finish: agent assetpackvalidationreadytofinishdesigndocumentreview ptrrrefine purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_refine_clarity", "test": "Clear refine purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKVALIDATIONREADYTOFINISHDESIGNDOCUMENTREVIEW_PTRRREFINE_PURPOSE: PromptPart = 
  'PTRR Refine Step: improve the design-review written assets readiness decision using validation feedback and proof gaps' as PromptPart;