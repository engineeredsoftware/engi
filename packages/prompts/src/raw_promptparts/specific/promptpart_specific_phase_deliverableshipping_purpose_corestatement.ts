import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: phase
 * intent: "Define shipping phase purpose for deliverables pipeline"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PHASE_DELIVERABLESHIPPING_PURPOSE_CORESTATEMENT: PromptPart = 
  'Create VCS pull request with tracked file changes, generate PR description from validation results, and store deliverable URL' as PromptPart;