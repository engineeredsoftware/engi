type InventoryEntrySnapshot = {
  inventoryEntryId?: string | null;
  title?: string | null;
  artifactKind?: string | null;
  sourcePath?: string | null;
};

type ShellSnapshot = {
  selection?: {
    authSessionId?: string | null;
    selectedInventoryEntryIds?: string[] | null;
  } | null;
  authSession?: {
    authSessionId?: string | null;
    repo?: string | null;
    defaultSignerAddress?: string | null;
  } | null;
  inventory?: {
    selectedEntries?: InventoryEntrySnapshot[] | null;
  } | null;
} | null;

export type ApplicationDepositComposerState = {
  authSessionId: string;
  sourceRepo: string;
  signerAddress: string;
  selectedInventoryEntryIds: string[];
  selectedEntries: Array<{
    id: string;
    title: string;
    artifactKind: string;
    sourcePath: string;
  }>;
  selectedCount: number;
};

export function normalizeApplicationDepositComposer(snapshot: ShellSnapshot): ApplicationDepositComposerState | null {
  if (!snapshot) return null;

  const selectedEntries = (snapshot.inventory?.selectedEntries || [])
    .map((entry) => {
      const id = String(entry.inventoryEntryId || '').trim();
      if (!id) return null;
      return {
        id,
        title:
          String(entry.title || '').trim() ||
          String(entry.sourcePath || '').trim() ||
          id,
        artifactKind: String(entry.artifactKind || 'artifact').trim() || 'artifact',
        sourcePath: String(entry.sourcePath || '').trim(),
      };
    })
    .filter(
      (
        entry,
      ): entry is {
        id: string;
        title: string;
        artifactKind: string;
        sourcePath: string;
      } => Boolean(entry),
    );

  const selectedInventoryEntryIds = (snapshot.selection?.selectedInventoryEntryIds || [])
    .map((entry) => String(entry || '').trim())
    .filter(Boolean);

  return {
    authSessionId: String(snapshot.authSession?.authSessionId || snapshot.selection?.authSessionId || '').trim(),
    sourceRepo: String(snapshot.authSession?.repo || '').trim(),
    signerAddress: String(snapshot.authSession?.defaultSignerAddress || '').trim(),
    selectedInventoryEntryIds,
    selectedEntries,
    selectedCount: selectedInventoryEntryIds.length,
  };
}
