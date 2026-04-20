import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const rootReadme = readFileSync(new URL('../../README.md', import.meta.url), 'utf8');
const v26Spec = readFileSync(new URL('../../BITCODE_SPEC_V26.md', import.meta.url), 'utf8');
const v26Notes = readFileSync(new URL('../../BITCODE_SPEC_V26_NOTES.md', import.meta.url), 'utf8');

test('V26 active canon docs no longer describe V26 as a draft-period truth source', () => {
  assert.match(v26Spec, /Current truth order for the active V26 canon is:/);
  assert.doesNotMatch(v26Spec, /Current truth order for the V26 draft period is:/);
  assert.doesNotMatch(v26Spec, /current source and tests explicitly referenced by active V25 canon/);
});

test('root README resolves the canonical pointer and active proof appendix to V26', () => {
  assert.match(rootReadme, /Active canon is `V26`/);
  assert.match(rootReadme, /currently resolves to `V26`/);
  assert.match(rootReadme, /\[BITCODE_SPEC_V26\.md\]\(BITCODE_SPEC_V26\.md\)/);
  assert.match(rootReadme, /\[BITCODE_SPEC_V26_PROVEN\.md\]\(BITCODE_SPEC_V26_PROVEN\.md\)/);
  assert.doesNotMatch(rootReadme, /Draft-target full-system specification for V26/);
  assert.doesNotMatch(rootReadme, /currently resolves to `V25`/);
});

test('V26 notes read as canonical notes, not an opened draft family', () => {
  assert.match(v26Notes, /working-note companion for the active V26 canonical family/);
  assert.doesNotMatch(v26Notes, /opened V26 draft family/);
});
