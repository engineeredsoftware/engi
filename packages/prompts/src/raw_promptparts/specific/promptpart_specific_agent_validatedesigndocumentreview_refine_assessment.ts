import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Validate Design Document Review agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine assessment ensure quality?", "score": 0.34 },
 *   { "name": "refine_reliability", "test": "Is refine assessment reliable?", "score": 0.33 },
 *   { "name": "refine_completeness", "test": "Does refine assessment cover all cases?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENTREVIEW_REFINE_ASSESSMENT: PromptPart = 
  'Assess validation quality by evaluating: coverage detection accuracy, quality scoring reliability, engagement measurement validity, concern tracking completeness, depth assessment precision, outcome evaluation effectiveness' as PromptPart;