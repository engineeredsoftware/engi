export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      attachments: {
        Row: {
          category: string
          connection_id: string | null
          created_at: string | null
          description: string | null
          domain: string | null
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          integration_data: Json | null
          integration_provider: string | null
          integration_type: string | null
          metadata: Json | null
          mime_type: string | null
          page_metadata: Json | null
          path: string | null
          pipeline_run_id: string | null
          type: string | null
          title: string
          updated_at: string | null
          url: string | null
          user_id: string
          vcs_issue: Json | null
          vcs_provider: string | null
          vcs_pull_request: Json | null
          vcs_repository: Json | null
          vcs_type: string | null
        }
        Insert: {
          category: string
          connection_id?: string | null
          created_at?: string | null
          description?: string | null
          domain?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          integration_data?: Json | null
          integration_provider?: string | null
          integration_type?: string | null
          metadata?: Json | null
          mime_type?: string | null
          page_metadata?: Json | null
          path?: string | null
          pipeline_run_id?: string | null
          type?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
          user_id: string
          vcs_issue?: Json | null
          vcs_provider?: string | null
          vcs_pull_request?: Json | null
          vcs_repository?: Json | null
          vcs_type?: string | null
        }
        Update: {
          category?: string
          connection_id?: string | null
          created_at?: string | null
          description?: string | null
          domain?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          integration_data?: Json | null
          integration_provider?: string | null
          integration_type?: string | null
          metadata?: Json | null
          mime_type?: string | null
          page_metadata?: Json | null
          path?: string | null
          pipeline_run_id?: string | null
          type?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string
          vcs_issue?: Json | null
          vcs_provider?: string | null
          vcs_pull_request?: Json | null
          vcs_repository?: Json | null
          vcs_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attachments_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "user_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      deliverable_items: {
        Row: {
          config: Json | null
          created_at: string | null
          deliverable_id: string
          description: string | null
          id: string
          item_type: string | null
          order_index: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          deliverable_id: string
          description?: string | null
          id?: string
          item_type?: string | null
          order_index?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          deliverable_id?: string
          description?: string | null
          id?: string
          item_type?: string | null
          order_index?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliverable_items_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "deliverables"
            referencedColumns: ["id"]
          },
        ]
      }
      executions: {
        Row: {
          completed_at: string | null
          config: Json | null
          context: Json | null
          created_at: string | null
          deliverable_id: string | null
          duration_ms: number | null
          error: Json | null
          id: string
          input: Json | null
          items: Json | null
          output: Json | null
          type: string | null
          started_at: string | null
          status: string | null
          total_cost: number | null
          total_tokens: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          config?: Json | null
          context?: Json | null
          created_at?: string | null
          deliverable_id?: string | null
          duration_ms?: number | null
          error?: Json | null
          id?: string
          input?: Json | null
          items?: Json | null
          output?: Json | null
          type?: string | null
          started_at?: string | null
          status?: string | null
          total_cost?: number | null
          total_tokens?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          config?: Json | null
          context?: Json | null
          created_at?: string | null
          deliverable_id?: string | null
          duration_ms?: number | null
          error?: Json | null
          id?: string
          input?: Json | null
          items?: Json | null
          output?: Json | null
          type?: string | null
          started_at?: string | null
          status?: string | null
          total_cost?: number | null
          total_tokens?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deliverable_runs_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "deliverables"
            referencedColumns: ["id"]
          },
        ]
      }
      execution_events: {
        Row: {
          agent_name: string | null
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          phase: string | null
          run_id: string
        }
        Insert: {
          agent_name?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          phase?: string | null
          run_id: string
        }
        Update: {
          agent_name?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          phase?: string | null
          run_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deliverable_run_events_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "executions"
            referencedColumns: ["id"]
          },
        ]
      }
      phase_executions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error: Json | null
          id: string
          input: Json | null
          output: Json | null
          phase_name: string
          run_id: string
          started_at: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error?: Json | null
          id?: string
          input?: Json | null
          output?: Json | null
          phase_name: string
          run_id: string
          started_at?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error?: Json | null
          id?: string
          input?: Json | null
          output?: Json | null
          phase_name?: string
          run_id?: string
          started_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliverable_run_phases_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "executions"
            referencedColumns: ["id"]
          },
        ]
      }
      deliverable_templates: {
        Row: {
          created_at: string | null
          deliverable_type: string
          id: string
          is_active: boolean | null
          name: string
          template_text: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deliverable_type: string
          id?: string
          is_active?: boolean | null
          name: string
          template_text: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          deliverable_type?: string
          id?: string
          is_active?: boolean | null
          name?: string
          template_text?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      deliverable_vectors: {
        Row: {
          content: string
          created_at: string | null
          deliverable_id: string
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          deliverable_id: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          deliverable_id?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "deliverable_vectors_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: true
            referencedRelation: "deliverables"
            referencedColumns: ["id"]
          },
        ]
      }
      deliverables: {
        Row: {
          config: Json | null
          created_at: string | null
          description: string | null
          effectiveness_score: number | null
          execution_count: number | null
          id: string
          status: string | null
          template_id: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          effectiveness_score?: number | null
          execution_count?: number | null
          id?: string
          status?: string | null
          template_id?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          effectiveness_score?: number | null
          execution_count?: number | null
          id?: string
          status?: string | null
          template_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          context: Json | null
          created_at: string | null
          error_message: string
          error_stack: string | null
          error_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          error_message: string
          error_stack?: string | null
          error_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          error_message?: string
          error_stack?: string | null
          error_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          event_category: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_category?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_category?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      generated_assets: {
        Row: {
          asset_data: Json | null
          asset_name: string
          asset_type: string
          asset_url: string | null
          created_at: string | null
          id: string
          run_id: string | null
          user_id: string
        }
        Insert: {
          asset_data?: Json | null
          asset_name: string
          asset_type: string
          asset_url?: string | null
          created_at?: string | null
          id?: string
          run_id?: string | null
          user_id: string
        }
        Update: {
          asset_data?: Json | null
          asset_name?: string
          asset_type?: string
          asset_url?: string | null
          created_at?: string | null
          id?: string
          run_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_assets_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "executions"
            referencedColumns: ["id"]
          },
        ]
      }
      message_attachments: {
        Row: {
          attachment_category: string
          attachment_id: string
          attachment_type: string | null
          context: string | null
          created_at: string | null
          id: string
          message_id: string
          metadata: Json | null
        }
        Insert: {
          attachment_category: string
          attachment_id: string
          attachment_type?: string | null
          context?: string | null
          created_at?: string | null
          id?: string
          message_id: string
          metadata?: Json | null
        }
        Update: {
          attachment_category?: string
          attachment_id?: string
          attachment_type?: string | null
          context?: string | null
          created_at?: string | null
          id?: string
          message_id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      pipeline_runs: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          pipeline_config: Json | null
          type: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          pipeline_config?: Json | null
          type: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          pipeline_config?: Json | null
          type?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      run_jobs: {
        Row: {
          claimed_at: string | null
          claimed_by: string | null
          created_at: string | null
          error_message: string | null
          id: string
          job_type: string
          max_retries: number | null
          payload: Json | null
          result: Json | null
          retry_count: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type: string
          max_retries?: number | null
          payload?: Json | null
          result?: Json | null
          retry_count?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type?: string
          max_retries?: number | null
          payload?: Json | null
          result?: Json | null
          retry_count?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      run_otf_instructions: {
        Row: {
          created_at: string | null
          id: string
          instruction_data: Json
          instruction_type: string
          is_processed: boolean | null
          processed_at: string | null
          run_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          instruction_data: Json
          instruction_type: string
          is_processed?: boolean | null
          processed_at?: string | null
          run_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          instruction_data?: Json
          instruction_type?: string
          is_processed?: boolean | null
          processed_at?: string | null
          run_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "run_otf_instructions_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "executions"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_logs: {
        Row: {
          created_at: string | null
          id: string
          log_data: Json | null
          log_type: string
          stream_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          log_data?: Json | null
          log_type: string
          stream_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          log_data?: Json | null
          log_type?: string
          stream_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      token_costs: {
        Row: {
          cost: number | null
          created_at: string | null
          id: string
          input_tokens: number | null
          model_name: string
          model_provider: string
          output_tokens: number | null
          run_id: string | null
          total_tokens: number | null
          user_id: string
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          id?: string
          input_tokens?: number | null
          model_name: string
          model_provider: string
          output_tokens?: number | null
          run_id?: string | null
          total_tokens?: number | null
          user_id: string
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          id?: string
          input_tokens?: number | null
          model_name?: string
          model_provider?: string
          output_tokens?: number | null
          run_id?: string | null
          total_tokens?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_costs_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "deliverable_pipeline_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_document_runs: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          items: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          items?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          items?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_documents: {
        Row: {
          created_at: string | null
          id: string
          metrics: Json | null
          output: string | null
          repository: string | null
          run_id: string | null
          title: string | null
          updated_at: string | null
          ai_document_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metrics?: Json | null
          output?: string | null
          repository?: string | null
          run_id?: string | null
          title?: string | null
          updated_at?: string | null
          ai_document_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metrics?: Json | null
          output?: string | null
          repository?: string | null
          run_id?: string | null
          title?: string | null
          updated_at?: string | null
          ai_document_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_documents_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "ai_document_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_connections: {
        Row: {
          connection_data: Json
          created_at: string | null
          id: string
          is_active: boolean | null
          provider: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          connection_data?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          connection_data?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_credit_usages: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          metadata: Json | null
          operation_id: string | null
          operation_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          operation_id?: string | null
          operation_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          operation_id?: string | null
          operation_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          balance: number | null
          created_at: string | null
          id: string
          stripe_customer_id: string | null
          total_purchased: number | null
          total_used: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          id?: string
          stripe_customer_id?: string | null
          total_purchased?: number | null
          total_used?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          id?: string
          stripe_customer_id?: string | null
          total_purchased?: number | null
          total_used?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_github_connections: {
        Row: {
          access_token: string | null
          created_at: string | null
          github_user_id: number | null
          github_username: string | null
          id: string
          installation_data: Json | null
          installation_id: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          github_user_id?: number | null
          github_username?: string | null
          id?: string
          installation_data?: Json | null
          installation_id?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          github_user_id?: number | null
          github_username?: string | null
          id?: string
          installation_data?: Json | null
          installation_id?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_model_preferences: {
        Row: {
          created_at: string | null
          id: string
          is_default: boolean | null
          model_name: string
          model_provider: string
          settings: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          model_name: string
          model_provider: string
          settings?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          model_name?: string
          model_provider?: string
          settings?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          id: string
          onboarded_steps: string | null
          role: string | null
          settings: Json | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          onboarded_steps?: string | null
          role?: string | null
          settings?: Json | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          onboarded_steps?: string | null
          role?: string | null
          settings?: Json | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_template_preferences: {
        Row: {
          auto_save_templates: boolean | null
          created_at: string | null
          default_deliverable_template_id: string | null
          deliverable_templates: Json | null
          id: string
          updated_at: string | null
          ai_document_templates: Json | null
          user_id: string
        }
        Insert: {
          auto_save_templates?: boolean | null
          created_at?: string | null
          default_deliverable_template_id?: string | null
          deliverable_templates?: Json | null
          id?: string
          updated_at?: string | null
          ai_document_templates?: Json | null
          user_id: string
        }
        Update: {
          auto_save_templates?: boolean | null
          created_at?: string | null
          default_deliverable_template_id?: string | null
          deliverable_templates?: Json | null
          id?: string
          updated_at?: string | null
          ai_document_templates?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_template_preferences_default_deliverable_template_id_fkey"
            columns: ["default_deliverable_template_id"]
            isOneToOne: false
            referencedRelation: "deliverable_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_vcs_connections: {
        Row: {
          accesstoken: string
          createdat: string | null
          expiresat: string | null
          id: string
          instanceurl: string | null
          metadata: Json | null
          provider: string
          refreshtoken: string | null
          updatedat: string | null
          userid: string
        }
        Insert: {
          accesstoken: string
          createdat?: string | null
          expiresat?: string | null
          id?: string
          instanceurl?: string | null
          metadata?: Json | null
          provider: string
          refreshtoken?: string | null
          updatedat?: string | null
          userid: string
        }
        Update: {
          accesstoken?: string
          createdat?: string | null
          expiresat?: string | null
          id?: string
          instanceurl?: string | null
          metadata?: Json | null
          provider?: string
          refreshtoken?: string | null
          updatedat?: string | null
          userid?: string
        }
        Relationships: []
      }
      vcs_repositories: {
        Row: {
          created_at: string | null
          id: string
          provider: string
          provider_repo_id: string
          repo_created_at: string | null
          repo_data: Json | null
          repo_default_branch: string | null
          repo_description: string | null
          repo_full_name: string
          repo_language: string | null
          repo_name: string
          repo_owner: string
          repo_private: boolean | null
          repo_updated_at: string | null
          repo_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          provider?: string
          provider_repo_id: string
          repo_created_at?: string | null
          repo_data?: Json | null
          repo_default_branch?: string | null
          repo_description?: string | null
          repo_full_name: string
          repo_language?: string | null
          repo_name: string
          repo_owner: string
          repo_private?: boolean | null
          repo_updated_at?: string | null
          repo_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          provider?: string
          provider_repo_id?: string
          repo_created_at?: string | null
          repo_data?: Json | null
          repo_default_branch?: string | null
          repo_description?: string | null
          repo_full_name?: string
          repo_language?: string | null
          repo_name?: string
          repo_owner?: string
          repo_private?: boolean | null
          repo_updated_at?: string | null
          repo_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      claim_run_job: {
        Args: { p_job_type: string; p_worker_id: string }
        Returns: string
      }
      delete_user_by_email: {
        Args: { user_email: string }
        Returns: string
      }
      grant_user_credits: {
        Args: {
          credit_amount?: number
          credit_description?: string
          credit_source?: string
          user_email: string
        }
        Returns: string
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      match_deliverable_vectors: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          deliverable_id: string
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
