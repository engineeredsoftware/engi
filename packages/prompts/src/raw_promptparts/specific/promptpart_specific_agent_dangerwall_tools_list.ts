import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission PromptPart for danger-wall tools list"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_boundary", "test": "Tools are evidence support only.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_TOOLS_LIST: PromptPart =
  `Admitted tool posture:
- Prefer already-collected repository evidence, external evidence, attachment summaries, and execution state
- Request only evidence-gathering tools needed to resolve admission ambiguity
- Do not request mutation, delivery, proof-generation, or product-state tools from this agent
- Record tool requests as reasons for admit, block, or manual review` as PromptPart;
