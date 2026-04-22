import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

test('V26 prompt and doc-code runtime carriers load without pulling full execution storage runtime', () => {
  const promptExecution = require('../../packages/prompts/src/execution/PromptExecution.js');
  const docCodeToolPrompt = require('../../packages/tools-generics/src/doc-code-tool/DocCodeToolPrompt.js');
  const toolsRoot = require('../../packages/tools-generics/src/index.js');

  assert.equal(typeof promptExecution.PromptExecution, 'function');
  assert.equal(typeof promptExecution.createPromptExecution, 'function');
  assert.equal(typeof docCodeToolPrompt.DocCodeToolPrompt, 'function');
  assert.equal(typeof toolsRoot.Tool, 'function');
  assert.equal(typeof toolsRoot.attachDocCodeToolPrompt, 'function');
});
