/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Complex integration example for Create Pull Request Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "complexity_handling", "test": "Does the example in '{{content}}' demonstrate handling of complex multi-system integrations? Rate 0-1" },
 *   { "name": "cross_platform_capability", "test": "Does '{{content}}' show cross-platform VCS capabilities and sophisticated workflows? Rate 0-1" },
 *   { "name": "ai_automation_showcase", "test": "Are AI-driven automation features prominently demonstrated in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLEXAMPLE3: PromptPart = 
  'AI-assisted cross-repository refactoring: createPullRequest({ repository: "microservices/user-service", source_branch: "refactor/extract-shared-utils", target_branch: "main", title: "Extract shared utilities to common library", description: "AI-analyzed code extraction creating 12 reusable utilities across 5 microservices", reviewers: ["@arch-council", "ml-assisted-reviewer-bot"], labels: ["refactoring", "architecture", "ai-assisted"], template: "architectural-change", draft: true, linked_issues: ["ARCH-123", "TECH-DEBT-456"], metadata: { "ai_analysis_id": "refactor-2024-001", "impact_score": 8.7, "related_repos": ["auth-service", "payment-service", "notification-service"] } }) → Creates sophisticated architectural PR with AI impact analysis, cross-service dependency mapping, and intelligent reviewer assignment based on code ownership patterns and expertise graphs' as PromptPart;