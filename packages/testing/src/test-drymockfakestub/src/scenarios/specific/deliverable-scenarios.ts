/**
 * Deliverable-specific test scenarios
 * 
 * These scenarios provide comprehensive test data for the deliverable pipeline,
 * covering all phases from setup through shipping.
 */

import { createTestPart } from '../../primitives/TestPart';
import { createTestComposition } from '../../primitives/TestComposition';
import { createTestScenario, TestScenarioBuilder } from '../../primitives/TestScenario';

// =============================================================================
// TEST PARTS - Atomic test data units
// =============================================================================

/** @doc-test-fixture
 * @id enterprise-user
 * @type User
 * @credits 50000
 * @tier enterprise
* @features ["deliverables", "ai_documents", "marketplace", "priority-support"]
 */
export const ENTERPRISE_USER = createTestPart({
  id: 'user-enterprise-001',
  email: 'enterprise@example.com',
  name: 'Enterprise User',
  credits: 50000,
  tier: 'enterprise',
  features: ['deliverables', 'ai_documents', 'marketplace', 'priority-support'],
  metadata: {
    company: 'TechCorp Inc.',
    teamSize: 25,
    monthlyUsage: {
      deliverables: 150,
      ai_documents: 75,
      averageCreditsPerRun: 300
    }
  }
});

/** @doc-test-fixture
 * @id github-repository-with-lsp
 * @type Repository
 * @language TypeScript
 * @size large
 * @lsp-ready true
 */
export const GITHUB_REPO_WITH_LSP = createTestPart({
  owner: 'techcorp',
  name: 'enterprise-app',
  fullName: 'techcorp/enterprise-app',
  private: true,
  defaultBranch: 'main',
  language: 'TypeScript',
  size: 125000, // KB
  hasLSP: true,
  lspConfig: {
    tsconfig: true,
    eslint: true,
    prettier: true
  },
  stats: {
    stars: 450,
    forks: 89,
    openIssues: 23,
    openPRs: 5
  }
});

/** @doc-test-fixture
 * @id complex-deliverable-request
 * @type DeliverableRequest
 * @complexity high
 * @estimated-credits 500
 */
export const COMPLEX_DELIVERABLE_REQUEST = createTestPart({
  id: 'req-complex-001',
  task: `Implement a comprehensive authentication system with the following requirements:
  
  1. JWT-based authentication with refresh tokens
  2. Role-based access control (RBAC) with permissions
  3. Social login integration (Google, GitHub)
  4. Two-factor authentication (2FA) support
  5. Session management and device tracking
  6. Audit logging for security events
  
  The implementation should follow security best practices, include proper error handling,
  and have comprehensive test coverage.`,
  repository: 'techcorp/enterprise-app',
  branch: 'feature/auth-system',
  issueNumber: 42,
  attachments: [
    {
      type: 'figma',
      url: 'https://figma.com/file/abc123/auth-flow-design',
      title: 'Authentication Flow Design'
    },
    {
      type: 'document',
      url: 'https://docs.google.com/document/d/xyz789/security-requirements',
      title: 'Security Requirements Specification'
    }
  ],
  modelConfig: {
    provider: 'anthropic',
    model: 'claude-3-opus',
    temperature: 0.3
  },
  features: {
    sourceToSharesFitReview: true,
    computerUseNeedMeasurement: true,
    enhanceWithContext: true
  }
});

/** @doc-test-fixture
 * @id pull-request-with-conflicts
 * @type PullRequest
 * @conflicts ["src/auth/index.ts", "package.json"]
 * @files-changed 25
 */
export const PR_WITH_CONFLICTS = createTestPart({
  id: 123,
  number: 123,
  title: 'feat: Implement authentication system',
  state: 'open',
  draft: false,
  user: {
    login: 'bitcode-bot',
    type: 'Bot'
  },
  head: {
    ref: 'feature/auth-system',
    sha: 'abc123def456'
  },
  base: {
    ref: 'main',
    sha: '789ghi012jkl'
  },
  mergeable: false,
  mergeableState: 'conflicting',
  conflicts: [
    'src/auth/index.ts',
    'package.json'
  ],
  changedFiles: 25,
  additions: 1250,
  deletions: 85,
  commits: 8,
  reviewComments: 3,
  labels: ['enhancement', 'security', 'needs-review']
});

