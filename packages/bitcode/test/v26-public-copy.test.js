import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildCanonPosture } from '../src/canon-posture.js';

const publicAppSource = readFileSync(new URL('../public/app.js', import.meta.url), 'utf8');
const publicIndexSource = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
const publicStylesSource = readFileSync(new URL('../public/styles.css', import.meta.url), 'utf8');
const publicTelemetrySource = readFileSync(new URL('../public/telemetry.js', import.meta.url), 'utf8');

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

test('V26 preserved runtime prefers flow-guide naming on the direct package surface', () => {
  assert.match(publicIndexSource, /id="flowGuideLayer"/);
  assert.match(publicIndexSource, /id="flowGuideToggleButton"/);
  assert.match(publicIndexSource, /class="flow-guide-card"/);
  assert.match(publicAppSource, /const flowGuideToggleButtonEl = requireElement\('flowGuideToggleButton'\);/);
  assert.match(publicStylesSource, /\.flow-guide-layer/);
  assert.match(publicStylesSource, /\.flow-guide-card/);

  assert.doesNotMatch(publicIndexSource, /id="tutorialLayer"/);
  assert.doesNotMatch(publicIndexSource, /id="tutorialToggleButton"/);
  assert.doesNotMatch(publicIndexSource, /class="tutorial-card"/);
  assert.doesNotMatch(publicAppSource, /tutorialToggleButton/u);
  assert.doesNotMatch(publicAppSource, /tutorialLayer/u);
  assert.doesNotMatch(publicStylesSource, /\.tutorial-layer/u);
  assert.doesNotMatch(publicStylesSource, /\.tutorial-card/u);
});

test('V26 public telemetry no longer exposes engi-demo labeling', () => {
  assert.match(publicTelemetrySource, /\[bitcode-runtime\]/);
  assert.doesNotMatch(publicTelemetrySource, /\[engi-demo\]/);
});

test('V26 canon posture keeps preserved runtime language transactions-first', () => {
  const posture = buildCanonPosture();

  assert.equal(posture.heroEyebrow, 'Bitcode transactions and activity');
  assert.match(posture.heroLede, /active scenario/);
  assert.doesNotMatch(posture.heroEyebrow, /workspace/u);
});
