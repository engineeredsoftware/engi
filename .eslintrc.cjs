/* Root ESLint config wiring GA-1 prompt hierarchy rules */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: { node: true, es6: true, jest: true },
  plugins: ['@typescript-eslint', 'bitcode', 'react'],
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'bitcode/no-write-tools-outside-implementation': 'error',
    'bitcode/require-prompt-hierarchy': 'error',
    // Forbid legacy deep-imports into prompts using /src in consumer code.
    // Canonical pattern is: @bitcode/prompts/raw_promptparts/*
    'no-restricted-imports': ['error', {
      'patterns': [
        '@bitcode/prompts/src/raw_promptparts/*'
      ]
    }],
    // Focus on GA-1 custom rules; reduce noise from generic rules
    'no-unused-vars': 'off',
    'no-undef': 'off',
    // Enforce one React component export per file for clarity/maintainability
    'react/no-multi-comp': ['error', { ignoreStateless: false }],
  },
  ignorePatterns: [
    '**/dist/**',
    '**/build/**',
    '**/.turbo/**',
    '**/.next/**',
    '**/node_modules/**',
    '**/*.generated.ts',
  ],
  overrides: [
    // Temporarily allow multiple components in complex route headers
    {
      files: [
        'uapi/app/conversations/components/ConversationsOverlay.tsx',
        'uapi/app/executions/components/ExecutionPageHeader.tsx'
      ],
      rules: {
        'react/no-multi-comp': 'off',
      }
    },
    // Allow multiple components in stories/tests
    {
      files: ['**/*.stories.*', '**/*.test.*'],
      rules: {
        'react/no-multi-comp': 'off',
      }
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        // Disable core rules that are noisy with TS types (handled by TS compiler if needed)
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-redeclare': 'off',
        'no-dupe-class-members': 'off',
        'no-useless-catch': 'off',
      }
    },
    {
      files: ['uapi/app/**/*', 'uapi/components/vcs/**/*'],
      rules: {
        // Enforce SSOT: forbid importing UI primitives from the vendored folder
        'no-restricted-imports': ['error', {
          'patterns': [
            '@/components/ui/{button,card,input,label,select,tabs,dialog,alert-dialog,dropdown-menu,avatar,switch,textarea,progress,checkbox,popover,collapsible,command,calendar,tooltip,table,badge,alert}'
          ]
        }],
      }
    },
    {
      files: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],
      rules: {
    // Enforce one React component export per file for clarity/maintainability
    'react/no-multi-comp': ['error', { ignoreStateless: false }],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  settings: {
    react: { version: 'detect' }
  }
};
