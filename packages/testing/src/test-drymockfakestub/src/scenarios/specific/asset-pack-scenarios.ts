/**
 * AssetPack-specific test scenarios
 * 
 * These scenarios provide comprehensive test data for the AssetPack pipeline,
 * covering all phases from setup through Finish.
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
 * @btd 50000
 * @tier enterprise
* @features ["asset-packs", "evidence_documents", "marketplace", "priority-support"]
 */
export const ENTERPRISE_USER = createTestPart({
  id: 'user-enterprise-001',
  email: 'enterprise@example.com',
  name: 'Enterprise User',
  btdBalance: 50000,
  tier: 'enterprise',
  features: ['asset-packs', 'evidence_documents', 'marketplace', 'priority-support'],
  metadata: {
    company: 'TechCorp Inc.',
    teamSize: 25,
    monthlyUsage: {
      assetPacks: 150,
      evidence_documents: 75,
      averageBtdPerRun: 300
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
 * @id complex-asset-pack-request
 * @type AssetPackRequest
 * @complexity high
 * @measured-btd-estimate 500
 */
export const COMPLEX_ASSET_PACK_REQUEST = createTestPart({
  id: 'req-complex-001',
  read: `Implement a comprehensive authentication system with the following requirements:
  
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
    computerUseReadMeasurement: true,
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
 * @id asset-pack-setup-data
 * @parts ["enterprise-user", "github-repository-with-lsp", "complex-asset-pack-request"]
 */
export const ASSET_PACK_SETUP_COMPOSITION = createTestComposition({
  id: 'asset-pack-setup-data',
  name: 'AssetPack Setup Data',
  parts: [
    ENTERPRISE_USER,
    GITHUB_REPO_WITH_LSP,
    COMPLEX_ASSET_PACK_REQUEST
  ],
  compose: () => ({
    user: ENTERPRISE_USER,
    repository: GITHUB_REPO_WITH_LSP,
    request: COMPLEX_ASSET_PACK_REQUEST,
    context: {
      btdBalance: 50000,
      estimatedCost: 500,
      availableAgents: 30,
      lspReady: true
    }
  })
});

/** @doc-test-composition
 * @id asset-pack-result-data
 * @parts ["pull-request-with-conflicts"]
 */
export const ASSET_PACK_RESULT_COMPOSITION = createTestComposition({
  id: 'asset-pack-result-data',
  name: 'AssetPack Result Data',
  parts: [PR_WITH_CONFLICTS],
  compose: () => ({
    pullRequest: PR_WITH_CONFLICTS,
    assetPack: {
      id: 'dlv-001',
      status: 'completed',
      measuredBtd: 487,
      btdSemantics: 'non_fungible_asset_pack_share_read_right',
      feeAsset: 'BTC',
      duration: 95000, // ms
      phases: {
        setup: { duration: 5000, status: 'completed' },
        discovery: { duration: 15000, status: 'completed', iterations: 1 },
        implementation: { duration: 60000, status: 'completed', iterations: 2 },
        validation: { duration: 10000, status: 'completed', iterations: 1 },
        finish: { duration: 5000, status: 'completed' }
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
 * @id enterprise-asset-pack-with-conflicts
 * @phases ["setup", "discovery", "implementation", "validation", "finish"]
 * @expected-measured-btd 500
 * @expected-duration 120000
 */
export const ENTERPRISE_ASSET_PACK_SCENARIO = new TestScenarioBuilder()
  .id('enterprise-asset-pack-with-conflicts')
  .name('Enterprise AssetPack with PR Conflicts')
  .description('Complete AssetPack flow for an enterprise user synthesizing a complex AssetPack that results in PR conflicts')
  .context({
    environment: 'test',
    user: {
      id: 'user-enterprise-001',
      role: 'owner',
      btdBalance: 50000,
      features: ['asset-packs', 'evidence_documents', 'marketplace', 'priority-support']
    },
    repository: {
      owner: 'techcorp',
      name: 'enterprise-app',
      branch: 'feature/auth-system',
      isPrivate: true
    },
    pipeline: 'asset-pack',
    allowedTools: ['read-file', 'write-file', 'list-files', 'run-tests']
  })
  .addData(ASSET_PACK_SETUP_COMPOSITION)
  .addData(ASSET_PACK_RESULT_COMPOSITION)
  .behavior({
    phases: ['setup', 'discovery', 'implementation', 'validation', 'finish'],
    expectedDuration: 120000,
    expectedMeasuredBtd: 500,
    expectations: {
      success: true,
      resultPattern: {
        pullRequest: { state: 'open', mergeable: false },
        assetPack: { status: 'completed' }
      }
    },
    assertions: [
      {
        name: 'PR should have conflicts',
        check: (result) => result.pullRequest?.mergeable === false
      },
      {
        name: 'Measured $BTD should be reasonable',
        check: (result) => result.assetPack?.measuredBtd > 400 && result.assetPack?.measuredBtd < 600
      },
      {
        name: 'All phases should complete',
        check: (result) => Object.values(result.assetPack?.phases || {}).every((p: any) => p.status === 'completed')
      }
    ]
  })
  .tags('enterprise', 'complex', 'conflicts', 'feature:asset-packs')
  .performance({
    timeout: 180000,
    memoryLimit: 512 * 1024 * 1024, // 512MB
    cpuLimit: 2
  })
  .build();

/** @doc-test-scenario
 * @id minimal-asset-pack-success
 * @phases ["setup", "discovery", "implementation", "validation", "finish"]
 * @expected-measured-btd 100
 * @expected-duration 30000
 */
export const MINIMAL_ASSET_PACK_SCENARIO = createTestScenario({
  id: 'minimal-asset-pack-success',
  name: 'Minimal AssetPack Success',
  description: 'Simple AssetPack that completes quickly with low measured $BTD amount',
  context: {
    environment: 'test',
    user: {
      id: 'user-basic-001',
      role: 'developer',
      btdBalance: 1000,
      features: ['asset-packs']
    },
    repository: {
      owner: 'user',
      name: 'simple-app',
      branch: 'main',
      isPrivate: false
    },
    pipeline: 'asset-pack'
  },
  data: [
    createTestComposition({
      id: 'minimal-setup',
      name: 'Minimal Setup',
      parts: [
        createTestPart({
          read: 'Fix typo in README.md',
          repository: 'user/simple-app',
          branch: 'main'
        })
      ],
      compose: () => ({
        request: {
          read: 'Fix typo in README.md',
          repository: 'user/simple-app',
          branch: 'main'
        }
      })
    })
  ],
  behavior: {
    phases: ['setup', 'discovery', 'implementation', 'validation', 'finish'],
    expectedDuration: 30000,
    expectedMeasuredBtd: 100,
    expectations: {
      success: true
    }
  },
  tags: ['minimal', 'quick', 'feature:asset-packs']
});

/** @doc-test-scenario
 * @id asset-pack-error-insufficient-btd-holding
 * @phases ["setup"]
 * @expected-measured-btd 500
 * @expected-error "INSUFFICIENT_BTD_HOLDING"
 */
export const ASSET_PACK_ERROR_SCENARIO = createTestScenario({
  id: 'asset-pack-error-insufficient-btd-holding',
  name: 'AssetPack Error - Insufficient $BTD Holding',
  description: 'AssetPack that fails because the read-right holding is insufficient',
  context: {
    environment: 'test',
    user: {
      id: 'user-low-btd',
      role: 'developer',
      btdBalance: 50,
      features: ['asset-packs']
    },
    repository: {
      owner: 'user',
      name: 'app',
      branch: 'main',
      isPrivate: false
    },
    pipeline: 'asset-pack'
  },
  data: [ASSET_PACK_SETUP_COMPOSITION],
  behavior: {
    phases: ['setup'],
    expectedDuration: 5000,
    expectedMeasuredBtd: 500,
    expectations: {
      success: false,
      errorType: 'INSUFFICIENT_BTD_HOLDING'
    }
  },
  tags: ['error', 'insufficient-btd-holding', 'feature:asset-packs']
});

// =============================================================================
// SCENARIO REGISTRY - Export all scenarios for easy discovery
// =============================================================================

export const ASSET_PACK_SCENARIOS = [
  ENTERPRISE_ASSET_PACK_SCENARIO,
  MINIMAL_ASSET_PACK_SCENARIO,
  ASSET_PACK_ERROR_SCENARIO
];

export const ASSET_PACK_SCENARIO_MAP = {
  'enterprise-complex': ENTERPRISE_ASSET_PACK_SCENARIO,
  'minimal-success': MINIMAL_ASSET_PACK_SCENARIO,
  'error-btd': ASSET_PACK_ERROR_SCENARIO
};
