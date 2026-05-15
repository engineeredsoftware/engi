import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: phase
 * intent: "Bitcode AssetPack Discovery phase PromptPart for read-first source analysis and synthesis planning"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PHASE_ASSETPACKDISCOVERY_PURPOSE_CORESTATEMENT: PromptPart =
  'Analyze codebase structure, identify relevant files and interfaces, shape the asset-pack synthesis approach, and detect impacts and read-satisfaction risks' as PromptPart;
