import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname, '..');

const DISALLOWED_PROMPT_INTERNAL_IMPORT = /(?:from\s+['"][^'"]*prompts\/src\/|require\(['"][^'"]*prompts\/src\/)/u;
const DISALLOWED_PROMPT_ROOT_BARREL_IMPORT = /(?:from\s+['"]@bitcode\/prompts['"]|require\(['"]@bitcode\/prompts['"]\))/u;
const DISALLOWED_SUPPORT_SOURCE_REACH_THROUGH = [
  {
    filePath: 'packages/prompts/src/prompt.ts',
    pattern: /registry\/src\/index/u
  },
  {
    filePath: 'packages/prompts/src/prompt.js',
    pattern: /registry\/src\/index/u
  },
  {
    filePath: 'packages/prompts/src/execution/PromptExecution.ts',
    pattern: /execution-generics\/src\/Execution/u
  },
  {
    filePath: 'packages/prompts/src/execution/PromptExecution.js',
    pattern: /execution-generics\/src\/Execution/u
  },
  {
    filePath: 'packages/tools-generics/src/execution/ToolExecution.ts',
    pattern: /execution-generics\/src\/Execution/u
  },
  {
    filePath: 'packages/tools-generics/src/execution/ToolExecution.js',
    pattern: /execution-generics\/src\/Execution/u
  },
  {
    filePath: 'packages/tools-generics/src/execution/ToolPromptRegistry.ts',
    pattern: /(?:registry\/src\/index|execution-generics\/src\/Execution)/u
  },
  {
    filePath: 'packages/tools-generics/src/execution/ToolPromptRegistry.js',
    pattern: /registry\/src\/index/u
  },
  {
    filePath: 'packages/tools-generics/src/doc-code-tool/DocCodeToolPlugin.ts',
    pattern: /doc-comment\/src\/index/u
  },
  {
    filePath: 'packages/tools-generics/src/doc-code-tool/DocCodeToolPlugin.js',
    pattern: /doc-comment\/src\/index/u
  },
];
const ACTIVE_PROMPT_CORRIDORS = [
  'packages/execution-generics/src',
  'packages/pipelines-generics/src',
  'packages/agent-generics/src',
  'packages/conversations-generics/src',
  'packages/tools-generics/src',
  'packages/pipelines/deliverable/scripts',
];
const SUPPORT_PROMPT_CORRIDORS = [
  'packages/digest/prompts',
];
const REFERENCE_PROMPT_CORRIDORS = [
  'packages/generic-agents',
  'packages/generic-tools',
  'packages/chatgptapp/src/prompts',
  'packages/doc-comment/examples',
];
const REFERENCE_PROMPT_CONFIG_FILES = [
  'packages/chatgptapp/tsconfig.test.json',
  'packages/chatgptapp/jest.config.cjs',
];
const ACTIVE_PROMPT_PRIMITIVE_CARRIERS = [
  'packages/execution-generics/src/prompts/ExecutionPrompt.ts',
  'packages/execution-generics/src/prompts/ExecutionPrompt.js',
  'packages/execution-generics/src/prompts/ExecutionPrompt.d.ts',
  'packages/agent-generics/src/prompts/AgentPrompt.ts',
  'packages/agent-generics/src/prompts/AgentPrompt.js',
  'packages/agent-generics/src/prompts/AgentPrompt.d.ts',
  'packages/agent-generics/src/prompts/AgentStepPrompt.ts',
  'packages/agent-generics/src/prompts/AgentStepPrompt.js',
  'packages/agent-generics/src/prompts/AgentStepPrompt.d.ts',
  'packages/agent-generics/src/prompts/AgentGenerationSubStepPrompt.ts',
  'packages/agent-generics/src/prompts/AgentGenerationSubStepPrompt.js',
  'packages/agent-generics/src/prompts/FailsafeMetaSubStepPrompt.ts',
  'packages/agent-generics/src/prompts/FailsafeMetaSubStepPrompt.js',
  'packages/agent-generics/src/prompts/ToolExecutionPrompt.ts',
  'packages/agent-generics/src/prompts/ToolExecutionPrompt.js',
  'packages/agent-generics/src/execution/prompt-overlays.ts',
  'packages/agent-generics/src/execution/prompt-overlays.js',
  'packages/agent-generics/src/substeps/factories.ts',
  'packages/pipelines-generics/src/prompts/PipelinePrompt.ts',
  'packages/pipelines-generics/src/prompts/PipelinePrompt.js',
  'packages/pipelines-generics/src/prompts/PipelinePrompt.d.ts',
  'packages/conversations-generics/src/prompts/ConversationSystemPrompt.ts',
  'packages/conversations-generics/src/prompts/ConversationSystemPrompt.js',
  'packages/conversations-generics/src/prompts/ConversationSystemPrompt.d.ts',
  'packages/conversations-generics/src/agent/ConversationAgent.ts',
];
const ADMITTED_PROMPT_PRIMITIVE_CORRIDORS = [
  'packages/pipelines/deliverable/src',
];
const ADMITTED_PROMPT_PRIMITIVE_FILES = [
  'packages/tools-generics/src/types.ts',
  'packages/tools-generics/src/doc-code-tool/formatUsableTools.ts',
  'packages/tools-generics/src/doc-code-tool/formatUsableTools.d.ts',
  'packages/llm-generics/src/generation.ts',
  'packages/llm-generics/src/generation.d.ts',
  'packages/time/src/doc-prompts/time-prompt-doc.ts',
];
const ACTIVE_EXECUTION_PROMPT_CARRIERS = [
  'packages/agent-generics/src/execution/AgentExecution.ts',
  'packages/agent-generics/src/execution/AgentExecution.js',
  'packages/agent-generics/src/execution/AgentExecution.d.ts',
  'packages/agent-generics/src/execution/index.ts',
  'packages/agent-generics/src/execution/index.js',
  'packages/agent-generics/src/execution/index.d.ts',
  'packages/agent-generics/src/execution/AgentPromptsRegistry.ts',
  'packages/agent-generics/src/execution/AgentPromptsRegistry.d.ts',
  'packages/agent-generics/src/execution/AgentToolsRegistry.ts',
  'packages/agent-generics/src/execution/AgentToolsRegistry.d.ts',
  'packages/agent-generics/src/execution/AgentLLMsRegistry.ts',
  'packages/agent-generics/src/execution/AgentLLMsRegistry.d.ts',
  'packages/agent-generics/src/execution/AgentAgentsRegistry.ts',
  'packages/agent-generics/src/execution/AgentAgentsRegistry.d.ts',
  'packages/conversations-generics/src/agent/ConversationAgent.ts',
  'packages/conversations-generics/src/agent/ConversationAgent.js',
  'packages/pipelines-generics/src/execution/PipelineExecution.ts',
  'packages/pipelines-generics/src/execution/PipelineExecution.js',
  'packages/pipelines-generics/src/execution/PipelineExecution.d.ts',
  'packages/pipelines-generics/src/execution/PipelinePromptRegistry.ts',
  'packages/pipelines-generics/src/execution/PipelinePromptRegistry.d.ts',
  'packages/pipelines-generics/src/execution/PipelineToolRegistry.ts',
  'packages/pipelines-generics/src/execution/PipelineToolRegistry.d.ts',
  'packages/pipelines-generics/src/execution/PipelineLLMRegistry.ts',
  'packages/pipelines-generics/src/execution/PipelineLLMRegistry.d.ts',
  'packages/pipelines-generics/src/execution/PipelineAgentRegistry.ts',
  'packages/pipelines-generics/src/execution/PipelineAgentRegistry.d.ts',
];
const ACTIVE_EXECUTION_TREE_CARRIERS = [
  'packages/agent-generics/src/agents/factories.ts',
  'packages/agent-generics/src/agents/factories.d.ts',
  'packages/agent-generics/src/diagnostics/trace.ts',
  'packages/agent-generics/src/diagnostics/trace.d.ts',
  'packages/agent-generics/src/diagnostics/instrumentation.ts',
  'packages/agent-generics/src/diagnostics/instrumentation.d.ts',
  'packages/agent-generics/src/execution/file-diff-integration.ts',
  'packages/agent-generics/src/execution/file-diff-integration.d.ts',
  'packages/agent-generics/src/substeps/factories.ts',
  'packages/agent-generics/src/substeps/factories.d.ts',
  'packages/agent-generics/src/types.ts',
  'packages/pipelines-generics/src/execution/resume.ts',
  'packages/pipelines-generics/src/execution/resume.d.ts',
  'packages/pipelines-generics/src/execution/Metrics.ts',
  'packages/pipelines-generics/src/execution/Metrics.d.ts',
  'packages/pipelines-generics/src/execution/pipeline-types.ts',
  'packages/pipelines-generics/src/execution/pipeline-types.d.ts',
  'packages/pipelines-generics/src/execution/pipeline-types.js',
  'packages/pipelines-generics/src/execution/route-pipeline-execution.ts',
  'packages/pipelines-generics/src/execution/route-pipeline-execution.d.ts',
  'packages/pipelines-generics/src/phases/phase-factory.ts',
  'packages/pipelines-generics/src/phases/sdivs-factory.ts',
  'packages/pipelines-generics/src/pipeline-factory.ts',
  'packages/pipelines-generics/src/pipeline-factory.d.ts',
  'packages/pipelines-generics/src/gate-system/meta-phase-orchestrator.ts',
  'packages/pipelines-generics/src/gate-system/meta-phase-orchestrator.d.ts',
  'packages/pipelines-generics/src/gate-system/types.ts',
  'packages/pipelines-generics/src/gate-system/types.d.ts',
  'packages/pipelines-generics/src/executors/wait-for-instruction.ts',
  'packages/pipelines-generics/src/streaming/pipeline-stream-integration.ts',
  'packages/pipelines-generics/src/streaming/pipeline-stream-integration.d.ts',
  'packages/pipelines-generics/src/streaming/pipeline-stream-integration.js',
];
const DISALLOWED_REFERENCE_PROMPT_CONFIG_PATTERNS = [
  /"@bitcode\/prompts\/\*"\s*:\s*\["packages\/prompts\/src\/\*"\]/u,
  /"@bitcode\/prompts"\s*:\s*\["packages\/prompts\/src\/index\.ts"\]/u,
  /\^@bitcode\/prompts\/\(\.\*\)\$\s*['"]?\s*:\s*['"][^'"]*prompts\/src\/\$1['"]/u,
  /\^@bitcode\/prompts\$\s*['"]?\s*:\s*['"][^'"]*prompts\/src\/index\.ts['"]/u,
];
const DISALLOWED_EXECUTION_ROOT_BARREL_IMPORT = /(?:from\s+['"]@bitcode\/execution-generics['"]|require\(['"]@bitcode\/execution-generics['"]\)|import\(['"]@bitcode\/execution-generics['"]\))/u;

function listFilesRecursively(targetPath) {
  const absolutePath = path.join(repoRoot, targetPath);
  const entries = readdirSync(absolutePath);
  const files = [];

  for (const entry of entries) {
    const absoluteEntry = path.join(absolutePath, entry);
    const relativeEntry = path.relative(repoRoot, absoluteEntry);
    const stats = statSync(absoluteEntry);

    if (stats.isDirectory()) {
      if (entry === 'node_modules' || entry === 'tmp' || entry === 'dist') {
        continue;
      }
      files.push(...listFilesRecursively(relativeEntry));
      continue;
    }

    if (/\.(?:ts|tsx|js|mjs|cjs|d\.ts)$/u.test(entry)) {
      files.push(relativeEntry);
    }
  }

  return files;
}

function importsExecutionFromRootBarrel(source) {
  if (importExecutionFromRoot(source)) {
    return true;
  }

  const requireMatch = source.match(/const\s+(\w+)\s*=\s*require\(['"]@bitcode\/execution-generics['"]\);/u);
  if (requireMatch) {
    const requireBinding = requireMatch[1];
    return new RegExp(`\\b${requireBinding}\\.Execution\\b`, 'u').test(source);
  }

  return false;
}

function importExecutionFromRoot(source) {
  return /import(?:\s+type)?\s*\{[^}]*\bExecution\b[^}]*\}\s*from\s*['"]@bitcode\/execution-generics['"]/u.test(source)
    || /import\(['"]@bitcode\/execution-generics['"]\)[\s\S]*?\.Execution\b/u.test(source);
}

test('V26 prompt system keeps a public package boundary for active inference carriers', () => {
  const promptIndexSource = readFileSync(path.join(repoRoot, 'packages/prompts/src/index.ts'), 'utf8');
  const promptPackageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'packages/prompts/package.json'), 'utf8')
  );
  const executionPackageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'packages/execution-generics/package.json'), 'utf8')
  );
  const conversationsPackageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'packages/conversations-generics/package.json'), 'utf8')
  );

  assert.match(promptIndexSource, /PromptExecution/u);
  assert.match(promptIndexSource, /createPromptExecution/u);
  assert.match(promptIndexSource, /Active inference packages must import PromptPart, Prompt, PromptExecution/u);
  assert.ok(promptPackageJson.exports['./prompt']);
  assert.ok(promptPackageJson.exports['./parts/PromptPart']);
  assert.ok(promptPackageJson.exports['./execution/PromptExecution']);
  assert.ok(promptPackageJson.exports['./formatters']);
  assert.ok(promptPackageJson.exports['./raw_promptparts/*']);
  assert.ok(executionPackageJson.exports['./prompts/ExecutionPrompt']);
  assert.equal(promptPackageJson.dependencies['@bitcode/execution-generics'], 'workspace:*');
  assert.equal(conversationsPackageJson.dependencies['@bitcode/execution-generics'], 'workspace:*');

  const violations = ACTIVE_PROMPT_CORRIDORS
    .flatMap((corridor) => listFilesRecursively(corridor))
    .filter((filePath) => DISALLOWED_PROMPT_INTERNAL_IMPORT.test(readFileSync(path.join(repoRoot, filePath), 'utf8')));

  assert.deepEqual(
    violations,
    [],
    `Active prompt consumers must use @bitcode/prompts, not internal prompts/src reach-through: ${violations.join(', ')}`
  );
});

