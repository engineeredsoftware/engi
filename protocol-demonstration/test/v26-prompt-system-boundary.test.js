import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname, '..');

const DISALLOWED_PROMPT_INTERNAL_IMPORT = /(?:from\s+['"][^'"]*prompts\/src\/|require\(['"][^'"]*prompts\/src\/)/u;
const DISALLOWED_PROMPT_ROOT_BARREL_IMPORT = /(?:from\s+['"]@bitcode\/prompts['"]|require\(['"]@bitcode\/prompts['"]\))/u;
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

test('V26 prompt system keeps a public package boundary for active inference carriers', () => {
  const promptIndexSource = readFileSync(path.join(repoRoot, 'packages/prompts/src/index.ts'), 'utf8');
  const promptPackageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'packages/prompts/package.json'), 'utf8')
  );

  assert.match(promptIndexSource, /PromptExecution/u);
  assert.match(promptIndexSource, /createPromptExecution/u);
  assert.match(promptIndexSource, /Active inference packages must import PromptPart, Prompt, PromptExecution/u);
  assert.ok(promptPackageJson.exports['./prompt']);
  assert.ok(promptPackageJson.exports['./parts/PromptPart']);
  assert.ok(promptPackageJson.exports['./execution/PromptExecution']);
  assert.ok(promptPackageJson.exports['./formatters']);
  assert.ok(promptPackageJson.exports['./raw_promptparts/*']);

  const violations = ACTIVE_PROMPT_CORRIDORS
    .flatMap((corridor) => listFilesRecursively(corridor))
    .filter((filePath) => DISALLOWED_PROMPT_INTERNAL_IMPORT.test(readFileSync(path.join(repoRoot, filePath), 'utf8')));

  assert.deepEqual(
    violations,
    [],
    `Active prompt consumers must use @bitcode/prompts, not internal prompts/src reach-through: ${violations.join(', ')}`
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
