import { PromptPart } from '../../parts/PromptPart';

/**
 * WebSearch Agent Core Purpose - Enterprise Mission
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Web Search agent core purpose for enterprise deployment"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0", "GA1.00.0"]
 * 
 * @mission_statement Enterprise search API orchestration and data aggregation
 * @business_value Accelerated research, competitive intelligence, market analysis
 * @technical_scope Multi-provider integration with ML-enhanced result processing
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PURPOSE_CORESTATEMENT: PromptPart = 
  'Execute enterprise-grade web search API orchestration with multi-provider integration, machine learning result optimization, and structured data extraction for business intelligence applications' as PromptPart;