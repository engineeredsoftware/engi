/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Comprehensive capability listing for Create Comment Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "communication_sophistication", "test": "Does '{{content}}' demonstrate sophisticated communication and collaboration capabilities? Rate 0-1" },
 *   { "name": "ai_enhancement", "test": "Are AI-driven communication enhancement features prominently featured in '{{content}}'? Rate 0-1" },
 *   { "name": "cross_platform_integration", "test": "Does '{{content}}' show comprehensive cross-platform communication integration? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATECOMMENT_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Multi-platform comment integration (GitHub, GitLab, Jira, Slack, Teams), intelligent context extraction from code changes and discussions, automated sentiment analysis and tone optimization, smart mention and notification routing based on expertise and availability, thread organization with conversation clustering, code snippet highlighting and suggestion embedding, multilingual comment translation and localization, duplicate concern detection and consolidation, escalation path identification for unresolved discussions, real-time collaborative editing with conflict resolution, rich media attachment support with automatic transcription, and comprehensive analytics for team communication patterns and effectiveness metrics' as PromptPart;