/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for Create Pull Request Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_completeness", "test": "Does '{{content}}' specify comprehensive output for PR creation tracking and monitoring? Rate 0-1" },
 *   { "name": "integration_support", "test": "Does the output in '{{content}}' support integration with other development tools? Rate 0-1" },
 *   { "name": "actionable_information", "test": "Is the output in '{{content}}' actionable for subsequent workflow steps? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns comprehensive PR creation result including: pull_request_id (unique identifier), pull_request_url (direct link), status (created/draft/error), assigned_reviewers (confirmed reviewer list), applied_template (template used), detected_conflicts (conflict summary), ci_status (initial pipeline status), estimated_review_time (ML-predicted review duration), linked_items (connected issues/milestones), merge_requirements (approval/check requirements), and creation_metadata (timestamp, platform details, automation decisions)' as PromptPart;