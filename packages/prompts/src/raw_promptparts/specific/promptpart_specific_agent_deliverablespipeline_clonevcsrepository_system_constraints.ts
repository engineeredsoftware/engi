import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Constraints for Deliverables Clone VCS Repository agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "constraint_clarity", "test": "Constraints are actionable and precise", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_SYSTEM_CONSTRAINTS: PromptPart =
  'Do not perform destructive operations; remain provider-agnostic; ensure idempotent retries; record repository coordinates for later phases' as PromptPart;
