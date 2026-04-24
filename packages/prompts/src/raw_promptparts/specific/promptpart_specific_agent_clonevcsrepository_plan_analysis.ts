import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step analysis requirements for Clone VCS Repository agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_depth", "test": "Does it require comprehensive repository analysis?", "score": 0.45 },
 *   { "name": "risk_assessment", "test": "Are security and performance risks analyzed?", "score": 0.46 },
 *   { "name": "dependency_detection", "test": "Does it identify all repository dependencies?", "score": 0.44 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_PLAN_ANALYSIS: PromptPart = 
  'Perform pre-clone analysis: query repository statistics via provider APIs (size, commit count, branch count), verify credential permissions using provider-specific auth checks, assess network conditions through latency probes, evaluate disk space requirements with 2x safety margin, identify potential clone blockers (rate limits, geo-restrictions, maintenance windows)' as PromptPart;