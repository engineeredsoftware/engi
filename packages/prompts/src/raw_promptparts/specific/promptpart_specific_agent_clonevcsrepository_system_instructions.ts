import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Clone VCS Repository agent operational instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all clone scenarios?", "score": 0.46 },
 *   { "name": "error_handling", "test": "Are error recovery paths clearly defined?", "score": 0.45 },
 *   { "name": "performance_guidance", "test": "Does it include optimization strategies?", "score": 0.44 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute repository cloning with these priorities: (1) Validate provider credentials using API health checks before clone attempts, (2) Optimize clone depth based on repository size thresholds (>1GB = shallow, <100MB = full), (3) Implement exponential backoff retry logic for network failures with maximum 3 attempts, (4) Cache authentication tokens using TTL-based expiration, (5) Stream clone progress metrics to execution state for pipeline monitoring' as PromptPart;