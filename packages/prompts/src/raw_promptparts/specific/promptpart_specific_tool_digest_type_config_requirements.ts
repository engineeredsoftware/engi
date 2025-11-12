import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Type-specific instructions for configuration files in digest summaries"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "config_focus", "test": "Mentions keys, env vars, feature flags", "score": 0.47 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_CONFIG_REQUIREMENTS: PromptPart = (
  'CONFIGURATION REQUIREMENTS:\n' +
  '- Identify keys that affect runtime behavior and their default values.\n' +
  '- Note environment variables, feature flags, and schema expectations.'
) as PromptPart;
