import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Finalize Shipment agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_context_utilization", "test": "Does plan analysis maximize context value?", "score": 0.40 },
 *   { "name": "plan_state_preservation", "test": "Does plan analysis maintain execution continuity?", "score": 0.39 },
 *   { "name": "plan_intelligence_accumulation", "test": "Does plan analysis build on accumulated wisdom?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FINALIZESHIPMENT_PLAN_ANALYSIS: PromptPart = 
  'Analyze full pipeline context for finalization: validation results across all phases, quality metrics from every checkpoint, risk assessments from all analyses, performance baselines from benchmarks, security clearances from scans, stakeholder approvals from reviews' as PromptPart;