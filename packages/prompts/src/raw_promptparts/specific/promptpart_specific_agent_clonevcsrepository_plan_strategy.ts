import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Clone VCS Repository agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "planning_clarity", "test": "Does it enable clear clone operation planning?", "score": 0.46 },
 *   { "name": "strategy_completeness", "test": "Are all clone scenarios covered in planning?", "score": 0.45 },
 *   { "name": "decision_guidance", "test": "Does it guide authentication and protocol selection?", "score": 0.45 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_PLAN_STRATEGY: PromptPart = 
  'Analyze repository metadata to determine optimal clone strategy: evaluate repository size from API endpoints, select authentication method based on available credentials (SSH keys > OAuth tokens > HTTPS), choose clone depth based on pipeline requirements (full for analysis, shallow for quick operations), identify submodule dependencies from .gitmodules, plan cache utilization for repeated clones' as PromptPart;