/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Basic usage example for Create Or Update File Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "usage_simplicity", "test": "Does the example in '{{content}}' demonstrate straightforward file operation usage? Rate 0-1" },
 *   { "name": "common_scenario", "test": "Is the example in '{{content}}' representative of common development file operations? Rate 0-1" },
 *   { "name": "safety_demonstration", "test": "Does '{{content}}' show basic safety features in action? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Configuration file update: createOrUpdateFile({ file_path: "config/database.yml", content: "production:\\n  host: db.company.com\\n  port: 5432", operation_mode: "update", backup_strategy: "timestamp", encoding: "utf-8" }) → Updates database configuration with automatic backup to config/database.yml.backup.20240802-143022, preserves file permissions and validates YAML syntax' as PromptPart;