export interface DeliverableTemplate {
  id: string;
  name: string;
  text: string;
}

export interface DeliverableTemplates {
  pullRequests: DeliverableTemplate[];
  pullRequestReviews: DeliverableTemplate[];
  issues: DeliverableTemplate[];
  comments: DeliverableTemplate[];
}

export interface AIDocumentTemplate {
  id: string;
  name: string;
  text: string;
}

export interface AIDocumentTemplates {
  knowledgeExtension: AIDocumentTemplate[];
  deliverableFeedback: AIDocumentTemplate[];
  mcpConfig: AIDocumentTemplate[];
}
