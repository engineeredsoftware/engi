import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Validate Design Document Review agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine optimization ensure quality?", "score": 0.35 },
 *   { "name": "refine_reliability", "test": "Is refine optimization reliable?", "score": 0.34 },
 *   { "name": "refine_completeness", "test": "Does refine optimization cover all cases?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENTREVIEW_REFINE_OPTIMIZATION: PromptPart = 
  'Refine validation by: improving coverage detection algorithms, enhancing quality scoring methods, optimizing engagement metrics, strengthening concern tracking, deepening quality analysis, streamlining validation workflow' as PromptPart;