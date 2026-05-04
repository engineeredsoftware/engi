/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for converting attachments into Need and AssetPack evidence: agent assetpackdiscoverycomprehendattachments ptrrtry purpose"
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
 * intent: "Bitcode AssetPack discovery PromptPart for converting attachments into Need and AssetPack evidence: agent assetpackdiscoverycomprehendattachments ptrrtry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_try_clarity", "test": "Clear try purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYCOMPREHENDATTACHMENTS_PTRRTRY_PURPOSE: PromptPart = 
  'PTRR Try Step: extract structured attachment evidence for Need understanding, proof context, and AssetPack scope' as PromptPart;