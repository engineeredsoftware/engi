// @ts-check

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_REPO_ROOT = path.resolve(__dirname, '../../..');

const PRODUCT_READINESS_AUDIT_ROWS = [
  {
    productId: 'bitcode-protocol',
    productName: 'Bitcode Protocol',
    baselineReadiness: 'deterministic-protocol-witness-backed',
    parityMatrixAnchor: 'Source-to-shares fifth-gate proof',
    requiredEvidence: [
      ['protocol-demonstration/src/bitcode-demo.js', 'runMakeBitcodeBranch'],
      ['protocol-demonstration/src/canonical/need-measurement.js', 'reviewNeedForFitSearch'],
      ['protocol-demonstration/src/canonical/settlement.js', 'quantizedFitQualities'],
      ['protocol-demonstration/test/v26-need-review-source-to-shares.test.js', 'V26 settlement review and receipts show quantized source-to-shares fit qualities'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', 'Source-to-shares fifth-gate proof']
    ],
    openReadiness: [
      'eighth-gate whole-repository provation remains intentionally open'
    ]
  },
  {
    productId: 'bitcode-exchange',
    productName: 'Bitcode Exchange',
    baselineReadiness: 'exchange-lite-route-and-state-backed',
    parityMatrixAnchor: 'App-owned protocol/API ownership',
    requiredEvidence: [
      ['protocol-demonstration/server.js', 'createAppContext'],
      ['protocol-demonstration/server.js', 'needFittingReview'],
      ['uapi/app/api/state/route.ts', 'getBitcodeAppContext().getState(principal)'],
      ['uapi/app/api/need-review/route.ts', 'getBitcodeAppContext().getNeedReview'],
      ['uapi/app/api/make-bitcode-branch/route.ts', 'makeBitcodeBranch'],
      ['uapi/tests/api/needReviewProtocolParity.test.ts', 'rereads accepted Need review and source-to-shares settlement artifacts through the commercial /api/state route'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', 'App-owned protocol/API ownership']
    ],
    openReadiness: [
      'broader Exchange marketplace breadth remains V28-style expansion work',
      'eighth-gate whole-repository provation remains intentionally open'
    ]
  },
  {
    productId: 'bitcode-terminal',
    productName: 'Bitcode Terminal',
    baselineReadiness: 'terminal-lite-and-application-read-backed',
    parityMatrixAnchor: 'Bitcode Terminal read/write loop',
    requiredEvidence: [
      ['protocol-demonstration/public/app.js', '__BITCODE_APPLICATION_SHELL_SNAPSHOT__'],
      ['protocol-demonstration/test/v26-uapi-app-router-entrypoints.test.js', 'TypeScript-only'],
      ['uapi/app/application/ApplicationPageClient.tsx', 'ApplicationNeedScenarioPanel'],
      ['uapi/app/application/ApplicationPageClient.tsx', 'ApplicationLiveSummaryStrip'],
      ['uapi/app/application/application-transaction-readiness-source.ts', 'route_repository_context'],
      ['uapi/app/application/ApplicationRepositoryContextPanel.tsx', 'Inventory source'],
      ['uapi/app/application/ApplicationRepositoryContextPanel.tsx', 'Reconnect Connects to restore live write admission'],
      ['uapi/app/application/ApplicationLiveSummaryStrip.tsx', 'Settlement posture'],
      ['uapi/app/application/ApplicationLiveSummaryStrip.tsx', 'Repository posture'],
      ['uapi/app/application/ApplicationFlowGuideCard.tsx', 'repository-reconnect-required'],
      ['uapi/app/application/ApplicationFlowGuideCard.tsx', 'wallet-reconnect-required'],
      ['uapi/app/application/application-activity-history.ts', "status: draft.status || 'completed'"],
      ['uapi/app/application/ApplicationNeedScenarioPanel.tsx', 'Need-fitting Exchange review'],
      ['uapi/app/application/ApplicationClosureNativeSections.tsx', 'Read closure as one sequence from reviewable Need admission'],
      ['uapi/app/application/application-transaction-detail-snapshot.ts', 'fitQualities: coerceFitQualities'],
      ['uapi/tests/api/vcsRepositoriesInventoryParity.test.ts', 'stored repository inventory and skips live provider reads'],
      ['uapi/tests/api/executionsHistoryWriteReadParity.test.ts', 'round-trips give, need, and closure writes through the same Bitcode activity ledger'],
      ['uapi/tests/applicationLiveSummaryStrip.test.tsx', 'GitHub reconnect required · stored Exchange inventory'],
      ['uapi/tests/applicationFlowGuideCard.test.tsx', 'repository-reconnect-required'],
      ['uapi/tests/applicationTransactionReadinessSource.test.ts', 'route_repository_context'],
      ['uapi/tests/applicationRepositoryContextPanel.test.tsx', 'Saved GitHub attachment found, but the live provider session must reconnect'],
      ['uapi/tests/applicationNeedScenarios.test.ts', 'normalizes Exchange Need-fitting review state for Terminal review controls'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', '`Bitcode Terminal` read/write loop']
    ],
    openReadiness: [
      'clean promotion and whole-flow browser provation remain eighth-gate work',
      'eighth-gate whole-repository provation remains intentionally open'
    ]
  },
  {
    productId: 'source-to-shares-need-fitting',
    productName: 'Need-fitting and settlement review',
    baselineReadiness: 'implemented-fifth-gate-slice',
    parityMatrixAnchor: 'Need review before fit search',
    requiredEvidence: [
      ['protocol-demonstration/server.js', 'bitcode-need-fitting-review'],
      ['uapi/app/application/application-need-scenarios.ts', 'normalizeApplicationNeedFittingReview'],
      ['uapi/tests/api/needReviewRoute.test.ts', 'presents a reviewable Need before fit search'],
      ['uapi/tests/api/needReviewProtocolParity.test.ts', 'needFittingReview'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', 'Need review before fit search']
    ],
    openReadiness: [
      'fit-candidate marketplace UX remains V28-style Exchange expansion work',
      'eighth-gate total provation remains open'
    ]
  },
  {
    productId: 'assetpack-execution',
    productName: 'AssetPack execution and Finish/Delivering',
    baselineReadiness: 'materially-implemented-open',
    parityMatrixAnchor: 'AssetPack pipeline corridor',
    requiredEvidence: [
      ['packages/pipelines/asset-pack/src/postprocess.ts', 'assetPackSynthesisArtifacts'],
      ['packages/pipelines/asset-pack/src/agents/finish-delivery-agents.ts', 'finish:asset-pack'],
      ['packages/pipelines-generics/src/phases/sdivf-factory.ts', 'SDIVF'],
      ['protocol-demonstration/test/v26-pipeline-finish-reform.test.js', 'SDIVF'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', 'full semantic closure across all retained carriers remains open']
    ],
    openReadiness: [
      'broader asset-pack marketplace delivery breadth remains later-gate expansion work',
      'eighth-gate total provation remains open for whole-repository saturation'
    ]
  },
  {
    productId: 'conversations-rich-input',
    productName: 'Conversations rich-input write surface',
    baselineReadiness: 'implemented-active-slices-open',
    parityMatrixAnchor: 'Conversations as Bitcode rich input',
    requiredEvidence: [
      ['packages/api/src/routes/conversations.ts', 'rich_input'],
      ['packages/api/src/conversations/conversations.ts', 'copiedAttachmentCount'],
      ['packages/api/src/conversations/__tests__/branch-conversation.test.ts', 'copiedAttachmentCount'],
      ['uapi/tests/api/conversationBranchRoute.test.ts', 'copiedAttachmentCount'],
      ['.bitcode/conversations-continuity-proof.json', 'rich_input'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', 'Conversations and rich-input continuity']
    ],
    openReadiness: [
      'whole-repository interface provation remains eighth-gate work'
    ]
  },
  {
    productId: 'auxillaries-readiness',
    productName: 'Auxillaries readiness and transactional admission',
    baselineReadiness: 'materially-implemented-open',
    parityMatrixAnchor: 'Transactional readiness and signed-settlement admission',
    requiredEvidence: [
      ['uapi/app/application/bitcode-transaction-readiness.ts', 'canSettle'],
      ['uapi/app/application/bitcode-transaction-readiness.ts', 'repository reconnect required'],
      ['uapi/app/application/bitcode-transaction-readiness.ts', 'wallet reconnect required'],
      ['uapi/app/application/bitcode-transaction-route-readiness.ts', 'requireBitcodeSignedTransactionReadiness'],
      ['uapi/app/application/bitcode-transaction-route-readiness.ts', 'repository inventory'],
      ['uapi/app/application/bitcode-transaction-route-readiness.ts', 'readBitcodeWalletConnectionStatus'],
      ['uapi/app/api/auxillaries/data/route.ts', 'repositoryConnectionStatus'],
      ['uapi/app/api/auxillaries/data/route.ts', 'repositoryInventorySource'],
      ['uapi/app/api/auxillaries/data/route.ts', 'resolveWalletConnectionStatus'],
      ['uapi/app/auxillaries/components/AuxillariesConnectsPane.tsx', 'Connects'],
      ['uapi/app/auxillaries/components/AuxillariesConnectsPane.tsx', 'Reconnect required'],
      ['uapi/app/auxillaries/components/AuxillariesConnectsPane.tsx', 'stored-first or live-fallback inventory contract'],
      ['uapi/app/auxillaries/components/AuxillariesBTDPane.tsx', 'Saved verified wallet-provider signer posture exists, but the live signer session needs reconnect'],
      ['uapi/app/auxillaries/components/AuxillariesProfilePane.tsx', 'Profile'],
      ['uapi/tests/bitcodeTransactionReadiness.test.ts', 'signed settlement remains staged'],
      ['uapi/tests/bitcodeTransactionReadiness.test.ts', 'wallet reconnect required'],
      ['uapi/tests/userDataRoute.test.ts', 'repositoryConnectionStatus'],
      ['uapi/tests/userDataRoute.test.ts', 'repositoryInventorySource'],
      ['uapi/tests/userDataRoute.test.ts', 'walletConnectionStatus'],
      ['uapi/tests/auxillariesConnectsPane.test.tsx', 'stored Exchange inventory'],
      ['uapi/tests/auxillariesConnectsPane.test.tsx', 'Reconnect required'],
      ['uapi/tests/applicationCommandDeck.test.tsx', 'repository reconnect required'],
      ['uapi/tests/applicationClosureControlDeck.test.tsx', 'repository reconnect required'],
      ['uapi/tests/applicationDepositComposerCard.test.tsx', 'repository reconnect required'],
      ['uapi/tests/orbitalsBTDPane.test.tsx', 'wallet provider must reconnect before Bitcode can rely on live signing again'],
      ['uapi/tests/api/transactionWriteReadinessRoutes.test.ts', 'Reconnect GitHub'],
      ['uapi/tests/api/transactionWriteReadinessRoutes.test.ts', 'live wallet-provider signing session is no longer available'],
      ['uapi/tests/api/transactionWriteReadinessRoutes.test.ts', 'outside the connected provider inventory'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', 'Transactional readiness and signed-settlement admission']
    ],
    openReadiness: [
      'provider-backed wallet signing breadth remains V27+ Terminal/Exchange expansion work',
      'manual wallet identity is not equivalent to signed settlement',
      'stored repository inventory does not by itself prove a still-valid live provider session',
      'saved verified wallet signer posture does not by itself prove a still-live wallet-provider signing session'
    ]
  },
  {
    productId: 'connected-interfaces',
    productName: 'Connected interfaces: MCP and ChatGPT App',
    baselineReadiness: 'materially-implemented-open',
    parityMatrixAnchor: 'API / MCP / third-party parity',
    requiredEvidence: [
      ['packages/executions-mcp/src/mcp-server/src/tools/pipeline-tools.ts', 'writeAdmission'],
      ['packages/executions-mcp/src/mcp-server/src/types/index.ts', 'RepositoryContextSchema'],
      ['packages/chatgptapp/src/tools.ts', 'confirmed'],
      ['packages/chatgptapp/src/__tests__/tools.test.ts', 'rejects ChatGPT App connected-interface writes without explicit confirmation'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', 'API / MCP / third-party parity']
    ],
    openReadiness: [
      'broader third-party ingress breadth remains later-gate expansion work',
      'eighth-gate whole-interface provation remains open'
    ]
  },
  {
    productId: 'proof-and-promotion',
    productName: 'Proof and promotion controls',
    baselineReadiness: 'proof-backed-open',
    parityMatrixAnchor: 'Proof and generated-evidence parity matrix',
    requiredEvidence: [
      ['scripts/generate-bitcode-proven.mjs', 'generateCanonicalProvenMarkdown'],
      ['protocol-demonstration/src/canonical/proven-generator.js', 'buildV26FifthGateClosureDeepeningProof'],
      ['.bitcode/source-to-shares-fifth-gate-proof.json', 'v26-source-to-shares-fifth-gate-proof'],
      ['.bitcode/fifth-gate-closure-deepening-proof.json', 'v26-fifth-gate-closure-deepening-proof'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', 'Proof and generated-evidence parity matrix']
    ],
    openReadiness: [
      'clean canonical regeneration is still required for final V26 total closure'
    ]
  }
];

const PRODUCT_MVP_EVIDENCE_BY_ID = {
  'bitcode-protocol': [
    ['BITCODE_SPEC_V26.md', 'Sixth-gate is closed only when:'],
    ['protocol-demonstration/V26_PROOF_SURFACES.md', 'Gate 6: minimal viable product elevation'],
    ['protocol-demonstration/src/canonical/proven-generator.js', 'buildV26SixthGateMvpClosureProof']
  ],
  'bitcode-exchange': [
    ['uapi/tests/api/executionsHistoryWriteReadParity.test.ts', 'round-trips give, need, and closure writes through the same Bitcode activity ledger'],
    ['uapi/tests/api/needReviewProtocolParity.test.ts', 'rereads accepted Need review and source-to-shares settlement artifacts through the commercial /api/state route'],
    ['uapi/tests/api/activityRoute.test.ts', 'returns live activity with persisted execution reread and notification aggregation']
  ],
  'bitcode-terminal': [
    ['uapi/app/application/application-experience-architecture.ts', 'SIXTH_GATE_MVP_APPLICATION_MAP'],
    ['uapi/tests/applicationExperienceArchitecture.test.ts', 'locks the post-fifth-gate application map to activity, transactions, conversations, and auxillaries'],
    ['uapi/tests/e2e/application.terminal.flow.spec.ts', 'application route keeps read, selection, and repository-anchor write-through in one master-detail surface']
  ],
  'source-to-shares-need-fitting': [
    ['uapi/tests/api/needReviewRoute.test.ts', 'presents a reviewable Need before fit search'],
    ['uapi/tests/api/needReviewProtocolParity.test.ts', 'needFittingReview'],
    ['protocol-demonstration/test/v26-need-review-source-to-shares.test.js', 'V26 settlement review and receipts show quantized source-to-shares fit qualities']
  ],
  'assetpack-execution': [
    ['packages/pipelines/asset-pack/src/postprocess.ts', 'assetPackSynthesisArtifacts'],
    ['packages/pipelines/asset-pack/src/agents/finish-delivery-agents.ts', 'finish:asset-pack'],
    ['protocol-demonstration/test/v26-shippable-reform.test.js', 'implementation, validation, and Finish carriers separate AssetPack kind from delivery templates']
  ],
  'conversations-rich-input': [
    ['uapi/app/conversations/components/ConversationsOverlay.tsx', 'Multiple view modes (floating, sidebar, fullscreen, split-screen)'],
    ['uapi/tests/conversationsRouteClient.test.tsx', 'forceFullscreen=true'],
    ['packages/chatgptapp/src/server.ts', 'connected-interface Bitcode Terminal companion']
  ],
  'auxillaries-readiness': [
    ['uapi/app/auxillaries/components/AuxillariesBTDPane.tsx', '$BTD is a non-fungible share and read-right posture, while BTC is the fee-liquidity posture'],
    ['uapi/tests/orbitalsBTDPane.test.tsx', 'wallet provider must reconnect before Bitcode can rely on live signing again'],
    ['uapi/tests/userDataRoute.test.ts', 'walletConnectionStatus']
  ],
  'connected-interfaces': [
    ['packages/executions-mcp/src/mcp-server/src/tools/pipeline-tools.ts', 'writeAdmission'],
    ['packages/chatgptapp/src/__tests__/tools.test.ts', 'declares confirmation schema on every ChatGPT App connected-interface write carrier'],
    ['packages/chatgptapp/src/server.ts', 'Read tools gather codebase, web, VCS, and DevOps context as Exchange input evidence rather than parallel product state']
  ],
  'proof-and-promotion': [
    ['protocol-demonstration/src/canonical/proven-generator.js', 'buildV26SixthGateMvpClosureProof'],
    ['protocol-demonstration/test/proven-generator.test.js', 'sixthGateClosurePassed, true'],
    ['protocol-demonstration/test/v26-gate-acceptance-criteria.test.js', 'V26 generated proofs close fifth and sixth gates without claiming launch or total closure']
  ]
};

const PRODUCT_LAUNCH_EVIDENCE_BY_ID = {
  'bitcode-protocol': [
    ['BITCODE_SPEC_V26.md', 'Seventh-gate is closed only when:'],
    ['protocol-demonstration/V26_PROOF_SURFACES.md', 'Gate 7: initial commercially-viable testnet live-launch refinement'],
    ['protocol-demonstration/src/canonical/proven-generator.js', 'buildV26SeventhGateCommercialTestnetLaunchProof']
  ],
  'bitcode-exchange': [
    ['uapi/tests/api/executionsHistoryWriteReadParity.test.ts', 'round-trips give, need, and closure writes through the same Bitcode activity ledger'],
    ['uapi/tests/api/needReviewProtocolParity.test.ts', 'rereads accepted Need review and source-to-shares settlement artifacts through the commercial /api/state route'],
    ['uapi/tests/api/activityRoute.test.ts', 'returns live activity with persisted execution reread and notification aggregation']
  ],
  'bitcode-terminal': [
    ['uapi/app/application/application-commercial-launch-readiness.ts', 'SEVENTH_GATE_COMMERCIAL_TESTNET_LAUNCH_MAP'],
    ['uapi/tests/applicationCommercialLaunchReadiness.test.ts', 'locks the launch-readiness rows required after MVP closure'],
    ['uapi/tests/e2e/application.terminal.flow.spec.ts', 'application route keeps read, selection, and repository-anchor write-through in one master-detail surface']
  ],
  'source-to-shares-need-fitting': [
    ['protocol-demonstration/test/v26-need-review-source-to-shares.test.js', 'V26 settlement review and receipts show quantized source-to-shares fit qualities'],
    ['uapi/tests/api/needReviewProtocolParity.test.ts', 'needFittingReview'],
    ['uapi/tests/api/needReviewProtocolParity.test.ts', 'source-to-shares settlement artifacts']
  ],
  'assetpack-execution': [
    ['protocol-demonstration/test/v26-shippable-reform.test.js', 'implementation, validation, and Finish carriers separate AssetPack kind from delivery templates'],
    ['packages/pipelines/asset-pack/src/postprocess.ts', 'assetPackSynthesisArtifacts'],
    ['packages/pipelines/asset-pack/src/agents/finish-delivery-agents.ts', 'finish:asset-pack-create-pull-request-delivery-agent']
  ],
  'conversations-rich-input': [
    ['uapi/app/conversations/components/ConversationsOverlay.tsx', 'Multiple view modes (floating, sidebar, fullscreen, split-screen)'],
    ['uapi/tests/conversationsRouteClient.test.tsx', 'forceFullscreen=true'],
    ['packages/chatgptapp/src/server.ts', 'connected-interface Bitcode Terminal companion']
  ],
  'auxillaries-readiness': [
    ['uapi/app/auxillaries/components/AuxillariesBTDPane.tsx', '$BTD is a non-fungible share and read-right posture, while BTC is the fee-liquidity posture'],
    ['uapi/tests/orbitalsBTDPane.test.tsx', 'wallet provider must reconnect before Bitcode can rely on live signing again'],
    ['uapi/tests/api/transactionWriteReadinessRoutes.test.ts', 'live wallet-provider signing session is no longer available']
  ],
  'connected-interfaces': [
    ['packages/executions-mcp/src/mcp-server/src/tools/pipeline-tools.ts', 'writeAdmission'],
    ['packages/chatgptapp/src/__tests__/tools.test.ts', 'declares confirmation schema on every ChatGPT App connected-interface write carrier'],
    ['packages/chatgptapp/src/server.ts', 'Read tools gather codebase, web, VCS, and DevOps context as Exchange input evidence rather than parallel product state']
  ],
  'proof-and-promotion': [
    ['protocol-demonstration/src/canonical/proven-generator.js', 'buildV26SeventhGateCommercialTestnetLaunchProof'],
    ['protocol-demonstration/test/proven-generator.test.js', 'seventhGateClosurePassed, true'],
    ['protocol-demonstration/test/v26-gate-acceptance-criteria.test.js', 'V26 generated proofs close fifth, sixth, and seventh gates without claiming total closure']
  ]
};

/**
 * @param {string} repoRoot
 * @param {string} relativePath
 */
function readSource(repoRoot, relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

/**
 * @param {string} repoRoot
 * @param {[string, string]} evidence
 */
function checkEvidence(repoRoot, evidence) {
  const [file, requiredText] = evidence;
  const absolutePath = path.join(repoRoot, file);
  const filePresent = existsSync(absolutePath);
  const evidencePresent = filePresent && readSource(repoRoot, file).includes(requiredText);

  return {
    file,
    requiredText,
    filePresent,
    evidencePresent,
    passed: filePresent && evidencePresent
  };
}

/**
 * @param {{
 *   generatedAt: string,
 *   baseData: {
 *     canonicalCommit?: string,
 *     generatorId?: string,
 *     worktreeState?: string
 *   },
 *   repoRoot?: string
 * }} input
 */
export function buildV26ProductReadinessAudit({
  generatedAt,
  baseData,
  repoRoot = DEFAULT_REPO_ROOT
}) {
  const products = PRODUCT_READINESS_AUDIT_ROWS.map((row) => {
    const evidenceChecks = row.requiredEvidence.map((entry) => checkEvidence(repoRoot, entry));
    const baselineEvidencePassed = evidenceChecks.every((entry) => entry.passed === true);
    const mvpEvidence = PRODUCT_MVP_EVIDENCE_BY_ID[row.productId] || [];
    const mvpEvidenceChecks = mvpEvidence.map((entry) => checkEvidence(repoRoot, entry));
    const mvpEvidencePassed = baselineEvidencePassed
      && mvpEvidenceChecks.length > 0
      && mvpEvidenceChecks.every((entry) => entry.passed === true);
    const launchEvidence = PRODUCT_LAUNCH_EVIDENCE_BY_ID[row.productId] || [];
    const launchEvidenceChecks = launchEvidence.map((entry) => checkEvidence(repoRoot, entry));
    const launchEvidencePassed = mvpEvidencePassed
      && launchEvidenceChecks.length > 0
      && launchEvidenceChecks.every((entry) => entry.passed === true);

    return {
      productId: row.productId,
      productName: row.productName,
      baselineReadiness: row.baselineReadiness,
      parityMatrixAnchor: row.parityMatrixAnchor,
      baselineEvidencePassed,
      mvpEvidencePassed,
      readyForFifthGateBaseline: baselineEvidencePassed,
      readyForFifthGateClosure: baselineEvidencePassed,
      readyForSixthGateMvp: mvpEvidencePassed,
      readyForSeventhGateCommercialTestnetLaunch: launchEvidencePassed,
      closureClaim: baselineEvidencePassed,
      sixthGateMvpClaim: mvpEvidencePassed,
      seventhGateCommercialTestnetLaunchClaim: launchEvidencePassed,
      openReadiness: row.openReadiness,
      evidenceChecks,
      mvpEvidenceChecks,
      launchEvidenceChecks,
      launchEvidencePassed
    };
  });
  const baselinePassed = products.every((product) => product.baselineEvidencePassed === true);
  const mvpPassed = products.every((product) => product.mvpEvidencePassed === true);
  const launchPassed = products.every((product) => product.launchEvidencePassed === true);
  const closureReadyProducts = products.filter((product) => product.readyForFifthGateClosure === true);
  const openProducts = products.filter((product) => product.readyForFifthGateClosure !== true);
  const mvpReadyProducts = products.filter((product) => product.readyForSixthGateMvp === true);
  const mvpOpenProducts = products.filter((product) => product.readyForSixthGateMvp !== true);
  const launchReadyProducts = products.filter((product) => product.readyForSeventhGateCommercialTestnetLaunch === true);
  const launchOpenProducts = products.filter((product) => product.readyForSeventhGateCommercialTestnetLaunch !== true);

  return {
    reportId: 'v26-product-readiness-audit',
    version: 'V26',
    proofSourceCommit: baseData.canonicalCommit || null,
    generatedAt,
    generatorId: baseData.generatorId || 'bitcode.product-readiness-audit.v1',
    worktreeState: baseData.worktreeState || 'unknown',
    gate: 'gate-5',
    promotedThroughGate: launchPassed ? 'gate-7' : (mvpPassed ? 'gate-6' : 'gate-5'),
    auditBasis: [
      'protocol-demonstration Exchange-lite implementation',
      'protocol-demonstration Terminal-lite shell UI',
      'uapi commercial Exchange and Terminal product surfaces',
      'BITCODE_SPEC_V26_PARITY_MATRIX.md acceptance rows'
    ],
    baselinePassed,
    mvpPassed,
    launchPassed,
    closureClaim: baselinePassed && openProducts.length === 0,
    sixthGateMvpClaim: mvpPassed && mvpOpenProducts.length === 0,
    seventhGateCommercialTestnetLaunchClaim: launchPassed && launchOpenProducts.length === 0,
    productCount: products.length,
    baselineReadyProductCount: products.filter((product) => product.readyForFifthGateBaseline === true).length,
    closureReadyProductCount: closureReadyProducts.length,
    openProductCount: openProducts.length,
    mvpReadyProductCount: mvpReadyProducts.length,
    mvpOpenProductCount: mvpOpenProducts.length,
    launchReadyProductCount: launchReadyProducts.length,
    launchOpenProductCount: launchOpenProducts.length,
    notReadyFor: [
      'eighth-gate-v26-definition-of-need'
    ],
    products
  };
}
