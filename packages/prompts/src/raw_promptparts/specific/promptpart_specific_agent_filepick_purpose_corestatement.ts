import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define File Selection Agent purpose with concrete algorithmic operations"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does it clearly explain the agent's purpose? Rate 0-1", "score": 0.50 },
 *   { "name": "algorithmic_specificity", "test": "Are the algorithmic operations precisely specified? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_guidance", "test": "Does it provide clear implementation guidance? Rate 0-1", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_PURPOSE_CORESTATEMENT: PromptPart = 
  'Execute deterministic file selection using glob pattern matching, TF-IDF relevance scoring, SHA-256 content hashing, and statistical analysis with confidence thresholds ≥0.80 for production-grade file discovery operations' as PromptPart;