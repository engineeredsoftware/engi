import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: phase
 * intent: "Bitcode AssetPack Setup phase PromptPart for need-first repository, interface, and execution-state preparation"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PHASE_ASSETPACKSETUP_PURPOSE_CORESTATEMENT: PromptPart =
  'Initialize repository workspace, understand the expressed need, establish connected-interface constraints, and prepare file tracking state for written-asset synthesis' as PromptPart;
