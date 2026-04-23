import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  V26_INFERENCE_IMPLEMENTATION_RECORD_REQUIRED_FIELDS,
  V26_INFERENCE_IMPLEMENTATION_RECORDS,
  validateV26InferenceImplementationRecords
} from '../src/canonical/inference-implementation-records.js';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname, '..');

function repoFileExists(filePath) {
  return existsSync(path.join(repoRoot, filePath));
}

test('V26 inference implementation records cover required prompt/tool/agent/execution fields', () => {
  const validation = validateV26InferenceImplementationRecords({ fileExists: repoFileExists });

  assert.equal(validation.passed, true);
  assert.equal(validation.recordCount, V26_INFERENCE_IMPLEMENTATION_RECORDS.length);
  assert.deepEqual(validation.requiredFields, V26_INFERENCE_IMPLEMENTATION_RECORD_REQUIRED_FIELDS);
  assert.deepEqual(
    validation.recordChecks.filter((check) => check.passed !== true),
    []
  );
});

test('V26 inference implementation registry names every current fifth-gate inference family', () => {
  const recordIds = V26_INFERENCE_IMPLEMENTATION_RECORDS.map((record) => record.recordId).sort();

  assert.deepEqual(recordIds, [
    'agent-infrastructure',
    'asset-pack-synthesis-compatibility',
    'conversation-inference',
    'mcp-external-ingress',
    'need-comprehension-compatibility',
    'pipeline-infrastructure',
    'prompt-primitives',
    'tool-prompt-infrastructure'
  ]);
});

test('V26 inference implementation registry binds records to canonical Bitcode semantics', () => {
  const recordsById = Object.fromEntries(
    V26_INFERENCE_IMPLEMENTATION_RECORDS.map((record) => [record.recordId, record])
  );

  assert.match(recordsById['prompt-primitives'].canonicalNeed, /prompt substrate/u);
  assert.match(recordsById['tool-prompt-infrastructure'].canonicalNeed, /tool descriptions/u);
  assert.match(recordsById['agent-infrastructure'].canonicalNeed, /agent roles/u);
  assert.match(recordsById['pipeline-infrastructure'].canonicalNeed, /Bitcode runs/u);
  assert.match(recordsById['conversation-inference'].canonicalNeed, /rich-input Bitcode write surface/u);
  assert.match(recordsById['asset-pack-synthesis-compatibility'].canonicalNeed, /asset-pack written-asset synthesis/u);
  assert.match(recordsById['need-comprehension-compatibility'].canonicalNeed, /need, written-asset, asset-pack/u);
  assert.match(recordsById['mcp-external-ingress'].canonicalNeed, /fail-closed ingress/u);

  assert.equal(recordsById['asset-pack-synthesis-compatibility'].boundaryPosture, 'compatibility');
  assert.equal(recordsById['need-comprehension-compatibility'].boundaryPosture, 'compatibility');
  assert.equal(recordsById['mcp-external-ingress'].boundaryPosture, 'ingress');
});
