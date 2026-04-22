/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_WORKFLOW_STRATEGY)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_WORKFLOW_STRATEGY: PromptPart = 
  'Define a workflow strategy: transitions, statuses, validation rules, and labels aligned to objectives. Include batched operations, necessary role permissions, and a minimal, reversible change plan.' as PromptPart;