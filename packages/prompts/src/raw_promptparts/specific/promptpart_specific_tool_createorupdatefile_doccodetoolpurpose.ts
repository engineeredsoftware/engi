/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for Create Or Update File Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "dual_operation_clarity", "test": "Does '{{content}}' clearly articulate both create and update file operations? Rate 0-1" },
 *   { "name": "intelligent_automation", "test": "Does the purpose '{{content}}' emphasize intelligent file management automation? Rate 0-1" },
 *   { "name": "integration_focus", "test": "Does '{{content}}' highlight integration with development ecosystems? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLPURPOSE: PromptPart = 
  'Orchestrates intelligent file lifecycle management through atomic create/update operations, leveraging content analysis, conflict resolution, and metadata preservation to maintain codebase integrity while supporting collaborative development workflows with automated backup, versioning, and rollback capabilities across distributed version control systems' as PromptPart;