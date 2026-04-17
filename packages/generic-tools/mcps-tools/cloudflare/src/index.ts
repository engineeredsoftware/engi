/**
 * Cloudflare MCP Tools - Modern Tool Class Architecture
 * 
 * Cloudflare edge computing integration tools using the Tool class pattern.
 */

import { Tool } from '@bitcode/tools-generics';
import {
  cloudflareListKvNamespacesTool as _cloudflareListKvNamespaces,
  cloudflareKvGetTool as _cloudflareKvGet,
  cloudflareKvPutTool as _cloudflareKvPut,
  cloudflareKvListTool as _cloudflareKvList,
  cloudflareKvDeleteTool as _cloudflareKvDelete,
  cloudflareR2ListBucketsTool as _cloudflareR2ListBuckets,
  cloudflareR2CreateBucketTool as _cloudflareR2CreateBucket,
  cloudflareR2DeleteBucketTool as _cloudflareR2DeleteBucket,
  cloudflareR2ListObjectsTool as _cloudflareR2ListObjects,
  cloudflareR2GetObjectTool as _cloudflareR2GetObject,
  cloudflareR2PutObjectTool as _cloudflareR2PutObject,
  cloudflareR2DeleteObjectTool as _cloudflareR2DeleteObject,
  cloudflareD1ListDatabasesTool as _cloudflareD1ListDatabases,
  cloudflareD1CreateDatabaseTool as _cloudflareD1CreateDatabase,
  cloudflareD1DeleteDatabaseTool as _cloudflareD1DeleteDatabase,
  cloudflareD1QueryTool as _cloudflareD1Query,
  cloudflareWorkerListTool as _cloudflareWorkerList,
  cloudflareWorkerGetTool as _cloudflareWorkerGet,
  cloudflareWorkerPutTool as _cloudflareWorkerPut,
  cloudflareWorkerDeleteTool as _cloudflareWorkerDelete,
  cloudflareDurableObjectsListTool as _cloudflareDurableObjectsList,
  cloudflareDurableObjectsCreateTool as _cloudflareDurableObjectsCreate,
  cloudflareDurableObjectsDeleteTool as _cloudflareDurableObjectsDelete,
  cloudflareDurableObjectsListInstancesTool as _cloudflareDurableObjectsListInstances,
  cloudflareDurableObjectsGetInstanceTool as _cloudflareDurableObjectsGetInstance,
  cloudflareDurableObjectsDeleteInstanceTool as _cloudflareDurableObjectsDeleteInstance,
  cloudflareQueuesListTool as _cloudflareQueuesList,
  cloudflareQueuesCreateTool as _cloudflareQueuesCreate,
  cloudflareQueuesDeleteTool as _cloudflareQueuesDelete,
  cloudflareQueuesGetTool as _cloudflareQueuesGet,
  cloudflareQueuesSendMessageTool as _cloudflareQueuesSendMessage,
  cloudflareQueuesGetMessagesTool as _cloudflareQueuesGetMessages,
  cloudflareQueuesUpdateConsumerTool as _cloudflareQueuesUpdateConsumer,
} from '@bitcode/cloudflare';

