/**
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Prompt for generating Code Styles guidelines"
 * current_version: "GA1.00.0"
 */
import { Prompt, hierarchicalFormatter } from '@bitcode/prompts';
import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_BASE_CORE,
} from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_base_core';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_IDENTITY_CORESTATEMENT } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_identity_corestatement';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_OVERVIEW_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_structure_overview_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_FORMATTING_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_structure_formatting_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_NAMING_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_structure_naming_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_LINT_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_structure_lint_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_PATTERNS_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_structure_patterns_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_DIRECTORY_TIPS_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_structure_directory_tips_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_EXAMPLES_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_structure_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_REFERENCES_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_structure_references_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_CONSTRAINTS_OUTPUT_DETAILCONTENT } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_codestyles_constraints_output_detailcontent';

export const CODE_STYLES_PROMPT = (() => {
  const p = new Prompt();
  p.set('identity', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_IDENTITY_CORESTATEMENT);
  p.set('base', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_BASE_CORE);
  p.set('structure/overview', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_OVERVIEW_LABEL);
  p.set('structure/formatting', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_FORMATTING_LABEL);
  p.set('structure/naming', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_NAMING_LABEL);
  p.set('structure/lint', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_LINT_LABEL);
  p.set('structure/patterns', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_PATTERNS_LABEL);
  p.set('structure/dir_tips', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_DIRECTORY_TIPS_LABEL);
  p.set('structure/examples', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_EXAMPLES_LABEL);
  p.set('structure/references', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_REFERENCES_LABEL);
  p.set('constraints/output', PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_CONSTRAINTS_OUTPUT_DETAILCONTENT);
  return p.format(hierarchicalFormatter);
})();
