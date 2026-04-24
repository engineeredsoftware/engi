/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for extract method tool"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain what the tool accomplishes? Rate 0-1" },
 *   { "name": "refactoring_benefit", "test": "Does '{{content}}' convey the code improvement benefits? Rate 0-1" },
 *   { "name": "use_case_coverage", "test": "Does '{{content}}' indicate when to use this tool? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLPURPOSE: PromptPart = 
  'Extracts selected code blocks into new methods or functions to improve code readability, reduce duplication, and create reusable components while maintaining existing functionality and preserving variable scope' as PromptPart;