/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack Finish delivery PromptPart for providing validated Need-satisfaction AssetPack synthesis artifacts through a delivery mechanism: agent assetpackfinishaddissuecommentdelivery requirements context"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKFINISHADDISSUECOMMENTDELIVERY_REQUIREMENTS_CONTEXT: PromptPart =
  'Comment must include: current status (pass/fail/blocked), precise links (PR, build, artifacts), brief justification/notes, and explicit next actions or ask. Avoid redundancy.' as PromptPart;
