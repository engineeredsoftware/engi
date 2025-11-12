/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for inline variable tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain the tool's purpose? Rate 0-1" },
 *   { "name": "variable_inlining", "test": "Is variable inlining and replacement clearly mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "semantic_analysis", "test": "Is LSP semantic analysis mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_INLINEVARIABLE_DOCCODETOOLPURPOSE: PromptPart = 
  'Variable inlining by replacing all usages with variable definition using LSP semantic analysis for safe code simplification' as PromptPart;