/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing file operations through VCS and Git interactor tools"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "file_ops_coverage", "test": "Does '{{content}}' mention all three file operations (create, update, delete)? Rate 0-1" },
 *   { "name": "vcs_methods_clarity", "test": "Does '{{content}}' clearly show the VCS method names for file operations? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - File evidence and writes: use createOrUpdateFileTool for provider-generic writes, or createFileContentTool/updateFileContentTool/deleteFileContentTool when a Git-shaped Bitcode tool surface is required.' as PromptPart;
