/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for Create Comment Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "communication_tracking", "test": "Does '{{content}}' provide comprehensive communication tracking and analytics? Rate 0-1" },
 *   { "name": "collaboration_insights", "test": "Does the output in '{{content}}' support collaboration insights and optimization? Rate 0-1" },
 *   { "name": "workflow_integration", "test": "Are workflow integration and follow-up action capabilities included in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATECOMMENT_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns comprehensive comment creation result including: comment_id (unique identifier), comment_url (direct link), thread_position (location in conversation), mentioned_users (confirmed mentions and notifications), sentiment_score (AI-analyzed tone and reception likelihood), translation_versions (multilingual comment variations), suggested_follow_ups (recommended next actions), visibility_scope (actual access permissions), notification_recipients (delivery confirmation), conversation_impact (thread influence metrics), escalation_triggers (potential issue identification), and collaboration_metrics (engagement predictions, response time estimates, and team communication health indicators)' as PromptPart;