/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Agent semantic unit: Deliverablevalidationreadytoshipcodechangereview Capabilities List"
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
 * intent: "capabilities list for Ready to Ship Code Change Review agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capabilities_list_clarity", "test": "Clear capabilities list?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEVALIDATIONREADYTOSHIPCODECHANGEREVIEW_CAPABILITIES_LIST: PromptPart = 
  'Capabilities: analyze context and requirements, validate inputs and outputs, handle edge cases gracefully, provide detailed feedback, support parallel processing, integrate with VCS platforms, maintain execution state' as PromptPart;