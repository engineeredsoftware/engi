import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Marks phase as setup for Repository Setup tool in Deliverables pipeline"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_accuracy", "test": "Correctly identifies SDIVS phase", "score": 0.50.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PHASE_SETUP: PromptPart =
  'setup' as PromptPart;
