import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Adds Deliverables-specific capabilities for Repository Setup tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_clarity", "test": "Describes precise operational behaviors", "score": 0.50.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_CAPABILITIES_ADDENDUM: PromptPart =
  'Provider-agnostic clone with configurable depth; branch/ref selection; workspace path normalization; basic health validation hooks; integration with deliverables execution context' as PromptPart;
