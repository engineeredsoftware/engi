import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission PromptPart for danger-wall retry strategy"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_boundary", "test": "Retry strategy resolves admission without overclaiming proof.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_RETRY_STRATEGY: PromptPart =
  'Retry admission by narrowing the read boundary, requesting missing evidence, separating delivery-mechanism concerns from AssetPack content, identifying likely execution failure, and producing admit, block, or manual-review output without proof-closure claims.' as PromptPart;
