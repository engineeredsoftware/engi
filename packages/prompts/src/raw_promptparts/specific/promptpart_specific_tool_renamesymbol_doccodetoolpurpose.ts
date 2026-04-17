/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for rename symbol tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain what symbol renaming is and when to use it? Rate 0-1" },
 *   { "name": "refactoring_context", "test": "Does '{{content}}' explain how this fits into code refactoring workflows? Rate 0-1" },
 *   { "name": "scope_understanding", "test": "Is it clear from '{{content}}' that this updates all references across the codebase? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLPURPOSE: PromptPart = 
  'Safely rename symbols (variables, functions, classes, types) across an entire codebase, automatically updating all references while preserving behavior and maintaining consistency' as PromptPart;