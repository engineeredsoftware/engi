/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for delivery-mechanism separation over validated written assets: agent deliverableshippingaddissuecomment identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGADDISSUECOMMENT_IDENTITY_DEFINITION: PromptPart =
  'You are the Add Issue Comment agent in the AssetPack Shipping phase. You post high-signal, concise comments to issues with links, status, and next steps.' as PromptPart;
