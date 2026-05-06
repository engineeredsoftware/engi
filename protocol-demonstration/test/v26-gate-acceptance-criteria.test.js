import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const specSource = readFileSync(new URL('../../BITCODE_SPEC_V26.md', import.meta.url), 'utf8');
const notesSource = readFileSync(new URL('../../BITCODE_SPEC_V26_NOTES.md', import.meta.url), 'utf8');
const paritySource = readFileSync(new URL('../../BITCODE_SPEC_V26_PARITY_MATRIX.md', import.meta.url), 'utf8');
const proofSurfaceSource = readFileSync(new URL('../V26_PROOF_SURFACES.md', import.meta.url), 'utf8');
const fifthGateDeepeningProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/fifth-gate-closure-deepening-proof.json', import.meta.url), 'utf8')
);
const fifthGateClosureProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/fifth-gate-closure-proof.json', import.meta.url), 'utf8')
);
const sixthGateMvpClosureProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/sixth-gate-mvp-closure-proof.json', import.meta.url), 'utf8')
);
const seventhGateCommercialTestnetLaunchProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/seventh-gate-commercial-testnet-launch-proof.json', import.meta.url), 'utf8')
);
const promptSpaceCompletenessProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/prompt-space-completeness-proof.json', import.meta.url), 'utf8')
);
const wholeRepositoryProductionSatisfactionProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/whole-repository-production-satisfaction-proof.json', import.meta.url), 'utf8')
);
const v26TotalClosureProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/v26-total-closure-proof.json', import.meta.url), 'utf8')
);
const gateCheckpointReport = JSON.parse(
  readFileSync(new URL('../../.bitcode/v26-gate-checkpoint-report.json', import.meta.url), 'utf8')
);
const productReadinessAudit = JSON.parse(
  readFileSync(new URL('../../.bitcode/v26-product-readiness-audit.json', import.meta.url), 'utf8')
);

const expectedFifthGateAxes = [
  'terminal-read-write-loop',
  'conversations-and-ad-hoc-execution',
  'transactional-readiness-and-repository-scope',
  'persistence-schema-and-active-source-health',
  'retained-system-reform-and-retained-package-baseline',
  'proof-family-and-environment-closure'
];

const expectedClosureQueueRows = [
  'Whole Terminal read/write acceptance',
  'Conversations and ad hoc parity',
  'Transactional readiness runtime proof',
  'Persistence runtime acceptance',
  'Retained-system reform saturation',
  'Proof and promotion closure'
];

const expectedSixthGateRows = [
  'fifth-gate-acceptance-holds',
  'mvp-product-readiness',
  'explicit-application-map',
  'activity-transactions-operator-loop',
  'conversations-chatgpt-parity',
  'auxillaries-readiness-and-btd',
  'admitted-interfaces-one-product',
  'mvp-quality-and-clean-architecture'
];

const expectedSeventhGateRows = [
  'fifth-and-sixth-gate-acceptance-hold',
  'commercial-testnet-product-readiness',
  'testnet-first-launch-boundary',
  'commercial-product-story',
  'wallet-settlement-repository-readiness',
  'proof-state-reread-operator-flows',
  'connected-interface-launch-alignment',
  'non-bitcode-compatibility-explanations-retired'
];

const expectedEighthGateRows = [
  'fifth-sixth-seventh-gate-acceptance-hold',
  'prompt-space-completeness-closed',
  'whole-repository-production-satisfaction-closed',
  'spec-family-and-canonical-input-promoted',
  'application-ready-bitcode-canon-no-silent-compatibility',
  'promotion-without-interpretive-notes'
];

