/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for converting attachments into Need and AssetPack evidence: agent assetpackdiscoverycomprehendattachments requirements context"
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
 * intent: "Bitcode AssetPack discovery PromptPart for converting attachments into Need and AssetPack evidence: agent assetpackdiscoverycomprehendattachments requirements context"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirements_context_clarity", "test": "Clear requirements context?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYCOMPREHENDATTACHMENTS_REQUIREMENTS_CONTEXT: PromptPart = 
  'Requirements: definitionOfNeed, attachment metadata, repository context when available, Need acceptance criteria, proof thresholds, VCS credentials only when needed for evidence' as PromptPart;