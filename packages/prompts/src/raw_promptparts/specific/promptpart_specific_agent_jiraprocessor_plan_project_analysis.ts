/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_PROJECT_ANALYSIS)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_PROJECT_ANALYSIS: PromptPart = 
  'Analyze the Jira project: board configuration, workflows, issue types, custom fields, permissions, and automation rules. Identify bottlenecks, compliance constraints, and reporting requirements relevant to the task.' as PromptPart;