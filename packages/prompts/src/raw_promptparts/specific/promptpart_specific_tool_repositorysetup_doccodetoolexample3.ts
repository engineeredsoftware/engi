/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing custom path with cache disabled"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "custom_path_demo", "test": "Does '{{content}}' demonstrate custom target path usage? Rate 0-1" },
 *   { "name": "cache_control", "test": "Does '{{content}}' show cache configuration options? Rate 0-1" },
 *   { "name": "advanced_configuration", "test": "Does '{{content}}' illustrate advanced configuration options? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Custom path with cache disabled: cloneRepositoryTool({ provider: "bitbucket", owner: "atlassian", name: "jira-sdk", ref: "v2.0.0", connectionId: 54321, targetPath: "/workspace/deps/jira-sdk", cache: { enabled: false } })' as PromptPart;