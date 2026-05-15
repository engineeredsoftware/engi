import { writeStreamMessage } from "../streams";
import { PIPELINE_CONSTANTS } from '@/lib/engine/constants';

import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { minimatch } from 'minimatch';
import dotenv from 'dotenv';
// import { register as tsNodeRegister } from 'ts-node'; // Removed - causing build issues
import { FILE_SUMMARIES_PROMPT, FILE_SUMMARIES_TYPE_SPECIFIC_INSTRUCTIONS } from '@/digest/prompts/file-summaries-prompts';
let debugMode = false;
import * as git from '@/lib/git/git';
import { log } from '@bitcode/logger';
import { filterFilesByTask } from './filesFilters';

// Pull model constants and LLM wrapper from new digest/llm package
import {
  BATCH_SUMMARY_MODEL,
  MODEL_CONFIGS,
  callLLMAPI as callLLMAPIWrapper
} from '@/digest/llm';

// New caching helpers extracted into dedicated package
import {
  getCacheDir as computeCacheDir,
  createCache as createDigestCache
} from '@/digest/caching';

// Refactored file helpers (normalisation & hashing)
import {
  normalizeContent as normalizeContentNew,
  hashContent as hashContentNew,
  readGitignore as readGitignoreNew,
  listAllFiles as listAllFilesNew,
  isBinary as isBinaryNew,
  isGitRepository as isGitRepositoryNew
} from '@/digest/files';

import {
  validateContent as validateContentNew,
  getFileType as getFileTypeNew
} from '@/digest/file-summary';

import { batchSummarizeFiles as batchSummarizeFilesNew } from '@/digest/file-summary';
import { buildProductPurposePrompt, buildProductFeaturesPrompt } from '@/digest/prompts/product-prompts';
import { buildAgentInstructionsPrompt, buildAgentSeekingQuestionsPrompt } from '@/digest/prompts/agent-prompts';

import {
  estimateTokens as estimateTokensNew,
  estimateDigestOutputTokens as estimateDigestOutputTokensNew
} from '@/digest/tokens';

// Use same guide generation model (reuse batch summary model for now)
const GUIDE_GENERATION_MODEL = BATCH_SUMMARY_MODEL;
const selectedModel = BATCH_SUMMARY_MODEL;
const modelConfig = MODEL_CONFIGS[selectedModel];

// Helper functions to make logging calls more convenient with proper typing
type LogData = Record<string, any>;

async function logInfo(msg: string, data?: LogData): Promise<void> {
  await log(msg, 'info', data);
}

async function logError(msg: string, data?: LogData): Promise<void> {
  await log(msg, 'error', data);
}

async function logWarning(msg: string, data?: LogData): Promise<void> {
  await log(msg, 'warn', data);
}

async function logDebug(msg: string, data?: LogData): Promise<void> {
  if (!debugMode && process.env.DEBUG !== 'true') {
    return;
  }
  await log(msg, 'debug', data);
}

export async function callLLMAPI(prompt, max_tokens, expectJson = true, model = BATCH_SUMMARY_MODEL, retryCount = 0, batchInfo = null) {
  return callLLMAPIWrapper(prompt, max_tokens, expectJson, model, retryCount, batchInfo);
}

// Ensure fetch is available and validate Node.js version
if (!globalThis.fetch) {
  const nodeVersion = process.versions.node;
  throw new Error(
    `fetch is not available - Node.js 18+ is required.\n` +
    `Current version: ${nodeVersion}\n` +
    `Please update Node.js to version 18 or later.`
  );
}

// Validate environment before proceeding
if (!process.env.TEMP && !process.env.TMP) {
  throw new Error(
    'No temp directory available. Ensure TEMP or TMP environment variables are set.'
  );
}

// Validate write access to temp directory
try {
  const testFile = path.join(process.env.TEMP || process.env.TMP, '.write-test');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
} catch (err) {
  throw new Error(
    `No write access to temp directory: ${err.message}\n` +
    `Please ensure the process has write permissions.`
  );
}

// Environment configuration and validation
const ENV_PATH = path.join(__dirname, '.env');

/**
 * Load environment variables and register ts-node for TypeScript support.
 */
function validateEnvironment() {
  dotenv.config({ path: ENV_PATH });

  // tsNodeRegister({ // Removed - causing build issues
  //   transpileOnly: true,
  //   compilerOptions: {
  //     module: 'commonjs',
  //     esModuleInterop: true,
  //     allowJs: true,
  //     resolveJsonModule: true,
  //     moduleResolution: 'node',
  //   },
  // });

  const requiredEnvVars = [
    'GITHUB_PRIVATE_KEY',
    'GITHUB_APP_ID',
    'GEMINI_API_KEY',
    'ANTHROPIC_API_KEY',
  ];

  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingEnvVars.length > 0) {
    const message =
      'Missing required environment variables:\n' +
      missingEnvVars.map(varName => `  - ${varName}`).join('\n') +
      '\nPlease ensure these are set in your .env file';
    throw new Error(message);
  }
}

// Validate environment at startup
validateEnvironment();

// Phase timing tracker
class DigestPhases {
  constructor() {
    this.phases = new Map();
    this.startTime = Date.now();
  }

  startPhase(name) {
    this.phases.set(name, { start: Date.now() });
  }

  endPhase(name) {
    const phase = this.phases.get(name);
    if (phase) {
      phase.end = Date.now();
      phase.duration = phase.end - phase.start;
    }
  }

  getSummary() {
    const summary = [];
    this.phases.forEach((phase, name) => {
      if (phase.duration) {
        summary.push(`${name}: ${(phase.duration / 1000).toFixed(1)}s`);
      }
    });
    return summary.join('\n');
  }

  getTotalTime() {
    return Date.now() - this.startTime;
  }
}

async function initializeDigest(options) {
  const phases = new DigestPhases();
  const gitInfo = {};
  let cacheDir;

  phases.startPhase('initialization');
  // Logging is now handled by the global logger library
  phases.endPhase('initialization');

  return { phases, gitInfo, cacheDir };
}

const streamProgress = async (dataStream, message, detail = '', progress = 'in-progress') => {
  if (dataStream) {
    await dataStream.writeData(JSON.stringify({
      type: 'status',
      step: 'digest',
      progress,
      message,
      detail,
      timestamp: new Date().toISOString()
    }) + '\n');
  }
}

interface DigestOptions {
  correlationId?: string;
  connectionId?: number;
  owner?: string;
  repo?: string;
  branch?: string;
  dataStream?: any;
  forceRegenerate?: boolean;
  maxWorkers?: number;
  debug?: boolean;
  fileFilter?: any;

  /**
   * Flag to use a pre-cloned repository instead of cloning again.
   */
  usePreClonedRepo?: boolean;

  /**
   * If usePreClonedRepo is true, path to the locally cloned repo.
   */
  rootDir?: string;

  dryRun?: boolean;

  /**
   * Local execution root. CLI `--root-dir` and `--path` both normalize here.
   */
  path?: string;

  maxFiles?: number;
  commit?: string;
}

export interface GenerateDigestResult {
  digestPath: string;
  productDocument: string;
  agentDocument: string;
  stats: {
    totalFilesScanned: number;
    filesProcessed: number;
    filesSkipped: number;
    cacheHits: number;
    cacheMisses: number;
    cacheExpired: number;
    totalBatches: number;
    maxWorkers: number;
    averageFilesPerBatch: number;
    totalRuntimeMs: number;
    averageTimePerFileMs: number;
    digestSizeBytes: number;
    agentsSizeBytes: number;
    mode: string;
  };
  options: DigestOptions;
  gitInfo: Record<string, any>;
}

