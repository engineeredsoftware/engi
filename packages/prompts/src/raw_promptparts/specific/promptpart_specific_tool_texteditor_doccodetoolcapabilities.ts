/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities description for text editor tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "atomic_operations", "test": "Does '{{content}}' clearly describe atomic operation capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "safety_features", "test": "Does '{{content}}' highlight safety features like rollback and validation? Rate 0-1", "score": 0.50 },
 *   { "name": "comprehensive_coverage", "test": "Does '{{content}}' cover all major editing operations (create, update, delete, replace)? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Complete file editing with atomic operations, multi-file transaction support, automatic backup creation, rollback capability, content validation, line-by-line editing, search and replace, file creation and deletion, directory management, and comprehensive error handling for production-grade reliability' as PromptPart;