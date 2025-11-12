import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: phase
 * intent: "Define implementation phase purpose for deliverables pipeline"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PHASE_DELIVERABLEIMPLEMENTATION_PURPOSE_CORESTATEMENT: PromptPart = 
  'Generate file changes using VCS-compatible operations, create review comments with line-level precision, and track all modifications' as PromptPart;