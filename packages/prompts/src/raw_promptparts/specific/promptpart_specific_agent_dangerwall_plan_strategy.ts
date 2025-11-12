import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Danger Wall agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_effectiveness", "test": "Does it enable effective planning?", "score": 0.38 },
 *   { "name": "planning_precision", "test": "Is the planning approach precise?", "score": 0.37 },
 *   { "name": "scope_determination", "test": "Does it properly determine scope?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_STRATEGY: PromptPart = 
  'Plan security analysis by determining: threat model scope and attack vectors, vulnerability scanning priorities, compliance requirements and standards, risk assessment methodology, security testing depth, critical asset identification' as PromptPart;