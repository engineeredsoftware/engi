import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define detection heuristics for tech identification"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "heuristic_precision", "test": "Are detection heuristics specific and measurable? Rate 0-1", "score": 0.93 },
 *   { "name": "scoring_methodology", "test": "Is the scoring approach well-defined? Rate 0-1", "score": 0.91 },
 *   { "name": "pattern_matching", "test": "Are pattern matching techniques clear? Rate 0-1", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_HEURISTICS_DETAILCONTENT: PromptPart = 
  `DETECTION HEURISTICS:
- Apply weighted scoring based on file count, import frequency, config presence
- Use fingerprinting for common patterns (React JSX, Angular decorators, Vue templates)
- Cross-reference with GitHub Linguist language detection rules` as PromptPart;