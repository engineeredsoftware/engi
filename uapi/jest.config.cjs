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
    '^@bitcode/context$': '<rootDir>/../packages/context/src/index.ts',
    '^@bitcode/context/(.*)$': '<rootDir>/../packages/context/src/$1',
    '^@bitcode/observability$': '<rootDir>/tests/mocks/observability.js',
    '^@bitcode/bitcode$': '<rootDir>/../packages/bitcode/src/index.js',
    '^@bitcode/([^/]+)/src/(.+)$': '<rootDir>/../packages/$1/src/$2',
    '^@bitcode/supabase/ssr/server$': '<rootDir>/tests/mocks/supabaseServerClient.ts',
    '^@bitcode/supabase/ssr/client$': '<rootDir>/tests/mocks/supabaseBrowserClient.ts',
    '^@bitcode/supabase/ssr/(.*)$': '<rootDir>/../packages/supabase/src/ssr/$1',
    '^@bitcode/supabase$': '<rootDir>/../packages/supabase/src/index.ts',
    '^@bitcode/engine/pipeline$': '<rootDir>/../packages/pipelines-generics/src/pipeline/index.ts',
    '^@bitcode/engine/(.*)$': '<rootDir>/../packages/pipelines-generics/src/pipeline/$1',
    // Fallback – treat other @bitcode/<pkg> references as pointing into packages/<pkg>/src
    '^@bitcode/([^/]+)$': '<rootDir>/../packages/$1/src/index.ts',
    '^@bitcode/([^/]+)/(.+)$': '<rootDir>/../packages/$1/src/$2',

    // -------------------------------------------------------------------
    // Legacy @/lib/* aliases – kept temporarily to avoid breaking any files
    // that have not yet been migrated. These can be removed once the import
    // sweep is complete.
    // -------------------------------------------------------------------
    '^@/lib/bitcode-app-context$': '<rootDir>/lib/bitcode-app-context.ts',
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
  // Limit to ai_document search & discovery agent tests for targeted CI
  testMatch: [
    '<rootDir>/tests/searchRelevantAI Documents.test.ts',
    '<rootDir>/tests/searchLocalVector.test.ts',
    '<rootDir>/tests/discoveryGetAI DocumentsAgent.test.ts',
    // '<rootDir>/tests/pipelineDiscoveryGetAI Documents.test.ts', // removed legacy test
    // Meta-level prompt builder tests
    '<rootDir>/tests/meta/**/buildMessagesWithSystemPrompt.test.ts',
    // Include API integration tests for deliverables
    '<rootDir>/tests/api/**/*.test.ts',
    '<rootDir>/tests/api/**/*.test.tsx',
    '<rootDir>/tests/webhookRoute.test.ts',
    // Include mock system tests
    '<rootDir>/tests/MockOrchestrator.test.ts'
    ,
    // Added targeted deliverables tests
    '<rootDir>/tests/deliverablesStreamRoute.test.ts',
    '<rootDir>/tests/deliverablesHistoryRoute.test.ts',
    '<rootDir>/tests/RunDetailsView.mapping.test.tsx',
    '<rootDir>/tests/usePipelineExecution.test.tsx'
  ],
  // Setup mocks and global configurations
  // Setup module mocks and globals before tests
  setupFiles: ['<rootDir>/tests/setupTests.ts'],
  setupFilesAfterEnv: [],
  // Do not run E2E files and pipeline phase wrapper tests in unit/integration test suite
  testPathIgnorePatterns: [
    // Do not run Playwright e2e tests in Jest
    '<rootDir>/tests/e2e/',
    // Skip notificationsWidget tests until testing-library/react is added
    'notificationsWidget\\.test\\.tsx?$',
    // 'pipeline.*\.test\.[jt]sx?$', // allow pipelineDiscoveryGetAI Documents.test.ts
    '<rootDir>/tests/notificationsWidget.test.tsx',
    'setupDeliverablesAgents\.test\.[jt]sx?$',
    '.*Step\.test\.[jt]sx?$',
    '.*\.integration\.test\.[jt]sx?$',
    'fetchAI DocumentsAgent\.test\.[jt]sx?$',
    'deliverables\.test\.[jt]sx?$',
  ],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'lib/**/*.ts',
    'llm/**/*.js'
  ]
};
