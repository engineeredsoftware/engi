/**
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Prompt for generating Task Guides (JSON output)"
 * current_version: "GA1.00.0"
 */
import { Prompt, hierarchicalFormatter } from '@bitcode/prompts';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_BASE_CORE } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_base_core';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_IDENTITY_CORESTATEMENT } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_identity_corestatement';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_PHASE_TITLES_DIRECTIVE_DETAILCONTENT } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_phase_titles_directive_detailcontent';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_TITLE_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_structure_task_title_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_GOAL_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_structure_task_goal_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_CONTEXT_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_structure_task_context_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_PREREQS_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_structure_task_prereqs_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_STEPS_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_structure_task_steps_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_TESTING_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_structure_task_testing_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_DOCS_LABEL } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_structure_task_docs_label';
import { PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_CONSTRAINTS_JSON_DETAILCONTENT } from '../../prompts/src/raw_promptparts/specific/promptpart_specific_tool_digest_taskguides_constraints_json_detailcontent';

export const TASK_GUIDE_PROMPT = (() => {
  const p = new Prompt();
  p.set('identity', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_IDENTITY_CORESTATEMENT);
  p.set('base', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_BASE_CORE);
  p.set('phase/titles', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_PHASE_TITLES_DIRECTIVE_DETAILCONTENT);
  p.set('structure/task/title', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_TITLE_LABEL);
  p.set('structure/task/goal', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_GOAL_LABEL);
  p.set('structure/task/context', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_CONTEXT_LABEL);
  p.set('structure/task/prereqs', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_PREREQS_LABEL);
  p.set('structure/task/steps', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_STEPS_LABEL);
  p.set('structure/task/testing', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_TESTING_LABEL);
  p.set('structure/task/docs', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_STRUCTURE_TASK_DOCS_LABEL);
  p.set('constraints/json', PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_CONSTRAINTS_JSON_DETAILCONTENT);
  return p.format(hierarchicalFormatter);
})();
