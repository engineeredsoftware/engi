import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname, '..');

function readRepoFile(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test('V26 files-maintaining tools are written-asset mutation support, not generic file-system lineage', () => {
  const filesMaintainingReadme = readRepoFile('packages/generic-tools/files-maintaining/README.md');
  const filesMaintainingSource = readRepoFile('packages/generic-tools/files-maintaining/src/index.ts');
  const filesMaintainingDeclaration = readRepoFile('packages/generic-tools/files-maintaining/src/index.d.ts');
  const textEditorPrompt = readRepoFile('packages/generic-tools/files-maintaining/src/prompts/TextEditorDocCodeToolPrompt.ts');
  const createFilePrompt = readRepoFile('packages/generic-tools/files-maintaining/src/prompts/CreateFileDocCodeToolPrompt.ts');
  const replaceFilePrompt = readRepoFile('packages/generic-tools/files-maintaining/src/prompts/ReplaceFileDocCodeToolPrompt.ts');
  const deleteFilePrompt = readRepoFile('packages/generic-tools/files-maintaining/src/prompts/DeleteFileDocCodeToolPrompt.ts');
  const beginTransactionPrompt = readRepoFile('packages/generic-tools/files-maintaining/src/prompts/tool-prompt-transaction-begin.ts');
  const promptDeclarations = [
    readRepoFile('packages/generic-tools/files-maintaining/src/prompts/TextEditorDocCodeToolPrompt.d.ts'),
    readRepoFile('packages/generic-tools/files-maintaining/src/prompts/CreateFileDocCodeToolPrompt.d.ts'),
    readRepoFile('packages/generic-tools/files-maintaining/src/prompts/ReplaceFileDocCodeToolPrompt.d.ts'),
    readRepoFile('packages/generic-tools/files-maintaining/src/prompts/DeleteFileDocCodeToolPrompt.d.ts'),
    readRepoFile('packages/generic-tools/files-maintaining/src/prompts/tool-prompt-transaction-begin.d.ts')
  ].join('\n');
  const promptSurfacesSource = readRepoFile('protocol-demonstration/V26_PROMPT_SURFACES.md');
  const inferenceSystemsSource = readRepoFile('protocol-demonstration/V26_INFERENCE_SYSTEMS.md');

  assert.match(filesMaintainingReadme, /Atomic Bitcode written-asset mutation support/u);
  assert.match(filesMaintainingReadme, /proof-facing written-asset operations/u);
  assert.match(filesMaintainingReadme, /Asset-Pack File Evidence/u);
  assert.match(filesMaintainingSource, /Bitcode written-asset file mutation support/u);
  assert.match(filesMaintainingSource, /asset-pack synthesis runs/u);
  assert.match(filesMaintainingDeclaration, /Bitcode written-asset file mutation support/u);

  const promptOwnerSources = [
    textEditorPrompt,
    createFilePrompt,
    replaceFilePrompt,
    deleteFilePrompt,
    beginTransactionPrompt
  ].join('\n');

  assert.match(promptOwnerSources, /written-asset-file-mutation/u);
  assert.match(promptOwnerSources, /metadata:version', 'V26' as PromptPart/u);
  assert.match(promptOwnerSources, /current_version: "V26"/u);
  assert.match(promptOwnerSources, /proof-facing asset-pack operations/u);
  assert.doesNotMatch(promptOwnerSources, /GA1\.00\.0|GA1\.50\.0/u);
  assert.doesNotMatch(promptOwnerSources, /metadata:category', 'file-system' as PromptPart/u);
  assert.doesNotMatch(promptOwnerSources, /metadata:category', 'file-editing' as PromptPart/u);
  assert.match(promptDeclarations, /current_version: "V26"/u);
  assert.doesNotMatch(promptDeclarations, /GA1\.00\.0|GA1\.50\.0/u);

  assert.match(promptSurfacesSource, /The retained `packages\/generic-tools\/files-maintaining` corridor is admitted as written-asset mutation support/u);
  assert.match(promptSurfacesSource, /proof-facing transaction evidence/u);
  assert.match(inferenceSystemsSource, /Retained file mutation tools such as `files-maintaining` are acceptable only when their tool prompts state Bitcode written-asset mutation support/u);
});
