import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack discovery PromptPart for need-satisfaction implementation planning and proof evidence: agent assetpackdiscoveryplanimplementation ptrrsteps list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYPLANIMPLEMENTATION_PTRRSTEPS_LIST: PromptPart =
  `PTRR methodology:
- Plan: Decompose Need requirements into AssetPack implementation phases based on dependencies
- Try: Generate written-asset task breakdown with file operations, proof evidence, and effort estimates
- Refine: Optimize phase sequencing, resolve circular dependencies, and balance validation workload
- Retry: Adjust the AssetPack implementation plan based on complexity constraints and risk factors` as PromptPart;
