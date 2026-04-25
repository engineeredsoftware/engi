import { buildGetAuxillaryDataRoute } from '@bitcode/api/src/routes/auxillaries';
import { buildMockOrbitalData, isUserOrbitalMockMode } from '@/lib/mock-review-mode';
import { readBitcodeWalletConnectionStatus } from '@/app/api/wallet/_shared';
import {
  buildDisconnectedConnectionStatus,
  buildStoredConnectionStatus,
  getStoredConnection,
  listBitcodeRepositoriesForConnection,
  validateStoredConnection,
} from '@/app/api/vcs/_shared';

export const runtime = 'nodejs';

export const GET = buildGetAuxillaryDataRoute({
  isMockMode: isUserOrbitalMockMode,
  mockAuxillaryData: buildMockOrbitalData,
  resolveWalletConnectionStatus: async ({ supabase, userId, profile }) => {
    return readBitcodeWalletConnectionStatus({
      supabase,
      userId,
      profile: (profile as Record<string, unknown> | null | undefined) ?? null,
    });
  },
  resolveRepositoryInventory: async ({ supabase, userId }) => {
    const { manager, connection } = await getStoredConnection(supabase, userId, 'github');
    if (!connection) {
      return {
        repositoryConnectionStatus: buildDisconnectedConnectionStatus('github'),
        repositories: [],
        repositoryInventorySource: null,
      };
    }

    const valid = await validateStoredConnection(manager, 'github', connection).catch(() => false);

    const { repositories, inventorySource } = await listBitcodeRepositoriesForConnection({
      supabase,
      userId,
      manager,
      provider: 'github',
      connection,
    });

    return {
      repositoryConnectionStatus: buildStoredConnectionStatus('github', connection, valid),
      repositories,
      repositoryInventorySource: inventorySource,
    };
  },
});
