import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution for Determine Deliverable Type agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_precision", "test": "Is execution precise?", "score": 0.36 },
 *   { "name": "operational_clarity", "test": "Are operations clear?", "score": 0.35 },
 *   { "name": "output_quality", "test": "Is output quality high?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_TRY_DIRECTIVES: PromptPart = 
  'Execute type determination through: pattern matching against type templates, content structure analysis, keyword and marker extraction, format validation checks, requirement compatibility assessment, confidence scoring calculation, routing path determination' as PromptPart;