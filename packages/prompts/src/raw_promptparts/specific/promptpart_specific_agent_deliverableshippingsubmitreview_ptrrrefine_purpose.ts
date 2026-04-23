/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode retained deliverable-compatibility PromptPart for delivery-wrapper separation over validated written assets: agent deliverableshippingsubmitreview ptrrrefine purpose"
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
 * intent: "Bitcode retained deliverable-compatibility PromptPart for delivery-wrapper separation over validated written assets: agent deliverableshippingsubmitreview ptrrrefine purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_refine_clarity", "test": "Clear refine purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGSUBMITREVIEW_PTRRREFINE_PURPOSE: PromptPart = 
  'PTRR Refine Step: improve results based on validation feedback for submit code review with comments suggestions and approval status' as PromptPart;