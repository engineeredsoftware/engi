/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for Get File Content Tool"
 * current_version: "V26.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_transcendence", "test": "Do the parameters in '{{content}}' support technical content access scenarios beyond traditional file retrieval? Rate 0-1" },
 *   { "name": "ai_native_configuration", "test": "Are AI-native and intelligent content processing parameters comprehensively included in '{{content}}'? Rate 0-1" },
 *   { "name": "enterprise_orchestration", "test": "Do parameters support enterprise-scale content orchestration and autonomous system behaviors in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPARAMETERS: PromptPart = 
  'file_path: string | string[] (target file(s) with glob pattern support and recursive resolution), content_format?: "raw" | "parsed" | "semantic" | "vector_embedded" (processing depth), encoding_detection?: "auto" | "strict" | "permissive" (character encoding handling), analysis_scope?: "content_only" | "with_context" | "full_ecosystem" (analysis breadth), semantic_understanding?: boolean (enable AI-powered code comprehension), relationship_mapping?: "none" | "local" | "global" | "enterprise" (dependency analysis depth), cache_strategy?: "memory" | "distributed" | "persistent" | "system" (performance optimization), security_context?: object (access control and encryption requirements), transformation_pipeline?: string[] (content processing workflow), version_tracking?: "current" | "historical" | "predictive" (time-aware content access), collaboration_mode?: "isolated" | "shared" | "real_time" (concurrent access handling), and intelligence_level?: "basic" | "advanced" | "autonomous" | "technical" (AI processing sophistication)' as PromptPart;