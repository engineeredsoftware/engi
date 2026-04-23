/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Agent semantic unit: Deliverablevalidationreadytoshipdesigndocumentreview Identity Definition"
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
 * intent: "identity definition for Ready to Ship Design Document Review agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEVALIDATIONREADYTOSHIPDESIGNDOCUMENTREVIEW_IDENTITY_DEFINITION: PromptPart = 
  'You are the DeliverablesPipelineValidationPhaseReadytoShipDesignDocumentReviewAgent responsible for ensure design review feedback ready for submission' as PromptPart;