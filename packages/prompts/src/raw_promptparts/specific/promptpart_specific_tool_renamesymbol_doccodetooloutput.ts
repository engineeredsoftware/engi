/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output format description for rename symbol tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_completeness", "test": "Does '{{content}}' describe all output fields comprehensively? Rate 0-1" },
 *   { "name": "actionability", "test": "Can a user understand what to do with the output from '{{content}}'? Rate 0-1" },
 *   { "name": "error_coverage", "test": "Does '{{content}}' explain error/rollback information sufficiently? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLOUTPUT: PromptPart = 
  'Detailed rename report including: affected files list with change counts, total symbols renamed, dependency analysis results, success/failure status, rollback information if needed, and any conflicts or warnings encountered during the rename operation' as PromptPart;