// =============================================================================
// TEST COMPOSITIONS - Combined test data
// =============================================================================

/** @doc-test-composition
 * @id deliverable-setup-data
 * @parts ["enterprise-user", "github-repository-with-lsp", "complex-deliverable-request"]
 */
export const DELIVERABLE_SETUP_COMPOSITION = createTestComposition({
  id: 'deliverable-setup-data',
  name: 'Deliverable Setup Data',
  parts: [
    ENTERPRISE_USER,
    GITHUB_REPO_WITH_LSP,
    COMPLEX_DELIVERABLE_REQUEST
  ],
  compose: () => ({
    user: ENTERPRISE_USER,
    repository: GITHUB_REPO_WITH_LSP,
    request: COMPLEX_DELIVERABLE_REQUEST,
    context: {
      creditBalance: 50000,
      estimatedCost: 500,
      availableAgents: 30,
      lspReady: true
    }
  })
});

/** @doc-test-composition
 * @id deliverable-result-data
 * @parts ["pull-request-with-conflicts"]
 */
export const DELIVERABLE_RESULT_COMPOSITION = createTestComposition({
  id: 'deliverable-result-data',
  name: 'Deliverable Result Data',
  parts: [PR_WITH_CONFLICTS],
  compose: () => ({
    pullRequest: PR_WITH_CONFLICTS,
    deliverable: {
      id: 'dlv-001',
      status: 'completed',
      creditsUsed: 487,
      duration: 95000, // ms
      phases: {
        setup: { duration: 5000, status: 'completed' },
        discovery: { duration: 15000, status: 'completed', iterations: 1 },
        implementation: { duration: 60000, status: 'completed', iterations: 2 },
        validation: { duration: 10000, status: 'completed', iterations: 1 },
        shipping: { duration: 5000, status: 'completed' }
      },
      metrics: {
        filesChanged: 25,
        linesAdded: 1250,
        linesRemoved: 85,
        testCoverage: 92,
        complexityReduction: -5
      }
    }
  })
});

// =============================================================================
// TEST SCENARIOS - Complete test cases
// =============================================================================

/** @doc-test-scenario
 * @id enterprise-deliverable-with-conflicts
 * @phases ["setup", "discovery", "implementation", "validation", "shipping"]
 * @expected-credits 500
 * @expected-duration 120000
 */
export const ENTERPRISE_DELIVERABLE_SCENARIO = new TestScenarioBuilder()
  .id('enterprise-deliverable-with-conflicts')
  .name('Enterprise Deliverable with PR Conflicts')
  .description('Complete deliverable flow for an enterprise user implementing a complex feature that results in PR conflicts')
  .context({
    environment: 'test',
    user: {
      id: 'user-enterprise-001',
      role: 'owner',
      credits: 50000,
      features: ['deliverables', 'ai_documents', 'marketplace', 'priority-support']
    },
    repository: {
      owner: 'techcorp',
      name: 'enterprise-app',
      branch: 'feature/auth-system',
      isPrivate: true
    },
    pipeline: 'deliverable',
    allowedTools: ['read-file', 'write-file', 'list-files', 'run-tests']
  })
  .addData(DELIVERABLE_SETUP_COMPOSITION)
  .addData(DELIVERABLE_RESULT_COMPOSITION)
  .behavior({
    phases: ['setup', 'discovery', 'implementation', 'validation', 'shipping'],
    expectedDuration: 120000,
    expectedCredits: 500,
    expectations: {
      success: true,
      resultPattern: {
        pullRequest: { state: 'open', mergeable: false },
        deliverable: { status: 'completed' }
      }
    },
    assertions: [
      {
        name: 'PR should have conflicts',
        check: (result) => result.pullRequest?.mergeable === false
      },
      {
        name: 'Credits used should be reasonable',
        check: (result) => result.deliverable?.creditsUsed > 400 && result.deliverable?.creditsUsed < 600
      },
      {
        name: 'All phases should complete',
        check: (result) => Object.values(result.deliverable?.phases || {}).every((p: any) => p.status === 'completed')
      }
    ]
  })
  .tags('enterprise', 'complex', 'conflicts', 'feature:deliverables')
  .performance({
    timeout: 180000,
    memoryLimit: 512 * 1024 * 1024, // 512MB
    cpuLimit: 2
  })
  .build();

