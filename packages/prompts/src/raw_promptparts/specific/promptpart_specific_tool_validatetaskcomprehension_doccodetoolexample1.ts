/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing distributed system comprehension validation with meta-cognitive assessment"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "distributed_system_validation_demonstration", "test": "Does '{{content}}' demonstrate distributed system comprehension validation capability? Rate 0-1" },
 *   { "name": "meta_cognitive_assessment_showcase", "test": "Does '{{content}}' showcase meta-cognitive assessment beyond standard validation? Rate 0-1" },
 *   { "name": "holistic_integration_relevance", "test": "Is '{{content}}' relevant for holistic task comprehension scenarios? Rate 0-1" },
 *   { "name": "transcendent_quality_example", "test": "Does '{{content}}' exemplify transcendent comprehension validation quality? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Microservices Architecture Migration Validation: validateTaskComprehension({ comprehensionArtifacts: [requirements: "extracted-requirements.json", constraints: "system-constraints.yaml", criteria: "success-criteria.xml"], validationDepth: "meta-cognitive", coherenceThreshold: "high-alignment", integrationScope: "cross-dimensional", gapDetectionSensitivity: "comprehensive", verificationFramework: "holistic-assessment" }) → Returns ValidationReport with 97% comprehension completeness, requirement-constraint coherence verification, success criteria alignment confirmation, identified cognitive gaps in service mesh understanding, meta-cognitive assessment of architectural comprehension depth, and readiness indicators for migration planning' as PromptPart;