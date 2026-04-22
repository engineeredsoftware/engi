import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const promptSurfaceSource = readFileSync(new URL('../V26_PROMPT_SURFACES.md', import.meta.url), 'utf8');
const uapiTsconfigSource = readFileSync(new URL('../../uapi/tsconfig.json', import.meta.url), 'utf8');

test('V26 prompt surface map keeps active, support, and reference corridors explicit', () => {
  assert.match(promptSurfaceSource, /## Public prompt contract/u);
  assert.match(promptSurfaceSource, /## Active fifth-gate prompt consumers/u);
  assert.match(promptSurfaceSource, /## Support prompt consumers/u);
  assert.match(promptSurfaceSource, /## Reference-only or retained old-world prompt ports/u);

  assert.match(promptSurfaceSource, /packages\/execution-generics\/src\/prompts\/ExecutionPrompt\.ts/u);
  assert.match(promptSurfaceSource, /packages\/pipelines-generics\/src\/prompts\/PipelinePrompt\.ts/u);
  assert.match(promptSurfaceSource, /packages\/agent-generics\/src\/\{prompts\/\*,execution\/prompt-overlays\.ts,substeps\/factories\.ts\}/u);
  assert.match(promptSurfaceSource, /packages\/conversations-generics\/src\/\{prompts\/ConversationSystemPrompt\.ts,agent\/ConversationAgent\.ts\}/u);
  assert.match(promptSurfaceSource, /uapi\/prompts\/conversations-system-prompt\.ts/u);

  assert.match(promptSurfaceSource, /packages\/generic-agents\/\*/u);
  assert.match(promptSurfaceSource, /packages\/generic-tools\/\*/u);
  assert.match(promptSurfaceSource, /Jira remains reader-first need-ingestion\/reference posture/u);
});

test('V26 active app config no longer preserves deprecated prompt source aliases', () => {
  assert.doesNotMatch(uapiTsconfigSource, /"@bitcode\/prompts\/src\/\*"/u);
  assert.doesNotMatch(uapiTsconfigSource, /"@bitcode\/prompts\/src\/raw_promptparts\/\*"/u);
  assert.match(uapiTsconfigSource, /"@bitcode\/prompts": \["\.\.\/packages\/prompts\/src\/index\.ts"\]/u);
  assert.match(uapiTsconfigSource, /"@bitcode\/prompts\/\*": \["\.\.\/packages\/prompts\/src\/\*"\]/u);
});