test('V26 active prompt primitive carriers prefer narrow public prompt subpaths', () => {
  const violations = ACTIVE_PROMPT_PRIMITIVE_CARRIERS.filter((filePath) =>
    DISALLOWED_PROMPT_ROOT_BARREL_IMPORT.test(readFileSync(path.join(repoRoot, filePath), 'utf8'))
  );

  assert.deepEqual(
    violations,
    [],
    `Active prompt primitive carriers must use narrow public prompt subpaths instead of the root @bitcode/prompts barrel: ${violations.join(', ')}`
  );
});

test('V26 source-bearing admitted deliverable and prompt-primitive support carriers prefer narrow public prompt subpaths', () => {
  const violations = [
    ...ADMITTED_PROMPT_PRIMITIVE_CORRIDORS
      .flatMap((corridor) => listFilesRecursively(corridor))
      .filter((filePath) => !filePath.endsWith('.js')),
    ...ADMITTED_PROMPT_PRIMITIVE_FILES,
  ].filter((filePath) =>
    DISALLOWED_PROMPT_ROOT_BARREL_IMPORT.test(readFileSync(path.join(repoRoot, filePath), 'utf8'))
  );

  assert.deepEqual(
    violations,
    [],
    `Source-bearing admitted deliverable and prompt-primitive support carriers must use narrow public prompt subpaths instead of the root @bitcode/prompts barrel: ${violations.join(', ')}`
  );
});

