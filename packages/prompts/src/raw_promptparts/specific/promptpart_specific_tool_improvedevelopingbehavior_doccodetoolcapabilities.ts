import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities summary for improve_developing_behavior"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_IMPROVEDEVELOPINGBEHAVIOR_DOCCODETOOLCAPABILITIES: PromptPart =
  `Capabilities:
- Append or refresh instruction bullets inside .ai/AGENTS.md
- Maintain high-quality seeking questions for agents
- Optionally pull the latest AGENTS.md snapshot before applying updates
- Report whether changes were appended or replaced for downstream auditing` as PromptPart;