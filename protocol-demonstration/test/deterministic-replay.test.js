import test from 'node:test';
import assert from 'node:assert/strict';
import { generateCanonicalProvenMarkdown } from '../src/canonical/proven-generator.js';

const replayInput = {
  version: 'V19',
  canonicalCommit: 'draft-v19',
  canonicalCommitRecordedAt: '2026-04-09T00:00:00.000Z',
  generatedAt: '2026-04-09T00:00:00.000Z',
  worktreeState: 'clean'
};

test('V19 deterministic replay renders byte-identical canonical output and artifacts', { timeout: 240_000 }, () => {
  const first = generateCanonicalProvenMarkdown(replayInput);
  const second = generateCanonicalProvenMarkdown(replayInput);

  assert.equal(first.markdown, second.markdown);
  assert.deepEqual(Object.keys(first.artifacts).sort(), Object.keys(second.artifacts).sort());
  for (const artifactPath of Object.keys(first.artifacts)) {
    assert.equal(first.artifacts[artifactPath], second.artifacts[artifactPath], artifactPath);
  }

  assert.equal(first.data.v19.deterministicReplayReport.passed, true);
  assert.equal(first.data.v19.deterministicReplayReport.runCount, 2);
  assert.equal(first.data.v19.deterministicReplayReport.artifactComparisons.every((/** @type {any} */ entry) => entry.byteEqual), true);
  assert.equal(first.data.aggregate.fullyProven, true);
  assert.ok(first.artifacts['.engi/v19-deterministic-replay-report.json']);
});
