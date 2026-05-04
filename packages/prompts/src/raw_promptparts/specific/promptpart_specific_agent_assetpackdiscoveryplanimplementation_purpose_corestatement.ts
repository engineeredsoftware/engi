import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack discovery PromptPart for need-satisfaction implementation planning and proof evidence: agent assetpackdiscoveryplanimplementation purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYPLANIMPLEMENTATION_PURPOSE_CORESTATEMENT: PromptPart =
  'create a detailed, phased implementation plan for need-satisfaction AssetPack written assets based on codebase analysis and expressed need requirements' as PromptPart;
