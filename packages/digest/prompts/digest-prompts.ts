/**
 * Digest prompts – shared prompt fragments for the digest pipeline.
 *
 * Exports:
 * - BATCH_SUMMARY_PROMPT: Base instructions for batch file summarization
 * - TYPE_SPECIFIC_INSTRUCTIONS: Extra guidance keyed by file type
 */

import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_FILESUMMARIES_BASEPROMPT_CORE,
} from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digest_filesummaries_baseprompt_core';
import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_API_ROUTE_REQUIREMENTS,
} from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digest_type_api_route_requirements';
import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_UI_COMPONENT_REQUIREMENTS,
} from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digest_type_ui_component_requirements';
import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_CODE_REQUIREMENTS,
} from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digest_type_code_requirements';
import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_DOCUMENTATION_REQUIREMENTS,
} from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digest_type_documentation_requirements';
import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_CONFIG_REQUIREMENTS,
} from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digest_type_config_requirements';
import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_NOTEBOOK_REQUIREMENTS,
} from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digest_type_notebook_requirements';
import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_UNKNOWN_REQUIREMENTS,
} from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digest_type_unknown_requirements';

export const BATCH_SUMMARY_PROMPT: string = PROMPTPART_SPECIFIC_TOOL_DIGEST_FILESUMMARIES_BASEPROMPT_CORE;

export const TYPE_SPECIFIC_INSTRUCTIONS: Record<string, string> = {
  'api-route': PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_API_ROUTE_REQUIREMENTS,
  'ui-component': PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_UI_COMPONENT_REQUIREMENTS,
  'code': PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_CODE_REQUIREMENTS,
  'documentation': PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_DOCUMENTATION_REQUIREMENTS,
  'config': PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_CONFIG_REQUIREMENTS,
  'notebook': PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_NOTEBOOK_REQUIREMENTS,
  'unknown': PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_UNKNOWN_REQUIREMENTS,
};
