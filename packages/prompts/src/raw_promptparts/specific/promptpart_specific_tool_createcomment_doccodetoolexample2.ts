/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Advanced usage example for Create Comment Tool"
 * current_version: "V26.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "advanced_collaboration", "test": "Does the example in '{{content}}' showcase advanced collaboration and communication features? Rate 0-1" },
 *   { "name": "intelligent_automation", "test": "Does '{{content}}' demonstrate intelligent automation and context-awareness? Rate 0-1" },
 *   { "name": "cross_platform_workflow", "test": "Are cross-platform communication workflows effectively shown in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATECOMMENT_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Multi-platform escalation: createComment({ target_context: "ISSUE-456", content: "This performance issue is blocking the mobile release. We read immediate action on the database optimization work.", comment_type: "urgent", priority: "high", mentions: ["@platform-team", "@mobile-team", "@db-specialists"], auto_translate: true, visibility: "team", sentiment_tone: "direct", notification_settings: { "escalate_after": "2_hours", "cascade_to": ["team-leads", "product-owner"] } }) → Creates urgent issue comment with automatic translation to 3 languages, triggers escalation workflow, and coordinates response across multiple teams with sentiment-appropriate tone' as PromptPart;