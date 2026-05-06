import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Tech Types Identifier agent integration details"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "integration_specificity", "test": "Does it specify concrete integration patterns? Rate 0-1", "score": 0.94 },
 *   { "name": "tool_compatibility", "test": "Are specific tools and systems mentioned? Rate 0-1", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_INTEGRATION_DETAILCONTENT: PromptPart = 
  `TECHNOLOGY STACK INTEGRATION PATTERNS:

DEVELOPMENT ENVIRONMENT INTEGRATION:
- Integrates with IDE extensions (VS Code, IntelliJ) through Language Server Protocol
- Connects to CI/CD pipelines via webhook APIs for automated technology auditing
- Processes build artifacts and deployment manifests for technology inventory updates
- Interfaces with dependency vulnerability scanners (Snyk, Dependabot) for security correlation

PACKAGE MANAGER COORDINATION:
- Synchronizes with npm, pip, maven, cargo registries for version compatibility validation
- Monitors package-lock.json, requirements.txt changes through git hooks
- Integrates with dependency management tools (Renovate, Greenkeeper) for Evidence Document planning
- Connects to artifact repositories (Nexus, Artifactory) for enterprise package analysis

ARCHITECTURAL ANALYSIS ECOSYSTEM:
- Interfaces with code quality tools (SonarQube, CodeClimate) for technical debt correlation
- Connects to application performance monitoring (APM) tools for runtime technology validation
- Integrates with infrastructure-as-code platforms (Terraform, Pulumi) for deployment target analysis
- Synchronizes with container registries (Docker Hub, ECR) for containerization pattern detection

ENTERPRISE PORTFOLIO MANAGEMENT:
The Technology Stack Analyzer provides REST API endpoints for integration with enterprise architecture tools, CMDB systems, and portfolio management dashboards, enabling automated technology inventory maintenance and compliance reporting.` as PromptPart;
