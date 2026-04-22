/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for Create Issue Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tracking_purpose_clarity", "test": "Does '{{content}}' clearly articulate the tool's role in comprehensive issue tracking? Rate 0-1" },
 *   { "name": "intelligent_automation", "test": "Does the purpose '{{content}}' emphasize intelligent issue management and automation? Rate 0-1" },
 *   { "name": "workflow_orchestration", "test": "Does '{{content}}' highlight orchestration across project management workflows? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEISSUE_DOCCODETOOLPURPOSE: PromptPart = 
  'Orchestrates comprehensive issue lifecycle management through intelligent creation, categorization, and routing workflows, leveraging natural language processing for automatic priority assessment, stakeholder identification, and dependency mapping while integrating seamlessly with project management systems, development workflows, and team collaboration platforms to ensure optimal resource allocation and delivery tracking' as PromptPart;