/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack Finish delivery PromptPart for providing validated Need-satisfaction AssetPack synthesis artifacts through a delivery mechanism: agent assetpackfinishcreateissuedelivery requirements context"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack Finish delivery PromptPart for providing validated Need-satisfaction AssetPack synthesis artifacts through a delivery mechanism: agent assetpackfinishcreateissuedelivery requirements context"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirements_context_clarity", "test": "Clear requirements context?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKFINISHCREATEISSUEDELIVERY_REQUIREMENTS_CONTEXT: PromptPart = 
  'Requirements: execution context from prior phases, expressed Bitcode Need and Definition of Need, codebase metadata, VCS credentials when applicable, validation criteria, quality thresholds' as PromptPart;