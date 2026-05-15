import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname, '..');

function readRepoFile(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test('V26 repository-setup support resolves expressed read before task compatibility fields', () => {
  const repositorySetupSource = readRepoFile('packages/generic-tools/repository-setup/src/index.ts');
  const repositorySetupReadme = readRepoFile('packages/generic-tools/repository-setup/README.md');
  const repositorySetupPromptSource = readRepoFile(
    'packages/generic-tools/repository-setup/src/prompts/RepositorySetupDocCodeToolPrompt.ts'
  );
  const promptSurfacesSource = readRepoFile('protocol-demonstration/V26_PROMPT_SURFACES.md');
  const inferenceSystemsSource = readRepoFile('protocol-demonstration/V26_INFERENCE_SYSTEMS.md');

  assert.match(repositorySetupSource, /readDescription: z\.string\(\)\.optional\(\)/u);
  assert.match(repositorySetupSource, /expressedRead: z\.string\(\)\.optional\(\)/u);
  assert.match(repositorySetupSource, /taskDescription: z\.string\(\)\.optional\(\)/u);
  assert.match(repositorySetupSource, /One of readDescription, expressedRead, or taskDescription is required/u);
  assert.match(repositorySetupSource, /params\.expressedRead \|\|\s+params\.readDescription \|\|\s+params\.taskDescription/u);
  assert.match(repositorySetupSource, /expressedReadLength/u);
  assert.match(repositorySetupSource, /taskDescription remains only as/u);

  assert.match(repositorySetupReadme, /expressed-read-aware file filtering/u);
  assert.match(repositorySetupReadme, /`taskDescription` remains a compatibility carrier only/u);
  assert.match(repositorySetupReadme, /readDescription\?: string;/u);
  assert.match(repositorySetupReadme, /expressedRead\?: string;/u);
  assert.match(repositorySetupReadme, /taskDescription\?: string; \/\/ compatibility carrier/u);
  assert.match(repositorySetupReadme, /readDescription: 'Implement responsive dashboard component with TypeScript and React'/u);

  assert.match(repositorySetupPromptSource, /Bitcode repository-preparation support prompt/u);
  assert.match(repositorySetupPromptSource, /repository-preparation-support' as PromptPart/u);
  assert.match(repositorySetupPromptSource, /'V26' as PromptPart/u);
  assert.doesNotMatch(repositorySetupPromptSource, /'G[A]1\.00\.0' as PromptPart/u);

  assert.match(promptSurfacesSource, /The retained `packages\/generic-tools\/repository-setup` corridor is another package-level admissibility example/u);
  assert.match(promptSurfacesSource, /resolve `expressedRead` \/ `readDescription` before `taskDescription`/u);
  assert.match(inferenceSystemsSource, /retained support tools such as `repository-setup` are acceptable only when their active contracts resolve `expressedRead` \/ `readDescription` before `taskDescription`/u);
});