/** @doc-test-scenario
 * @id minimal-deliverable-success
 * @phases ["setup", "discovery", "implementation", "validation", "shipping"]
 * @expected-credits 100
 * @expected-duration 30000
 */
export const MINIMAL_DELIVERABLE_SCENARIO = createTestScenario({
  id: 'minimal-deliverable-success',
  name: 'Minimal Deliverable Success',
  description: 'Simple deliverable that completes quickly with minimal credit usage',
  context: {
    environment: 'test',
    user: {
      id: 'user-basic-001',
      role: 'developer',
      credits: 1000,
      features: ['deliverables']
    },
    repository: {
      owner: 'user',
      name: 'simple-app',
      branch: 'main',
      isPrivate: false
    },
    pipeline: 'deliverable'
  },
  data: [
    createTestComposition({
      id: 'minimal-setup',
      name: 'Minimal Setup',
      parts: [
        createTestPart({
          task: 'Fix typo in README.md',
          repository: 'user/simple-app',
          branch: 'main'
        })
      ],
      compose: () => ({
        request: {
          task: 'Fix typo in README.md',
          repository: 'user/simple-app',
          branch: 'main'
        }
      })
    })
  ],
  behavior: {
    phases: ['setup', 'discovery', 'implementation', 'validation', 'shipping'],
    expectedDuration: 30000,
    expectedCredits: 100,
    expectations: {
      success: true
    }
  },
  tags: ['minimal', 'quick', 'feature:deliverables']
});

/** @doc-test-scenario
 * @id deliverable-error-insufficient-credits
 * @phases ["setup"]
 * @expected-credits 500
 * @expected-error "INSUFFICIENT_CREDITS"
 */
export const DELIVERABLE_ERROR_SCENARIO = createTestScenario({
  id: 'deliverable-error-insufficient-credits',
  name: 'Deliverable Error - Insufficient Credits',
  description: 'Deliverable that fails due to insufficient credits',
  context: {
    environment: 'test',
    user: {
      id: 'user-low-credits',
      role: 'developer',
      credits: 50, // Not enough for the task
      features: ['deliverables']
    },
    repository: {
      owner: 'user',
      name: 'app',
      branch: 'main',
      isPrivate: false
    },
    pipeline: 'deliverable'
  },
  data: [DELIVERABLE_SETUP_COMPOSITION],
  behavior: {
    phases: ['setup'],
    expectedDuration: 5000,
    expectedCredits: 500,
    expectations: {
      success: false,
      errorType: 'INSUFFICIENT_CREDITS'
    }
  },
  tags: ['error', 'insufficient-credits', 'feature:deliverables']
});

// =============================================================================
// SCENARIO REGISTRY - Export all scenarios for easy discovery
// =============================================================================

export const DELIVERABLE_SCENARIOS = [
  ENTERPRISE_DELIVERABLE_SCENARIO,
  MINIMAL_DELIVERABLE_SCENARIO,
  DELIVERABLE_ERROR_SCENARIO
];

export const DELIVERABLE_SCENARIO_MAP = {
  'enterprise-complex': ENTERPRISE_DELIVERABLE_SCENARIO,
  'minimal-success': MINIMAL_DELIVERABLE_SCENARIO,
  'error-credits': DELIVERABLE_ERROR_SCENARIO
};
