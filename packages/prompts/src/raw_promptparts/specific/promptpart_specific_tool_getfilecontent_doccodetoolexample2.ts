/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Advanced usage example for Get File Content Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "advanced_intelligence", "test": "Does the example in '{{content}}' showcase advanced AI-driven content intelligence and ecosystem analysis? Rate 0-1" },
 *   { "name": "predictive_capabilities", "test": "Does '{{content}}' demonstrate predictive capabilities and autonomous recommendations? Rate 0-1" },
 *   { "name": "enterprise_orchestration", "test": "Are enterprise-scale orchestration and cross-system intelligence prominently featured in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Ecosystem-wide architecture analysis: getFileContent({ file_path: "config/**/*.{yml,json,env}", content_format: "vector_embedded", relationship_mapping: "enterprise", intelligence_level: "advanced", analysis_scope: "full_ecosystem" }) → Processes 47 configuration files across microservices architecture, constructs knowledge graph revealing 12 inconsistent security policies, predicts 3 potential failure modes based on configuration drift patterns, generates automated remediation plan affecting 23 services, and provides executive dashboard with risk assessment and modernization roadmap for cloud-native transformation' as PromptPart;