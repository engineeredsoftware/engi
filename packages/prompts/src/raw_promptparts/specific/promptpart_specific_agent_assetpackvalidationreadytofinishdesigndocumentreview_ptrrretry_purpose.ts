/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack validation PromptPart for design-review written assets entering Finish: agent assetpackvalidationreadytofinishdesigndocumentreview ptrrretry purpose"
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
 * intent: "Bitcode AssetPack validation PromptPart for design-review written assets entering Finish: agent assetpackvalidationreadytofinishdesigndocumentreview ptrrretry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_retry_clarity", "test": "Clear retry purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKVALIDATIONREADYTOFINISHDESIGNDOCUMENTREVIEW_PTRRRETRY_PURPOSE: PromptPart = 
  'PTRR Retry Step: recover a complete design-review written assets readiness decision when prior evidence is incomplete or inconsistent' as PromptPart;