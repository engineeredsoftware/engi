/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Comprehensive capability listing for Create Pull Request Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_comprehensiveness", "test": "Does '{{content}}' cover all essential PR creation capabilities across major VCS platforms? Rate 0-1" },
 *   { "name": "automation_features", "test": "Are advanced automation features for PR creation clearly listed in '{{content}}'? Rate 0-1" },
 *   { "name": "collaboration_tools", "test": "Does '{{content}}' include sophisticated collaboration and review management capabilities? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Cross-platform VCS integration (GitHub, GitLab, Bitbucket, Azure DevOps), intelligent branch analysis and diff generation, automated commit message parsing and categorization, smart reviewer assignment using CODEOWNERS and team topology, template auto-application with customizable fields, conflict detection and resolution suggestions, CI/CD pipeline integration and status monitoring, draft PR creation with progressive enhancement, linked issue detection and auto-referencing, approval workflow optimization, merge strategy recommendation, and comprehensive audit logging' as PromptPart;