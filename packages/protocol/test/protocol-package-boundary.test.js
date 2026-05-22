import assert from 'node:assert/strict';
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(packageRoot, '..', '..');
const importBoundaryPattern = /(?:import\s+(?:[^'"]+\s+from\s+)?|import\s*\(|require\s*\()\s*['"][^'"]*(?:@bitcode\/protocol-demonstration|protocol-demonstration\/)/;
const demonstrationSourceImportPattern = /(?:import\s+(?:[^'"]+\s+from\s+)?|import\s*\(|require\s*\()\s*['"][^'"]*(?:@bitcode\/protocol-demonstration|protocol-demonstration\/src)/;

function collectRuntimeFiles(root) {
  const files = [];

  for (const entry of readdirSync(root)) {
    const absolutePath = path.join(root, entry);
    const stat = statSync(absolutePath);

    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === 'coverage' || entry === 'dist') continue;
      files.push(...collectRuntimeFiles(absolutePath));
      continue;
    }

    if (entry.endsWith('.js') || entry.endsWith('.mjs') || entry.endsWith('.cjs')) {
      files.push(absolutePath);
    }
  }

  return files;
}

test('@bitcode/protocol does not import the standalone protocol demonstration', async () => {
  const runtimeFiles = [path.join(packageRoot, 'server.js'), ...collectRuntimeFiles(path.join(packageRoot, 'src'))];
  const violations = runtimeFiles
    .filter((filePath) => importBoundaryPattern.test(readFileSync(filePath, 'utf8')))
    .map((filePath) => path.relative(packageRoot, filePath));

  assert.deepEqual(violations, []);
  const protocol = await import('../src/index.js');
  assert.equal(typeof protocol.createAppContext, 'function');
});

test('@bitcode/protocol commercial formalization exports package-native canon helpers', async () => {
  const protocol = await import('../src/index.js');
  const pointer = readFileSync(path.join(repoRoot, 'BITCODE_SPEC.txt'), 'utf8').trim();
  const expectedPostureByPointer = {
    V28: { activeCanon: 'V28', draftTarget: 'V29' },
    V29: { activeCanon: 'V29', draftTarget: 'V30' },
    V30: { activeCanon: 'V30', draftTarget: 'V31' },
  };
  const expectedPosture = expectedPostureByPointer[pointer];

  assert.ok(expectedPosture, `Unsupported canonical pointer in protocol package boundary test: ${pointer}`);

  assert.equal(protocol.ACTIVE_CANON_VERSION, expectedPosture.activeCanon);
  assert.equal(protocol.DRAFT_TARGET_VERSION, expectedPosture.draftTarget);
  assert.equal(typeof protocol.buildV21SpecFamilyReport, 'function');
  assert.equal(typeof protocol.buildV21CanonicalInputReport, 'function');
  assert.equal(typeof protocol.buildV21GeneratedArtifactContents, 'function');
  assert.equal(typeof protocol.buildCanonPostureDriftReport, 'function');
  assert.equal(typeof protocol.PROVEN_GENERATOR_ID, 'string');
  assert.equal(typeof protocol.defaultProvenOutputPath, 'function');
  assert.equal(typeof protocol.generateCanonicalProvenMarkdown, 'function');
  assert.equal(protocol.defaultProvenOutputPath(expectedPosture.activeCanon), `BITCODE_SPEC_${expectedPosture.activeCanon}_PROVEN.md`);
  const specFamilyReport = protocol.buildV21SpecFamilyReport({
    version: expectedPosture.activeCanon,
    mode: 'promoted',
    currentTarget: expectedPosture.activeCanon,
  });
  const canonicalInputReport = protocol.buildV21CanonicalInputReport({ currentTarget: expectedPosture.activeCanon });
  assert.equal(specFamilyReport.passed, true);
  assert.equal(canonicalInputReport.passed, true);
});

test('commercial scripts do not directly import standalone demonstration source', () => {
  const runtimeFiles = collectRuntimeFiles(path.join(repoRoot, 'scripts'));
  const violations = runtimeFiles
    .filter((filePath) => demonstrationSourceImportPattern.test(readFileSync(filePath, 'utf8')))
    .map((filePath) => path.relative(repoRoot, filePath));

  assert.deepEqual(violations, []);
});

test('@bitcode/protocol witness bundle does not overwrite commercial route titles when embedded', () => {
  const appBundle = readFileSync(path.join(packageRoot, 'public', 'app.js'), 'utf8');

  assert.match(appBundle, /function shouldUpdateDocumentTitle\(\)/);
  assert.match(appBundle, /data-bitcode-demonstration-witness-host/);
  assert.match(appBundle, /if \(shouldUpdateDocumentTitle\(\)\) \{\s*document\.title =/);
});

test('@bitcode/protocol accepts live repository revision deposits without demo inventory ids', async () => {
  const protocol = await import('../src/index.js');
  const tempDir = mkdtempSync(path.join(tmpdir(), 'bitcode-protocol-repo-deposit-'));
  try {
    const app = protocol.createAppContext({
      dataPath: path.join(tempDir, 'state.json'),
      publicDir: path.join(packageRoot, 'public'),
    });

    const result = app.createDeposit({
      title: 'ENGI repository revision',
      sourceProvider: 'github',
      sourceRepo: 'engineeredsoftware/ENGI',
      sourceBranch: 'main',
      sourceCommit: 'abc123456789',
      signerAddress: 'tb1p6x70u8ag7hkmgsve58lxhpgk5fhnanxp2vtuhvccv6n54f2m9mrsxe6wc2',
      signingAlgorithm: 'bitcoin_message_signature',
      keySource: 'leather-browser-wallet',
      walletAuthorizationProof: {
        message: 'Bitcode deposit authorization',
        signature: 'signed-by-wallet',
        provider: 'leather',
      },
    });

    assert.equal(result.ok, true);
    assert.equal(result.asset.metadata.author, 'engineeredsoftware');
    assert.equal(result.asset.artifactKind, 'repository-revision');
    assert.equal(result.asset.artifactType, 'vcs-source-anchor');
    assert.equal(result.asset.addressingSurface.repo, 'engineeredsoftware/ENGI');
    assert.equal(result.asset.addressingSurface.ref, 'main');
    assert.equal(result.asset.addressingSurface.commit, 'abc123456789');
    assert.equal(result.asset.addressingSurface.addressingScope, 'repo-commit');
    assert.equal(result.asset.repositoryFullName, 'engineeredsoftware/ENGI');
    assert.equal(result.asset.sourceBranch, 'main');
    assert.equal(result.asset.sourceCommit, 'abc123456789');
    assert.equal(result.asset.hasWalletOrAttestationProof, true);
    assert.equal(result.asset.hasAssetMeasurementEvidence, true);
    assert.match(result.asset.proofRoot, /^sha256:[a-f0-9]{64}$/);
    assert.match(result.asset.measurementRoot, /^sha256:[a-f0-9]{64}$/);
    assert.match(result.asset.reconciliationReadbackRoot, /^sha256:[a-f0-9]{64}$/);
    assert.match(result.depositoryEvidence.depositorySearchDocumentRoot, /^sha256:[a-f0-9]{64}$/);
    assert.match(result.depositoryEvidence.lexicalDocumentRoot, /^sha256:[a-f0-9]{64}$/);
    assert.match(result.depositoryEvidence.vectorDocumentRoot, /^sha256:[a-f0-9]{64}$/);
    assert.equal(result.depositoryEvidence.depositorBoundary.walletId, `wallet:${result.asset.signingSurface.signerAddress}`);
    assert.equal(result.depositoryEvidence.indexState.vector, 'ready_for_embedding_generation');
    assert.equal(result.depositoryEvidence.searchDocuments.vector.embeddingPolicy.model, 'text-embedding-3-small');
    assert.equal(result.depositoryEvidence.searchDocuments.vector.embeddingPolicy.dimensions, 1536);
    assert.equal(result.depositoryEvidence.searchDocuments.vector.embeddingPolicy.vectorStore.rpc, 'match_deliverable_vectors');
    const depositedText = result.asset.contentUnits?.[0]?.text;
    assert.match(depositedText, /Bitcode repository revision deposit/);
    assert.match(depositedText, /Repository: engineeredsoftware\/ENGI/);
    assert.match(depositedText, /Commit: abc123456789/);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});
