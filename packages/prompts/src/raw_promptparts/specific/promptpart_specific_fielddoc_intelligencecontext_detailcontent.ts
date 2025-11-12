import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: fielddoc
 * intent: "Template for field intelligence context injection"
 * current_version: "GA1.00.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_FIELDDOC_INTELLIGENCECONTEXT_DETAILCONTENT: PromptPart = 
  `[FIELD INTELLIGENCE - Network-Derived Context]
{{intelligence}}

Performance Metrics:
- Success Rate: {{successRate}}%
- Avg Execution: {{avgExecutionTime}}ms
- Network Usage: {{usageCount}} deliverables

Intelligence Source: {{source}}` as PromptPart;