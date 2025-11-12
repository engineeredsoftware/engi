/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Complex integration example for Create Comment Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "enterprise_communication", "test": "Does the example in '{{content}}' demonstrate enterprise-scale communication orchestration? Rate 0-1" },
 *   { "name": "ai_driven_collaboration", "test": "Does '{{content}}' show advanced AI-driven collaboration and knowledge management? Rate 0-1" },
 *   { "name": "cross_system_intelligence", "test": "Are sophisticated cross-system intelligence and automation prominently featured in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATECOMMENT_DOCCODETOOLEXAMPLE3: PromptPart = 
  'AI-orchestrated architectural decision record: createComment({ target_context: "ADR-789", content: "After analyzing performance benchmarks across 15 microservices, I recommend migrating to event-driven architecture. See attached analysis and migration timeline.", comment_type: "discussion", mentions: ["@architecture-council", "@performance-team", "@dev-leads"], attachments: [performanceReport.pdf, migrationPlan.md], auto_translate: true, thread_id: "architecture-migration-discussion", sentiment_tone: "professional", notification_settings: { "digest_mode": "daily", "expert_routing": true, "context_preservation": true } }) → Creates comprehensive architectural comment with AI-analyzed attachments, routes to relevant experts based on content analysis, preserves discussion context across multiple platforms, generates executive summary for stakeholders, and establishes follow-up workflows with automated progress tracking across 8 development teams and 4 business units' as PromptPart;