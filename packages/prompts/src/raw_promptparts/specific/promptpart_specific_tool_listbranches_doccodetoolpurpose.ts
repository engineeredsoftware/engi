/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for List Branches Tool"
 * current_version: "V26.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "navigation_purpose_clarity", "test": "Does '{{content}}' clearly articulate intelligent repository navigation and discovery? Rate 0-1" },
 *   { "name": "analysis_intelligence", "test": "Does the purpose '{{content}}' emphasize intelligent branch analysis and insights? Rate 0-1" },
 *   { "name": "workflow_optimization", "test": "Does '{{content}}' highlight optimization of development workflow navigation? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLPURPOSE: PromptPart = 
  'Transforms repository exploration through intelligent branch discovery and analysis, providing comprehensive visibility into development workflows with automated branch categorization, activity pattern recognition, merge readiness assessment, and collaborative insights to optimize team coordination, reduce context switching, and accelerate development velocity across distributed version control environments' as PromptPart;