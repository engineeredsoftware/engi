/**
 * Firebase MCP Tools - Modern Tool Class Architecture
 * 
 * Firebase cloud database integration tools using the Tool class pattern.
 */

import { Tool } from '@bitcode/tools-generics';
import {
  firebaseFirestoreAddDocumentTool as _firebaseFirestoreAddDocument,
  firebaseFirestoreListDocumentsTool as _firebaseFirestoreListDocuments,
  firebaseFirestoreGetDocumentTool as _firebaseFirestoreGetDocument,
  firebaseFirestoreUpdateDocumentTool as _firebaseFirestoreUpdateDocument,
  firebaseFirestoreDeleteDocumentTool as _firebaseFirestoreDeleteDocument,
  firebaseFirestoreListCollectionsTool as _firebaseFirestoreListCollections,
  firebaseFirestoreQueryCollectionGroupTool as _firebaseFirestoreQueryCollectionGroup,
} from '@bitcode/firebase';

// Import DocCodeToolPrompt
import { FIREBASE_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/FirebaseMCPDocCodeToolPrompt';

/**
 * Firebase Firestore Add Document Tool for creating documents
 * 
 * @doc-code-tool
 * @prompt FIREBASE_MCP_DOC_CODE_TOOL_PROMPT
 */
class FirebaseFirestoreAddDocumentTool extends Tool<typeof _firebaseFirestoreAddDocument> {
  use = _firebaseFirestoreAddDocument;
}

/**
 * Firebase Firestore List Documents Tool for retrieving document lists
 * 
 * @doc-code-tool
 * @prompt FIREBASE_MCP_DOC_CODE_TOOL_PROMPT
 */
class FirebaseFirestoreListDocumentsTool extends Tool<typeof _firebaseFirestoreListDocuments> {
  use = _firebaseFirestoreListDocuments;
}

/**
 * Firebase Firestore Get Document Tool for retrieving specific documents
 * 
 * @doc-code-tool
 * @prompt FIREBASE_MCP_DOC_CODE_TOOL_PROMPT
 */
class FirebaseFirestoreGetDocumentTool extends Tool<typeof _firebaseFirestoreGetDocument> {
  use = _firebaseFirestoreGetDocument;
}

/**
 * Firebase Firestore Update Document Tool for modifying documents
 * 
 * @doc-code-tool
 * @prompt FIREBASE_MCP_DOC_CODE_TOOL_PROMPT
 */
class FirebaseFirestoreUpdateDocumentTool extends Tool<typeof _firebaseFirestoreUpdateDocument> {
  use = _firebaseFirestoreUpdateDocument;
}

/**
 * Firebase Firestore Delete Document Tool for removing documents
 * 
 * @doc-code-tool
 * @prompt FIREBASE_MCP_DOC_CODE_TOOL_PROMPT
 */
class FirebaseFirestoreDeleteDocumentTool extends Tool<typeof _firebaseFirestoreDeleteDocument> {
  use = _firebaseFirestoreDeleteDocument;
}

/**
 * Firebase Firestore List Collections Tool for retrieving collection lists
 * 
 * @doc-code-tool
 * @prompt FIREBASE_MCP_DOC_CODE_TOOL_PROMPT
 */
class FirebaseFirestoreListCollectionsTool extends Tool<typeof _firebaseFirestoreListCollections> {
  use = _firebaseFirestoreListCollections;
}

/**
 * Firebase Firestore Query Collection Group Tool for advanced queries
 * 
 * @doc-code-tool
 * @prompt FIREBASE_MCP_DOC_CODE_TOOL_PROMPT
 */
class FirebaseFirestoreQueryCollectionGroupTool extends Tool<typeof _firebaseFirestoreQueryCollectionGroup> {
  use = _firebaseFirestoreQueryCollectionGroup;
}

// Export singleton instances - proper non-barrel exports
export const firebaseFirestoreAddDocumentTool = new FirebaseFirestoreAddDocumentTool();
export const firebaseFirestoreListDocumentsTool = new FirebaseFirestoreListDocumentsTool();
export const firebaseFirestoreGetDocumentTool = new FirebaseFirestoreGetDocumentTool();
export const firebaseFirestoreUpdateDocumentTool = new FirebaseFirestoreUpdateDocumentTool();
export const firebaseFirestoreDeleteDocumentTool = new FirebaseFirestoreDeleteDocumentTool();
export const firebaseFirestoreListCollectionsTool = new FirebaseFirestoreListCollectionsTool();
export const firebaseFirestoreQueryCollectionGroupTool = new FirebaseFirestoreQueryCollectionGroupTool();

// Export DocCodeToolPrompt instance
export { FIREBASE_MCP_DOC_CODE_TOOL_PROMPT };

// Export classes for type safety and extensibility
export { FirebaseFirestoreAddDocumentTool };
export { FirebaseFirestoreListDocumentsTool };
export { FirebaseFirestoreGetDocumentTool };
export { FirebaseFirestoreUpdateDocumentTool };
export { FirebaseFirestoreDeleteDocumentTool };
export { FirebaseFirestoreListCollectionsTool };
export { FirebaseFirestoreQueryCollectionGroupTool };
