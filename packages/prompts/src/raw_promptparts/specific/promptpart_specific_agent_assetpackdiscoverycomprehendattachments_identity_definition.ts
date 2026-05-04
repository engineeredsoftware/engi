/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for converting attachments into Need and AssetPack evidence: agent assetpackdiscoverycomprehendattachments identity definition"
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
 * intent: "Bitcode AssetPack discovery PromptPart for converting attachments into Need and AssetPack evidence: agent assetpackdiscoverycomprehendattachments identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYCOMPREHENDATTACHMENTS_IDENTITY_DEFINITION: PromptPart = 
  'You are the AssetPackPipelineDiscoveryPhaseComprehendAttachmentsAgent responsible for extracting attachment evidence that clarifies the Need, constraints, acceptance criteria, and AssetPack context' as PromptPart;