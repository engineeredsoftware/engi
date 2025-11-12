/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for repository setup (clone repository) tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure", "test": "Does '{{content}}' clearly describe the output structure? Rate 0-1" },
 *   { "name": "success_failure_info", "test": "Does '{{content}}' explain both success and failure outputs? Rate 0-1" },
 *   { "name": "metadata_inclusion", "test": "Does '{{content}}' describe repository metadata and timing? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLOUTPUT: PromptPart = 
  'Success status with cloned repository path, provider information, repository metadata (owner, name, ref, commit, size), cache information (hit status, age, refresh), timing data (clone, submodules, total duration), and detailed error information with retry suggestions if operation fails' as PromptPart;