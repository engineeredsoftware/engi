import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const publicAppSource = readFileSync(new URL('../public/app.js', import.meta.url), 'utf8');

test('V26 public workspace copy stays user-facing and avoids demo-era tooltip language', () => {
  assert.match(publicAppSource, /Live surfaces/);
  assert.match(publicAppSource, /Reference topics/);
  assert.match(publicAppSource, /Seeded profile compositions/);
  assert.match(publicAppSource, /profileState\?\.operatorGuidance \|\| profileState\?\.demoOperatorGuidance \|\| \{\}/);

  assert.doesNotMatch(publicAppSource, /keep the demo from reading like/u);
  assert.doesNotMatch(publicAppSource, /Profile B demonstrations/u);
  assert.doesNotMatch(publicAppSource, /proof-heavy Bitcode demonstrations/u);
  assert.doesNotMatch(publicAppSource, /mixed-bundle demonstrations/u);
  assert.doesNotMatch(publicAppSource, /demo’s need and asset surfaces/u);
});
