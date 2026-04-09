import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  buildCanonicalProvenData,
  collectCanonicalProvenRuns
} from '../src/canonical/proven-generator.js';
import {
  buildV19ContractChangeLedger,
  buildV19NegativeProofMutationMatrix,
  buildV19PositiveMatrices,
  buildV19VolatilityInventory
} from '../src/canonical/v19-canon.js';

test('V19 contract-change ledger records inherited positive matrices and new reproducible-canon artifacts', { timeout: 120_000 }, () => {
  const collected = collectCanonicalProvenRuns();
  const data = buildCanonicalProvenData(collected, {
    version: 'V19',
    canonicalCommit: 'draft-v19',
    canonicalCommitRecordedAt: '2026-04-09T00:00:00.000Z',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });
  const positiveMatrices = buildV19PositiveMatrices(data, {
    version: 'V19',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });
  const volatilityInventory = buildV19VolatilityInventory({
    data,
    positiveMatrices,
    version: 'V19',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });
  const negativeMutationMatrix = buildV19NegativeProofMutationMatrix(data, {
    positiveMatrices,
    volatilityInventory,
    version: 'V19',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });
  const ledger = buildV19ContractChangeLedger(data, {
    positiveMatrices,
    negativeMutationMatrix,
    volatilityInventory,
    version: 'V19',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });

  assert.equal(ledger.ledgerId, 'v19-contract-change-ledger');
  assert.equal(ledger.fromVersion, 'V18');
  assert.equal(ledger.toVersion, 'V19');
  assert.equal(ledger.proofCatalogDelta.status, 'unchanged-inherited-positive-baseline');
  assert.equal(ledger.matrixDeltas.length, 4);
  assert.ok(ledger.artifactDeltas.some((/** @type {any} */ delta) => delta.artifactPath === '.engi/v19-deterministic-replay-report.json'));
  assert.equal(ledger.passed, true);
});

test('V19 promotion command exposes the accepted first-gate plan in dry-run mode', () => {
  const scriptPath = fileURLToPath(new URL('../../scripts/promote-engi-canon.mjs', import.meta.url));
  const output = execFileSync(process.execPath, [
    scriptPath,
    '--version',
    'V19',
    '--commit',
    'HEAD',
    '--dry-run'
  ], {
    cwd: fileURLToPath(new URL('../..', import.meta.url)),
    encoding: 'utf8'
  });

  assert.match(output, /V19 canonical promotion plan/);
  assert.match(output, /npm --prefix engi-demo run test:deterministic-replay/);
  assert.match(output, /npm --prefix engi-demo run test:negative-mutation-matrix/);
  assert.match(output, /node scripts\/generate-engi-proven\.mjs --version V19/);
  assert.match(output, /Canonical commit message body:/);
});
