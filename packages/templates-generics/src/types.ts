/**
 * Template Types for the Bitcode platform
 * V26 Production Ready
 */

// V26 Finish ships AssetPacks through pull requests only.
export type ShippableTemplateType = 'pullRequests';

// AI Document template types matching UI categories  
export type AIDocumentTemplateType =
  | 'knowledgeExtension'
  | 'shippableFeedback'
  | 'assetPackFeedback'
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

export interface ShippableTemplate extends BaseTemplate {
  shippable_type: ShippableTemplateType;
}

// AI Document template
export interface AIDocumentTemplate extends BaseTemplate {
  ai_document_type: AIDocumentTemplateType;
}

// User template preferences
export interface UserTemplatePreferences {
  id: string;
  user_id: string;
  default_shippable_template_id?: string;
  default_ai_document_template_id?: string;
  auto_save_templates: boolean;
  created_at: string;
  updated_at: string;
}

// Template creation payloads
export interface CreateShippableTemplatePayload {
  name: string;
  shippableTypes: ShippableTemplateType[];
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