test('V26 execution-aware prompt carriers prefer narrow public execution subpaths', () => {
  const violations = ACTIVE_EXECUTION_PROMPT_CARRIERS.filter((filePath) =>
    DISALLOWED_EXECUTION_ROOT_BARREL_IMPORT.test(readFileSync(path.join(repoRoot, filePath), 'utf8'))
  );

  assert.deepEqual(
    violations,
    [],
    `Execution-aware prompt carriers must use @bitcode/execution-generics public subpaths instead of the broad execution barrel: ${violations.join(', ')}`
  );
});

test('V26 broader active execution-bearing carriers keep base Execution on the public Execution subpath', () => {
  const violations = ACTIVE_EXECUTION_TREE_CARRIERS.filter((filePath) =>
    importsExecutionFromRootBarrel(readFileSync(path.join(repoRoot, filePath), 'utf8'))
  );

  assert.deepEqual(
    violations,
    [],
    `Broader active execution-bearing carriers must import Execution from @bitcode/execution-generics/Execution and keep the root barrel only for needed utilities: ${violations.join(', ')}`
  );
});

test('V26 prompt support consumers keep promptpart access on the public package boundary', () => {
  const violations = SUPPORT_PROMPT_CORRIDORS
    .flatMap((corridor) => listFilesRecursively(corridor))
    .filter((filePath) => DISALLOWED_PROMPT_INTERNAL_IMPORT.test(readFileSync(path.join(repoRoot, filePath), 'utf8')));

  assert.deepEqual(
    violations,
    [],
    `Support prompt consumers must use @bitcode/prompts/raw_promptparts or @bitcode/prompts, not sibling prompts/src reach-through: ${violations.join(', ')}`
  );
});

