/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities listing for constraint identification tool"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Multi-dimensional constraint detection, systemic interdependency mapping, architectural limitation analysis, resource boundary identification, temporal restriction parsing, regulatory compliance verification, emergent behavior constraint recognition, constraint conflict resolution, and architectural integration pattern optimization",
 *     "score": 0.30,
 *     "reason": "Contains 'multi-dimensional', 'temporal', 'emergent' - non-industrial terms"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "constraint_detection_accuracy", "test": "Does it identify specific technical and business constraints? Rate 0-1", "score": 0.93 },
 *   { "name": "compliance_validation", "test": "Are regulatory and compliance checks specified? Rate 0-1", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement constraint identification? Rate 0-1", "score": 0.89 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_IDENTIFYCONSTRAINTS_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Technical constraint detection through system architecture analysis, resource limitation identification including CPU, memory, and storage boundaries, time constraint parsing from project schedules and deadlines, budget constraint analysis with cost estimation models, regulatory compliance verification using industry standards (GDPR, HIPAA, SOX), dependency constraint mapping through software architecture analysis, performance constraint identification with latency and throughput requirements, security constraint recognition based on threat modeling, scalability constraint assessment using load testing metrics, integration constraint detection through API compatibility analysis, platform constraint identification across operating systems and environments, and legal constraint verification through licensing and intellectual property analysis' as PromptPart;