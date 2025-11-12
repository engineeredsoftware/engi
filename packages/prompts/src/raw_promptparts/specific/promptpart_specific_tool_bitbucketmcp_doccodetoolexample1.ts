/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example demonstrating enterprise-scale Bitbucket repository management with collaborative development workflows"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "enterprise_repository_demonstration", "test": "Does '{{content}}' demonstrate enterprise-scale repository management? Rate 0-1" },
 *   { "name": "collaborative_workflow_showcase", "test": "Does '{{content}}' showcase collaborative development workflows? Rate 0-1" },
 *   { "name": "bitbucket_integration_example", "test": "Is '{{content}}' relevant for Bitbucket integration scenarios? Rate 0-1" },
 *   { "name": "version_control_excellence_quality", "test": "Does '{{content}}' exemplify version control management excellence? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Enterprise Development Workflow: bitbucketMCPOperation("createPullRequest", { workspace: "enterprise-dev-team", repoSlug: "microservices-platform", title: "Implement OAuth2 Authentication Service", sourceBranch: "feature/oauth2-service", destinationBranch: "develop", description: "Add enterprise-grade OAuth2 authentication with JWT tokens, refresh token rotation, and multi-tenant support. Includes comprehensive unit tests, integration tests, security scanning, and performance benchmarks. Implements PKCE flow for mobile clients and supports SAML SSO integration.", closeSourceBranch: true, accessToken: "oauth_token_xyz123" }) → Returns { success: true, operation: "createPullRequest", result: { id: 1247, title: "Implement OAuth2 Authentication Service", state: "OPEN", author: { display_name: "Senior Developer", uuid: "{dev-uuid-001}" }, created_on: "2024-01-15T14:30:22.000Z", source: { branch: { name: "feature/oauth2-service" } }, destination: { branch: { name: "develop" } }, links: { html: { href: "https://bitbucket.org/enterprise-dev-team/microservices-platform/pull-requests/1247" } } }, metadata: { workspace: "enterprise-dev-team", repository: "microservices-platform", timestamp: "2024-01-15T14:30:22.123Z" } } with automated code review triggers, CI/CD pipeline initiation, security compliance checks, and team notification workflows for streamlined collaborative development process.' as PromptPart;