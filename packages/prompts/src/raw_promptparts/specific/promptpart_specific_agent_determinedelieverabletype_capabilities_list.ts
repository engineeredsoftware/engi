import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define capabilities of deliverable type determination agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "classification_coverage", "test": "Covers all 4 types?", "score": 0.96 },
 *   { "name": "capability_completeness", "test": "Complete classification abilities?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIEVERABLETYPE_CAPABILITIES_LIST: PromptPart = 
  'Intent analysis for task classification, keyword pattern matching, context evaluation, PR versus Issue discrimination, review versus creation detection, confidence scoring with reasoning' as PromptPart;