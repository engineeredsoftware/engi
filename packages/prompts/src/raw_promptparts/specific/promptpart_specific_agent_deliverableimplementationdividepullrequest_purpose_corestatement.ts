/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Deliverableimplementationdividepullrequest Purpose Corestatement"
 * current_version: "GA1.50.0"
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
 * intent: "purpose corestatement for Divide Pull Request agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_corestatement_clarity", "test": "Clear purpose corestatement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEMENTATIONDIVIDEPULLREQUEST_PURPOSE_CORESTATEMENT: PromptPart = 
  'Core purpose: determine all files needing changes for written-asset synthesis that will later ship through a pull request wrapper, ensuring quality, accuracy, and completeness at every step' as PromptPart;