test('V26 formal gate criteria keep fifth through eighth gates ordered and explicit', () => {
  assert.match(specSource, /### Fifth-gate formal acceptance rule/u);
  assert.match(specSource, /Fifth-gate is closed only when:/u);
  assert.match(specSource, /the minimum-functional north star is satisfied/u);
  assert.match(specSource, /make shares and use shares through Bitcode-owned interfaces, route-level reread, and state/u);
  assert.match(specSource, /Bitcode Terminal plus admitted API\/MCP\/app interfaces/u);
  assert.match(specSource, /retained systems are already cut, isolated, or Bitcode-repurposed/u);
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
  assert.match(paritySource, /Sixth-gate MVP closure queue/u);
  assert.match(paritySource, /Seventh-gate commercial testnet launch closure queue/u);
  assert.match(paritySource, /commercial testnet launch is accepted because every row has source-level checks/u);
  assert.match(paritySource, /eighth-gate whole-repository closure is explicit and closed/u);
  assert.match(proofSurfaceSource, /current fifth-gate closure queue confirmation/u);
  assert.match(proofSurfaceSource, /sixth-gate MVP closure proof/u);
  assert.match(proofSurfaceSource, /seventh-gate commercial testnet launch proof/u);
  assert.match(proofSurfaceSource, /generated V26 proof appendix and reports are eighth-gate final closure evidence/u);
});

test('V26 notes companion cannot contradict promoted gate closure', () => {
  assert.match(notesSource, /## Closed-gate audit boundaries and future reopen conditions/u);
  assert.match(notesSource, /## Current promotion sequencing posture/u);
  assert.match(notesSource, /second-gate application UX\/UI plus external hardening is closed for V26/u);
  assert.match(notesSource, /fifth-gate minimum-functional Exchange\/Terminal closure plus retained-system reform baseline is closed/u);
  assert.match(notesSource, /eighth-gate total-repository provation and final closure is closed/u);
  assert.match(notesSource, /source-backed baseline, MVP, and launch readiness with zero open product rows for V26 closure/u);
  assert.doesNotMatch(notesSource, /Still open:/u);
  assert.doesNotMatch(notesSource, /Open questions that remain real/u);
  assert.doesNotMatch(notesSource, /keeping fifth-gate closure open|deliberately keeping fifth-gate closure open/u);
});

test('V26 generated proofs close fifth, sixth, seventh, and eighth gates', () => {
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
  assert.deepEqual(fifthGateClosureProof.notReadyFor, []);

  assert.equal(productReadinessAudit.baselinePassed, true);
  assert.equal(productReadinessAudit.mvpPassed, true);
  assert.equal(productReadinessAudit.launchPassed, true);
  assert.equal(productReadinessAudit.closureClaim, true);
  assert.equal(productReadinessAudit.sixthGateMvpClaim, true);
  assert.equal(productReadinessAudit.seventhGateCommercialTestnetLaunchClaim, true);
  assert.equal(productReadinessAudit.closureReadyProductCount, productReadinessAudit.productCount);
  assert.equal(productReadinessAudit.mvpReadyProductCount, productReadinessAudit.productCount);
  assert.equal(productReadinessAudit.launchReadyProductCount, productReadinessAudit.productCount);
  assert.equal(productReadinessAudit.openProductCount, 0);
  assert.equal(productReadinessAudit.mvpOpenProductCount, 0);
  assert.equal(productReadinessAudit.launchOpenProductCount, 0);
  assert.deepEqual(productReadinessAudit.notReadyFor, []);

  assert.equal(sixthGateMvpClosureProof.gate, 'gate-6');
  assert.equal(sixthGateMvpClosureProof.passed, true);
  assert.equal(sixthGateMvpClosureProof.closureClaim, true);
  assert.equal(sixthGateMvpClosureProof.proceduralGateClosure, true);
  assert.equal(sixthGateMvpClosureProof.queueRowCount, expectedSixthGateRows.length);
  assert.equal(sixthGateMvpClosureProof.closedQueueRowCount, expectedSixthGateRows.length);
  assert.deepEqual(sixthGateMvpClosureProof.openQueueRows, []);
  assert.deepEqual(sixthGateMvpClosureProof.closureRows.map((row) => row.rowId), expectedSixthGateRows);
  assert.deepEqual(sixthGateMvpClosureProof.notReadyFor, []);

  assert.equal(seventhGateCommercialTestnetLaunchProof.gate, 'gate-7');
  assert.equal(seventhGateCommercialTestnetLaunchProof.passed, true);
  assert.equal(seventhGateCommercialTestnetLaunchProof.closureClaim, true);
  assert.equal(seventhGateCommercialTestnetLaunchProof.proceduralGateClosure, true);
  assert.equal(seventhGateCommercialTestnetLaunchProof.queueRowCount, expectedSeventhGateRows.length);
  assert.equal(seventhGateCommercialTestnetLaunchProof.closedQueueRowCount, expectedSeventhGateRows.length);
  assert.deepEqual(seventhGateCommercialTestnetLaunchProof.openQueueRows, []);
  assert.deepEqual(
    seventhGateCommercialTestnetLaunchProof.closureRows.map((row) => row.rowId),
    expectedSeventhGateRows
  );
  assert.deepEqual(seventhGateCommercialTestnetLaunchProof.notReadyFor, []);

  assert.equal(promptSpaceCompletenessProof.passed, true);
  assert.equal(promptSpaceCompletenessProof.closureClaim, true);
  assert.equal(promptSpaceCompletenessProof.proceduralGateClosure, true);
  assert.deepEqual(promptSpaceCompletenessProof.openCompletenessDimensions, []);

  assert.equal(wholeRepositoryProductionSatisfactionProof.passed, true);
  assert.equal(wholeRepositoryProductionSatisfactionProof.closureClaim, true);
  assert.equal(wholeRepositoryProductionSatisfactionProof.proceduralGateClosure, true);

  assert.equal(v26TotalClosureProof.gate, 'gate-8');
  assert.equal(v26TotalClosureProof.passed, true);
  assert.equal(v26TotalClosureProof.closureClaim, true);
  assert.equal(v26TotalClosureProof.proceduralGateClosure, true);
  assert.equal(v26TotalClosureProof.queueRowCount, expectedEighthGateRows.length);
  assert.equal(v26TotalClosureProof.closedQueueRowCount, expectedEighthGateRows.length);
  assert.deepEqual(v26TotalClosureProof.openQueueRows, []);
  assert.deepEqual(v26TotalClosureProof.notReadyFor, []);
  assert.deepEqual(v26TotalClosureProof.closureRows.map((row) => row.rowId), expectedEighthGateRows);

  assert.equal(gateCheckpointReport.eighthGate.passed, true);
  assert.equal(gateCheckpointReport.eighthGate.open, false);
  assert.equal(gateCheckpointReport.eighthGate.proceduralClosurePassed, true);
  assert.equal(gateCheckpointReport.eighthGate.promotionStatus, 'promoted-closed');
  assert.equal(gateCheckpointReport.nextGate, 'V26 fully proven: ready for canonical promotion');
});
