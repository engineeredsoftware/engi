/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Comprehensive capability listing for Create Or Update File Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "operation_sophistication", "test": "Does '{{content}}' demonstrate sophisticated file operation capabilities beyond basic CRUD? Rate 0-1" },
 *   { "name": "safety_mechanisms", "test": "Are advanced safety and conflict resolution mechanisms clearly outlined in '{{content}}'? Rate 0-1" },
 *   { "name": "ecosystem_integration", "test": "Does '{{content}}' show deep integration with development tool ecosystems? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Atomic file operations with transaction guarantees, intelligent content merging and conflict resolution, automated backup and snapshot creation, file encoding detection and preservation, metadata inheritance and custom attribute management, concurrent modification detection with pessimistic/optimistic locking, template-based file generation with variable substitution, syntax-aware formatting and linting integration, dependency tracking and impact analysis, file permission and security context management, multi-format content transformation (JSON, YAML, XML, etc.), and real-time collaboration conflict prevention' as PromptPart;