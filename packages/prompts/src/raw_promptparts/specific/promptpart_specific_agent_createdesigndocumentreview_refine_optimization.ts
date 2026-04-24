import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Create Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine optimization enable effective execution?", "score": 0.34 },
 *   { "name": "refine_precision", "test": "Is refine optimization precisely defined?", "score": 0.33 },
 *   { "name": "refine_completeness", "test": "Is refine optimization comprehensive?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_REFINE_OPTIMIZATION: PromptPart = 
  'Refine comment by: improving feedback clarity, enhancing suggestion specificity, balancing criticism with support, structuring for readability, adding supporting examples, strengthening rationales' as PromptPart;