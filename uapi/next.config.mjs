/** @type {import('next').NextConfig} */
// --------------------------------------
// Make sure uapi/.env.local takes highest precedence, even when a monorepo
// root processed .env values earlier (e.g. turbo / `pnpm dev`).  We load it
// here with `override:true` so any NEXT_PUBLIC_*=false lines used for local
// performance profiling beat previously-defined true values.
// --------------------------------------

import dotenv from 'dotenv';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
// `require` will be created below to load CJS modules

const require = createRequire(import.meta.url);
// For resolving tsconfig path aliases in webpack
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

// __dirname equivalent in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Always allow the *package-local* .env.local file to win over anything that
// Turbo / the repo root may have placed in process.env earlier.  We resolve
// the path relative to this config file so it works no matter where `next`
// is started from (monorepo root, IDE, etc.).
dotenv.config({ path: path.resolve(__dirname, '.env.local'), override: true });

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Deep import resolver removed. All packages must be imported via root exports.

// Base Next.js configuration
let nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    // Allow importing source files from outside the `uapi` package directory.
    externalDir: true,
  },
  // Transpile workspace packages that the Next app imports directly or
  // transitively so webpack/SWC can handle TS/ESM + monorepo paths.
  transpilePackages: [
    '@engi/styling',
    '@engi/prompts',
    '@engi/pipeline-deliverable',
    '@engi/pipelines-generics',
    '@engi/agent-generics',
    // Generic agents used by pipelines
    '@engi/generic-agent-code-editor',
    '@engi/generic-agents-ready-to-short-circuit',
    '@engi/generic-agents-language',
    '@engi/generic-agents-text-search',
    '@engi/generic-agents-danger-wall',
    // Generic tools used by pipelines/agents
    '@engi/generic-tools-editing',
    '@engi/generic-tools-git',
    '@engi/generic-tools-simple-system-text-search',
    '@engi/generic-tools-repository-setup',
    '@engi/generic-tools-lsp-query',
    '@engi/vcs-tools',
    // Core shared libs commonly imported in app/server code
    '@engi/models',
    '@engi/files',
    '@engi/logger',
    '@engi/streams',
    '@engi/observability',
    '@engi/mcp',
    '@engi/git',
    '@engi/notion',
    '@engi/security',
    '@engi/gitlab',
    '@engi/bitbucket',
  ],
  compiler: {
    // Remove console.* calls in production builds
    removeConsole: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build to avoid interactive prompts
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    // Disable “use” / auth entry points across the marketing site.
    NEXT_PUBLIC_DISABLE_USING: process.env.NEXT_PUBLIC_DISABLE_USING ?? 'true',
    NEXT_PUBLIC_APP_VERSION: (() => {
      // Prefer CI-provided commit SHA if available to avoid spawning git.
      if (process.env.VERCEL_GIT_COMMIT_SHA) {
        return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7);
      }
      // Fall back to local git commit hash.
      try {
        return require('child_process').execSync('git rev-parse --short HEAD').toString().trim();
      } catch {
        return 'dev';
      }
    })(),
    NEXT_PUBLIC_APP_VERSION_DATE: (() => {
      if (process.env.VERCEL_GIT_COMMIT_SHA) {
        // Use build time in UTC when run on Vercel
        return new Date().toISOString();
      }
      try {
        return require('child_process').execSync('git log -1 --format=%cI').toString().trim();
      } catch {
        return new Date().toISOString();
      }
    })(),
  },
  webpack: (config, { dev, isServer, nextRuntime }) => {
    // Detect edge runtime (middleware, edge API routes)
    const isEdge = nextRuntime === 'edge';

    // Stub Sentry for Edge Runtime and client builds
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@engi/sentry$': path.resolve(__dirname, '..', 'packages', 'sentry', 'src', (isServer && !isEdge) ? 'sentry.ts' : 'sentry-edge-stub.ts'),
    };

    // Resolve TS path aliases based on tsconfig.json
    config.resolve.plugins = config.resolve.plugins || {};
    config.resolve.plugins.push(new TsconfigPathsPlugin({ extensions: config.resolve.extensions }));
    // Removed deep-src resolver to rely on single alias + tsconfig paths
    // Inline .txt imports as raw source
    config.module.rules.push({
      test: /\.txt$/i,
      type: 'asset/source',
    });
    
    // Add doc-code-tool loader for automatic prompt attachment.
    // Resolve from @engi/doc-code package export (built to dist at dev start).
    try {
      const docCodeLoader = require.resolve('@engi/doc-code/loader');
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [
          path.resolve(__dirname, '..', 'packages', 'generic-tools'),
          path.resolve(__dirname, '..', 'packages', 'tools-generics'),
        ],
        use: [
          {
            loader: docCodeLoader,
            options: { exclude: [/\.test\./, /\.spec\./] }
          }
        ]
      });
    } catch (e) {
      // If the loader isn't built yet, skip silently; prompts will still work without runtime attachments.
      // The dev script should build @engi/doc-code before starting dev to enable the loader.
    }
    // For client builds and edge runtime, stub out server-only modules
    if (!isServer || isEdge) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        'fs/promises': false,
        child_process: false,
        path: false,
        os: false,
        crypto: false,
        util: false,
        async_hooks: false,
        net: false,
        tls: false,
        https: false,
        http: false,
        diagnostics_channel: false,
        worker_threads: false,
        'module-details-from-path': false,
        'import-in-the-middle': false,
        // Node.js prefixed modules
        'node:fs': false,
        'node:child_process': false,
        'node:diagnostics_channel': false,
        'node:https': false,
        'node:http': false,
        'node:async_hooks': false,
        'node:os': false,
        'node:path': false,
        'node:util': false,
      };

      // Replace problematic Node.js packages with stubs for Edge Runtime and client builds
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@engi/sentry': path.resolve(__dirname, '..', 'packages', 'sentry', 'src', 'sentry-edge-stub.ts'),
        '@sentry/node': path.resolve(__dirname, '..', 'packages', 'sentry', 'src', 'sentry-edge-stub.ts'),
        '@sentry/nextjs': path.resolve(__dirname, '..', 'packages', 'sentry', 'src', 'sentry-edge-stub.ts'),
        diagnostics_channel: path.resolve(__dirname, '..', 'admin', 'lib', 'stubs', 'diagnostics_channel.ts'),
        'require-in-the-middle': path.resolve(__dirname, 'config', 'stubs', 'require-in-the-middle.js'),
        '@opentelemetry/instrumentation': path.resolve(__dirname, 'config', 'stubs', 'opentelemetry-instrumentation.js'),
        '@opentelemetry/instrumentation/build/esm/index.js': path.resolve(
          __dirname,
          'config',
          'stubs',
          'opentelemetry-instrumentation.js'
        ),
        '@opentelemetry/instrumentation/build/esm/platform/node/instrumentation.js': path.resolve(
          __dirname,
          'config',
          'stubs',
          'opentelemetry-instrumentation.js'
        ),
      };
    }

    // ---------------------------------------------------------------------
    // Custom module aliases for recently refactored packages.  These point
    // the historical import specifiers used across the codebase at the newly
    // organised source locations inside /packages/.
    // ---------------------------------------------------------------------
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Single top-level alias for prompts – root-only import
      '@engi/prompts': path.resolve(__dirname, '..', 'packages', 'prompts', 'src', 'index.ts'),
      // Security package: server-safe root and explicit client entry
      '@engi/security': path.resolve(__dirname, '..', 'packages', 'security', 'src', 'index.ts'),
      '@engi/security/client': path.resolve(__dirname, '..', 'packages', 'security', 'src', 'client.ts'),
      '@engi/engine/pipeline/pipelineSDIVS': path.resolve(
        __dirname,
        '..',
        'packages',
        'pipelines',
        'deliverable',
        'src',
        'run.ts'
      ),
      '@engi/engine/pipeline/pipelineMeasureSDIVS': path.resolve(
        __dirname,
        '..',
        'packages',
        'pipelines',
        'measure',
        'src',
        'run.ts'
      ),
      '@engi/engine/pipeline/pipelineAI DocumentsSDIVS': path.resolve(
        __dirname,
        '..',
        'packages',
        'pipelines',
        'ai_document',
        'src',
        'run.ts'
      ),
      '@engi/mcp/validation': path.resolve(__dirname, '..', 'packages', 'mcp', 'src', 'index.ts'),
      '@engi/git': path.resolve(__dirname, '..', 'packages', 'git', 'src', 'index.ts'),
      '@engi/mcp': path.resolve(__dirname, '..', 'packages', 'mcp', 'src', 'index.ts'),
      '@engi/mcp$': path.resolve(__dirname, '..', 'packages', 'mcp', 'src', 'index.ts'),
      // Legacy generic-agents umbrella alias
      '@engi/generic-agents': path.resolve(__dirname, '..', 'packages', 'agent-generics', 'src', 'index.ts'),
      '@engi/generic-tools-files-maintaining': path.resolve(
        __dirname,
        '..',
        'packages',
        'generic-tools',
        'files-maintaining',
        'src',
        'index.ts'
      ),
      'require-in-the-middle': path.resolve(__dirname, 'config', 'stubs', 'require-in-the-middle.js'),
      '@opentelemetry/instrumentation': path.resolve(__dirname, 'config', 'stubs', 'opentelemetry-instrumentation.js'),
      '@opentelemetry/instrumentation/build/esm/index.js': path.resolve(
        __dirname,
        'config',
        'stubs',
        'opentelemetry-instrumentation.js'
      ),
      '@opentelemetry/instrumentation/build/esm/platform/node/instrumentation.js': path.resolve(
        __dirname,
        'config',
        'stubs',
        'opentelemetry-instrumentation.js'
      ),
      '@/lib/validation': path.resolve(
        __dirname,
        '..',
        'packages',
        'pipelines-generics',
        'src',
        'phases',
        'validation'
      ),
      '@/lib/validation/validationOTFAdherencePhaseModule': path.resolve(
        __dirname,
        '..',
        'packages',
        'pipelines-generics',
        'src',
        'phases',
        'validation',
        'index.ts'
      ),
    };
    // Further production optimizations
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 50,
        minSize: 20000,
      };
    }
    return config;
  },
};

// Wrap configuration with bundle analyzer capabilities
export default withBundleAnalyzer(nextConfig);
