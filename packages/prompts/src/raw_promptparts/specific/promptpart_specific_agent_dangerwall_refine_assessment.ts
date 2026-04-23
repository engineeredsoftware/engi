import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission compatibility PromptPart for danger-wall refine assessment"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_traceability", "test": "Refine assessment improves source-traceable admission evidence.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_REFINE_ASSESSMENT: PromptPart =
  'Assess refined admission posture by checking evidence traceability, unresolved high-severity concerns, proof-gap clarity, scope fit, delivery-wrapper fit, and whether manual review is required.' as PromptPart;
