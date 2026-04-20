import { buildGetAuxillaryDataRoute } from '@bitcode/api/src/routes/auxillaries';
import { buildMockOrbitalData, isUserOrbitalMockMode } from '@/lib/mock-review-mode';

export const runtime = 'nodejs';

export const GET = buildGetAuxillaryDataRoute({
  isMockMode: isUserOrbitalMockMode,
  mockAuxillaryData: buildMockOrbitalData,
});
