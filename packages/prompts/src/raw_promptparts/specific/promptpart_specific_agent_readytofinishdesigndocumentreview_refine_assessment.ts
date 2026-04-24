import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode ReadyToFinish PromptPart for need satisfaction, written-asset integrity, asset-pack proof evidence, and delivery admission"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine assessment ensure production quality?", "score": 0.35 },
 *   { "name": "refine_reliability", "test": "Is refine assessment consistently reliable?", "score": 0.34 },
 *   { "name": "refine_completeness", "test": "Does refine assessment cover edge cases?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOFINISHDESIGNDOCUMENTREVIEW_REFINE_ASSESSMENT: PromptPart = 
  'Assess certification quality by evaluating: coverage completeness scores, feedback incorporation rates, consensus achievement metrics, resolution effectiveness, closure efficiency, quality compliance levels' as PromptPart;