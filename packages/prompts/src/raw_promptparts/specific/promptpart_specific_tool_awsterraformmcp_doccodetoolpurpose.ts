/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for AWS Terraform infrastructure automation"
 * current_version: "GA1.03.0"
 * versions: []
 * benchmarks: [
 *   { "name": "infrastructure_automation_purpose_clarity", "test": "Does '{{content}}' clearly articulate infrastructure automation purpose? Rate 0-1" },
 *   { "name": "enterprise_orchestration_focus", "test": "Does '{{content}}' emphasize enterprise infrastructure orchestration? Rate 0-1" },
 *   { "name": "critical_automation_mission", "test": "Does '{{content}}' convey critical infrastructure automation mission? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLPURPOSE: PromptPart = 
  'Orchestrates enterprise-scale AWS infrastructure through advanced Terraform automation with intelligent resource provisioning, state management, drift detection, policy enforcement, cost optimization, multi-environment deployment pipelines, and autonomous infrastructure healing for mission-critical cloud operations requiring 99.999% uptime and seamless scalability across global regions.' as PromptPart;