// Import DocCodeToolPrompt
import { CLOUDFLARE_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/CloudflareMCPDocCodeToolPrompt';

// KV Store Tools
class CloudflareListKvNamespacesTool extends Tool<typeof _cloudflareListKvNamespaces> {
  use = _cloudflareListKvNamespaces;
}

class CloudflareKvGetTool extends Tool<typeof _cloudflareKvGet> {
  use = _cloudflareKvGet;
}

class CloudflareKvPutTool extends Tool<typeof _cloudflareKvPut> {
  use = _cloudflareKvPut;
}

class CloudflareKvListTool extends Tool<typeof _cloudflareKvList> {
  use = _cloudflareKvList;
}

class CloudflareKvDeleteTool extends Tool<typeof _cloudflareKvDelete> {
  use = _cloudflareKvDelete;
}

// R2 Storage Tools
class CloudflareR2ListBucketsTool extends Tool<typeof _cloudflareR2ListBuckets> {
  use = _cloudflareR2ListBuckets;
}

class CloudflareR2CreateBucketTool extends Tool<typeof _cloudflareR2CreateBucket> {
  use = _cloudflareR2CreateBucket;
}

class CloudflareR2DeleteBucketTool extends Tool<typeof _cloudflareR2DeleteBucket> {
  use = _cloudflareR2DeleteBucket;
}

class CloudflareR2ListObjectsTool extends Tool<typeof _cloudflareR2ListObjects> {
  use = _cloudflareR2ListObjects;
}

class CloudflareR2GetObjectTool extends Tool<typeof _cloudflareR2GetObject> {
  use = _cloudflareR2GetObject;
}

class CloudflareR2PutObjectTool extends Tool<typeof _cloudflareR2PutObject> {
  use = _cloudflareR2PutObject;
}

class CloudflareR2DeleteObjectTool extends Tool<typeof _cloudflareR2DeleteObject> {
  use = _cloudflareR2DeleteObject;
}

// D1 Database Tools
class CloudflareD1ListDatabasesTool extends Tool<typeof _cloudflareD1ListDatabases> {
  use = _cloudflareD1ListDatabases;
}

class CloudflareD1CreateDatabaseTool extends Tool<typeof _cloudflareD1CreateDatabase> {
  use = _cloudflareD1CreateDatabase;
}

class CloudflareD1DeleteDatabaseTool extends Tool<typeof _cloudflareD1DeleteDatabase> {
  use = _cloudflareD1DeleteDatabase;
}

class CloudflareD1QueryTool extends Tool<typeof _cloudflareD1Query> {
  use = _cloudflareD1Query;
}

// Worker Tools
class CloudflareWorkerListTool extends Tool<typeof _cloudflareWorkerList> {
  use = _cloudflareWorkerList;
}

class CloudflareWorkerGetTool extends Tool<typeof _cloudflareWorkerGet> {
  use = _cloudflareWorkerGet;
}

class CloudflareWorkerPutTool extends Tool<typeof _cloudflareWorkerPut> {
  use = _cloudflareWorkerPut;
}

class CloudflareWorkerDeleteTool extends Tool<typeof _cloudflareWorkerDelete> {
  use = _cloudflareWorkerDelete;
}

// Durable Objects Tools
class CloudflareDurableObjectsListTool extends Tool<typeof _cloudflareDurableObjectsList> {
  use = _cloudflareDurableObjectsList;
}

class CloudflareDurableObjectsCreateTool extends Tool<typeof _cloudflareDurableObjectsCreate> {
  use = _cloudflareDurableObjectsCreate;
}

class CloudflareDurableObjectsDeleteTool extends Tool<typeof _cloudflareDurableObjectsDelete> {
  use = _cloudflareDurableObjectsDelete;
}

class CloudflareDurableObjectsListInstancesTool extends Tool<typeof _cloudflareDurableObjectsListInstances> {
  use = _cloudflareDurableObjectsListInstances;
}

class CloudflareDurableObjectsGetInstanceTool extends Tool<typeof _cloudflareDurableObjectsGetInstance> {
  use = _cloudflareDurableObjectsGetInstance;
}

class CloudflareDurableObjectsDeleteInstanceTool extends Tool<typeof _cloudflareDurableObjectsDeleteInstance> {
  use = _cloudflareDurableObjectsDeleteInstance;
}

// Queues Tools
class CloudflareQueuesListTool extends Tool<typeof _cloudflareQueuesList> {
  use = _cloudflareQueuesList;
}

class CloudflareQueuesCreateTool extends Tool<typeof _cloudflareQueuesCreate> {
  use = _cloudflareQueuesCreate;
}

class CloudflareQueuesDeleteTool extends Tool<typeof _cloudflareQueuesDelete> {
  use = _cloudflareQueuesDelete;
}

class CloudflareQueuesGetTool extends Tool<typeof _cloudflareQueuesGet> {
  use = _cloudflareQueuesGet;
}

class CloudflareQueuesSendMessageTool extends Tool<typeof _cloudflareQueuesSendMessage> {
  use = _cloudflareQueuesSendMessage;
}

class CloudflareQueuesGetMessagesTool extends Tool<typeof _cloudflareQueuesGetMessages> {
  use = _cloudflareQueuesGetMessages;
}

class CloudflareQueuesUpdateConsumerTool extends Tool<typeof _cloudflareQueuesUpdateConsumer> {
  use = _cloudflareQueuesUpdateConsumer;
}

// Export singleton instances - proper non-barrel exports
export const cloudflareListKvNamespacesTool = new CloudflareListKvNamespacesTool();
export const cloudflareKvGetTool = new CloudflareKvGetTool();
export const cloudflareKvPutTool = new CloudflareKvPutTool();
export const cloudflareKvListTool = new CloudflareKvListTool();
export const cloudflareKvDeleteTool = new CloudflareKvDeleteTool();
export const cloudflareR2ListBucketsTool = new CloudflareR2ListBucketsTool();
export const cloudflareR2CreateBucketTool = new CloudflareR2CreateBucketTool();
export const cloudflareR2DeleteBucketTool = new CloudflareR2DeleteBucketTool();
export const cloudflareR2ListObjectsTool = new CloudflareR2ListObjectsTool();
export const cloudflareR2GetObjectTool = new CloudflareR2GetObjectTool();
export const cloudflareR2PutObjectTool = new CloudflareR2PutObjectTool();
export const cloudflareR2DeleteObjectTool = new CloudflareR2DeleteObjectTool();
export const cloudflareD1ListDatabasesTool = new CloudflareD1ListDatabasesTool();
export const cloudflareD1CreateDatabaseTool = new CloudflareD1CreateDatabaseTool();
export const cloudflareD1DeleteDatabaseTool = new CloudflareD1DeleteDatabaseTool();
export const cloudflareD1QueryTool = new CloudflareD1QueryTool();
export const cloudflareWorkerListTool = new CloudflareWorkerListTool();
export const cloudflareWorkerGetTool = new CloudflareWorkerGetTool();
export const cloudflareWorkerPutTool = new CloudflareWorkerPutTool();
export const cloudflareWorkerDeleteTool = new CloudflareWorkerDeleteTool();
export const cloudflareDurableObjectsListTool = new CloudflareDurableObjectsListTool();
export const cloudflareDurableObjectsCreateTool = new CloudflareDurableObjectsCreateTool();
export const cloudflareDurableObjectsDeleteTool = new CloudflareDurableObjectsDeleteTool();
export const cloudflareDurableObjectsListInstancesTool = new CloudflareDurableObjectsListInstancesTool();
export const cloudflareDurableObjectsGetInstanceTool = new CloudflareDurableObjectsGetInstanceTool();
export const cloudflareDurableObjectsDeleteInstanceTool = new CloudflareDurableObjectsDeleteInstanceTool();
export const cloudflareQueuesListTool = new CloudflareQueuesListTool();
export const cloudflareQueuesCreateTool = new CloudflareQueuesCreateTool();
export const cloudflareQueuesDeleteTool = new CloudflareQueuesDeleteTool();
export const cloudflareQueuesGetTool = new CloudflareQueuesGetTool();
export const cloudflareQueuesSendMessageTool = new CloudflareQueuesSendMessageTool();
export const cloudflareQueuesGetMessagesTool = new CloudflareQueuesGetMessagesTool();
export const cloudflareQueuesUpdateConsumerTool = new CloudflareQueuesUpdateConsumerTool();

// Export DocCodeToolPrompt instance
export { CLOUDFLARE_MCP_DOC_CODE_TOOL_PROMPT };

// Export classes for type safety and extensibility
export {
  CloudflareListKvNamespacesTool, CloudflareKvGetTool, CloudflareKvPutTool, CloudflareKvListTool, CloudflareKvDeleteTool,
  CloudflareR2ListBucketsTool, CloudflareR2CreateBucketTool, CloudflareR2DeleteBucketTool,
  CloudflareR2ListObjectsTool, CloudflareR2GetObjectTool, CloudflareR2PutObjectTool, CloudflareR2DeleteObjectTool,
  CloudflareD1ListDatabasesTool, CloudflareD1CreateDatabaseTool, CloudflareD1DeleteDatabaseTool, CloudflareD1QueryTool,
  CloudflareWorkerListTool, CloudflareWorkerGetTool, CloudflareWorkerPutTool, CloudflareWorkerDeleteTool,
  CloudflareDurableObjectsListTool, CloudflareDurableObjectsCreateTool, CloudflareDurableObjectsDeleteTool,
  CloudflareDurableObjectsListInstancesTool, CloudflareDurableObjectsGetInstanceTool, CloudflareDurableObjectsDeleteInstanceTool,
  CloudflareQueuesListTool, CloudflareQueuesCreateTool, CloudflareQueuesDeleteTool, CloudflareQueuesGetTool,
  CloudflareQueuesSendMessageTool, CloudflareQueuesGetMessagesTool, CloudflareQueuesUpdateConsumerTool
};
