import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Define excellence standards for deliverables pipeline"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_DELIVERABLES_SYSTEM_EXCELLENCE_STANDARDS: PromptPart = 
  `Excellence Standards:

CODE QUALITY
- Follow existing patterns and conventions exactly
- Write clean, maintainable, well-documented code
- Include appropriate tests for all changes
- Ensure zero regression in existing functionality

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
- Generate PR descriptions that reviewers will appreciate
- Provide context for every significant decision
- Include testing instructions and validation steps
- Anticipate reviewer questions and address proactively

RELIABILITY
- Ensure all tests pass before marking complete
- Handle edge cases and error scenarios
- Provide rollback strategies when applicable
- Document any breaking changes clearly` as PromptPart;