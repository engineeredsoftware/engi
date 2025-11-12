/**
 * Firebase MCP underlying utilities – migrated from `uapi/lib/mcps/firebase.ts`.
 */

export async function firebaseFirestoreAddDocumentTool(params: { collection: string; document: any }): Promise<any> {
  return { collection: params.collection, documentId: 'new-doc-id', data: params.document };
}

export async function firebaseFirestoreListDocumentsTool(params: { collection: string }): Promise<any> {
  return { collection: params.collection, documents: [] };
}

export async function firebaseFirestoreGetDocumentTool(params: { collection: string; documentId: string }): Promise<any> {
  return { collection: params.collection, documentId: params.documentId, data: null };
}

export async function firebaseFirestoreUpdateDocumentTool(params: { collection: string; documentId: string; updates: any }): Promise<any> {
  return { collection: params.collection, documentId: params.documentId, updates: params.updates };
}

export async function firebaseFirestoreDeleteDocumentTool(params: { collection: string; documentId: string }): Promise<any> {
  return { collection: params.collection, documentId: params.documentId };
}

export async function firebaseFirestoreListCollectionsTool(params?: {}): Promise<any> {
  return { collections: [] };
}

export async function firebaseFirestoreQueryCollectionGroupTool(params: { collectionGroup: string; query: any }): Promise<any> {
  return { collectionGroup: params.collectionGroup, results: [] };
}
