import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Type-specific instructions for API route files in digest summaries"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "api_focus", "test": "Mentions methods, params, auth, side effects", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_API_ROUTE_REQUIREMENTS: PromptPart = (
  'API ROUTE REQUIREMENTS:\n' +
  '- Identify HTTP methods and route params.\n' +
  '- Describe request/response schema, auth/validation, and side effects.\n' +
  '- List upstream/downstream services used.'
) as PromptPart;
