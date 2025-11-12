/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for Create Or Update File Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_sophistication", "test": "Do the parameters in '{{content}}' support sophisticated file management scenarios? Rate 0-1" },
 *   { "name": "safety_controls", "test": "Are comprehensive safety and validation controls included in '{{content}}'? Rate 0-1" },
 *   { "name": "collaboration_support", "test": "Do parameters support advanced collaboration and conflict management in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLPARAMETERS: PromptPart = 
  'file_path: string (target file location with path resolution), content: string | Buffer (file content with encoding support), operation_mode: "create" | "update" | "upsert" (operation type), encoding?: string (character encoding, auto-detected if omitted), backup_strategy?: "none" | "timestamp" | "incremental" (backup approach), conflict_resolution?: "fail" | "merge" | "overwrite" | "prompt" (conflict handling), template_variables?: Record<string, any> (variable substitution map), metadata?: object (custom file metadata), permissions?: string (file permission mode), validation_rules?: string[] (content validation requirements), atomic?: boolean (transaction guarantees), and lock_timeout?: number (concurrent access timeout in milliseconds)' as PromptPart;