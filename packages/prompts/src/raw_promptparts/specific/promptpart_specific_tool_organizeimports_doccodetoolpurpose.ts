/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for organize imports tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain the tool's purpose? Rate 0-1" },
 *   { "name": "import_optimization", "test": "Is import optimization and cleanup clearly mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "formatting_standardization", "test": "Is formatting standardization mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLPURPOSE: PromptPart = 
  'Import statement optimization, sorting, and cleanup with unused import removal and formatting standardization' as PromptPart;