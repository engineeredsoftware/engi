/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  // Use ts-jest with React JSX support
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react'
      }
    }
  },
  // Use jsdom environment for DOM-based component tests
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  // Override cache directory to project-local path to avoid OS temp permissions issues
  cacheDirectory: '<rootDir>/tmp/jest-cache',
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    // ---------- project-local utilities ----------
    '^@/.+\\.txt$': '<rootDir>/tests/textMock.js',
    '^@/.+\\.css$': '<rootDir>/tests/styleMock.js',
    '\\.css$': '<rootDir>/tests/styleMock.js',

    // ---------- explicit maps for shared pipeline libs ----------
    // -------------------------------------------------------------------
    // New @bitcode/* package namespace redirects. These replace the historical
    // "@/lib/*" imports that lived inside the uapi codebase. As we migrate
    // source files over to the new package-scoped imports, Jest also needs
    // to know how to resolve them when running the TS output. Wherever
    // possible we mirror the old explicit mappings to keep the runtime
    // resolution behaviour identical.
    // -------------------------------------------------------------------
    '^@bitcode/logger$': '<rootDir>/../packages/logger/src/logger.ts',
    '^@bitcode/sentry$': '<rootDir>/../packages/sentry/src/sentry.ts',
    '^@bitcode/context$': '<rootDir>/../packages/context/src/index.ts',
    '^@bitcode/context/(.*)$': '<rootDir>/../packages/context/src/$1',
    '^@bitcode/observability$': '<rootDir>/tests/mocks/observability.js',
    '^@bitcode/google-analytics$': '<rootDir>/../packages/google-analytics/src/ga.ts',
    '^@bitcode/errors$': '<rootDir>/../packages/errors/src/errors.ts',
    '^@bitcode/artifacts$': '<rootDir>/../packages/artifacts/src/artifacts.ts',
    '^@bitcode/vcs-tools$': '<rootDir>/../packages/generic-tools/vcs/src/index.ts',
    '^@bitcode/protocol$': '<rootDir>/../packages/protocol/src/index.js',
    '^@bitcode/protocol/src/(.+)$': '<rootDir>/../packages/protocol/src/$1',
    '^@bitcode/generic-tools/(.+)/src/(.+)$': '<rootDir>/../packages/generic-tools/$1/src/$2',
    '^@bitcode/generic-tools/(.+)$': '<rootDir>/../packages/generic-tools/$1/src/index.ts',
    '^@bitcode/generic-tools-mcps-(.+)$': '<rootDir>/../packages/generic-tools/mcps-tools/$1/src/index.ts',
    '^@bitcode/generic-tools-(.+)$': '<rootDir>/../packages/generic-tools/$1/src/index.ts',
    '^@bitcode/pipeline-asset-pack/src/(.+)$': '<rootDir>/../packages/pipelines/asset-pack/src/$1',
    '^@bitcode/([^/]+)/src/(.+)$': '<rootDir>/../packages/$1/src/$2',
    '^@bitcode/supabase/ssr/server$': '<rootDir>/tests/mocks/supabaseServerClient.ts',
    '^@bitcode/supabase/ssr/client$': '<rootDir>/tests/mocks/supabaseBrowserClient.ts',
    '^@bitcode/supabase/ssr/(.*)$': '<rootDir>/../packages/supabase/src/ssr/$1',
    '^@bitcode/supabase$': '<rootDir>/../packages/supabase/src/index.ts',
    '^@bitcode/pipeline-asset-pack$': '<rootDir>/../packages/pipelines/asset-pack/src/index.ts',
    '^@bitcode/engine/pipeline$': '<rootDir>/../packages/pipelines/asset-pack/src/run.ts',
    '^@bitcode/engine/(.*)$': '<rootDir>/../packages/pipelines-generics/src/pipeline/$1',
    // Fallback – treat other @bitcode/<pkg> references as pointing into packages/<pkg>/src
    '^@bitcode/([^/]+)$': '<rootDir>/../packages/$1/src/index.ts',
    '^@bitcode/([^/]+)/(.+)$': '<rootDir>/../packages/$1/src/$2',

    // -------------------------------------------------------------------
    // Current @/lib/* test aliases for files that still import terminal-local
    // helpers through the Next.js path convention.
    // -------------------------------------------------------------------
    '^@/lib/bitcode-app-context$': '<rootDir>/lib/bitcode-app-context.ts',
    '^@/lib/bitcode-app-context-options$': '<rootDir>/lib/bitcode-app-context-options.ts',
    '^@/lib/bitcoin-wallet-client$': '<rootDir>/lib/bitcoin-wallet-client.ts',
    '^@/lib/bitcode-wallet-local$': '<rootDir>/lib/bitcode-wallet-local.ts',
    '^@/lib/mock-review-mode$': '<rootDir>/lib/mock-review-mode.ts',
    '^@/lib/logger$': '<rootDir>/../packages/pipelines-generics/src/logger.ts',
    '^@/lib/engine/pipeline$': '<rootDir>/../packages/pipelines-generics/src/pipeline/index.ts',
    '^@/lib/engine/(.*)$': '<rootDir>/../packages/pipelines-generics/src/pipeline/$1',
    '^@/lib/(.*)$': '<rootDir>/../packages/pipelines-generics/src/$1',

    // ---------- packages namespace ----------
    '^packages/(.*)$': '<rootDir>/../packages/$1',

    // ---------- fallback to uapi-local paths ----------
    '^@/(.*)$': '<rootDir>/$1',

    '\\.txt$': '<rootDir>/tests/textMock.js',
  },
  // Limit to Evidence Document search and active Bitcode tests for targeted CI
  testMatch: [
    '<rootDir>/tests/search.test.ts',
    '<rootDir>/tests/searchLocalVector.test.ts',
    // Meta-level prompt builder tests
    '<rootDir>/tests/meta/**/buildMessagesWithSystemPrompt.test.ts',
    // Include API integration tests for AssetPack and Shippable routes
    '<rootDir>/tests/api/**/*.test.ts',
    '<rootDir>/tests/api/**/*.test.tsx',
    '<rootDir>/tests/webhookRoute.test.ts',
    // Include mock system tests
    '<rootDir>/tests/MockOrchestrator.test.ts',
    // Added targeted AssetPack/runtime tests
    '<rootDir>/tests/searchRelevantAssetPackEvidence.test.ts',
    '<rootDir>/tests/assetPackInstructionsRoute.test.ts',
    '<rootDir>/tests/RunDetailsView.mapping.test.tsx',
    '<rootDir>/tests/usePipelineExecution.test.tsx',
    // BTD and auxillaries coverage
    '<rootDir>/tests/userDataRoute.test.ts',
    '<rootDir>/tests/useUserDataHydration.test.tsx',
    '<rootDir>/tests/featureFlagsMockMode.test.ts',
    '<rootDir>/tests/bitcoinWalletClient.test.ts',
    '<rootDir>/tests/auxillariesWorkspacePanels.test.tsx',
    '<rootDir>/tests/btdTrackerLoading.test.tsx',
    '<rootDir>/tests/notificationsWidget.test.tsx',
    '<rootDir>/tests/orbitalsBTDPane.test.tsx',
    '<rootDir>/tests/orbitalsInterfacesPane.test.tsx',
    '<rootDir>/tests/marketingLandingPage.test.tsx',
    '<rootDir>/tests/publicDocsPageContent.test.tsx',
    '<rootDir>/tests/bitcodeDocsContent.test.tsx',
    '<rootDir>/tests/features.test.ts',
    '<rootDir>/tests/workspaceSurface.test.ts',
    '<rootDir>/tests/exchangePageClient.test.tsx',
    '<rootDir>/tests/terminalPreservedShellSurface.test.tsx',
    '<rootDir>/tests/terminalFloatingDebugWidget.test.tsx',
    '<rootDir>/tests/terminalPageShell.test.tsx',
    '<rootDir>/tests/terminalSurfaceCopy.test.ts',
    '<rootDir>/tests/terminalCommandState.test.ts',
    '<rootDir>/tests/terminalExperienceArchitecture.test.ts',
    '<rootDir>/tests/terminalCommercialLaunchReadiness.test.ts',
    '<rootDir>/tests/terminalShellBridge.test.tsx',
    '<rootDir>/tests/demonstrationWitnessMount.test.tsx',
    '<rootDir>/tests/protocolCommercialBoundary.test.ts',
    '<rootDir>/tests/demonstrationWitnessScopedStylesRoute.test.ts',
    '<rootDir>/tests/btdStep.static.test.tsx',
    '<rootDir>/tests/btdStep.initialFlow.test.tsx',
    '<rootDir>/tests/btdStep.test.tsx',
    '<rootDir>/tests/btdStep.promoFlow.test.tsx',
    '<rootDir>/tests/btdStep.integration.test.tsx',
    '<rootDir>/tests/navPublicShell.test.tsx',
    '<rootDir>/tests/navBrand.test.tsx',
    '<rootDir>/tests/userMenu.test.tsx',
    '<rootDir>/tests/footerPublicShell.test.tsx',
    '<rootDir>/tests/bitcodeTransactionsFilterBar.test.tsx',
    '<rootDir>/tests/bitcodeTransactionsActiveFilters.test.tsx',
    '<rootDir>/tests/navWorkspaceChrome.test.tsx'
  ],
  // Setup mocks and global configurations
  // Setup module mocks and globals before tests
  setupFiles: ['<rootDir>/tests/setupTests.ts'],
  setupFilesAfterEnv: [],
  // Do not run E2E files and pipeline phase wrapper tests in unit/integration test suite
  testPathIgnorePatterns: [
    // Do not run Playwright e2e tests in Jest
    '<rootDir>/tests/e2e/',
    'fetchEvidenceDocumentsAgent.test.[jt]sx?$',
  ],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'lib/**/*.ts',
    'llm/**/*.js'
  ]
};
