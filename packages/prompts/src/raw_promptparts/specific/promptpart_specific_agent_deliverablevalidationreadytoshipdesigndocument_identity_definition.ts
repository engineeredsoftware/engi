/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need satisfaction, written-asset validation, and proof evidence: agent deliverablevalidationreadytoshipdesigndocument identity definition"
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
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need satisfaction, written-asset validation, and proof evidence: agent deliverablevalidationreadytoshipdesigndocument identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEVALIDATIONREADYTOSHIPDESIGNDOCUMENT_IDENTITY_DEFINITION: PromptPart = 
  'You are the DeliverablesPipelineValidationPhaseReadytoShipDesignDocumentAgent responsible for validate design document ready for stakeholder review' as PromptPart;