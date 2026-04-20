import {
  buildGetAuxillaryOnboardingRoute,
  buildPostAuxillaryOnboardingRoute,
} from '@bitcode/api/src/routes/auxillaries';
import { buildMockOnboardingData, isUserOrbitalMockMode } from '@/lib/mock-review-mode';

export const runtime = 'nodejs';

const routeOptions = {
  isMockMode: isUserOrbitalMockMode,
  mockOnboardingData: buildMockOnboardingData,
};

export const GET = buildGetAuxillaryOnboardingRoute(routeOptions);
export const POST = buildPostAuxillaryOnboardingRoute(routeOptions);
