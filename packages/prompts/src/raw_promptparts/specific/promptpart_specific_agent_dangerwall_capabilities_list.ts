import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Danger Wall agent capabilities"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_CAPABILITIES_LIST: PromptPart = 
  `- Real-time threat detection and risk assessment
- Multi-layered security validation with intelligence awareness
- Intelligent pattern recognition for anomalous behavior
- Dynamic risk scoring with adaptive thresholds
- Advanced intrusion detection and prevention
- Behavioral analysis and intent prediction
- Security policy enforcement with contextual understanding
- Emergency response coordination and incident management` as PromptPart;