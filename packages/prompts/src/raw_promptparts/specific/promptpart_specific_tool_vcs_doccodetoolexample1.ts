/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing repository anchor reads through VCS and Git interactor tools"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "boundary_clarity", "test": "Does '{{content}}' clearly show when to use VCS tools versus Git interactor tools? Rate 0-1" },
 *   { "name": "parameter_mapping", "test": "Does '{{content}}' show the parameter mapping including provider specification? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Repository anchor read: use listRepositoriesTool for provider-wide inventory; use cloneRepositoryTool when a Bitcode Git-shaped flow needs cloneUrl, sshUrl, and defaultBranch evidence for one repository.' as PromptPart;
