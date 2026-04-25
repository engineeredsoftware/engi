import { buildGetAuxillaryDataRoute } from '@bitcode/api/src/routes/auxillaries';
import { buildMockOrbitalData, isUserOrbitalMockMode } from '@/lib/mock-review-mode';
import { getStoredConnection, listBitcodeRepositoriesForConnection } from '@/app/api/vcs/_shared';

export const runtime = 'nodejs';

export const GET = buildGetAuxillaryDataRoute({
  isMockMode: isUserOrbitalMockMode,
  mockAuxillaryData: buildMockOrbitalData,
  resolveRepositoryInventory: async ({ supabase, userId }) => {
    const { manager, connection } = await getStoredConnection(supabase, userId, 'github');
    if (!connection) {
      return {
        repositories: [],
        repositoryInventorySource: null,
      };
    }

    const { repositories, inventorySource } = await listBitcodeRepositoriesForConnection({
      supabase,
      userId,
      manager,
      provider: 'github',
      connection,
    });

    return {
      repositories,
      repositoryInventorySource: inventorySource,
    };
  },
});
