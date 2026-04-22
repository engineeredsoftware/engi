/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capability list for rename symbol tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' cover all major features of the rename symbol tool? Rate 0-1" },
 *   { "name": "lsp_integration", "test": "Is LSP semantic analysis capability clearly mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "safety_features", "test": "Are safety features like rollback and validation mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Symbol identification across multiple files, LSP semantic analysis, dependency tracking, cross-file renaming with atomic operations, rollback support, semantic validation, conflict detection, and comprehensive rename reporting' as PromptPart;