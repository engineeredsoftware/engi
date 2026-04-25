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
      'fifth-gate closure still requires commercial product parity across every admitted interface',
      'sixth-gate MVP and later launch readiness are intentionally open'
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
      'authenticated live-path activity and storage runtime acceptance remains open',
      'provider-backed signed settlement is not fifth-gate-closed'
    ]
  },
  {
    productId: 'bitcode-terminal',
    productName: 'Bitcode Terminal',
    baselineReadiness: 'terminal-lite-and-application-read-backed',
    parityMatrixAnchor: 'Bitcode Terminal read/write loop',
    requiredEvidence: [
      ['protocol-demonstration/public/app.js', '__BITCODE_APPLICATION_SHELL_SNAPSHOT__'],
      ['uapi/app/application/ApplicationPageClient.tsx', 'ApplicationNeedScenarioPanel'],
      ['uapi/app/application/ApplicationRepositoryContextPanel.tsx', 'Inventory source'],
      ['uapi/app/application/application-activity-history.ts', "status: draft.status || 'completed'"],
      ['uapi/app/application/ApplicationNeedScenarioPanel.tsx', 'Need-fitting Exchange review'],
      ['uapi/app/application/ApplicationClosureNativeSections.tsx', 'Read closure as one sequence from reviewable Need admission'],
      ['uapi/app/application/application-transaction-detail-snapshot.ts', 'fitQualities: coerceFitQualities'],
      ['uapi/tests/api/vcsRepositoriesInventoryParity.test.ts', 'stored repository inventory and skips live provider reads'],
      ['uapi/tests/api/executionsHistoryWriteReadParity.test.ts', 'round-trips give, need, and closure writes through the same Bitcode activity ledger'],
      ['uapi/tests/applicationNeedScenarios.test.ts', 'normalizes Exchange Need-fitting review state for Terminal review controls'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', '`Bitcode Terminal` read/write loop']
    ],
    openReadiness: [
      'whole browser acceptance and live authenticated reread remain open',
      'later-gate product polish and MVP flow completeness remain open'
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
      'this slice is implemented but does not close all fifth-gate product readiness',
      'fit-candidate marketplace UX and MVP settlement refinement remain later-gate work'
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
      'full semantic closure across retained pipeline carriers remains open',
      'route compatibility names still require later retirement or bounded proof'
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
      'persisted rich-input attachment, branched continuity, and destination roundtrip remain open across all admitted interfaces',
      'cross-interface parity is not fifth-gate-closed'
    ]
  },
  {
    productId: 'auxillaries-readiness',
    productName: 'Auxillaries readiness and transactional admission',
    baselineReadiness: 'materially-implemented-open',
    parityMatrixAnchor: 'Transactional readiness and signed-settlement admission',
    requiredEvidence: [
      ['uapi/app/application/bitcode-transaction-readiness.ts', 'canSettle'],
      ['uapi/app/application/bitcode-transaction-route-readiness.ts', 'requireBitcodeSignedTransactionReadiness'],
      ['uapi/app/application/bitcode-transaction-route-readiness.ts', 'repository inventory'],
      ['uapi/app/api/auxillaries/data/route.ts', 'repositoryInventorySource'],
      ['uapi/app/auxillaries/components/AuxillariesConnectsPane.tsx', 'Connects'],
      ['uapi/app/auxillaries/components/AuxillariesConnectsPane.tsx', 'stored-first or live-fallback inventory contract'],
      ['uapi/app/auxillaries/components/AuxillariesProfilePane.tsx', 'Profile'],
      ['uapi/tests/bitcodeTransactionReadiness.test.ts', 'signed settlement remains staged'],
      ['uapi/tests/userDataRoute.test.ts', 'repositoryInventorySource'],
      ['uapi/tests/auxillariesConnectsPane.test.tsx', 'stored Exchange inventory'],
      ['uapi/tests/api/transactionWriteReadinessRoutes.test.ts', 'outside the connected provider inventory'],
      ['BITCODE_SPEC_V26_PARITY_MATRIX.md', 'Transactional readiness and signed-settlement admission']
    ],
    openReadiness: [
      'provider-backed wallet signing and broader route/browser readiness proof remain open',
      'manual wallet identity is not equivalent to signed settlement'
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
      'whole-interface acceptance remains open beyond current write-admission slices',
      'broader third-party ingress coverage remains fifth-gate/later-gate work'
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
      'proof families deepen readiness but do not claim fifth-gate closure',
      'clean-worktree promotion evidence and later-gate whole-repository closure remain open'
    ]
  }
];

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

    return {
      productId: row.productId,
      productName: row.productName,
      baselineReadiness: row.baselineReadiness,
      parityMatrixAnchor: row.parityMatrixAnchor,
      baselineEvidencePassed,
      readyForFifthGateBaseline: baselineEvidencePassed,
      readyForFifthGateClosure: false,
      readyForSixthGateMvp: false,
      closureClaim: false,
      openReadiness: row.openReadiness,
      evidenceChecks
    };
  });
  const baselinePassed = products.every((product) => product.baselineEvidencePassed === true);
  const closureReadyProducts = products.filter((product) => product.readyForFifthGateClosure === true);
  const openProducts = products.filter((product) => product.readyForFifthGateClosure !== true);

  return {
    reportId: 'v26-product-readiness-audit',
    version: 'V26',
    proofSourceCommit: baseData.canonicalCommit || null,
    generatedAt,
    generatorId: baseData.generatorId || 'bitcode.product-readiness-audit.v1',
    worktreeState: baseData.worktreeState || 'unknown',
    gate: 'gate-5',
    auditBasis: [
      'protocol-demonstration Exchange-lite implementation',
      'protocol-demonstration Terminal-lite shell UI',
      'uapi commercial Exchange and Terminal product surfaces',
      'BITCODE_SPEC_V26_PARITY_MATRIX.md acceptance rows'
    ],
    baselinePassed,
    closureClaim: false,
    productCount: products.length,
    baselineReadyProductCount: products.filter((product) => product.readyForFifthGateBaseline === true).length,
    closureReadyProductCount: closureReadyProducts.length,
    openProductCount: openProducts.length,
    notReadyFor: [
      'fifth-gate-closure',
      'sixth-gate-mvp',
      'seventh-gate-commercial-testnet-launch',
      'eighth-gate-v26-definition-of-need'
    ],
    products
  };
}
