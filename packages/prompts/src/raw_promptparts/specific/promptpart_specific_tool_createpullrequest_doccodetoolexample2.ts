/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Advanced usage example for Create Pull Request Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "advanced_feature_demo", "test": "Does the example in '{{content}}' showcase advanced PR creation features? Rate 0-1" },
 *   { "name": "enterprise_workflow", "test": "Does '{{content}}' demonstrate enterprise-level PR creation scenarios? Rate 0-1" },
 *   { "name": "automation_showcase", "test": "Are sophisticated automation capabilities highlighted in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Enterprise hotfix with compliance: createPullRequest({ repository: "enterprise/core-platform", source_branch: "hotfix/critical-security-patch", target_branch: "main", title: "SECURITY: Patch CVE-2024-1234 vulnerability", template: "security-hotfix", draft: false, auto_merge: true, reviewers: ["security-incident-team", "platform-architects"], labels: ["hotfix", "security", "P0"], milestone: "Q1-Security-Sprint", linked_issues: ["SEC-567"], merge_strategy: "squash" }) → Creates high-priority PR with security template, automatic compliance checks, and expedited review workflow' as PromptPart;