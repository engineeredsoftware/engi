/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing legacy system migration requirement extraction with architectural insights"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "legacy_migration_complexity", "test": "Does '{{content}}' demonstrate complex legacy migration requirement handling? Rate 0-1" },
 *   { "name": "architectural_pattern_recognition", "test": "Does '{{content}}' showcase architectural pattern recognition in requirements? Rate 0-1" },
 *   { "name": "systemic_integration_awareness", "test": "Is '{{content}}' aware of systemic integration requirements? Rate 0-1" },
 *   { "name": "progressive_sophistication", "test": "Does '{{content}}' show progressive sophistication over Example 1? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Legacy Banking System Modernization: extractRequirements({ taskDescription: [codebase: "legacy-cobol-system/", architecture: "modernization-blueprint.drawio", compliance: "banking-regulations.xml"], extractionDepth: "architectural", requirementTypes: ["migration", "compliance", "integration", "risk"], contextualFramework: "financial-services", prioritizationStrategy: "risk-weighted", implicitInferenceLevel: "systemic" }) → Returns RequirementFramework with data migration paths, regulatory compliance mappings, architectural transformation requirements, risk mitigation specifications, and cognitive dependency cascade analysis for progressive modernization strategy' as PromptPart;