import assert from 'node:assert/strict';
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const importBoundaryPattern = /(?:import\s+(?:[^'"]+\s+from\s+)?|import\s*\(|require\s*\()\s*['"][^'"]*(?:@bitcode\/protocol-demonstration|protocol-demonstration\/)/;

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
      author: 'engineeredsoftware',
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
    assert.equal(result.asset.artifactKind, 'repository-revision');
    assert.equal(result.asset.artifactType, 'vcs-source-anchor');
    assert.equal(result.asset.addressingSurface.repo, 'engineeredsoftware/ENGI');
    assert.equal(result.asset.addressingSurface.ref, 'main');
    assert.equal(result.asset.addressingSurface.commit, 'abc123456789');
    assert.equal(result.asset.addressingSurface.addressingScope, 'repo-commit');
    const depositedText = result.asset.contentUnits?.[0]?.text;
    assert.match(depositedText, /Bitcode repository revision deposit/);
    assert.match(depositedText, /Repository: engineeredsoftware\/ENGI/);
    assert.match(depositedText, /Commit: abc123456789/);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});
