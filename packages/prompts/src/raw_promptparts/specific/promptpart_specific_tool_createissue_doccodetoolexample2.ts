/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Advanced usage example for Create Issue Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "advanced_issue_management", "test": "Does the example in '{{content}}' showcase advanced issue management and workflow features? Rate 0-1" },
 *   { "name": "ai_automation_showcase", "test": "Does '{{content}}' demonstrate sophisticated AI-driven automation capabilities? Rate 0-1" },
 *   { "name": "enterprise_workflow", "test": "Are enterprise-level project management workflows highlighted in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEISSUE_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Epic with intelligent decomposition: createIssue({ project_id: "enterprise/crm-platform", title: "Implement advanced customer segmentation", description: "Build ML-powered customer segmentation with real-time behavioral analysis and automated campaign triggers", issue_type: "epic", priority: "medium", template: "feature-epic", milestone: "Q2-Product-Launch", auto_assign: true, custom_fields: { "business_value": "high", "technical_risk": "medium", "customer_impact": 8500 } }) → Creates epic #156 with AI-generated story breakdown into 8 sub-tasks, assigns cross-functional team members based on skill requirements, estimates 3-sprint delivery timeline, and establishes dependency chains with data platform and marketing automation systems' as PromptPart;