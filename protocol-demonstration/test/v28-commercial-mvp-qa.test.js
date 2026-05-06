import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const btdTrackerSource = readFileSync(
  new URL('../../uapi/components/base/bitcode/btd/btd-tracker.tsx', import.meta.url),
  'utf8',
);
const navSource = readFileSync(
  new URL('../../uapi/components/base/bitcode/layout/nav.tsx', import.meta.url),
  'utf8',
);
const userDataHookSource = readFileSync(
  new URL('../../uapi/hooks/useUserData.ts', import.meta.url),
  'utf8',
);
const auxillariesContractSource = readFileSync(
  new URL('../../packages/api/src/routes/auxillaries-contract.ts', import.meta.url),
  'utf8',
);
const mockReviewModeSource = readFileSync(
  new URL('../../uapi/lib/mock-review-mode.ts', import.meta.url),
  'utf8',
);

test('V28 BTD tracker renders BTC and BTD as peer wallet balances', () => {
  assert.match(btdTrackerSource, /formatBtcFeeBalance\(displayedBtcFeeBalance\)/u);
  assert.match(btdTrackerSource, /displayedBtdBalance\.toLocaleString\(\)\} BTD/u);
  assert.match(btdTrackerSource, /inline-block h-4 w-\[2px\].*rounded-full.*bg-emerald-100\/75/u);
  assert.match(btdTrackerSource, /gapPx = 14/u);
  assert.match(btdTrackerSource, /grid items-center gap-x-3\.5/u);
  assert.equal(btdTrackerSource.includes('| ${displayedBtdBalance'), false);
  assert.doesNotMatch(btdTrackerSource, /\$BTD/u);
});

test('V28 BTD tracker opens Exchange instead of legacy acquisition posture', () => {
  assert.match(btdTrackerSource, /Exchange BTD/u);
  assert.match(btdTrackerSource, /window\.location\.assign\('\/exchange\?intent=buy-existing-btd'\)/u);
  assert.match(btdTrackerSource, /bitcode:btd-exchange-intent/u);
  assert.doesNotMatch(btdTrackerSource, /Acquire BTD/u);
  assert.doesNotMatch(btdTrackerSource, /Acquire \$BTD/u);
  assert.doesNotMatch(btdTrackerSource, /\/application\?intent=acquire-btd/u);
});

test('V28 BTD tracker hover context lists recent BTD AssetPacks', () => {
  assert.match(btdTrackerSource, /Recent BTD AssetPacks:/u);
  assert.match(btdTrackerSource, /title=\{recentAssetPackTitle\}/u);
  assert.doesNotMatch(btdTrackerSource, /BTC pays fees; BTD is a non-fungible AssetPack share\/read-right/u);
  assert.match(navSource, /recentBtdAssetPacks=\{recentBtdAssetPacks\}/u);
  assert.match(userDataHookSource, /recentBtdAssetPacks/u);
  assert.match(auxillariesContractSource, /recentBtdAssetPacks: AuxillaryBtdAssetPackSummary\[\]/u);
  assert.match(mockReviewModeSource, /recentBtdAssetPacks: \[/u);
});
