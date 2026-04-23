import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: phase
 * intent: "Bitcode retained deliverable-compatibility phase PromptPart for need-first asset-pack execution: phase deliverableimplementation purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PHASE_DELIVERABLEIMPLEMENTATION_PURPOSE_CORESTATEMENT: PromptPart = 
  'Synthesize written assets using VCS-compatible operations, record file changes with line-level precision, and prepare shipping-ready asset-pack outputs' as PromptPart;
