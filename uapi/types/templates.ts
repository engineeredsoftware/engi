export interface ShippableTemplate {
  id: string;
  name: string;
  text: string;
}

export interface ShippableTemplates {
  pullRequests: ShippableTemplate[];
}

export interface AIDocumentTemplate {
  id: string;
  name: string;
  text: string;
}

export interface AIDocumentTemplates {
  knowledgeExtension: AIDocumentTemplate[];
  assetPackFeedback: AIDocumentTemplate[];
  shippableFeedback?: AIDocumentTemplate[];
  mcpConfig: AIDocumentTemplate[];
}
