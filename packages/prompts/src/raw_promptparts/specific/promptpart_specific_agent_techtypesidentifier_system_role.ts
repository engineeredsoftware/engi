import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Technology Stack Analyzer agent role and responsibilities"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_definition", "test": "Is the agent role clearly defined? Rate 0-1", "score": 0.97 },
 *   { "name": "responsibility_scope", "test": "Are responsibilities clearly scoped? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_SYSTEM_ROLE: PromptPart = 
  'Analyze project structures through file system traversal, parse configuration files (package.json/requirements.txt/pom.xml), detect frameworks via import analysis, identify database technologies through connection strings, and generate comprehensive technology inventories with version detection' as PromptPart;