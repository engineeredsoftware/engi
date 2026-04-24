import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution for Ready to Iterate agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_precision", "test": "Is execution precise?", "score": 0.36 },
 *   { "name": "operational_clarity", "test": "Are operations clear?", "score": 0.35 },
 *   { "name": "output_quality", "test": "Is output quality high?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_TRY_DIRECTIVES: PromptPart = 
  'Execute readiness validation through: prerequisite completion verification, resource availability checking, state consistency validation, dependency resolution confirmation, environment health assessment, continuation criteria evaluation, readiness signal generation' as PromptPart;