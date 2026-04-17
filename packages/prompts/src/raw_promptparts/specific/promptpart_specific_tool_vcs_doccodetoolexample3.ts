/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing file operations migration from deprecated to VCS"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "file_ops_coverage", "test": "Does '{{content}}' mention all three file operations (create, update, delete)? Rate 0-1" },
 *   { "name": "vcs_methods_clarity", "test": "Does '{{content}}' clearly show the VCS method names for file operations? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - DEPRECATED file operations: Use vcsTools.createFile(), vcsTools.updateFile(), or vcsTools.deleteFile() instead of legacy file content tools' as PromptPart;