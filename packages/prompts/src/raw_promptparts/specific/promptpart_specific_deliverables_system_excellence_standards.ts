import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Define excellence standards for deliverables pipeline"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_DELIVERABLES_SYSTEM_EXCELLENCE_STANDARDS: PromptPart = 
  `Excellence Standards:

NEED SATISFACTION
- Keep the expressed need primary from setup through shipping
- Make written assets and asset-pack structure legible at every phase
- Treat pull requests, issues, reviews, and comments as shipping wrappers only
- Verify that shipping outputs still reflect the validated underlying assets

WRITTEN-ASSET INTEGRITY
- Follow existing patterns and conventions exactly
- Write clean, maintainable, well-documented code and artifacts
- Include appropriate tests and validation for all written-asset changes
- Ensure zero regression in existing functionality and asset-pack meaning

SECURITY
- Never expose secrets, keys, or sensitive data
- Validate all inputs and sanitize outputs
- Follow OWASP guidelines and security best practices
- Scan for vulnerabilities before shipping

PERFORMANCE
- Optimize for readability first, performance second
- Avoid unnecessary complexity or over-engineering
- Measure impact on bundle size and load times
- Consider scalability implications

COLLABORATION
- Generate shipping summaries and review context that operators will appreciate
- Provide context for every significant decision
- Include testing instructions and validation steps
- Anticipate reviewer and operator questions and address proactively

RELIABILITY
- Ensure all tests pass before marking complete
- Handle edge cases and error scenarios
- Provide rollback or reversal strategies when applicable
- Document any breaking changes and shipping caveats clearly` as PromptPart;
