/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for Create Issue Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_comprehensiveness", "test": "Do the parameters in '{{content}}' support comprehensive issue creation and management scenarios? Rate 0-1" },
 *   { "name": "intelligent_automation", "test": "Are AI-driven automation parameters effectively included in '{{content}}'? Rate 0-1" },
 *   { "name": "enterprise_workflow_support", "test": "Do parameters support complex enterprise workflow and governance requirements in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEISSUE_DOCCODETOOLPARAMETERS: PromptPart = 
  'project_id: string (target project or repository identifier), title: string (issue title with AI enhancement suggestions), description: string (detailed description with template support), issue_type: "bug" | "feature" | "epic" | "story" | "task" (issue classification), priority?: "low" | "medium" | "high" | "critical" (priority with AI recommendation), assignee?: string (assignee with intelligent suggestion), labels?: string[] (categorization tags), milestone?: string (project milestone association), due_date?: Date (deadline with SLA tracking), parent_issue?: string (epic or parent relationship), custom_fields?: Record<string, any> (platform-specific fields), auto_assign?: boolean (enable intelligent assignment), template?: string (issue template identifier), watchers?: string[] (notification recipients), and workflow_state?: string (initial workflow position)' as PromptPart;