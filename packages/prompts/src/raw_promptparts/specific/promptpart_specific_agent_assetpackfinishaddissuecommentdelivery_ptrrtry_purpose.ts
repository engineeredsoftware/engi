/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack Finish delivery PromptPart for providing validated Need-satisfaction AssetPack synthesis artifacts through a delivery mechanism: agent assetpackfinishaddissuecommentdelivery ptrrtry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKFINISHADDISSUECOMMENTDELIVERY_PTRRTRY_PURPOSE: PromptPart =
  'Compose and post the comment. Include status, links, brief rationale, and next actions. Keep to a short paragraph or bullet list.' as PromptPart;
