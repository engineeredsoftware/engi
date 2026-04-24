import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const reformStrategySource = readFileSync(new URL('../V26_REFORM_STRATEGY.md', import.meta.url), 'utf8');
const specSource = readFileSync(new URL('../../BITCODE_SPEC_V26.md', import.meta.url), 'utf8');
const paritySource = readFileSync(new URL('../../BITCODE_SPEC_V26_PARITY_MATRIX.md', import.meta.url), 'utf8');
const notesSource = readFileSync(new URL('../../BITCODE_SPEC_V26_NOTES.md', import.meta.url), 'utf8');
const deltaSource = readFileSync(new URL('../../BITCODE_SPEC_V26_DELTA.md', import.meta.url), 'utf8');
const systemsSource = readFileSync(new URL('../V26_APPLICATION_SYSTEMS.md', import.meta.url), 'utf8');
const shippableReformSource = readFileSync(new URL('../V26_SHIPPABLE_REFORM.md', import.meta.url), 'utf8');
const docCommentReformSource = readFileSync(new URL('../V26_DOC_COMMENT_REFORM.md', import.meta.url), 'utf8');
const activeFieldIntelligenceUrls = [
  '../../packages/orm/src/queries/field-intelligence.ts',
  '../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_fielddoc_intelligencecontext_detailcontent.ts',
].map((relativePath) => new URL(relativePath, import.meta.url));

test('V26 reform strategy supplement fixes the corridor-class model and ordering rule', () => {
  assert.match(reformStrategySource, /`direct-product`/u);
  assert.match(reformStrategySource, /`ingress-or-support`/u);
  assert.match(reformStrategySource, /`compatibility-only`/u);
  assert.match(reformStrategySource, /`reference-only`/u);
  assert.match(reformStrategySource, /`cut`/u);
  assert.match(reformStrategySource, /mirror before rename/u);
  assert.match(reformStrategySource, /public boundary before rollout/u);
  assert.match(reformStrategySource, /reread normalization before redesign/u);
  assert.match(reformStrategySource, /local compile honesty before closure claims/u);
  assert.match(reformStrategySource, /proof witness per corridor/u);
  assert.match(reformStrategySource, /comprehend-task -> comprehend-need/u);
});

test('V26 reform strategy names representative kept, repurposed, and cut corridors', () => {
  assert.match(reformStrategySource, /doc-comment/u);
  assert.match(reformStrategySource, /doc-code/u);
  assert.match(reformStrategySource, /asset-pack written-asset synthesis/u);
  assert.match(reformStrategySource, /field-intelligence/u);
});

test('V26 field-intelligence corridor is absent from active source', () => {
  assert.deepEqual(activeFieldIntelligenceUrls.filter((url) => existsSync(url)).map((url) => url.pathname), []);
  assert.match(reformStrategySource, /Active retained-package proof no longer admits/u);
});

test('active V26 canon and supplementary reform notes point to the generic reform strategy', () => {
  assert.match(specSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(paritySource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(notesSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(systemsSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(shippableReformSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(docCommentReformSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
});

test('V26 DELTA is a formal reformation specification with implementation color', () => {
  assert.match(notesSource, /The required DELTA information color is formal too/u);
  assert.match(notesSource, /former operational job/u);
  assert.match(notesSource, /current-source rule remains stricter than the DELTA rule/u);
  assert.match(deltaSource, /## Delta Information Model/u);
  assert.match(deltaSource, /former operational job/u);
  assert.match(deltaSource, /current Bitcode object/u);
  assert.match(deltaSource, /semantic transfer/u);
  assert.match(deltaSource, /proof closure/u);
  assert.match(deltaSource, /## Repository Reformation Color Map/u);
  assert.match(deltaSource, /deliverable pipeline orchestration/u);
  assert.match(deltaSource, /Need\/AssetPack risk admission/u);
  assert.match(deltaSource, /generated JavaScript emitted beside TypeScript source/u);
  assert.match(deltaSource, /active source absence tests/u);
});
