import { buildPostAuxillaryBtdRoute } from '@bitcode/api/src/routes/auxillaries';
import { isUserOrbitalMockMode } from '@/lib/mock-review-mode';

export const runtime = 'nodejs';

export const POST = buildPostAuxillaryBtdRoute({
  isMockMode: isUserOrbitalMockMode,
});