test('V26 support packages expose honest public subpaths and runtime carriers avoid repo-relative reach-through', () => {
  const executionPackageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'packages/execution-generics/package.json'), 'utf8')
  );
  const registryPackageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'packages/registry/package.json'), 'utf8')
  );
  const docCommentPackageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'packages/doc-comment/package.json'), 'utf8')
  );
  const docCodePackageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'packages/doc-code/package.json'), 'utf8')
  );
  const toolsPackageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'packages/tools-generics/package.json'), 'utf8')
  );

  assert.equal(executionPackageJson.main, 'src/index.js');
  assert.equal(executionPackageJson.types, 'src/index.ts');
  assert.ok(executionPackageJson.exports['./Execution']);
  assert.ok(executionPackageJson.exports['./store/registry']);

  assert.equal(registryPackageJson.main, 'src/index.js');
  assert.equal(registryPackageJson.types, 'src/index.ts');

  assert.equal(docCommentPackageJson.main, 'src/index.js');
  assert.equal(docCommentPackageJson.types, 'src/index.ts');
  assert.ok(docCommentPackageJson.exports['./base-plugin']);
  assert.ok(docCommentPackageJson.exports['./types']);

  assert.equal(docCodePackageJson.main, 'src/index.js');
  assert.equal(docCodePackageJson.types, 'src/index.ts');
  assert.ok(docCodePackageJson.exports['./transformDocCodeTools']);

  assert.equal(toolsPackageJson.main, 'src/index.js');
  assert.equal(toolsPackageJson.types, 'src/index.ts');
  assert.ok(toolsPackageJson.exports['./execution']);
  assert.ok(toolsPackageJson.exports['./doc-code-tool']);

  const reachThroughViolations = DISALLOWED_SUPPORT_SOURCE_REACH_THROUGH.filter(({ filePath, pattern }) =>
    pattern.test(readFileSync(path.join(repoRoot, filePath), 'utf8'))
  ).map(({ filePath }) => filePath);

  assert.deepEqual(
    reachThroughViolations,
    [],
    `Prompt/doc-code runtime carriers must use public support-package subpaths instead of repo-relative source reach-through: ${reachThroughViolations.join(', ')}`
  );
});

test('V26 retained reference prompt consumers use narrow public prompt subpaths instead of the root barrel', () => {
  const violations = REFERENCE_PROMPT_CORRIDORS
    .flatMap((corridor) => listFilesRecursively(corridor))
    .filter((filePath) => DISALLOWED_PROMPT_ROOT_BARREL_IMPORT.test(readFileSync(path.join(repoRoot, filePath), 'utf8')));

  assert.deepEqual(
    violations,
    [],
    `Reference prompt consumers must use narrow public prompt subpaths instead of the root @bitcode/prompts barrel: ${violations.join(', ')}`
  );
});

test('V26 retained reference prompt configs avoid broad prompts source catchalls', () => {
  const violations = REFERENCE_PROMPT_CONFIG_FILES.filter((filePath) => {
    const source = readFileSync(path.join(repoRoot, filePath), 'utf8');
    return DISALLOWED_REFERENCE_PROMPT_CONFIG_PATTERNS.some((pattern) => pattern.test(source));
  });

  assert.deepEqual(
    violations,
    [],
    `Reference prompt configs must prefer exact public prompt subpath maps over broad prompts/src catchalls: ${violations.join(', ')}`
  );
});
