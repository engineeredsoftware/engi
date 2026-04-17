/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Basic usage example for Create Issue Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "issue_creation_clarity", "test": "Does the example in '{{content}}' clearly demonstrate straightforward issue creation? Rate 0-1" },
 *   { "name": "common_workflow_representation", "test": "Is the example in '{{content}}' representative of common issue tracking workflows? Rate 0-1" },
 *   { "name": "automation_demonstration", "test": "Does '{{content}}' show basic automation and intelligent features? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEISSUE_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Bug report creation: createIssue({ project_id: "company/mobile-app", title: "Login fails with OAuth providers", description: "Users cannot authenticate using Google/Facebook OAuth on iOS devices", issue_type: "bug", priority: "high", labels: ["mobile", "authentication", "ios"], auto_assign: true }) → Creates bug issue #284 with automatic assignment to mobile team lead based on expertise analysis, applies severity classification, and generates SLA targets for P2 bug resolution' as PromptPart;