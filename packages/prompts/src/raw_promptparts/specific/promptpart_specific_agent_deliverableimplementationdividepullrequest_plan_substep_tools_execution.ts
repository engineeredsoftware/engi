/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode tool-execution substep for written-asset inspection, change, validation, and proof capture: deliverableimplementationdividepullrequest plan substep tools execution"
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
 * intent: "Bitcode tool-execution substep for written-asset inspection, change, validation, and proof capture: deliverableimplementationdividepullrequest plan substep tools execution"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEMENTATIONDIVIDEPULLREQUEST_PLAN_SUBSTEP_TOOLS_EXECUTION: PromptPart = 
  'deliverableimplementationdividepullrequest plan substep tools execution: invoke only tools required to inspect, change, validate, or package the written asset; preserve parameters and results for Bitcode execution records and proof reread.' as PromptPart;