import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Technology Stack Analyzer agent execution instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_clarity", "test": "Are execution instructions clearly actionable? Rate 0-1", "score": 0.96 },
 *   { "name": "workflow_completeness", "test": "Does it cover complete analysis workflow? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute technology identification workflows: scan project directories recursively, parse manifest files with schema validation, analyze code patterns for framework signatures, detect runtime environments through configuration analysis, and generate structured technology reports with dependency trees and security assessments' as PromptPart;