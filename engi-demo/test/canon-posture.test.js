import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  ACTIVE_CANON_VERSION,
  CURRENT_CANON_OPERATOR_LABEL,
  CURRENT_CANON_POSTURE,
  CURRENT_SPEC_VERSION_LABEL,
  DRAFT_TARGET_VERSION
} from '../src/canon-posture.js';

test('canon posture stays aligned to the active canonical pointer', () => {
  const pointerPath = fileURLToPath(new URL('../../ENGI_SPEC.txt', import.meta.url));
  const pointerVersion = fs.readFileSync(pointerPath, 'utf8').trim();

  assert.equal(pointerVersion, ACTIVE_CANON_VERSION);
  assert.equal(CURRENT_CANON_POSTURE.activeCanonVersion, ACTIVE_CANON_VERSION);
  assert.equal(CURRENT_CANON_POSTURE.draftTargetVersion, DRAFT_TARGET_VERSION);
  assert.equal(CURRENT_CANON_POSTURE.operatorLabel, CURRENT_CANON_OPERATOR_LABEL);
  assert.equal(CURRENT_CANON_POSTURE.specVersionLabel, CURRENT_SPEC_VERSION_LABEL);
  assert.equal(CURRENT_CANON_POSTURE.activeProvenAppendixPath, `ENGI_SPEC_${ACTIVE_CANON_VERSION}_PROVEN.md`);
});
