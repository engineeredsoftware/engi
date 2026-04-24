/**
 * Template Types for the Bitcode platform
 * V26 Production Ready
 */

// Deliverable template types matching UI categories
export type DeliverableTemplateType = 
  | 'pullRequests'
  | 'pullRequestReviews'
  | 'issues'
  | 'comments';

// AI Document template types matching UI categories  
export type AIDocumentTemplateType =
  | 'knowledgeExtension'
  | 'deliverableFeedback'
  | 'mcpIntegration';

// Base template interface
interface BaseTemplate {
  id: string;
  user_id: string;
  name: string;
  template_text: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Deliverable template
export interface DeliverableTemplate extends BaseTemplate {
  deliverable_type: DeliverableTemplateType;
}

// AI Document template
export interface AIDocumentTemplate extends BaseTemplate {
  ai_document_type: AIDocumentTemplateType;
}

// User template preferences
export interface UserTemplatePreferences {
  id: string;
  user_id: string;
  default_deliverable_template_id?: string;
  default_ai_document_template_id?: string;
  auto_save_templates: boolean;
  created_at: string;
  updated_at: string;
}

// Template creation payloads
export interface CreateDeliverableTemplatePayload {
  name: string;
  deliverableTypes: DeliverableTemplateType[];
  templateText: string;
}

export interface CreateAIDocumentTemplatePayload {
  name: string;
  aiDocumentTypes: AIDocumentTemplateType[];
  templateText: string;
}

// Response types
export interface TemplatesResponse<T> {
  templates: T[];
  error?: string;
}

export interface TemplatePreferencesResponse {
  preferences: UserTemplatePreferences | null;
  error?: string;
}
