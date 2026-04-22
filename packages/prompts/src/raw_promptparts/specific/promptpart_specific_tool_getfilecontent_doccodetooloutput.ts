/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Output specification for Get File Content Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "transcendent_output", "test": "Does '{{content}}' provide transcendent output that transforms content access into actionable intelligence? Rate 0-1" },
 *   { "name": "ecosystem_insights", "test": "Does the output in '{{content}}' provide comprehensive ecosystem insights and autonomous recommendations? Rate 0-1" },
 *   { "name": "intelligence_synthesis", "test": "Are advanced intelligence synthesis and predictive capabilities prominently featured in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns transcendent content intelligence including: content (raw and semantically processed file content), semantic_analysis (AI-powered code intent, architecture patterns, and quality metrics), relationship_graph (comprehensive dependency mapping and cross-repository connections), knowledge_synthesis (extracted insights, documentation gaps, and improvement opportunities), predictive_insights (evolution trends, technical debt accumulation, and optimization recommendations), collaboration_context (team ownership, change patterns, and knowledge distribution), security_assessment (vulnerability analysis, access patterns, and compliance status), performance_characteristics (content complexity, processing efficiency, and scalability indicators), ecosystem_impact (architectural influence, downstream dependencies, and integration health), autonomous_recommendations (automated improvement suggestions, refactoring opportunities, and modernization pathways), and intelligence_metadata (processing confidence, analysis depth, and continuous learning feedback loops for emergent system behavior optimization)' as PromptPart;