export async function generateDigest(options: DigestOptions = {}): Promise<GenerateDigestResult> {
  log('🐼 Generating digest with options:', 'info', options);
  const { phases, gitInfo, cacheDir: initialCacheDir } = await initializeDigest(options);
  let cacheDir = initialCacheDir;
  const digestPath = path.join('/tmp/bitcode/digests', `DIGEST-${options.correlationId}.md`);
  const agentsPath = path.join('/tmp/bitcode/digests', `AGENTS-${options.correlationId}.md`);
  const dataStream = options.dataStream;

  // Helper function to create detailed progress messages
  const createProgressDetail = (files, context = {}) => {
    // Create a Set of file paths to ensure uniqueness
    const uniqueFiles = new Set(files.map(f => f.relativePath));
    const uniqueFileArray = Array.from(uniqueFiles);

    // Take first 3 unique files for display
    const fileList = uniqueFileArray.slice(0, 3);
    const remainingCount = uniqueFiles.size - fileList.length;
    const fileListStr = fileList.join('\n- ') +
      (remainingCount > 0 ? `\n- ... and ${remainingCount} more unique files` : '');

    const details = [
      `📦 Batch Information:`,
      `├─ Type: ${context.type || 'batch'}`,
      `├─ Progress: ${context.current}/${context.total} (${((context.current / context.total) * 100).toFixed(1)}%)`,
      `├─ Unique files in batch: ${uniqueFiles.size}`,
      `└─ Processing:`,
      `   ${fileListStr.split('\n').join('\n   ')}`
    ];

    return details.join('\n');
  };

  try {

    // Track start time for total runtime calculation
    const startTime = Date.now();

    // Cache statistics now provided by digest/caching package
    // const cacheStats = createDigestCache(...).stats – initialised later

    // logFinalCacheReport moved to digest/caching (logFinalCacheReportNew)

    function logCacheStats(context = '') {
      const hitRate = (cacheStats.hits / Math.max(cacheStats.attempts, 1) * 100).toFixed(1);
      const tokensSavedMB = (cacheStats.totalTokensSaved / 1000000).toFixed(2);

      logInfo(`\n📊 Cache Statistics ${context ? `(${context})` : ''}:`);
      logInfo(`├─ Attempts: ${cacheStats.attempts}`);
      logInfo(`├─ Hits: ${cacheStats.hits} (${hitRate}%)`);
      logInfo(`├─ Misses: ${cacheStats.misses}`);
      logInfo(`├─ Expired: ${cacheStats.expired}`);
      logInfo(`├─ Tokens Saved: ~${tokensSavedMB}M tokens`);

      // Log type-specific stats if any exist
      if (Object.keys(cacheStats.byType).length > 0) {
        logInfo('└─ By Type:');
        for (const [type, stats] of Object.entries(cacheStats.byType)) {
          const typeHitRate = (stats.hits / Math.max(stats.attempts, 1) * 100).toFixed(1);
          logInfo(`   ├─ ${type}: ${stats.hits}/${stats.attempts} (${typeHitRate}%)`);
        }
      }
    }

    // Default configuration
    const DEFAULT_CONFIG = {
      forceRegenerate: false,
      dryRun: false,
      debug: false,
      path: process.cwd(),
      maxWorkers: 8,
      maxFiles: Infinity,
      connectionId: null,
      owner: null,
      repo: null,
      branch: null,
      commit: null
    };

    // Parse command line arguments when run as script
    function parseCliArgs() {
      const cliArgs = {};

      for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];
        const nextArg = process.argv[i + 1];

        switch (arg) {
          case '--installation-id':
            if (nextArg) {
              cliArgs.connectionId = parseInt(nextArg, 10);
              i++;
            }
            break;
          case '--owner':
            if (nextArg) {
              cliArgs.owner = nextArg;
              i++;
            }
            break;
          case '--repo':
            if (nextArg) {
              cliArgs.repo = nextArg;
              i++;
            }
            break;
          case '--branch':
            if (nextArg) {
              cliArgs.branch = nextArg;
              i++;
            }
            break;
          case '--commit':
            if (nextArg) {
              cliArgs.commit = nextArg;
              i++;
            }
            break;
          case '--root-dir':
          case '--path':
            if (nextArg) {
              cliArgs.path = path.resolve(nextArg);
              i++;
            }
            break;
          case '--force-regenerate':
            cliArgs.forceRegenerate = true;
            break;
          case '--dry-run':
            cliArgs.dryRun = true;
            break;
          case '--debug':
            cliArgs.debug = true;
            break;
          case '--max-workers':
            if (nextArg) {
              cliArgs.maxWorkers = parseInt(nextArg, 10);
              i++;
            }
            break;
          case '--max-files':
            if (nextArg) {
              cliArgs.maxFiles = parseInt(nextArg, 10);
              i++;
            }
            break;
        }
      }

      return cliArgs;
    }

    // Initialize configuration combining defaults with provided options
    function initConfig(options = {}) {
      const config = { ...DEFAULT_CONFIG };

      // If running as script, apply CLI args
      if (require.main === module) {
        Object.assign(config, parseCliArgs());
      }

      // Apply provided options (overrides CLI args)
      Object.assign(config, options);

      // Ensure path is resolved
      config.path = path.resolve(config.path);

      // Set debug environment variable if debug is true
      if (config.debug) {
        process.env.DEBUG = 'true';
        debugMode = true;
      }

      return config;
    }

    // Get the args object from config
    const args = initConfig(options);

    // Extract values from args object
    let {
      forceRegenerate, dryRun, debug, path: rootDir, maxWorkers, maxFiles,
      connectionId, owner, repo, branch, commit
    } = args;

    // Validate arguments based on mode
    const isGitHubMode = Boolean(connectionId || owner || repo);
    const isLocalMode = !isGitHubMode && !!args.rootDir; // Only local mode if not GitHub mode and rootDir provided

    if (!isGitHubMode && !isLocalMode) {
      const message = 'Must specify either GitHub repository details or local root directory.\n\n' +
        'GitHub Mode Usage:\n' +
        '  --installation-id <id>  GitHub App installation ID\n' +
        '  --owner <owner>         Repository owner\n' +
        '  --repo <repo>           Repository name\n' +
        '  --branch <branch>       Branch name (optional)\n' +
        '  --commit <hash>         Commit hash (optional)\n\n' +
        'Local Mode Usage:\n' +
        '  --root-dir <path>       Local root directory\n\n' +
        'Common Options:\n' +
        '  --force-regenerate      Ignore cache and regenerate all digests\n' +
        '  --dry-run              Show what would be done without making changes\n' +
        '  --debug                Enable debug logging\n' +
        '  --max-workers <n>       Maximum parallel workers (default: 8)\n' +
        '  --max-files <n>         Maximum files to process';
      throw new Error(message);
    }

    if (isGitHubMode && (!connectionId || !owner || !repo)) {
      throw new Error('When using GitHub mode, --installation-id, --owner, and --repo are all required');
    }

    // Initialize debug mode early
    if (debug) {
      console.log('Debug mode enabled');
      console.log('Arguments:', args);
    }

    if (!modelConfig) {
      throw new Error(`Invalid model selection: ${selectedModel}. Available models: ${Object.keys(MODEL_CONFIGS).join(', ')}`);
    }

    if (!modelConfig.apiKey) {
      throw new Error(`API key not found for model ${selectedModel}`);
    }

    const CACHE_TTL_DAYS = 7;
    const CACHE_TTL_MS = CACHE_TTL_DAYS * 24 * 3600 * 1000;
    // Final blacklist of files we never want to process
    const FINAL_BLACKLIST = [
      // Binary files
      /\.(exe|dll|so|dylib|bin|obj|a|lib|o)$/i,
      /\.(zip|tar|gz|7z|rar|jar|war|ear)$/i,
      /\.(jpg|jpeg|png|gif|bmp|ico|svg|webp)$/i,
      /\.(mp3|mp4|avi|mov|wmv|flv|ogg|wav|flac)$/i,
      /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i,
      /\.(ttf|otf|eot|woff|woff2)$/i,

      // Build artifacts and dependencies - match at any level, case insensitive
      /[\\/]node_modules[\\/]/i,  // Match node_modules at any level
      /[\\/]static[\\/]/i,        // Match static directories at any level
      /[\\/]dist[\\/]/,          // Match dist at any level
      /[\\/]build[\\/]/,         // Match build at any level
      /[\\/]target[\\/]/,        // Match target at any level
      /[\\/]out[\\/]/,           // Match out at any level
      /[\\/]bin[\\/]/,           // Match bin at any level
      /[\\/]obj[\\/]/,           // Match obj at any level
      /[\\/]vendor[\\/]/,        // Match vendor at any level
      /[\\/]__pycache__[\\/]/,   // Match __pycache__ at any level
      /\.pyc$/,
      /\.class$/,
      /[\\/]\.next[\\/]/,        // Next.js build output at any level
      /[\\/]\.nuxt[\\/]/,        // Nuxt.js build output at any level
      /[\\/]\.output[\\/]/,      // Generic build output at any level
      /[\\/]\.vercel[\\/]/,      // Vercel build artifacts at any level
      /[\\/]\.serverless[\\/]/,  // Serverless framework artifacts at any level
      /[\\/]coverage[\\/]/,      // Test coverage reports at any level
      /[\\/]storybook-static[\\/]/, // Storybook build output at any level

      // Package manager caches and state
      /^\.pnpm\//,         // pnpm store
      /^\.npm\//,          // npm cache
      /^\.yarn\//,         // yarn cache
      /^\.rush\//,         // Rush.js cache
      /^bower_components\//, // historical package-manager output

      // IDE and system files
      /^\.idea\//,
      /^\.vscode\//,
      /^\.DS_Store$/,
      /^Thumbs\.db$/,
      /\.swp$/,
      /^\.history\//,      // VSCode history plugin
      /^\.settings\//,     // Eclipse settings
      /^\.project$/,       // Eclipse project file
      /^\.classpath$/,     // Eclipse classpath file
      /^\.factorypath$/,   // Eclipse factory path

      // VCS internals
      /^\.git\//,
      /^\.svn\//,
      /^\.hg\//,
      /^\.github\//,       // GitHub specific files
      /^\.gitlab\//,       // GitLab specific files

      // Temporary and cache
      /^\.cache\//,
      /^\.tmp\//,
      /^tmp\//,
      /^temp\//,
      /^\.turbo\//,        // Turborepo cache
      /^\.eslintcache$/,   // ESLint cache
      /^\.tsbuildinfo$/,   // TypeScript build info
      /^\.rollup\.cache\//, // Rollup cache

      // Package manager files
      /^package-lock\.json$/,
      /^yarn\.lock$/,
      /^pnpm-lock\.yaml$/,
      /^Gemfile\.lock$/,
      /^poetry\.lock$/,    // Python poetry lock
      /^Cargo\.lock$/,     // Rust cargo lock
      /^composer\.lock$/,  // PHP composer lock

      // Log files and debugging
      /\.log$/,
      /^logs?\//,
      /^\.debug\//,
      /\.dump$/,
      /\.heapsnapshot$/,
      /\.cpuprofile$/,

      // Environment and secrets
      /\.env\.local$/,
      /\.env\.development$/,
      /\.env\.test$/,
      /\.env\.production$/,
      /\.env\.\w+$/,

      // Test artifacts
      /^\.nyc_output\//,   // NYC/Istanbul coverage
      /^\.pytest_cache\//,  // Python test cache
      /^\.phpunit\.result\.cache$/,

      // Documentation build
      /^_site\//,          // Jekyll output
      /^\.docusaurus\//,   // Docusaurus cache
      /^\.vuepress\/dist\//, // VuePress output

      // Our output
      /^\.DIGEST\.md$/
    ];

    // Get cache directory based on git info
    // here
    function getCacheDir(isGitHubMode, rootDir, gitInfo) {
      // Always use /tmp/bitcode for consistency
      const baseDir = '/tmp/bitcode/digest-cache';

      logInfo('\n🔑 Determining cache directory...');

      if (isGitHubMode) {
        // For GitHub mode, use only org/repo as the stable identifier
        const { repoOrgUser } = gitInfo;
        const cacheDir = path.join(baseDir, 'github', repoOrgUser, 'files');

        logInfo('├─ Mode: GitHub');
        logInfo(`├─ Repository: ${repoOrgUser}`);
        logInfo(`└─ Cache Dir: ${cacheDir}`);

        return cacheDir;
      } else {
        // Local mode - create stable hash from absolute path ONLY
        // This ensures consistency between runs regardless of git state
        const absPath = path.resolve(rootDir);
        logInfo('├─ Mode: Local');
        logInfo(`├─ Root Path: ${absPath}`);

        // First try to read a cached identifier if it exists
        const identifierCachePath = path.join(baseDir, 'local', '.repo-identifiers');
        let repoIdentifier = absPath;
        let useExistingIdentifier = false;

        try {
          fs.mkdirSync(identifierCachePath, { recursive: true });
          const identifierFile = path.join(identifierCachePath,
            crypto.createHash('sha256').update(absPath).digest('hex').slice(0, 12) + '.txt');

          if (fs.existsSync(identifierFile)) {
            const cached = fs.readFileSync(identifierFile, 'utf8').trim();
            if (cached) {
              repoIdentifier = cached;
              useExistingIdentifier = true;
              logInfo(`├─ Using cached identifier: ${repoIdentifier}`);
            }
          }

          if (!useExistingIdentifier) {
            // Only try git remote on first run for this path
            try {
              const gitDir = path.join(absPath, '.git');
              if (fs.existsSync(gitDir)) {
                const remote = execSync('git config --get remote.origin.url', {
                  cwd: absPath,
                  encoding: 'utf8'
                }).trim();
                if (remote) {
                  repoIdentifier = remote;
                  logInfo(`├─ Git Remote: ${remote}`);
                  // Cache this identifier for future runs
                  fs.writeFileSync(identifierFile, repoIdentifier);
                  logInfo(`├─ Cached identifier for future runs`);
                }
              }
            } catch (e) {
              logDebug('No git remote found, using path as identifier');
              // Cache the fallback identifier
              fs.writeFileSync(identifierFile, repoIdentifier);
            }
          }
        } catch (e) {
          logWarning(`Failed to handle identifier cache: ${e.message}`);
          // Fallback to using absPath (already set)
        }

        // Create stable hash from repository identifier
        const stableHash = crypto.createHash('sha256')
          .update(repoIdentifier)
          .digest('hex')
          .slice(0, 12);

        const cacheDir = path.join(baseDir, 'local', stableHash, 'files');
        logInfo(`└─ Cache Dir: ${cacheDir}`);

        return cacheDir;
      }
    }

    // Get git repository information using GitHub API
    async function getGitInfo() {
      if (!args.connectionId || !args.owner || !args.repo) {
        throw new Error('Installation ID, owner, and repo are required for GitHub mode.');
      }

      try {
        // First, get repository details to know the default branch
        logInfo(`Fetching repository details ${args.connectionId} ${args.repo} ${args.owner}...`);
        const repository = await git.getRepository(args.connectionId, args.repo, args.owner);
        if (!repository) {
          throw new Error('Failed to fetch repository details');
        }

        const repoDefaultBranch = repository.default_branch || 'main';
        logInfo(`Repository default branch: ${repoDefaultBranch}`);

        // Get all branches
        logInfo('Fetching all branches...');
        const branches = await git.getAllBranches(args.connectionId, args.repo, args.owner);
        if (!branches || branches.length === 0) {
          throw new Error('No branches found in repository. Please ensure the repository is not empty.');
        }

        logInfo(`Found ${branches.length} branches`);
        if (debug) {
          branches.forEach(b => logDebug(`- ${b.name} (${b.commit.sha})`));
        }

        // Determine currentBranch with improved fallback logic
        let currentBranch = args.branch;
        let branchInfo;

        if (currentBranch) {
          // User specified a branch - try to find it
          branchInfo = branches.find(b => b.name === currentBranch);
          if (!branchInfo) {
            logWarning(`Specified branch '${currentBranch}' not found, falling back to default branch: ${repoDefaultBranch}`);
            currentBranch = repoDefaultBranch;
            branchInfo = branches.find(b => b.name === currentBranch);

            // If default branch not found, use first available as last resort
            if (!branchInfo) {
              branchInfo = branches[0];
              currentBranch = branchInfo.name;
              logWarning(`Default branch '${repoDefaultBranch}' not found, using first available: ${currentBranch}`);
            }
          }
        } else {
          // No branch specified - use repository default branch
          branchInfo = branches.find(b => b.name === repoDefaultBranch);
          if (!branchInfo) {
            // Default branch not found in branch list
            branchInfo = branches[0];
            currentBranch = branchInfo.name;
            logWarning(`Default branch '${repoDefaultBranch}' not found, using first available: ${currentBranch}`);
          } else {
            currentBranch = repoDefaultBranch;
          }
        }

        // Validate commit if specified, otherwise use branch head
        let currentCommit;
        if (args.commit) {
          // Verify the commit exists and is accessible
          try {
            const commitInfo = await git.getCommit(args.connectionId, args.repo, args.owner, args.commit);
            if (!commitInfo) {
              logWarning(`Specified commit '${args.commit}' not found, falling back to branch head`);
              currentCommit = branchInfo.commit.sha;
            } else {
              currentCommit = args.commit;
            }
          } catch (err) {
            logWarning(`Failed to verify commit '${args.commit}', falling back to branch head: ${err.message}`);
            currentCommit = branchInfo.commit.sha;
          }
        } else {
          currentCommit = branchInfo.commit.sha;
        }

        const repoOrgUser = `${args.owner}-${args.repo}`;

        // Log detailed repository information
        logInfo(`\nRepository details:`);
        logInfo(`├─ Owner/Repo: ${args.owner}/${args.repo}`);
        logInfo(`├─ Default Branch: ${repoDefaultBranch}`);
        logInfo(`├─ Selected Branch: ${currentBranch}`);
        logInfo(`│  └─ Source: ${args.branch ? 'User specified' :
          currentBranch === repoDefaultBranch ? 'Repository default' :
            'Fallback'}`);
        logInfo(`└─ Commit: ${currentCommit.slice(0, 8)}...`);
        logInfo(`   └─ Source: ${args.commit ? 'User specified' : 'Branch head'}`);

        if (debug) {
          logDebug('\nDebug information:');
          logDebug(`- Branch object: ${JSON.stringify(branchInfo, null, 2)}`);
          logDebug(`- Repository object: ${JSON.stringify(repository, null, 2)}`);
        }

        return {
          remoteUrl: `https://github.com/${args.owner}/${args.repo}.git`,
          branch: currentBranch,
          commit: currentCommit,
          repoOrgUser,
          owner: args.owner,
          repo: args.repo
        };
      } catch (err) {
        logError(`Failed to retrieve git info: ${err.message}`);
        if (debug) {
          logDebug(`Stack trace: ${err.stack}`);
        }
        logError("Digest generation error!", {
          connectionId: options.connectionId,
          repoOwner: options.owner,
          repoName: options.repo,
          branch: options.branch,
          error: err.message,
          stack: err.stack,
        });
        throw err
      }
    }

    // Reserved local cache path helper retained as a bounded cache adapter note.
    /*
    function getCachePath(fileHash) {
      return path.join(cacheDir, `${fileHash}.json`);
    }
    */

    // normalizeContent remains here for now; cache helpers moved out.

    function normalizeContent(content) {
      if (!content) return '';

      // Strip BOM if present
      content = content.replace(/^\uFEFF/, '');

      // Normalize line endings to \n
      content = content.replace(/\r\n/g, '\n');
      content = content.replace(/\r/g, '\n');

      // Split, trim trailing whitespace, and rejoin with LF
      content = content.split('\n')
        .map(line => line.trimRight())
        .filter(line => line !== undefined) // Handle any undefined lines
        .join('\n');

      // Ensure file ends with exactly one newline
      content = content.trimRight() + '\n';

      // Additional normalization for consistent hashing:
      // - Replace multiple newlines with single newlines
      content = content.replace(/\n+/g, '\n');
      // - Ensure no leading whitespace lines
      content = content.replace(/^\s*\n/, '');

      if (debug) {
        logDebug(`Normalized content first 100 chars: ${content.slice(0, 100)}`);
        logDebug(`Normalized content length: ${content.length}`);
        logDebug(`Content hash: ${crypto.createHash('sha256').update(content).digest('hex').slice(0, 8)}`);
      }

      return content;
    }

    function hashContent(relativePath, content) {
      if (!relativePath || !content) {
        throw new Error('hashContent requires both relativePath and content');
      }

      const absPath = path.resolve(rootDir, relativePath);

      // Ensure relativePath is normalized to forward slashes and no leading ./
      const normalizedPath = relativePath
        .split(path.sep).join('/')
        .replace(/^\.\//, '');

      // Normalize the content with detailed logging
      const normalizedContent = normalizeContentNew(content);

      // Always log hash generation for debugging
      logInfo(`\n🔒 Generating hash for: ${absPath}`);
      logInfo(`├─ Normalized Path: ${normalizedPath}`);
      logInfo(`├─ Content Length: ${content.length} chars`);
      logInfo(`└─ Normalized Length: ${normalizedContent.length} chars`);

      if (debug) {
        logDebug(`Content sample comparison:`);
        logDebug(`- Original first 32: ${content.slice(0, 32)}`);
        logDebug(`- Normalized first 32: ${normalizedContent.slice(0, 32)}`);
        logDebug(`- Original content hash: ${crypto.createHash('sha256').update(content).digest('hex').slice(0, 8)}`);
        logDebug(`- Normalized content hash: ${crypto.createHash('sha256').update(normalizedContent).digest('hex').slice(0, 8)}`);
      }

      // Create stable path hash (using normalized path)
      const pathHash = crypto.createHash('sha256')
        .update(Buffer.from(normalizedPath, 'utf8'))
        .digest('hex')
        .slice(0, 8);

      // Create stable content hash from normalized content
      const contentHash = crypto.createHash('sha256')
        .update(Buffer.from(normalizedContent, 'utf8'))
        .digest('hex')
        .slice(0, 24);

      // Include version prefix for future hash-format evolution.
      const hash = `v1_${pathHash}_${contentHash}`;

      if (debug) {
        logDebug(`Hash computation details for ${normalizedPath}:`);
        logDebug(`- Normalized path: ${normalizedPath}`);
        logDebug(`- Path hash: ${pathHash}`);
        logDebug(`- Content hash: ${contentHash}`);
        logDebug(`- Final hash: ${hash}`);
      }

      return hash;
    }

    // PATCHED loadFromCache function
    async function loadFromCache(fileHash, relativePath) {
      if (!fileHash || !relativePath) {
        throw new Error('loadFromCache requires both fileHash and relativePath');
      }

      if (!cacheDir) {
        throw new Error('Cache directory not initialized');
      }

      // Skip cache if forceRegenerate is true
      if (forceRegenerate) {
        return null;
      }

      const cachePath = getCachePath(fileHash);
      const normalizedPath = relativePath.split(path.sep).join('/');
      const absPath = path.resolve(rootDir, relativePath);

      // Always log cache operations for debugging
      if (debug) {
        logInfo(`\n🔍 Checking cache for: ${absPath}`);
        logInfo(`├─ File Hash: ${fileHash}`);
        logInfo(`├─ Cache Path: ${cachePath}`);
        logInfo(`└─ Normalized Path: ${normalizedPath}`);
      }

      // Initialize cache stats if needed
      if (!cacheStats.attempts) cacheStats.attempts = 0;
      if (!cacheStats.hits) cacheStats.hits = 0;
      if (!cacheStats.misses) cacheStats.misses = 0;
      if (!cacheStats.expired) cacheStats.expired = 0;
      if (!cacheStats.byType) cacheStats.byType = {};
      if (!cacheStats.missesByReason) cacheStats.missesByReason = {};

      cacheStats.attempts++;

      // Track reason for cache miss
      let cacheMissReason = '';

      if (!fs.existsSync(cachePath)) {
        cacheMissReason = 'Cache file not found';
        if (debug) logInfo(`Cache miss for ${normalizedPath}: ${cacheMissReason}`);
        cacheStats.misses++;
        return null;
      }

      let cacheData;
      try {
        const fileContent = await fs.promises.readFile(cachePath, 'utf-8');
        cacheData = JSON.parse(fileContent);
      } catch (err) {
        if (debug) logInfo(`Cache invalid - JSON parse failed: ${fileHash}`);
        cacheStats.misses++;
        return null;
      }

      // Track reasons for cache misses
      if (!cacheStats.missesByReason) {
        cacheStats.missesByReason = {};
      }

      const recordCacheMiss = (reason, filePath = '') => {
        cacheStats.misses++;
        cacheStats.missesByReason[reason] = (cacheStats.missesByReason[reason] || 0) + 1;
        logWarning(`Cache miss for ${filePath || 'unknown file'}: ${reason}`);
        return null;
      };

      // Validate all required fields are present and of correct type
      const requiredFields = {
        path: 'string',
        relative_path: 'string',
        summary: 'string',
        type: 'string',
        hash: 'string',
        cached_at: 'number',
        token_count: 'number',
        tags: 'array',
        dependencies: 'array'
      };

      for (const [field, expectedType] of Object.entries(requiredFields)) {
        // First check if field exists at all
        if (cacheData[field] === null || cacheData[field] === undefined) {
          logWarning(`Cache record invalid: missing required field '${field}' for ${normalizedPath}. Skipping cache use.`);
          return recordCacheMiss(`missing field: ${field}`, normalizedPath);
        }

        // Type validation with special handling for arrays
        if (expectedType === 'array') {
          if (!Array.isArray(cacheData[field])) {
            logWarning(`Cache record invalid: '${field}' is not an array for ${normalizedPath}. Skipping cache use.`);
            return recordCacheMiss(`${field} is not an array`, normalizedPath);
          }
          // Ensure array elements are strings
          if (!cacheData[field].every(item => typeof item === 'string')) {
            return recordCacheMiss(`${field} contains non-string elements`);
          }
        } else if (typeof cacheData[field] !== expectedType) {
          logWarning(`Cache record invalid: '${field}' is not a ${expectedType} for ${normalizedPath}. Skipping cache use.`);
          return recordCacheMiss(`${field} is not a ${expectedType}`, normalizedPath);
        }

        // Additional validation for specific fields
        if (field === 'summary') {
          if (typeof cacheData[field] !== 'string' || !cacheData[field].trim()) {
            logWarning(`Cache record invalid: summary is empty or invalid for ${normalizedPath}. Skipping cache use.`);
            return recordCacheMiss('summary is empty or invalid', normalizedPath);
          }
        }
      }

      if (cacheData.hash !== fileHash) {
        logInfo(`Cache mismatch - wrong hash in file: ${fileHash}`);
        cacheStats.misses++;
        return null;
      }

      const ageMs = Date.now() - cacheData.cached_at;
      const ageDays = Math.floor(ageMs / (24 * 3600 * 1000));
      if (ageMs > CACHE_TTL_MS) {
        logInfo(`Cache expired - ${ageDays} days old for hash: ${fileHash}`);
        cacheStats.expired++;
        cacheStats.misses++;
        return null;
      }

      // Update type stats
      if (!cacheStats.byType[cacheData.type]) {
        cacheStats.byType[cacheData.type] = { attempts: 0, hits: 0 };
      }
      cacheStats.byType[cacheData.type].attempts++;
      cacheStats.byType[cacheData.type].hits++;

      cacheStats.hits++;
      cacheStats.totalTokensSaved += cacheData.token_count || 0;

      logInfo(`✅ Cache hit for: ${cacheData.path} (${ageDays} days old)`);
      return cacheData;
    }

    // PATCHED saveToCache function
    async function saveToCache(fileHash, data) {
      if (dryRun) {
        logDebug(`[DRY RUN] Would save cache for: ${data.relativePath}`);
        return;
      }

      // Validate required data fields
      const requiredFields = ['path', 'relativePath', 'summary', 'type', 'tokenCount'];
      const missing = requiredFields.filter(field => !data[field]);
      if (missing.length > 0) {
        logError(`Cannot save to cache - missing required fields: ${missing.join(', ')}`);
        return;
      }

      const cachePath = getCachePath(fileHash);
      const cacheDir = path.dirname(cachePath);
      const absPath = path.resolve(rootDir, data.relativePath);

      // Always log cache saves for debugging
      logInfo(`\n💾 Saving to cache: ${absPath}`);
      logInfo(`├─ File Hash: ${fileHash}`);
      logInfo(`├─ Cache Dir: ${cacheDir}`);
      logInfo(`└─ Cache Path: ${cachePath}`);

      try {
        if (!fs.existsSync(cacheDir)) {
          logDebug(`Creating cache directory: ${cacheDir}`);
          await fs.promises.mkdir(cacheDir, { recursive: true });
        }
      } catch (err) {
        logError(`Failed to create cache directory ${cacheDir}: ${err}`);
        return;
      }

      const toSave = {
        path: data.path,
        relative_path: data.relativePath,
        summary: data.summary, // Don't allow empty summaries
        type: data.type,
        token_count: data.tokenCount,
        cached_at: Date.now(),
        hash: fileHash,
        root_dir: rootDir,
        // Ensure tags and dependencies are always string arrays
        tags: (Array.isArray(data.tags) ? data.tags : [])
          .filter(tag => tag && typeof tag === 'string')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0),
        dependencies: (Array.isArray(data.dependencies) ? data.dependencies : [])
          .filter(dep => dep && typeof dep === 'string')
          .map(dep => dep.trim())
          .filter(dep => dep.length > 0),
        args: {
          force_regenerate: forceRegenerate,
          dry_run: dryRun
        }
      };

      // Validate the object before saving
      const validateField = (obj, field, type) => {
        if (obj[field] === null || obj[field] === undefined) {
          throw new Error(`Missing required field: ${field}`);
        }
        if (type === 'array') {
          if (!Array.isArray(obj[field])) {
            throw new Error(`Field ${field} must be an array`);
          }
          if (!obj[field].every(item => typeof item === 'string')) {
            throw new Error(`All items in ${field} must be strings`);
          }
        } else if (typeof obj[field] !== type) {
          throw new Error(`Field ${field} must be of type ${type}`);
        }
      };

      // First validate the summary is non-empty before attempting to cache
      if (!data.summary || !data.summary.trim()) {
        logError(`Cannot save to cache - empty summary for ${data.relativePath}`);
        return;
      }

      try {
        validateField(toSave, 'path', 'string');
        validateField(toSave, 'relative_path', 'string');
        validateField(toSave, 'summary', 'string');
        validateField(toSave, 'type', 'string');
        validateField(toSave, 'token_count', 'number');
        validateField(toSave, 'cached_at', 'number');
        validateField(toSave, 'hash', 'string');
        validateField(toSave, 'tags', 'array');
        validateField(toSave, 'dependencies', 'array');
      } catch (err) {
        logError(`Failed to validate cache data: ${err.message}`);
        return;
      }

      try {
        // First verify we can write to the directory
        const testFile = path.join(cacheDir, '.write-test');
        fs.writeFileSync(testFile, 'test');
        fs.unlinkSync(testFile);

        // Now save the actual cache file
        fs.writeFileSync(cachePath, JSON.stringify(toSave, null, 2));

        // Verify the file was written
        if (!fs.existsSync(cachePath)) {
          throw new Error('Cache file not found after writing');
        }

        const stats = fs.statSync(cachePath);
        logDebug(`Successfully saved cache for: ${data.relativePath}`);
        logDebug(`- Cache file size: ${stats.size} bytes`);
        logDebug(`- Cache file path: ${cachePath}`);
      } catch (err) {
        // Log the primary error first
        logError(`Failed to save cache for ${data.relativePath}: ${err}`);
        logError(`- Cache path: ${cachePath}`);

        // Safely check directory existence
        try {
          logError(`- Cache directory exists: ${fs.existsSync(cacheDir)}`);
        } catch (checkErr) {
          logError(`- Cache directory check failed: ${checkErr.message}`);
        }

        // Safely check directory permissions
        try {
          fs.accessSync(cacheDir, fs.constants.W_OK);
          logError(`- Cache directory writable: true`);
        } catch (accessErr) {
          logError(`- Cache directory writable: false (${accessErr.message})`);
        }

        // Additional diagnostic information
        try {
          const stats = fs.statSync(cacheDir);
          logError(`- Cache directory mode: ${stats.mode}`);
          logError(`- Cache directory owner: ${stats.uid}:${stats.gid}`);
        } catch (statsErr) {
          logError(`- Unable to get cache directory stats: ${statsErr.message}`);
        }
      }
    }

    function readGitignore(rootDir) {
      let patterns = [];

      const gitignorePath = path.join(rootDir, '.gitignore');
      if (fs.existsSync(gitignorePath)) {
        try {
          patterns = fs.readFileSync(gitignorePath, 'utf-8')
            .split('\n')
            .map(l => l.trim())
            .filter(l => l && !l.startsWith('#'));

          if (debug) {
            logDebug('Loaded .gitignore patterns:');
            patterns.forEach(p => logDebug(`- ${p}`));
          }
        } catch (err) {
          logWarning(`Error reading .gitignore: ${err.message}`);
        }
      }

      return patterns;
    }

    async function getGitignorePatterns() {
      let patterns = [];

      try {
        // Try to get .gitignore content from GitHub
        const gitignoreContent = await git.getFileContent(connectionId, repo, owner, gitInfo.gitBranch, '.gitignore');
        if (gitignoreContent) {
          patterns = gitignoreContent
            .split('\n')
            .map(l => l.trim())
            .filter(l => l && !l.startsWith('#'));

          if (debug) {
            logDebug('Loaded .gitignore patterns from GitHub:');
            patterns.forEach(p => logDebug(`- ${p}`));
          }
        }
      } catch (err) {
        logDebug('.gitignore not found in GitHub repository');
      }

      return patterns;
    }

    function matchesPattern(filePath, pattern) {
      // Handle negation patterns by stripping '!' prefix
      const isNegation = pattern.startsWith('!');
      const actualPattern = isNegation ? pattern.slice(1) : pattern;

      const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      let regexPattern = actualPattern.split('/').map(escapeRegex).join('\\/');
      regexPattern = regexPattern.replace(/\\\*\\\*/g, '.*').replace(/\\\*/g, '[^/]*');
      const regex = new RegExp(`^${regexPattern}$`, 'i');

      if (regex.test(filePath)) return true;

      if (!actualPattern.includes('/')) {
        const base = path.basename(filePath);
        const filenamePattern = actualPattern.replace(/\//g, '');
        let filenameRegexStr = filenamePattern
          .split('*').map(escapeRegex).join('.*');
        const filenameRegex = new RegExp(`^${filenameRegexStr}$`, 'i');
        return filenameRegex.test(base);
      }

      return false;
    }

    function shouldIgnoreFile(relPath, ignorePatterns) {
      // Never ignore the root directory
      if (!relPath || relPath === '.' || relPath === './') {
        return false;
      }

      const normalizedPath = relPath.replace(/\\/g, '/');
      let ignored = false;

      for (const pat of ignorePatterns) {
        if (!pat || pat.trim() === '') continue;

        // Handle negation patterns
        if (pat.startsWith('!')) {
          if (minimatch(normalizedPath, pat.slice(1))) {
            ignored = false;
            if (debug) logDebug(`Un-ignoring: ${normalizedPath} (negated by: ${pat})`);
          }
        } else {
          if (minimatch(normalizedPath, pat)) {
            ignored = true;
            if (debug) logDebug(`Ignoring: ${normalizedPath} (matched: ${pat})`);
          }
        }
      }

      if (debug && !ignored) {
        logDebug(`Including: ${normalizedPath}`);
      }

      return ignored;
    }

    function isBinary(filePath) {
      try {
        const fd = fs.openSync(filePath, 'r');
        const buffer = Buffer.alloc(1024);
        const bytesRead = fs.readSync(fd, buffer, 0, 1024, 0);
        fs.closeSync(fd);
        for (let i = 0; i < bytesRead; i++) {
          if (buffer[i] === 0) return true;
        }
        return false;
      } catch {
        return false;
      }
    }

    function getFileType(filePath) {
      const ext = path.extname(filePath).toLowerCase();
      const normalizedPath = filePath.split(path.sep).join('/');

      // Special case: .tsx files in app/api are API routes
      if (ext === '.tsx' && normalizedPath.includes('app/api/')) {
        return 'api-route';
      }

      // Special case: any file in app/api is likely an API route
      if (normalizedPath.includes('app/api/')) {
        return 'api-route';
      }

      const codeExtensions = new Set([
        '.py', '.pyi', '.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs',
        '.rs', '.c', '.cpp', '.h', '.hpp', '.java', '.kt', '.kts', '.swift', '.php'
      ]);

      if (ext === '.ipynb') return 'notebook';
      else if (ext === '.tsx') return 'ui-component';
      else if (ext === '.jsx') return 'ui-component';
      else if (codeExtensions.has(ext)) return 'code';
      else if (['.md', '.rst', '.txt', '.adoc', '.asciidoc', '.wiki', '.org'].includes(ext)) return 'documentation';
      else if (['.json', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf', '.env'].includes(ext)) return 'config';
      return 'unknown';
    }

    // estimateTokens / estimateDigestOutputTokens migrated to @/digest/tokens

    function validateContent(filePath, content) {
      if (!content || typeof content !== 'string') return false;
      if (!content.trim()) return false;
      if (content.slice(0, 1000).includes('\x00')) return false;
      if (filePath.toLowerCase().endsWith('.json')) {
        try {
          JSON.parse(content);
        } catch {
          return false;
        }
      }
      return true;
    }

    function isGitRepository(dir) {
      try {
        return fs.existsSync(path.join(dir, '.git'));
      } catch (err) {
        return false;
      }
    }

    function getGitTrackedFilesSync(dir) {
      try {
        const output = execSync('git ls-files', {
          cwd: dir,
          encoding: 'utf8'
        }).trim();

        return output.split('\n')
          .filter(Boolean)
          .map(relativePath => {
            const fullPath = path.join(dir, relativePath);
            const stats = fs.statSync(fullPath);
            return {
              path: relativePath,
              size: stats.size
            };
          });
      } catch (err) {
        logWarning(`Failed to get git tracked files: ${err.message}`);
        return null;
      }
    }

    function getAllFilesRecursive(dir, baseDir = dir, depth = 0, visited = new Set()) {
      // Prevent infinite recursion
      const maxDepth = 50; // Maximum directory depth
      if (depth > maxDepth) {
        logWarning(`Directory depth exceeds ${maxDepth} at ${dir}, skipping deeper traversal`);
        return [];
      }

      // Handle circular symlinks
      const canonicalPath = fs.realpathSync(dir);
      if (visited.has(canonicalPath)) {
        logWarning(`Circular symlink detected at ${dir}, skipping`);
        return [];
      }
      visited.add(canonicalPath);

      const results = [];
      let items;

      try {
        items = fs.readdirSync(dir);
      } catch (err) {
        logWarning(`Error reading directory ${dir}: ${err.message}`);
        return [];
      }

      for (const item of items) {
        const fullPath = path.join(dir, item);

        try {
          const stat = fs.lstatSync(fullPath); // Use lstatSync instead of statSync to handle symlinks

          if (stat.isSymbolicLink()) {
            logDebug(`Skipping symlink: ${fullPath}`);
            continue;
          }

          if (stat.isDirectory()) {
            results.push(...getAllFilesRecursive(fullPath, baseDir, depth + 1, visited));
          } else if (stat.isFile()) {
            const relativePath = path.relative(baseDir, fullPath);
            results.push({
              path: relativePath.split(path.sep).join('/'),
              size: stat.size
            });
          }
        } catch (err) {
          logWarning(`Error processing ${fullPath}: ${err.message}`);
          continue;
        }
      }

      return results;
    }

    function shouldBlacklistFile(filePath) {
      // Always normalize to forward slashes
      const normalizedPath = filePath.replace(/\\/g, '/');

      // Log blacklist checks in debug mode
      if (debug) {
        logDebug(`Checking blacklist for: ${normalizedPath}`);
      }

      for (const pattern of FINAL_BLACKLIST) {
        if (pattern.test(normalizedPath)) {
          if (debug) {
            logDebug(`File blacklisted: ${normalizedPath} (matched ${pattern})`);
          }
          return true;
        }
      }

      return false;
    }

    async function listAllFiles(ignorePatterns) {
      try {
        let allFiles;
        const isGitRepo = isGitRepositoryNew(rootDir);

        logInfo('\n📂 Gathering files...');
        logInfo(`├─ Root Directory: ${rootDir}`);
        logInfo(`├─ Git Repository: ${isGitRepo ? 'Yes' : 'No'}`);

        // First try git ls-files if it's a git repo
        if (isGitRepo) {
          logInfo('├─ Attempting git ls-files...');
          allFiles = getGitTrackedFilesSync(rootDir);

          if (allFiles) {
            logInfo(`│  └─ Found ${allFiles.length} tracked files`);
          } else {
            logInfo('│  └─ git ls-files failed, falling back to recursive scan');
          }
        }

        // Fallback to recursive directory scan if needed
        if (!allFiles) {
          logInfo('├─ Performing recursive directory scan...');
          allFiles = getAllFilesRecursive(rootDir);
          logInfo(`│  └─ Found ${allFiles.length} files`);

          // Apply gitignore patterns if available
          if (ignorePatterns && ignorePatterns.length > 0) {
            const beforeCount = allFiles.length;
            allFiles = allFiles.filter(file => !shouldIgnoreFile(file.path, ignorePatterns));
            logInfo(`│      └─ ${beforeCount - allFiles.length} files filtered by .gitignore`);
          }
        }

        // Apply final blacklist
        const beforeBlacklist = allFiles.length;
        if (debug) {
          logDebug('\nApplying blacklist filtering...');
        }
        allFiles = allFiles.filter(file => {
          const shouldBlacklist = shouldBlacklistFile(file.path);
          if (debug && shouldBlacklist) {
            logDebug(`Blacklisted: ${file.path}`);
          }
          return !shouldBlacklist;
        });
        logInfo(`├─ Applied blacklist: ${beforeBlacklist - allFiles.length} files filtered`);
        logInfo(`└─ Final file count: ${allFiles.length}`);

        if (debug) {
          logDebug('\nFirst 5 files to be processed:');
          allFiles.slice(0, 5).forEach(f => logDebug(`- ${f.path}`));

          logDebug('\nBlacklisted files (first 5):');
          const blacklisted = allFiles.filter(f => shouldBlacklistFile(f.path)).slice(0, 5);
          blacklisted.forEach(f => logDebug(`- ${f.path}`));
        }

        return allFiles;
      } catch (err) {
        logError(`Error in listAllFiles: ${err.message}`);
        if (debug) {
          logDebug(`Stack trace: ${err.stack}`);
        }
        throw err;
      }
    }

    // "relevance" here really means *not* binary, empty, non-regular file, etc. that's it! helpful but not to be confused with task-based file filtering (LLM usage). this can safely run on all files or previously filtered files to remove files we *never* want to consider in a text-prompt input (maybe this because as isMultiModal filter and shouldAlwaysIgnore)
    function isRelevantFile(fileInfo) {
      if (!fileInfo || !fileInfo.path) {
        logWarning(`Invalid file info object: ${JSON.stringify(fileInfo)}`);
        return false;
      }

      // Ensure we have a valid path string
      if (typeof fileInfo.path !== 'string') {
        logWarning(`Invalid file path: ${JSON.stringify(fileInfo)}`);
        return false;
      }

      try {
        const fullPath = path.resolve(rootDir, fileInfo.path);
        logDebug(`Checking relevance of file: ${fullPath}`);
        logDebug(`- Root directory: ${rootDir}`);
        logDebug(`- Relative path: ${fileInfo.path}`);

        if (!fs.existsSync(fullPath)) {
          logWarning(`File does not exist: ${fullPath}`);
          logDebug(`- Attempted path resolution from root: ${rootDir}`);
          return false;
        }

        const stats = fs.statSync(fullPath);
        if (!stats.isFile()) {
          logDebug(`Not a regular file: ${fullPath}`);
          return false;
        }

        if (stats.size === 0) {
          logDebug(`Empty file: ${fullPath}`);
          return false;
        }

        if (isBinaryNew(fullPath)) {
          logDebug(`Binary file detected: ${fullPath}`);
          return false;
        }

        logDebug(`File is relevant: ${fullPath}`);
        return true;
      } catch (err) {
        logWarning(`Error checking file ${fileInfo.path}: ${err.message}`);
        logDebug(`Stack trace: ${err.stack}`);
        return false;
      }
    }

    // Instead of generating file digest individually, we now do batch summarization
    // We'll have a function that takes a batch of files, their contents, and produce multiple digests in a single LLM call.
    async function batchSummarizeFiles(files, batchContext = null) {
      // Each file: { path, relativePath, content, type, tokenCount }
      if (dryRun) {
        logInfo(`[DRY RUN] Would process batch of ${files.length} files`);
        return files.map(f => ({
          relativePath: f.relativePath,
          type: f.type,
          summary: "[DRY RUN] Summary would be generated here",
          tokenCount: f.tokenCount,
          path: f.path,
          tags: [],
          dependencies: []
        }));
      }

      // Log batch context if provided and stream progress
      if (batchContext) {
        const progressDetail = createProgressDetail(files, batchContext);
        logInfo(`Processing batch ${batchContext.current}/${batchContext.total}`);
        await streamProgress(
          dataStream,
          `Digesting batch of files (${batchContext.current}/${batchContext.total})...`,
          progressDetail
        );
        logInfo(`├─ Files in this ${batchContext.type}: ${files.length}`);
        if (batchContext.parentSize) {
          logInfo(`└─ Original batch size: ${batchContext.parentSize}`);
        }
      } else {
        logInfo(`Processing batch of ${files.length} files`);
      }

      const totalTokens = files.reduce((sum, f) => sum + f.tokenCount, 0);
      logInfo(`Total token estimate for this batch: ${totalTokens}`);

      const prompt = `${FILE_SUMMARIES_PROMPT}
  CRITICAL PURPOSE:
  This digest will be used by an AI agent to decide which files to load and modify for future code changes.
  Your analysis must help the AI quickly identify relevant files and understand their relationships. This is called a "File Digest".
  
  CRITICAL OUTPUT REQUIREMENTS:
  1. Output MUST be a raw JSON array with NO extra text
  2. Each object MUST have EXACTLY these fields in this order:
     {
       "relativePath": string,  // File path relative to root
       "type": string,         // File type classification
       "summary": string,      // Implementation analysis with sections below
       "tags": string[],       // Technologies and patterns used
       "dependencies": string[], // Direct file dependencies
       "keywords": string[]     // Local variables, function names, class names (NOT language keywords)
     }
  3. Even for empty/simple files, provide a valid minimal summary
  4. NO text before or after the JSON array
  
  CRITICAL INSTRUCTIONS:
  1. Output STRICTLY a JSON array. Output NOTHING except a raw JSON array.
  2. No text before or after the array. No code blocks. No markdown. No comments.
  3. For the "keywords" field, extract ONLY:
     - Local variable names (e.g., myVariable, userCount)
     - Function names (e.g., calculateTotal(), processUser())
     - Class names (e.g., UserManager, DataProcessor)
     - Every import and export
     DO NOT include:
     - Language keywords (if, const, function, class, etc)
     - Built-in types (string, number, boolean, etc)
  3. Each object in the array MUST have EXACTLY these keys:
  {
    "relativePath": string,  // File path relative to root
    "type": string,         // File type classification
    "summary": string,      // Detailed implementation analysis
    "tags": string[],       // Key technologies (external) and patterns/abstractions/imports (internal) used
    "dependencies": string[], // Files this code directly interacts with
    "keywords": string[]     // Local variables, function names, class names (NOT language keywords)
  }
  4. The array must contain one object per input file, in order.
  
  REQUIRED SUMMARY STRUCTURE:
  Each summary MUST include these sections, clearly labeled:
  1. PRIMARY PURPOSE (1-2 paragraphs)
     - File's main responsibility in the system
     - How it supports the overall architecture
     
  2. KEY ELEMENTS (minimum 3-5 bullet points)
     - List important classes, functions, or configurations
     - Include representative code signatures
     - Document inputs, outputs, and side effects
     
  3. DEPENDENCIES & RELATIONSHIPS
     - List direct dependencies (imports)
     - Explain how this file interacts with others
     - Note any architectural patterns used
     
  4. IMPLEMENTATION DETAILS
     - Step-by-step explanation of core logic
     - Notable algorithms or data structures
     - Performance considerations
     - Error handling approach
     
  5. ARCHITECTURAL CONTEXT
     - File's role in the broader system
     - Integration points with other components
     - Design patterns implemented
     
  TYPE-SPECIFIC REQUIREMENTS:
  ${files.map(f => FILE_SUMMARIES_TYPE_SPECIFIC_INSTRUCTIONS[f.type] || '').join('\n\n')}
  
  QUALITY REQUIREMENTS:
  - NO vague descriptions ("simple function", "basic class")
  - Include specific implementation details
  - Reference actual code elements
  - Explain WHY certain patterns are used
  - Minimum length: 250 words per file
  - Use technical, precise language
  
  Remember: Output ONLY a raw JSON array. No extra text or formatting.
`.trim();

      const response = await callLLMAPI(prompt, modelConfig.maxOutputTokens, true, BATCH_SUMMARY_MODEL);
      if (!response) {
        logError('LLM returned an empty response.');
        return [];
      }
      logInfo('LLM call completed. Attempting to parse and validate response...');

      // Parse the response which should be a JSON array string
      let jsonArray = [];
      try {
        jsonArray = JSON.parse(response);
        if (!Array.isArray(jsonArray)) {
          logError("The response does not contain a JSON array of file digests.");
          return [];
        }
      } catch (err) {
        logError(`Failed to parse JSON from batch response: ${err}`);
        logError("Response that failed parsing:");
        logError(response);
        return [];
      }

      // Validate array contents and ensure required fields
      if (!Array.isArray(jsonArray)) {
        logError("Parsed result is not an array");
        logDebug(`Parsed result type: ${typeof jsonArray}`);
        return [];
      }

      // Create a map of input files for reordering
      const fileMap = new Map(files.map((f, idx) => [f.relativePath, { index: idx, file: f }]));
      const reordered = new Array(files.length).fill(null);

      // Reorder results to match input files
      for (const item of jsonArray) {
        if (fileMap.has(item.relativePath)) {
          const { index } = fileMap.get(item.relativePath);
          reordered[index] = item;
        } else {
          logWarning(`Received digest for ${item.relativePath} which is not in the requested files.`);
        }
      }

      // Filter out nulls (missing files) and update jsonArray
      const validResults = reordered.filter(Boolean);
      if (validResults.length < files.length) {
        logWarning(`Not all files were returned. Got ${validResults.length} of ${files.length}. Returning partial results.`);
      }
      jsonArray = validResults;

      // Log validation context with clear separation between current and parent batch info
      const expectedCount = files.length;  // Always use current files array length
      const actualCount = jsonArray.length;

      // Build context message
      let contextMsg = 'batch';
      if (batchContext) {
        contextMsg = `${batchContext.type} ${batchContext.current}/${batchContext.total}`;
      }

      logInfo(`\n🔍 Validating ${contextMsg} results:`);
      logInfo(`├─ Expected entries for this ${batchContext ? 'chunk' : 'batch'}: ${expectedCount}`);
      logInfo(`├─ Actual entries received: ${actualCount}`);

      // Separate parent batch info into its own section if available
      if (batchContext?.parentSize) {
        logInfo(`│`);
        logInfo(`├─ Context Information:`);
        logInfo(`│  ├─ Processing as chunk ${batchContext.current} of ${batchContext.total}`);
        logInfo(`│  ├─ Parent batch size: ${batchContext.parentSize}`);
        logInfo(`│  └─ Chunk start index: ${batchContext.startIndex}`);
      }

      // Validate and normalize each digest
      let normalizedArray;
      try {
        normalizedArray = jsonArray.map((item, index) => {
          if (!item || typeof item !== 'object') {
            throw new Error(`Invalid item at index ${index}: ${JSON.stringify(item)}`);
          }

          // Ensure all required fields exist
          const normalized = {
            relativePath: item.relativePath || '',
            type: item.type || 'unknown',
            summary: item.summary || '',
            tags: Array.isArray(item.tags) ? item.tags : [],
            dependencies: Array.isArray(item.dependencies) ? item.dependencies : [],
            keywords: Array.isArray(item.keywords) ? item.keywords : []
          };

          // Validate strings
          normalized.relativePath = String(normalized.relativePath);
          normalized.type = String(normalized.type);
          normalized.summary = String(normalized.summary);

          // Ensure arrays contain only strings
          normalized.tags = normalized.tags.map(String);
          normalized.dependencies = normalized.dependencies.map(String);

          return normalized;
        });
      } catch (err) {
        logError(`Failed to normalize results: ${err.message}`);
        return [];
      }

      // Handle partial successes - return valid items even if count mismatches
      if (normalizedArray.length !== files.length) {
        const context = batchContext ?
          `in ${batchContext.type} ${batchContext.current}/${batchContext.total}` :
          'in batch';
        logWarning(`Result count mismatch ${context}. Expected ${files.length}, got ${normalizedArray.length}`);
        logWarning('Returning partial results for successfully parsed items.');

        // If we have at least one valid item, return it with safe fallbacks
        if (normalizedArray.length > 0) {
          return normalizedArray.map((item, i) => ({
            relativePath: item.relativePath || (files[i]?.relativePath ?? ''),
            type: item.type || (files[i]?.type ?? 'unknown'),
            summary: item.summary || "",
            tokenCount: files[i]?.tokenCount ?? 0,
            path: files[i]?.path ?? '',
            tags: item.tags || [],
            dependencies: item.dependencies || []
          }));
        }

        // If no valid items, fallback to empty array
        return [];
      }

      // Filter for valid items instead of failing on invalid ones
      const validItems = jsonArray.filter(item => {
        const isValid = item && item.relativePath && item.type && item.summary;
        if (!isValid && debug) {
          logDebug(`Invalid item found: ${JSON.stringify(item, null, 2)}`);
        }
        return isValid;
      });

      const invalidCount = jsonArray.length - validItems.length;

      if (invalidCount > 0) {
        logWarning(`Found ${invalidCount} items missing required fields. Will return only valid items.`);
        logWarning(`Original batch size: ${jsonArray.length}, Valid items: ${validItems.length}`);

        if (debug) {
          const invalidItems = jsonArray.filter(item =>
            !item || !item.relativePath || !item.type || !item.summary
          );
          logDebug('First invalid item details:');
          logDebug(JSON.stringify(invalidItems[0], null, 2));
        }
      }

      // Replace jsonArray with just validItems for further processing
      jsonArray = validItems;

      // If we have no valid items at all, that's still a failure
      if (validItems.length === 0) {
        logError('No valid items found in response');
        return [];
      }

      return jsonArray.map((item, i) => {
        return {
          relativePath: item.relativePath || files[i].relativePath,
          type: item.type || files[i].type,
          summary: item.summary || "",
          tokenCount: files[i].tokenCount,
          path: files[i].path,
          tags: item.tags || [],
          dependencies: item.dependencies || [],
          keywords: item.keywords || []
        };
      });
    }

    function readFileContentAndType(filePath, rootDir) {
      // Get canonical absolute paths first
      const absRoot = path.resolve(rootDir);
      const absPath = path.resolve(absRoot, filePath);

      if (debug) {
        try {
          const stats = fs.statSync(absPath);
          logDebug(`File stats for ${filePath}:`);
          logDebug(`- Size: ${stats.size} bytes`);
          logDebug(`- Last modified: ${stats.mtime}`);
          logDebug(`- Absolute path: ${absPath}`);
          logDebug(`- Root dir: ${absRoot}`);
        } catch (err) {
          logDebug(`Error getting file stats: ${err.message}`);
        }
      }

      let content;
      try {
        content = fs.readFileSync(absPath, 'utf-8');
      } catch (err) {
        logWarning(`Failed to read file ${absPath}: ${err}`);
        return null;
      }

      if (!validateContentNew(absPath, content)) {
        logWarning(`Invalid content for ${absPath}, skipping.`);
        return null;
      }

      // Normalize content
      content = normalizeContentNew(content);

      // Get relative path using canonical paths
      const relativePath = path.relative(absRoot, absPath)
        .split(path.sep)
        .join('/'); // Always use forward slashes

      const type = getFileTypeNew(absPath);
      const tokenCount = estimateTokensNew(content);

      return {
        path: absPath,
        relativePath,
        content,
        type,
        tokenCount
      };
    }

    function buildPurposeContext(digests, repoName) {
      const readmeDigest = digests.find(
        (d) => d.relativePath.toLowerCase() === 'readme.md' || d.relativePath.toLowerCase() === 'readme',
      );
      const topFiles = digests
        .filter((d) => d !== readmeDigest)
        .sort((a, b) => (b.tokenCount ?? 0) - (a.tokenCount ?? 0))
        .slice(0, 8)
        .map((d) => `- ${d.relativePath}: ${d.summary}`);

      const parts: string[] = [];
      parts.push(`Repository: ${repoName}`);
      if (readmeDigest) {
        parts.push(`README summary:\n${readmeDigest.summary}`);
      }
      if (topFiles.length > 0) {
        parts.push(`Key files:\n${topFiles.join('\n')}`);
      }
      return parts.join('\n\n');
    }

    async function generateProductPurpose(digests, repoName) {
      if (!Array.isArray(digests) || digests.length === 0) {
        return 'Purpose TBD – no digest data available.';
      }

      const context = buildPurposeContext(digests, repoName);
      const prompt = buildProductPurposePrompt(context);
      logInfo('\n📘 Generating PRODUCT.md purpose section...');
      logInfo(`├─ Using model: ${GUIDE_GENERATION_MODEL}`);
      logInfo(`└─ Prompt length: ${prompt.length} characters`);

      try {
        const response = await callLLMAPI(prompt, modelConfig.maxOutputTokens, false, GUIDE_GENERATION_MODEL);
        return String(response).trim() || 'Purpose TBD – awaiting author input.';
      } catch (error) {
        logError('Failed to generate PRODUCT purpose', { message: error?.message });
        return 'Purpose TBD – awaiting author input.';
      }
    }

    function buildFeaturesContext(groupedDigests) {
      return Object.entries(groupedDigests)
        .map(([category, items]) => {
          const topItems = items.slice(0, 6).map((d) => `- ${d.relativePath}: ${d.summary}`);
          return `Category: ${category}\n${topItems.join('\n')}`;
        })
        .join('\n\n');
    }

    async function generateProductFeatures(groupedDigests) {
      const context = buildFeaturesContext(groupedDigests);
      if (!context) {
        return '- Feature documentation to be captured.';
      }

      const prompt = buildProductFeaturesPrompt(context);
      logInfo('\n📙 Generating PRODUCT.md features section...');
      logInfo(`├─ Using model: ${GUIDE_GENERATION_MODEL}`);
      logInfo(`└─ Prompt length: ${prompt.length} characters`);

      try {
        const response = await callLLMAPI(prompt, modelConfig.maxOutputTokens, false, GUIDE_GENERATION_MODEL);
        return String(response).trim() || '- Feature documentation to be captured.';
      } catch (error) {
        logError('Failed to generate PRODUCT features', { message: error?.message });
        return '- Feature documentation to be captured.';
      }
    }

    function generateSourceFilesSection(groupedDigests) {
      const lines: string[] = [];
      Object.entries(groupedDigests).forEach(([category, items]) => {
        if (!items.length) {
          return;
        }
        lines.push(`## ${category}`);
        items.forEach((digest) => {
          lines.push(`- \`${digest.relativePath}\` — ${digest.summary}`);
        });
        lines.push('');
      });

      if (lines.length === 0) {
        return '_No source files summarised yet._';
      }

      return lines.join('\n').trim();
    }

    function buildAgentInstructionsContext(productPurpose, productFeatures, groupedDigests) {
      const categoryHighlights = Object.entries(groupedDigests)
        .map(([category, items]) => {
          const sample = items.slice(0, 3).map((d) => `- ${d.relativePath}`).join('\n');
          return `${category} breakdown:\n${sample}`;
        })
        .join('\n\n');

      return [
        'Product purpose summary:',
        productPurpose,
        '\nFeature highlights:',
        productFeatures,
        '\nFile category snapshot:',
        categoryHighlights
      ].join('\n');
    }

    async function generateAgentInstructions(productPurpose, productFeatures, groupedDigests) {
      const context = buildAgentInstructionsContext(productPurpose, productFeatures, groupedDigests);
      const prompt = buildAgentInstructionsPrompt(context);
      logInfo('\n📗 Generating AGENTS instructions...');
      logInfo(`├─ Using model: ${GUIDE_GENERATION_MODEL}`);
      logInfo(`└─ Prompt length: ${prompt.length} characters`);

      try {
        const response = await callLLMAPI(prompt, modelConfig.maxOutputTokens, false, GUIDE_GENERATION_MODEL);
        return String(response).trim() || '- Document collaborative behaviours explicitly.';
      } catch (error) {
        logError('Failed to generate agent instructions', { message: error?.message });
        return '- Document collaborative behaviours explicitly.';
      }
    }

    function buildAgentQuestionsContext(groupedDigests, digests) {
      const complexFiles = [...digests]
        .sort((a, b) => (b.tokenCount ?? 0) - (a.tokenCount ?? 0))
        .slice(0, 10)
        .map((d) => `- ${d.relativePath}: tokens ${d.tokenCount ?? 0}`)
        .join('\n');

      const categoryCounts = Object.entries(groupedDigests)
        .map(([category, items]) => `${category}: ${items.length} files`)
        .join('\n');

      return [
        'File categories:',
        categoryCounts,
        '\nLargest or most complex files:',
        complexFiles
      ].join('\n');
    }

    async function generateAgentQuestions(groupedDigests, digests) {
      const context = buildAgentQuestionsContext(groupedDigests, digests);
      const prompt = buildAgentSeekingQuestionsPrompt(context);
      logInfo('\n📕 Generating AGENTS seeking questions...');
      logInfo(`├─ Using model: ${GUIDE_GENERATION_MODEL}`);
      logInfo(`└─ Prompt length: ${prompt.length} characters`);

      try {
        const response = await callLLMAPI(prompt, modelConfig.maxOutputTokens, false, GUIDE_GENERATION_MODEL);
        return String(response).trim() || '- Identify missing knowledge areas and document them here.';
      } catch (error) {
        logError('Failed to generate agent questions', { message: error?.message });
        return '- Identify missing knowledge areas and document them here.';
      }
    }

    // Set up repository access and determine working directory first
    if (isGitHubMode) {
      const info = await getGitInfo();
      gitInfo.remoteUrl = info.remoteUrl;
      gitInfo.repoOrgUser = info.repoOrgUser;
      gitInfo.gitBranch = info.branch;
      gitInfo.gitCommit = info.commit;

      logInfo(`GitHub mode (isGithubMode = ${isGitHubMode}) detected...`);
      logInfo(`Owner: ${owner}, Repo: ${repo}, Branch: ${args.branch || 'default'}`);

      if (options.usePreClonedRepo && options.rootDir) {
        logInfo(`Using pre-cloned repository at: ${options.rootDir}`);

        // Verify the directory exists and has content
        if (!fs.existsSync(options.rootDir)) {
          throw new Error(`Pre-cloned repository directory does not exist: ${options.rootDir}`);
        }

        const files = fs.readdirSync(options.rootDir);
        if (files.length === 0) {
          throw new Error(`Pre-cloned repository directory is empty: ${options.rootDir}`);
        }

        // Verify it's a git repository by checking for a .git directory
        const gitDirPath = path.join(options.rootDir, '.git');
        if (!fs.existsSync(gitDirPath) || !fs.statSync(gitDirPath).isDirectory()) {
          throw new Error(`Pre-cloned repository directory is not a Git repository (missing .git): ${options.rootDir}`);
        }
        rootDir = options.rootDir;
        logInfo(`✅ Using pre-cloned repository:`);
        logInfo(`├─ Location: ${rootDir}`);
        logInfo(`├─ Files Found: ${files.length}`);
      } else if (options.rootDir) {
        // Create a temporary directory for the clone
        const cloneDir = path.join('/tmp/bitcode', 'clones', `${owner}-${repo}-${Date.now()}`);
        fs.mkdirSync(cloneDir, { recursive: true });

        try {
          // Validate required parameters
          if (!owner || !repo) {
            const error = new Error('Owner or repo not provided, cannot clone repository.');
            logError(error.message);
            throw error;
          }

          // Log clone parameters for debugging
          logInfo('\n🔄 Cloning repository with parameters:');
          logInfo(`├─ Installation ID: ${connectionId}`);
          logInfo(`├─ Repository: ${repo}`);
          logInfo(`├─ Owner: ${owner}`);
          logInfo(`├─ Branch: ${gitInfo.gitBranch}`);
          logInfo(`└─ Clone Directory: ${cloneDir}`);

          // Validate clone directory is writable
          try {
            await fs.promises.access(path.dirname(cloneDir), fs.constants.W_OK);
          } catch (err) {
            throw new Error(`Clone directory ${cloneDir} is not writable: ${err.message}`);
          }

          // Clone the repository with correct argument order:
          // connectionId, repo, owner, ref, outputDir
          const repoDir = await git.cloneRepository(
            connectionId,
            repo,           // repo name
            owner,          // owner name
            gitInfo.gitBranch, // branch/ref
            cloneDir        // output directory
          );

          // Verify clone succeeded and directory exists
          if (!fs.existsSync(repoDir)) {
            throw new Error(`Repository directory ${repoDir} is empty after clone!`);
          }

          // Verify directory has content
          const files = fs.readdirSync(repoDir);
          if (files.length === 0) {
            throw new Error(`Repository directory ${repoDir} was created but is empty!`);
          }

          logInfo(`\n✅ Repository successfully cloned:`);
          logInfo(`├─ Requested Output Dir: ${cloneDir}`);
          logInfo(`├─ Final Location: ${repoDir}`);
          logInfo(`├─ Branch: ${gitInfo.gitBranch}`);
          logInfo(`└─ Files Found: ${files.length}`);

          // Update rootDir to point to cloned repository
          rootDir = repoDir;
        } catch (err) {
          logError('\n❌ Repository clone failed:');
          logError(`├─ Error: ${err.message}`);
          logError(`├─ Owner/Repo: ${owner}/${repo}`);
          logError(`├─ Branch: ${gitInfo.gitBranch}`);

          if (err.response) {
            logError(`├─ Status: ${err.response.status}`);
            logError(`└─ Status Text: ${err.response.statusText}`);
          } else {
            logError(`└─ Stack: ${err.stack}`);
          }

          throw err
        }

      } else {
        // Local mode defaults
        gitInfo.remoteUrl = 'file://local';
        gitInfo.repoOrgUser = 'local';
        gitInfo.gitBranch = 'local';
        gitInfo.gitCommit = 'localcommit';
        // rootDir remains as provided in args
      }
    }

    logInfo(`Processing codebase at: ${rootDir}`);

    // Initialize cache directory with correct rootDir
    // Use refactored helper from @/digest/caching
    cacheDir = computeCacheDir(isGitHubMode, rootDir, gitInfo);
    fs.mkdirSync(cacheDir, { recursive: true });
    logInfo(`Cache directory initialized: ${cacheDir}`);

    // Initialise refactored cache helpers (digest/caching)
    const {
      loadFromCache: loadFromCacheNew,
      saveToCache: saveToCacheNew,
      logFinalCacheReport: logFinalCacheReportNew,
      stats: cacheStats
    } = createDigestCache({
      rootDir,
      cacheDir,
      forceRegenerate: options.forceRegenerate,
      dryRun: options.dryRun,
      debug: debugMode,
      logger: { info: logInfo, warn: logWarning, error: logError, debug: logDebug }
    });

    const ignorePatterns = await (isGitHubMode ? getGitignorePatterns() : readGitignoreNew(rootDir));
    const allFiles = await listAllFilesNew(rootDir, ignorePatterns);
    let relevantFiles = allFiles.filter(isRelevantFile);

    // Log initial file counts before any filtering
    logInfo('\n📊 Initial File Statistics:');
    logInfo(`├─ Total Repository Files: ${allFiles.length}`);
    logInfo(`└─ After Basic Filtering: ${relevantFiles.length}`);

    // Apply task-based filtering if context provided
    if (options.fileFilter?.taskContextString) {
      logInfo('\n🔍 Starting Task-Based File Filtering for Digest...');
      const preFilterCount = relevantFiles.length;
      const filterResult = await filterFilesByTask(relevantFiles, options.fileFilter.taskContextString, debug, dataStream);

      // Update relevantFiles to only include filtered files
      relevantFiles = filterResult.filteredFiles;

      logInfo('\n📊 Task Filtering Results:');
      logInfo(`├─ Files Before: ${preFilterCount}`);
      logInfo(`├─ Files After: ${relevantFiles.length}`);
      logInfo(`├─ Filter Reason: ${filterResult.filterReason}`);
      logInfo(`└─ Reduction: ${((1 - relevantFiles.length / preFilterCount) * 100).toFixed(1)}%`);

      // Log excluded files in debug mode
      if (debug && filterResult.excludedFiles.length > 0) {
        logDebug('\nExcluded Files:');
        filterResult.excludedFiles.slice(0, 5).forEach(f => logDebug(`- ${f.path}`));
        if (filterResult.excludedFiles.length > 5) {
          logDebug(`  ... and ${filterResult.excludedFiles.length - 5} more files`);
        }
      }

      // Stream the results for external tracking
      }

    if (maxFiles < Infinity) {
      logInfo(`\n⚠️ Limiting to ${maxFiles} files as requested`);
      relevantFiles = relevantFiles.slice(0, maxFiles);
    }

    logInfo(`\n📊 Final File Selection:`);
    logInfo(`├─ Repository Total: ${allFiles.length}`);
    logInfo(`├─ Task Relevant: ${relevantFiles.length}`);
    logInfo(`└─ Processing: ${Math.min(relevantFiles.length, maxFiles)} files`);

    // Log token estimates for first few files
    logInfo(`Initial token estimates for first 5 files:`);
    for (const f of relevantFiles.slice(0, 5)) {
      const filePath = path.resolve(rootDir, f.path);
      const content = fs.readFileSync(filePath, 'utf-8');
      const tokenCount = estimateTokensNew(content);
      logInfo(`- ${f.path}: ~${tokenCount} tokens`);
    }

    // Log initialized configuration
    logInfo(`\nMode Configuration:`);
    if (isGitHubMode) {
      logInfo(`├─ Mode: GitHub Repository`);
      logInfo(`├─ Remote URL: ${gitInfo.remoteUrl}`);
      logInfo(`├─ Repository: ${gitInfo.repoOrgUser}`);
      logInfo(`├─ Branch: ${gitInfo.gitBranch}`);
      logInfo(`└─ Commit: ${gitInfo.gitCommit}`);
    } else {
      logInfo(`├─ Mode: Local Directory`);
      logInfo(`├─ Root Directory: ${path.resolve(rootDir)}`);
      logInfo(`└─ Force Regenerate: ${forceRegenerate}`);
    }

    logInfo(`\nCache Configuration:`);
    logInfo(`├─ Cache Directory: ${cacheDir}`);
    logInfo(`├─ TTL: ${CACHE_TTL_DAYS} days`);

    let existingCacheFiles = 0;
    try {
      if (fs.existsSync(cacheDir)) {
        existingCacheFiles = fs.readdirSync(cacheDir).length;
      }
    } catch (err) {
      logWarning(`Failed to read cache directory: ${err.message}`);
    }
    logInfo(`├─ Existing Cache Files: ${existingCacheFiles}`);
    logInfo(`└─ Force Regenerate: ${forceRegenerate}\n`);

    // Load from cache or prepare a list of files to process
    // We'll skip files that are cached (unless forceRegenerate is true)
    const uncachedFiles = [];
    const cachedDigests = [];

    logInfo('\n📋 Starting file processing...');

    for (const f of relevantFiles) {
      const absPath = path.resolve(rootDir, f.path);
      logInfo(`\n📄 Processing file: ${absPath}`);

      const info = readFileContentAndType(f.path, rootDir);
      if (!info) {
        logInfo(`└─ Skipped: Invalid content or read error`);
        continue;
      }

      // Calculate hash using the same info object that would be used for processing
      const fileHash = hashContentNew(info.relativePath, info.content);

      logInfo(`├─ File Size: ${info.content.length} bytes`);
      logInfo(`├─ Token Count: ${info.tokenCount}`);
      logInfo(`└─ Generated Hash: ${fileHash}`);

      const c = await loadFromCacheNew(fileHash, info.relativePath);

      if (c && !forceRegenerate) {
        // Cache hit - validate all required fields are present
        if (c.path && c.relative_path && c.type && c.summary && c.token_count) {
          cachedDigests.push({
            path: c.path,
            relativePath: c.relative_path,
            type: c.type,
            summary: c.summary,
            tokenCount: c.token_count,
            tags: c.tags || [],
            dependencies: c.dependencies || []
          });
        } else {
          logWarning(`Cache hit for ${info.relativePath} missing required fields - treating as miss`);
          uncachedFiles.push(info);
        }
      } else {
        uncachedFiles.push(info);
      }
    }

    logInfo(`Caching summary:`);
    logInfo(`- ${cachedDigests.length} files loaded from cache`);
    logInfo(`- ${uncachedFiles.length} files read new summaries`);

    if (cachedDigests.length > 0) {
      logInfo(`Cache hit details:`);
      cachedDigests.slice(0, 5).forEach(d => {
        logInfo(`- ${d.relativePath} (type: ${d.type})`);
      });
      if (cachedDigests.length > 5) {
        logInfo(`  ... and ${cachedDigests.length - 5} more files`);
      }
    }

    if (uncachedFiles.length === 0) {
      logInfo(`All files are cached and valid. No LLM processing needed.`);
      logCacheStats('All Cache Hits');
    }

    // Batch the uncached files into requests
    // We'll set a max token limit per batch, leaving room for prompt overhead
    const PROMPT_OVERHEAD_TOKENS = 5000; // Overhead for prompt template
    const OUTPUT_SAFETY_MARGIN = 0.7; // Leave 30% margin for safety
    const MIN_DIGEST_TOKENS = 300; // Minimum tokens for even the smallest file digest

    // Calculate limits for both input and output
    // Use more of the context window while maintaining safety margins
    const MAX_INPUT_TOKENS = Math.floor((modelConfig.maxContextTokens - PROMPT_OVERHEAD_TOKENS) * 0.7);
    const MAX_OUTPUT_TOKENS = Math.floor(modelConfig.maxOutputTokens * OUTPUT_SAFETY_MARGIN);
    const MAX_TOTAL_BATCH_TOKENS = Math.min(
      MAX_INPUT_TOKENS,
      Math.floor(modelConfig.maxContextTokens * 0.8)
    );

    // Calculate max files based on minimum digest size
    const MAX_FILES_PER_BATCH = Math.min(
      Math.floor(MAX_OUTPUT_TOKENS / MIN_DIGEST_TOKENS),
      50 // Hard upper limit for very small files
    );

    // Sort files by size to pack them efficiently
    uncachedFiles.sort((a, b) => a.tokenCount - b.tokenCount);

    logInfo(`Batch limits:`);
    logInfo(`- Max input tokens per batch: ${MAX_INPUT_TOKENS}`);
    logInfo(`- Max output tokens per batch: ${MAX_OUTPUT_TOKENS}`);
    logInfo(`- Max total batch tokens: ${MAX_TOTAL_BATCH_TOKENS}`);
    logInfo(`- Max files per batch: ${MAX_FILES_PER_BATCH}`);
    logInfo(`- Prompt overhead: ${PROMPT_OVERHEAD_TOKENS}`);

    const batches = [];
    {
      let currentBatch = [];
      let currentInputTokens = 0;
      let currentEstimatedOutputTokens = 0;

      // Sort files by size in descending order to process larger files first
      uncachedFiles.sort((a, b) => b.tokenCount - a.tokenCount);

      for (const file of uncachedFiles) {
        const fileOutputTokens = estimateDigestOutputTokensNew(file);
        const fileSizeRatio = file.tokenCount / MAX_INPUT_TOKENS;

        // Adjust batch size limit based on file size ratio
        const effectiveMaxFiles = Math.max(
          1,
          Math.min(
            MAX_FILES_PER_BATCH,
            Math.floor(MAX_FILES_PER_BATCH * (1 - fileSizeRatio))
          )
        );

        // Check if this single file is too large
        if (file.tokenCount > MAX_INPUT_TOKENS) {
          if (currentBatch.length > 0) {
            batches.push(currentBatch);
            currentBatch = [];
            currentInputTokens = 0;
            currentEstimatedOutputTokens = 0;
          }
          logWarning(`File ${file.relativePath} exceeds token limits, processing alone`);
          batches.push([file]);
          continue;
        }

        // Start new batch if any limit would be exceeded
        const wouldExceedLimits =
          currentBatch.length >= effectiveMaxFiles ||
          currentInputTokens + file.tokenCount > MAX_TOTAL_BATCH_TOKENS ||
          currentInputTokens + file.tokenCount > MAX_INPUT_TOKENS ||
          currentEstimatedOutputTokens + fileOutputTokens > MAX_OUTPUT_TOKENS;

        if (wouldExceedLimits) {
          if (currentBatch.length > 0) {
            batches.push(currentBatch);
          }
          currentBatch = [file];
          currentInputTokens = file.tokenCount;
          currentEstimatedOutputTokens = fileOutputTokens;
        } else {
          currentBatch.push(file);
          currentInputTokens += file.tokenCount;
          currentEstimatedOutputTokens += fileOutputTokens;
        }
      }
      if (currentBatch.length > 0) {
        batches.push(currentBatch);
      }
    }

    logInfo(`Number of batches to process: ${batches.length}`);
    batches.forEach((b, idx) => {
      const batchTokenTotal = b.reduce((sum, f) => sum + f.tokenCount, 0);
      logInfo(`Batch ${idx + 1}: ${b.length} files, ~${batchTokenTotal} tokens total`);
    });

    logInfo(`Prepared ${batches.length} batch(es) for uncached files.`);

    // Process batches in parallel with a worker pool
    const processBatch = async (batch, batchIndex) => {
      // Deduplicate files in batch by relativePath
      const uniqueFiles = Array.from(
        new Map(batch.map(file => [file.relativePath, file])).values()
      );

      if (uniqueFiles.length < batch.length) {
        logWarning(`Removed ${batch.length - uniqueFiles.length} duplicate files from batch ${batchIndex + 1}`);
        batch = uniqueFiles;
      }

      if (dryRun) {
        logInfo(`[DRY RUN] Would process batch ${batchIndex + 1} with ${batch.length} unique files`);
        return batch.map(f => ({
          path: f.path,
          relativePath: f.relativePath,
          type: f.type,
          summary: "[DRY RUN] Summary would be generated here",
          tokenCount: f.tokenCount
        }));
      }
      const batchTokens = batch.reduce((a, b) => a + b.tokenCount, 0);
      logInfo(`Processing batch ${batchIndex + 1}/${batches.length}:`);
      logInfo(`- Files in batch: ${batch.length}`);
      logInfo(`- Total input tokens: ~${batchTokens}`);
      logInfo(`- Estimated output tokens: ~${batch.reduce((sum, f) => sum + estimateDigestOutputTokensNew(f), 0)}`);
      logInfo(`- Files in batch:`);
      batch.forEach((f, i) => logInfo(`  ${i + 1}. ${f.relativePath} (~${f.tokenCount} tokens)`));

      let result;
      let attempts = 0;
      const maxAttempts = 3;
      let backoffDelay = 2000; // 2 seconds initial delay

      while (attempts < maxAttempts) {
        try {
          logInfo(`\n🔄 Attempt ${attempts + 1}/${maxAttempts} for batch ${batchIndex + 1}`);
          logInfo(`├─ Files in batch: ${batch.length}`);
          logInfo(`└─ Total tokens: ${batch.reduce((sum, f) => sum + f.tokenCount, 0)}`);

          if (attempts > 0) {
            // Introduce exponential backoff
            logWarning(`Waiting ${backoffDelay}ms before retry...`);
            await new Promise(res => setTimeout(res, backoffDelay));
            backoffDelay *= 2;

            // Split batch into smaller chunks on retries
            const chunkCount = attempts + 1;
            const chunkSize = Math.ceil(batch.length / chunkCount);
            let partialResults = new Array(batch.length).fill(null); // Initialize with nulls
            let processedChunks = 0;
            let totalProcessedFiles = 0;
            let failedChunks = [];

            logInfo(`Splitting batch into ${chunkCount} chunks of ~${chunkSize} files each`);

            // Process all chunks, collecting results and tracking failures
            for (let i = 0; i < batch.length; i += chunkSize) {
              const chunkStartIndex = i;
              const subBatch = batch.slice(i, i + chunkSize);
              const chunkNumber = Math.floor(i / chunkSize) + 1;

              // Create context object for this chunk
              const chunkContext = {
                type: 'chunk',
                current: chunkNumber,
                total: chunkCount,
                parentSize: batch.length,
                startIndex: chunkStartIndex,
                chunkSize: subBatch.length
              };

              logInfo(`\n🔄 Processing chunk ${chunkNumber}/${chunkCount}:`);
              logInfo(`├─ Files in chunk: ${subBatch.length}`);
              logInfo(`├─ Start index: ${chunkStartIndex}`);
              logInfo(`├─ Chunk size: ${subBatch.length}`);
              logInfo(`└─ Files: ${subBatch.map(f => f.relativePath).join(', ')}`);

              const subResult = await batchSummarizeFilesNew(subBatch, undefined, chunkContext);

              // Validate chunk results against THIS chunk's size only
              if (subResult && Array.isArray(subResult) && subResult.length === subBatch.length &&
                subResult.every(item => item && item.relativePath && item.summary)) {

                // Copy validated results into the correct positions
                subResult.forEach((item, idx) => {
                  partialResults[chunkStartIndex + idx] = item;
                  totalProcessedFiles++;
                });

                processedChunks++;
                logInfo(`✅ Chunk ${chunkNumber} completed successfully:`);
                logInfo(`├─ Processed: ${subResult.length}/${subBatch.length} files`);
                logInfo(`├─ Total progress: ${totalProcessedFiles}/${batch.length} files`);
                logInfo(`└─ Chunks complete: ${processedChunks}/${chunkCount}`);
              } else {
                // Track failed chunk for retry
                failedChunks.push({
                  startIndex: chunkStartIndex,
                  files: subBatch,
                  chunkNumber
                });
                logError(`❌ Chunk ${chunkNumber} failed validation:`);
                logError(`├─ Expected ${subBatch.length} results for this chunk`);
                logError(`├─ Received ${subResult ? subResult.length : 0} results`);
                logError(`├─ Valid results: ${subResult ? subResult.filter(r => r && r.relativePath && r.summary).length : 0}`);
                logError(`└─ Added to retry queue`);
              }
            }

            // Process failed chunks if any exist and we have attempts remaining
            if (failedChunks.length > 0 && attempts < maxAttempts - 1) {
              logInfo(`\n🔄 Attempting to retry ${failedChunks.length} failed chunks`);

              for (const failedChunk of failedChunks) {
                logInfo(`\n📝 Retrying chunk ${failedChunk.chunkNumber}:`);
                logInfo(`├─ Start index: ${failedChunk.startIndex}`);
                logInfo(`├─ Files: ${failedChunk.files.length}`);

                const retryContext = {
                  type: 'retry',
                  current: failedChunk.chunkNumber,
                  total: failedChunks.length,
                  parentSize: batch.length,
                  startIndex: failedChunk.startIndex,
                  chunkSize: failedChunk.files.length
                };

                const retryResult = await batchSummarizeFilesNew(failedChunk.files, undefined, retryContext);

                if (retryResult && Array.isArray(retryResult) &&
                  retryResult.length === failedChunk.files.length &&
                  retryResult.every(item => item && item.relativePath && item.summary)) {

                  // Update partial results with retry successes
                  retryResult.forEach((item, idx) => {
                    partialResults[failedChunk.startIndex + idx] = item;
                    totalProcessedFiles++;
                  });

                  logInfo(`✅ Retry successful for chunk ${failedChunk.chunkNumber}`);
                } else {
                  logError(`❌ Retry failed for chunk ${failedChunk.chunkNumber}`);
                }
              }
            }

            // Filter out any remaining nulls and validate final results
            result = partialResults.filter(Boolean);
            const missingCount = batch.length - result.length;

            if (missingCount > 0) {
              logWarning(`\n⚠️ Some files still failed after retries:`);
              logWarning(`├─ Total files: ${batch.length}`);
              logWarning(`├─ Successful: ${result.length}`);
              logWarning(`└─ Failed: ${missingCount}`);

              if (attempts >= maxAttempts - 1) {
                logError('Max attempts reached, returning partial results');
              } else {
                // Clear result to trigger full retry if we have attempts remaining
                result = null;
              }
            }
          } else {
            result = await batchSummarizeFilesNew(batch);
          }

          // Validate final results
          if (result && Array.isArray(result) && result.length === batch.length &&
            result.every(item => item && item.relativePath && item.summary)) {
            logInfo(`✅ Batch ${batchIndex + 1} completed successfully`);
            break; // Full success!
          } else {
            logWarning(`\n⚠️ Batch ${batchIndex + 1} validation failed:`);
            logWarning(`├─ Expected ${batch.length} results`);
            logWarning(`├─ Received ${result ? result.length : 0} results`);
            logWarning(`└─ Attempting retry ${attempts + 1}/${maxAttempts}`);
            attempts++;
          }

        } catch (error) {
          logError(`\n❌ Error in batch ${batchIndex + 1} attempt ${attempts + 1}:`);
          logError(`├─ Error: ${error.message}`);
          logError(`└─ ${attempts < maxAttempts - 1 ? 'Retrying with smaller batches' : 'Max attempts reached'}`);
          attempts++;
        }
      }

      if (!result || result.length === 0) {
        logError(`\n❌ Batch ${batchIndex + 1} failed completely after ${attempts} attempts`);
        logError(`├─ Batch size: ${batch.length} files`);
        logError(`└─ First file: ${batch[0].relativePath}`);
        return [];
      }

      if (result.length !== batch.length) {
        logWarning(`Batch ${batchIndex + 1} produced fewer results than files given:`);
        logWarning(`- Expected: ${batch.length} results`);
        logWarning(`- Received: ${result.length} results`);
        logWarning('Some files may have failed processing');
      }

      // Store results to cache
      const batchDigests = [];
      for (let j = 0; j < result.length; j++) {
        const d = result[j];
        batchDigests.push(d);
        const file = batch[j];
        // Use the same hash calculation as in the cache lookup
        const fileHash = hashContentNew(file.relativePath, file.content);
        saveToCacheNew(fileHash, d);
        logInfo(`Generated and cached new digest for: ${file.relativePath}`);
      }
      return batchDigests;
    };

    // Create a worker pool to process batches in parallel with proper task scheduling
    const workerPool = async (tasks, maxWorkers) => {
      if (tasks.length === 0) {
        logInfo('No tasks to process');
        return [];
      }

      // Deduplicate files across all tasks by relativePath
      const seenFiles = new Set();
      tasks = tasks.map(batch => {
        const uniqueBatch = batch.filter(file => {
          if (seenFiles.has(file.relativePath)) {
            return false;
          }
          seenFiles.add(file.relativePath);
          return true;
        });
        return uniqueBatch;
      }).filter(batch => batch.length > 0);

      if (tasks.length === 0) {
        logInfo('No unique files to process after deduplication');
        return [];
      }

      const results = new Array(tasks.length);
      let nextTaskIndex = 0;
      let completedTasks = 0;
      const errors = [];

      // Log initial state
      logInfo(`\n🔄 Starting worker pool:`);
      logInfo(`├─ Total batches: ${tasks.length}`);
      logInfo(`├─ Max workers: ${maxWorkers}`);
      logInfo(`└─ Estimated completion batches: ${Math.ceil(tasks.length / maxWorkers)}`);

      // Worker function that keeps processing tasks until none remain
      async function runWorker(workerId) {
        logInfo(`Worker ${workerId} started`);

        while (true) {
          // Get next task atomically
          const taskIndex = nextTaskIndex++;
          if (taskIndex >= tasks.length) {
            logInfo(`Worker ${workerId} completed - no more tasks`);
            break;
          }

          // Process this batch
          try {
            logInfo(`Worker ${workerId} processing batch ${taskIndex + 1}/${tasks.length}`);
            const result = await processBatch(tasks[taskIndex], taskIndex);
            results[taskIndex] = result;

            // Track progress
            completedTasks++;
            const progress = ((completedTasks / tasks.length) * 100).toFixed(1);
            logInfo(`\n📊 Progress Update:`);
            logInfo(`├─ Completed: ${completedTasks}/${tasks.length} batches`);
            logInfo(`├─ Progress: ${progress}%`);
            logInfo(`└─ Worker ${workerId} completed batch ${taskIndex + 1}`);

          } catch (error) {
            const errorMsg = `Error in worker ${workerId}, batch ${taskIndex + 1}: ${error.stack || error}`;
            logError(errorMsg);
            errors.push(errorMsg);
            results[taskIndex] = []; // Ensure we have a placeholder for failed batches
          }
        }
      }

      // Create and start all workers
      const workerPromises = Array.from({ length: Math.min(maxWorkers, tasks.length) },
        (_, i) => runWorker(i + 1));

      // Wait for all workers to complete
      await Promise.all(workerPromises);

      // Log final worker pool statistics
      logInfo('\n📊 Worker Pool Complete:');
      logInfo(`├─ Total Batches Processed: ${completedTasks}/${tasks.length}`);
      logInfo(`├─ Successful Batches: ${results.filter(r => r && r.length > 0).length}`);
      logInfo(`├─ Failed Batches: ${errors.length}`);
      logInfo(`└─ Total Workers Used: ${Math.min(maxWorkers, tasks.length)}`);

      // Log any errors that occurred
      if (errors.length > 0) {
        logError('\n⚠️ Errors encountered during processing:');
        errors.forEach((err, i) => logError(`${i + 1}. ${err}`));
      }

      // Validate results array
      const missingResults = results.filter(r => !r).length;
      if (missingResults > 0) {
        logError(`Found ${missingResults} missing results in output array`);
      }

      // Flatten and filter out any empty results from failed batches
      const newDigests = results.flat().filter(Boolean);

      // Final validation
      logInfo(`\n📊 Results Summary:`);
      logInfo(`├─ Input Batches: ${tasks.length}`);
      logInfo(`├─ Output Digests: ${newDigests.length}`);
      logInfo(`└─ Average Digests Per Batch: ${(newDigests.length / completedTasks).toFixed(1)}`);

      return newDigests;
    };

    logInfo(`Starting parallel processing with ${maxWorkers} workers`);
    const newDigests = await workerPool(batches, maxWorkers);

    const allDigests = [...cachedDigests, ...newDigests];
    logInfo(`Processing complete. Results summary:`);
    logInfo(`- Total digests: ${allDigests.length}`);
    logInfo(`- From cache: ${cachedDigests.length}`);
    logInfo(`- Newly generated: ${newDigests.length}`);

    // Log detailed cache statistics
    logInfo('\n📊 Detailed Cache Statistics:');
    logInfo(`├─ Total Attempts: ${cacheStats.attempts}`);
    logInfo(`├─ Cache Hits: ${cacheStats.hits}`);
    logInfo(`├─ Cache Misses: ${cacheStats.misses}`);
    logInfo(`├─ Cache Expired: ${cacheStats.expired}`);
    logInfo(`└─ Miss Reasons:`);
    if (cacheStats.missesByReason) {
      Object.entries(cacheStats.missesByReason)
        .sort((a, b) => b[1] - a[1])
        .forEach(([reason, count]) => {
          logInfo(`   ├─ ${reason}: ${count}`);
        });
    }

    // Log type-specific stats
    if (Object.keys(cacheStats.byType).length > 0) {
      logInfo('\n📊 Cache Stats by File Type:');
      Object.entries(cacheStats.byType)
        .sort((a, b) => (b[1].hits / b[1].attempts) - (a[1].hits / a[1].attempts))
        .forEach(([type, stats]) => {
          const hitRate = (stats.hits / Math.max(stats.attempts, 1) * 100).toFixed(1);
          logInfo(`├─ ${type}:`);
          logInfo(`│  ├─ Attempts: ${stats.attempts}`);
          logInfo(`│  ├─ Hits: ${stats.hits}`);
          logInfo(`│  └─ Hit Rate: ${hitRate}%`);
        });
    }

    // Log cache statistics after processing all files
    logCacheStats('Post-Processing');

    if (forceRegenerate) {
      logInfo(`Note: Cache was bypassed due to --force-regenerate flag`);
    }

    await streamProgress(dataStream, 'Generating PRODUCT.md sections...', '');

    const repoDisplayName = repo || path.basename(rootDir);

    // Group digests by high-level category for features + source listing
    const groupedDigests = allDigests.reduce((groups, digest) => {
      let category = 'Other';

      if (digest.relativePath.includes('config') || digest.relativePath.match(/\.(json|yaml|yml|toml|ini)$/)) {
        category = 'Configuration & Settings';
      } else if (digest.relativePath.includes('components') || digest.relativePath.match(/\.(jsx|tsx|vue)$/)) {
        category = 'UI Components';
      } else if (digest.relativePath.includes('api') || digest.relativePath.includes('routes')) {
        category = 'APIs & Routing';
      } else if (digest.relativePath.includes('lib') || digest.relativePath.includes('utils')) {
        category = 'Libraries & Utilities';
      } else if (digest.relativePath.includes('styles') || digest.relativePath.includes('theme')) {
        category = 'Styling & Theming';
      } else if (digest.relativePath.includes('cli') || digest.relativePath.includes('scripts')) {
        category = 'Tooling & Automation';
      } else if (digest.relativePath.match(/\.(test|spec|e2e)\./i) ||
        digest.relativePath.includes('test/') ||
        digest.relativePath.includes('__tests__/') ||
        digest.relativePath.includes('cypress/')) {
        category = 'Tests';
      }

      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(digest);
      return groups;
    }, {});

    const productPurpose = await generateProductPurpose(allDigests, repoDisplayName);
    const productFeatures = await generateProductFeatures(groupedDigests);
    const productSourceFiles = generateSourceFilesSection(groupedDigests);

    await streamProgress(dataStream, 'Aggregating PRODUCT.md document...', '');

    const templatePath = path.join(__dirname, '..', '.template_PRODUCT.md');
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const productDocument = templateContent
      .replace('{{PRODUCT_PURPOSE}}', productPurpose)
      .replace('{{PRODUCT_FEATURES}}', productFeatures)
      .replace('{{PRODUCT_SOURCE_FILES}}', productSourceFiles);

    const agentInstructions = await generateAgentInstructions(productPurpose, productFeatures, groupedDigests);
    const agentQuestions = await generateAgentQuestions(groupedDigests, allDigests);

    const agentTemplatePath = path.join(__dirname, '..', '.template_AGENTS.md');
    const agentTemplateContent = fs.readFileSync(agentTemplatePath, 'utf-8');
    const agentDocument = agentTemplateContent
      .replace('{{AGENT_INSTRUCTIONS}}', agentInstructions)
      .replace('{{AGENT_SEEKING_QUESTIONS}}', agentQuestions);

    // Write PRODUCT.md to /tmp (maintaining existing digestPath surface)
    const digestDir = path.dirname(digestPath);
    log('Writing digest file', 'info', {
      digestPath,
      digestDir,
      correlationId: options.correlationId
    });
    fs.mkdirSync(digestDir, { recursive: true });
    if (!dryRun) {
      fs.writeFileSync(digestPath, productDocument, 'utf-8');
      fs.writeFileSync(agentsPath, agentDocument, 'utf-8');
      logInfo(`PRODUCT.md generated at: ${digestPath}`);
      logInfo(`AGENTS.md generated at: ${agentsPath}`);
      await streamProgress(
        dataStream,
        'PRODUCT.md & AGENTS.md generation complete',
        `PRODUCT: ${digestPath}\nAGENTS: ${agentsPath}`,
        'success'
      );
    } else {
      logInfo(`[DRY RUN] Would write PRODUCT.md to: ${digestPath}`);
      logInfo(`[DRY RUN] Would write AGENTS.md to: ${agentsPath}`);
      await streamProgress(
        dataStream,
        'PRODUCT.md & AGENTS.md generation complete (DRY RUN)',
        'No files written',
        'success'
      );
    }

    // Generate final reports
    // Use refactored cache report helper
    logFinalCacheReportNew();

    // Track overall progress
    const totalFiles = relevantFiles.length;
    const processedFiles = cachedDigests.length + newDigests.length;
    const progressPercent = ((processedFiles / totalFiles) * 100).toFixed(1);

    // Log final comprehensive report
    const endTime = Date.now();
    const totalTimeMs = endTime - startTime;
    const minutes = Math.floor(totalTimeMs / 60000);
    const seconds = ((totalTimeMs % 60000) / 1000).toFixed(1);

    logInfo('\n📊 PRODUCT DOCUMENT GENERATION COMPLETE\n' + '='.repeat(50));
    logInfo(`\n🕒 Timing:`);
    logInfo(`├─ Total Runtime: ${minutes}m ${seconds}s`);
    logInfo(`└─ Average Time Per File: ${(totalTimeMs / allDigests.length / 1000).toFixed(1)}s`);

    logInfo(`\n📁 File Processing:`);
    logInfo(`├─ Total Files Scanned: ${allFiles.length}`);
    logInfo(`├─ Files Processed: ${allDigests.length}`);
    logInfo(`├─ Files Skipped: ${allFiles.length - relevantFiles.length}`);
    logInfo(`├─ Cache Hits: ${cachedDigests.length}`);
    logInfo(`└─ New Generations: ${newDigests.length}`);

    logInfo(`\n🔄 Batch Processing:`);
    logInfo(`├─ Total Batches: ${batches.length}`);
    logInfo(`├─ Max Workers: ${maxWorkers}`);
    logInfo(`└─ Average Files Per Batch: ${(uncachedFiles.length / Math.max(batches.length, 1)).toFixed(1)}`);

    logInfo(`\n💾 Cache Performance:`);
    const hitRate = (cacheStats.hits / Math.max(cacheStats.attempts, 1) * 100).toFixed(1);
    const tokensSavedMB = (cacheStats.totalTokensSaved / 1000000).toFixed(2);
    logInfo(`├─ Hit Rate: ${hitRate}%`);
    logInfo(`├─ Tokens Saved: ~${tokensSavedMB}M`);
    logInfo(`└─ Cache Age Expirations: ${cacheStats.expired}`);

    // Make digest location super prominent in final report
    const digestLocation = path.resolve(digestPath);
    const agentsLocation = path.resolve(agentsPath);
    logInfo('\n' + '='.repeat(50));
    logInfo('\n🎯 PRODUCT DOCUMENT LOCATION:');
    logInfo(digestLocation);
    logInfo('\n🎯 AGENTS DOCUMENT LOCATION:');
    logInfo(agentsLocation);
    logInfo('='.repeat(50) + '\n');

    logInfo(`\n📝 Output Details:`);
    const digestSize = dryRun ? 0 : fs.statSync(digestPath).size;
    const agentsSize = dryRun ? 0 : fs.statSync(agentsPath).size;
    logInfo(`├─ PRODUCT.md Size: ${(digestSize / 1024).toFixed(1)}KB`);
    logInfo(`├─ AGENTS.md Size: ${(agentsSize / 1024).toFixed(1)}KB`);
    logInfo(`├─ Mode: ${dryRun ? 'DRY RUN' : 'PRODUCTION'}`);
    logInfo(`├─ Access PRODUCT.md: cat ${digestLocation}`);
    logInfo(`└─ Access AGENTS.md: cat ${agentsLocation}`);

    logInfo('\n' + '='.repeat(50));

    // Print digest path to stdout for programmatic usage
    const totalRuntimeMs = totalTimeMs;
    const result: GenerateDigestResult = {
      digestPath,
      productDocument,
      agentDocument,
      stats: {
        totalFilesScanned: allFiles.length,
        filesProcessed: allDigests.length,
        filesSkipped: allFiles.length - relevantFiles.length,
        cacheHits: cacheStats.hits,
        cacheMisses: cacheStats.misses,
        cacheExpired: cacheStats.expired,
        totalBatches: batches.length,
        maxWorkers,
        averageFilesPerBatch: uncachedFiles.length / Math.max(batches.length, 1),
        totalRuntimeMs,
        averageTimePerFileMs: totalTimeMs / allDigests.length,
        digestSizeBytes: digestSize,
        agentsSizeBytes: agentsSize,
        mode: dryRun ? 'DRY RUN' : 'PRODUCTION',
      },
      options,
      gitInfo,
    };
    logInfo('Product/Agent document generation result metadata:', {
      digestPath,
      agentsPath,
      stats: result.stats,
      options: result.options,
      gitInfo: result.gitInfo,
      productDocumentPreview: productDocument.slice(0, 200),
      agentDocumentPreview: agentDocument.slice(0, 200)
    });
    return result;

  } catch (err) {
    logError(`Fatal error (inner-digest catch): ${err.stack || err}`);
    logError("Digest generation error!", {
      connectionId: options.connectionId,
      repoOwner: options.owner,
      repoName: options.repo,
      branch: options.branch,
      error: err.message,
      stack: err.stack,
    });
    throw err;
  } finally {
    // Logging cleanup is now handled by the logger library
  }
}
