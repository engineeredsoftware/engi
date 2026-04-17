/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities listing for success criteria generation tool"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Multi-dimensional success metric generation, emergent quality indicator detection, adaptive benchmark creation, cognitive performance measurement, validation framework synthesis, quality assurance protocol development, continuous improvement metric design, and transcendent success pattern recognition",
 *     "score": 0.25,
 *     "reason": "Contains 'multi-dimensional', 'emergent', 'cognitive', 'transcendent' - non-industrial terms"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "criteria_specificity", "test": "Does it generate measurable, specific success criteria? Rate 0-1", "score": 0.93 },
 *   { "name": "validation_integration", "test": "Are criteria tied to concrete validation methods? Rate 0-1", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement success criteria generation? Rate 0-1", "score": 0.89 }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLCAPABILITIES: PromptPart = 
  'SMART criteria generation (Specific, Measurable, Achievable, Relevant, Time-bound), acceptance criteria template creation based on user story patterns, test case generation from functional requirements using Gherkin syntax, KPI definition with baseline and target values, quality gate configuration for CI/CD pipelines, performance benchmark creation with latency and throughput thresholds, security criteria generation based on OWASP guidelines, accessibility validation using WCAG 2.1 standards, usability metrics definition with user experience benchmarks, code quality criteria using static analysis rules, documentation completeness validation with coverage metrics, and compliance verification checklists for regulatory requirements' as PromptPart;