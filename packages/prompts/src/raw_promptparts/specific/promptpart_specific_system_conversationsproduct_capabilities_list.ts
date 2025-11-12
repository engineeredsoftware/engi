import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: " enumerate Conversations product capabilities"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_coverage", "test": "Lists concrete capabilities end users rely on?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_SYSTEM_CONVERSATIONSPRODUCT_CAPABILITIES_LIST: PromptPart =
  `Capabilities:
- Intelligent code base analysis and refactoring suggestions
- Automated generation of deliverables and AI Document planning
- Real-time performance monitoring with optimization recommendations
- Seamless integration with Git, CI/CD pipelines, and cloud services
- Customizable workflows for different team sizes and product stages` as PromptPart;
