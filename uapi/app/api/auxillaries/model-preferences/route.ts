import {
  buildGetAuxillaryModelPreferencesRoute,
  buildPostAuxillaryModelPreferencesRoute,
} from '@bitcode/api/src/routes/auxillaries';
import { buildMockOrbitalData, isUserOrbitalMockMode } from '../../../../lib/mock-review-mode';

export const runtime = 'nodejs';

const routeOptions = {
  isMockMode: isUserOrbitalMockMode,
  mockModelPreferences: () => buildMockOrbitalData().modelPreferences,
};

export const GET = buildGetAuxillaryModelPreferencesRoute(routeOptions);
export const POST = buildPostAuxillaryModelPreferencesRoute(routeOptions);
