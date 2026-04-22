import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const reformStrategySource = readFileSync(new URL('../V26_REFORM_STRATEGY.md', import.meta.url), 'utf8');
const specSource = readFileSync(new URL('../../BITCODE_SPEC_V26.md', import.meta.url), 'utf8');
const paritySource = readFileSync(new URL('../../BITCODE_SPEC_V26_PARITY_MATRIX.md', import.meta.url), 'utf8');
const notesSource = readFileSync(new URL('../../BITCODE_SPEC_V26_NOTES.md', import.meta.url), 'utf8');
const systemsSource = readFileSync(new URL('../V26_APPLICATION_SYSTEMS.md', import.meta.url), 'utf8');
const deliverableReformSource = readFileSync(new URL('../V26_DELIVERABLE_REFORM.md', import.meta.url), 'utf8');
const docCommentReformSource = readFileSync(new URL('../V26_DOC_COMMENT_REFORM.md', import.meta.url), 'utf8');

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

test('active V26 canon and supplementary reform notes point to the generic reform strategy', () => {
  assert.match(specSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(paritySource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(notesSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(systemsSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(deliverableReformSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
  assert.match(docCommentReformSource, /protocol-demonstration\/V26_REFORM_STRATEGY\.md/u);
});
