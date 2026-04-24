export interface ShippableTemplate {
  id: string;
  name: string;
  text: string;
}

export interface ShippableTemplates {
  pullRequests: ShippableTemplate[];
  pullRequestReviews: ShippableTemplate[];
  issues: ShippableTemplate[];
  comments: ShippableTemplate[];
}

export type DeliverableTemplate = ShippableTemplate;
export type DeliverableTemplates = ShippableTemplates;

export interface AIDocumentTemplate {
  id: string;
  name: string;
  text: string;
}

export interface AIDocumentTemplates {
  knowledgeExtension: AIDocumentTemplate[];
  shippableFeedback?: AIDocumentTemplate[];
  /** Compatibility key for stored preferences and retained template tables. */
  deliverableFeedback: AIDocumentTemplate[];
  mcpConfig: AIDocumentTemplate[];
}
