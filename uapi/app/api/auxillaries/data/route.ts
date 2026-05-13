import { buildGetAuxillaryDataRoute } from '@bitcode/api/src/routes/auxillaries';
import { buildMockAuxillariesData, isAuxillariesMockMode } from '@/lib/mock-review-mode';
import { bitcodeServerTelemetry } from '@/lib/bitcode-server-telemetry';
import { readBitcodeWalletConnectionStatus } from '@/app/api/wallet/_shared';
import {
  buildDisconnectedConnectionStatus,
  buildStoredConnectionStatus,
  getStoredConnection,
  listBitcodeRepositoriesForConnection,
  validateStoredConnection,
} from '@/app/api/vcs/_shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const getAuxillaryData = buildGetAuxillaryDataRoute({
  isMockMode: isAuxillariesMockMode,
  mockAuxillaryData: buildMockAuxillariesData,
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

export async function GET(request: Request) {
  bitcodeServerTelemetry('info', 'auxillaries-data', 'read-start', {
    mockMode: isAuxillariesMockMode(),
  });

  try {
    const response = await getAuxillaryData(request);
    bitcodeServerTelemetry('info', 'auxillaries-data', 'read-finish', {
      status: response.status,
      mockMode: isAuxillariesMockMode(),
    });
    return response;
  } catch (error) {
    bitcodeServerTelemetry('error', 'auxillaries-data', 'read-failed', {
      message: error instanceof Error ? error.message : String(error),
      mockMode: isAuxillariesMockMode(),
    });
    throw error;
  }
}
