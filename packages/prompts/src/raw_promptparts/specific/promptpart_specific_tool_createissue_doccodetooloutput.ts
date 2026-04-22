/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for Create Issue Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tracking_completeness", "test": "Does '{{content}}' provide comprehensive issue tracking and management output? Rate 0-1" },
 *   { "name": "workflow_integration", "test": "Does the output in '{{content}}' support seamless workflow integration and automation? Rate 0-1" },
 *   { "name": "analytics_insights", "test": "Are detailed analytics and predictive insights included in the output in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEISSUE_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns comprehensive issue creation result including: issue_id (unique identifier across platforms), issue_url (direct link to issue), issue_number (platform-specific numbering), assigned_team_members (final assignee list with roles), applied_labels (categorization tags), ai_recommendations (priority, assignment, and workflow suggestions), duplicate_analysis (similarity scores with existing issues), estimated_effort (AI-predicted work hours), dependency_graph (related issues and blockers), sla_targets (deadline and escalation timelines), workflow_position (current state in project workflow), notification_recipients (stakeholder list), and creation_analytics (metadata, source attribution, and process metrics)' as PromptPart;