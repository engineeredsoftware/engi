/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Deliverableimplementationdividepullrequest Ptrrplan Purpose"
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
 * intent: "PTRR plan step purpose for Divide Pull Request agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_plan_clarity", "test": "Clear plan purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEMENTATIONDIVIDEPULLREQUEST_PTRRPLAN_PURPOSE: PromptPart = 
  'PTRR Plan Step: analyze context and create a strategic approach for determining file changes needed to synthesize validated written assets for a pull request shipping wrapper' as PromptPart;
