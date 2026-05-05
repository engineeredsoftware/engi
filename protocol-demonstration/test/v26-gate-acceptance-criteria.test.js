import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const specSource = readFileSync(new URL('../../BITCODE_SPEC_V26.md', import.meta.url), 'utf8');
const paritySource = readFileSync(new URL('../../BITCODE_SPEC_V26_PARITY_MATRIX.md', import.meta.url), 'utf8');
const proofSurfaceSource = readFileSync(new URL('../V26_PROOF_SURFACES.md', import.meta.url), 'utf8');
const fifthGateDeepeningProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/fifth-gate-closure-deepening-proof.json', import.meta.url), 'utf8')
);
const fifthGateClosureProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/fifth-gate-closure-proof.json', import.meta.url), 'utf8')
);
const productReadinessAudit = JSON.parse(
  readFileSync(new URL('../../.bitcode/v26-product-readiness-audit.json', import.meta.url), 'utf8')
);

const expectedFifthGateAxes = [
  'terminal-read-write-loop',
  'conversations-and-ad-hoc-execution',
  'transactional-readiness-and-repository-scope',
  'persistence-schema-and-active-source-health',
  'old-world-reform-and-retained-package-baseline',
  'proof-family-and-environment-closure'
];

const expectedClosureQueueRows = [
  'Whole Terminal read/write acceptance',
  'Conversations and ad hoc parity',
  'Transactional readiness runtime proof',
  'Persistence runtime acceptance',
  'Old-world reform saturation',
  'Proof and promotion closure'
];

test('V26 formal gate criteria keep fifth through eighth gates ordered and explicit', () => {
  assert.match(specSource, /### Fifth-gate formal acceptance rule/u);
  assert.match(specSource, /Fifth-gate is closed only when:/u);
  assert.match(specSource, /the minimum-functional north star is satisfied/u);
  assert.match(specSource, /make shares and use shares through Bitcode-owned interfaces, route-level reread, and state/u);
  assert.match(specSource, /Bitcode Terminal plus admitted API\/MCP\/app interfaces/u);
  assert.match(specSource, /retained old-world systems are already cut, isolated, or Bitcode-repurposed/u);
  assert.match(specSource, /not being falsely claimed by importing sixth-\/seventh-\/eighth-gate polish/u);

  assert.match(specSource, /### Sixth-gate formal acceptance rule/u);
  assert.match(specSource, /fifth-gate acceptance holds/u);
  assert.match(specSource, /minimal viable product/u);
  assert.match(specSource, /activity`: the dominant master-detail transaction activity surface/u);
  assert.match(specSource, /transactions`: the write-space/u);
  assert.match(specSource, /conversations`: the rich ChatGPT-style read\/write Bitcode interface/u);
  assert.match(specSource, /auxillaries`: non-duplicative settings, preferences, connections, identity/u);

  assert.match(specSource, /### Seventh-gate formal acceptance rule/u);
  assert.match(specSource, /sixth-gate acceptance holds/u);
  assert.match(specSource, /commercially-viable live-launch posture/u);
  assert.match(specSource, /testnet-first/u);

  assert.match(specSource, /### Eighth-gate formal acceptance rule/u);
  assert.match(specSource, /whole-repository production satisfaction/u);
  assert.match(specSource, /prompt space completeness and total repository closure proofs/u);
  assert.match(specSource, /V26 total closure is explicit enough/u);
});

test('V26 parity matrix records the current fifth-gate closure queue', () => {
  assert.match(paritySource, /### Current fifth-gate closure queue/u);

  for (const row of expectedClosureQueueRows) {
    assert.match(paritySource, new RegExp(`\\| ${row.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\|`, 'u'));
  }

  assert.match(paritySource, /source-level checks, generated proof artifacts, executable tests, and specification text/u);
  assert.match(paritySource, /Sixth-gate MVP elevation begins after this queue is accepted/u);
  assert.match(paritySource, /seventh-gate commercial testnet launch begins only after sixth-gate acceptance/u);
  assert.match(paritySource, /eighth-gate provation begins only after fifth, sixth, and seventh hold/u);
  assert.match(proofSurfaceSource, /current fifth-gate closure queue confirmation/u);
  assert.match(proofSurfaceSource, /sixth-gate MVP, seventh-gate commercial testnet launch, and eighth-gate provation remain downstream acceptance gates/u);
});

test('V26 generated proofs close fifth gate without claiming later gates', () => {
  assert.equal(fifthGateDeepeningProof.gate, 'gate-5');
  assert.equal(fifthGateDeepeningProof.passed, true);
  assert.equal(fifthGateDeepeningProof.closureClaim, true);
  assert.equal(fifthGateDeepeningProof.proceduralGateClosure, true);
  assert.equal(fifthGateDeepeningProof.axisCount, expectedFifthGateAxes.length);

  const actualAxisIds = fifthGateDeepeningProof.axes.map((axis) => axis.axisId);
  assert.deepEqual(actualAxisIds, expectedFifthGateAxes);

  for (const axis of fifthGateDeepeningProof.axes) {
    assert.equal(axis.baselineAdvanced, true, `${axis.axisId} must have a fifth-gate baseline`);
    assert.equal(axis.closurePassed, true, `${axis.axisId} must carry closure into the explicit verdict`);
    assert.ok(axis.remainingClosure.length > 0, `${axis.axisId} must state remaining closure work`);
  }

  assert.equal(fifthGateClosureProof.gate, 'gate-5');
  assert.equal(fifthGateClosureProof.passed, true);
  assert.equal(fifthGateClosureProof.closureClaim, true);
  assert.equal(fifthGateClosureProof.proceduralGateClosure, true);
  assert.equal(fifthGateClosureProof.queueRowCount, expectedClosureQueueRows.length);
  assert.equal(fifthGateClosureProof.closedQueueRowCount, expectedClosureQueueRows.length);
  assert.deepEqual(fifthGateClosureProof.openQueueRows, []);
  assert.deepEqual(fifthGateClosureProof.notReadyFor, [
    'sixth-gate-mvp',
    'seventh-gate-commercial-testnet-launch',
    'eighth-gate-v26-definition-of-need'
  ]);

  assert.equal(productReadinessAudit.baselinePassed, true);
  assert.equal(productReadinessAudit.closureClaim, true);
  assert.equal(productReadinessAudit.closureReadyProductCount, productReadinessAudit.productCount);
  assert.equal(productReadinessAudit.openProductCount, 0);
  assert.deepEqual(productReadinessAudit.notReadyFor, [
    'sixth-gate-mvp',
    'seventh-gate-commercial-testnet-launch',
    'eighth-gate-v26-definition-of-need'
  ]);
});
