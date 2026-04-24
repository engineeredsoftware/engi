/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack validation PromptPart for design-document written assets entering Finish: agent assetpackvalidationreadytofinishdesigndocument requirements context"
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
 * intent: "Bitcode AssetPack validation PromptPart for design-document written assets entering Finish: agent assetpackvalidationreadytofinishdesigndocument requirements context"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirements_context_clarity", "test": "Clear requirements context?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKVALIDATIONREADYTOFINISHDESIGNDOCUMENT_REQUIREMENTS_CONTEXT: PromptPart = 
  'Requirements: prior validation results, expressed Need, written-asset metadata, repository evidence, proof obligations, delivery-mechanism target, and quality thresholds' as PromptPart;