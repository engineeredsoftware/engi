/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode retained deliverable-compatibility PromptPart for delivery-wrapper separation over validated written assets: agent deliverableshippingcreateissue purpose corestatement"
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
 * intent: "Bitcode retained deliverable-compatibility PromptPart for delivery-wrapper separation over validated written assets: agent deliverableshippingcreateissue purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_corestatement_clarity", "test": "Clear purpose corestatement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGCREATEISSUE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Core purpose: create issue with design document on VCS platform ensuring quality accuracy and completeness at every step' as PromptPart;