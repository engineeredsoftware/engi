/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for Create Or Update File Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "operation_traceability", "test": "Does '{{content}}' provide comprehensive traceability for file operations? Rate 0-1" },
 *   { "name": "integration_data", "test": "Does the output in '{{content}}' support integration with other development tools? Rate 0-1" },
 *   { "name": "change_tracking", "test": "Are detailed change tracking and audit capabilities included in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns detailed operation result including: operation_id (unique transaction identifier), file_path (resolved absolute path), operation_type (actual operation performed), content_hash (SHA-256 of final content), backup_location (backup file path if created), conflicts_detected (list of resolved conflicts), validation_results (content validation outcomes), metadata_applied (applied file metadata), permissions_set (final permission configuration), encoding_used (detected/applied encoding), transaction_log (detailed operation steps), and performance_metrics (operation timing and resource usage)' as PromptPart;