/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Complex integration example for Get File Content Tool"
 * current_version: "V26.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_intelligence", "test": "Does the example in '{{content}}' demonstrate technical AI intelligence that supports enterprise-scale development? Rate 0-1" },
 *   { "name": "auditable_improvement", "test": "Does '{{content}}' show auditable system improvement and measurable technical behavior? Rate 0-1" },
 *   { "name": "asset_pack_readiness", "test": "Are reviewable AssetPack capabilities and reliable development approaches showcased in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Enterprise technical-knowledge orchestration: getFileContent({ file_path: ["global-platform/**/*", "retired-systems/**/*", "ml-pipelines/**/*"], content_format: "vector_embedded", semantic_understanding: true, relationship_mapping: "enterprise", intelligence_level: "technical", analysis_scope: "full_ecosystem", collaboration_mode: "real_time", version_tracking: "predictive" }) -> Orchestrates analysis of 50,000+ files across 200 repositories in real time, constructs comprehensive enterprise knowledge graph revealing architectural change patterns spanning 5 years, uses technical planning algorithms to predict optimal migration pathways for 15 retired systems, generates modernization recommendations affecting $50M+ infrastructure investment, coordinates cross-team implementation workflows across 45 development squads, and establishes measurable system architecture that continuously improves performance, security, and maintainability through auditable AI-assisted behavior while maintaining regulatory compliance across 12 international markets' as PromptPart;
