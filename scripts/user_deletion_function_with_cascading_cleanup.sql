-- This query will delete a user and all related data by email address
-- First, create a function to safely handle the deletion process
CREATE OR REPLACE FUNCTION delete_user_by_email(user_email TEXT)
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    target_user_id UUID;
    deleted_user_record JSONB;
BEGIN
    -- Get the user ID from the email
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = user_email;
    
    -- Check if user exists
    IF target_user_id IS NULL THEN
        RETURN 'User with email ' || user_email || ' not found.';
    END IF;
    
    -- Save user record for confirmation
    SELECT jsonb_build_object(
        'id', id,
        'email', email,
        'created_at', created_at
    ) INTO deleted_user_record
    FROM auth.users
    WHERE id = target_user_id;
    
    -- Start transaction
    BEGIN
        -- Delete from token_costs
        DELETE FROM public.token_costs WHERE user_id = target_user_id;
        
        -- Delete from error_logs
        DELETE FROM public.error_logs WHERE user_id = target_user_id;
        
        -- Delete from events
        DELETE FROM public.events WHERE user_id = target_user_id;
        
        -- Delete from notifications
        DELETE FROM public.notifications WHERE user_id = target_user_id;
        
        -- Delete from generated_assets
        DELETE FROM public.generated_assets WHERE user_id = target_user_id;
        
        -- Delete from stream_logs
        DELETE FROM public.stream_logs WHERE user_id = target_user_id;
        
        -- Delete conversation-related data
        DELETE FROM public.message_attachments 
        WHERE message_id IN (
            SELECT id FROM public.messages 
            WHERE conversation_id IN (
                SELECT id FROM public.conversations WHERE user_id = target_user_id
            )
        );
        
        DELETE FROM public.messages 
        WHERE conversation_id IN (
            SELECT id FROM public.conversations WHERE user_id = target_user_id
        );
        
        DELETE FROM public.attachments WHERE user_id = target_user_id;
        
        DELETE FROM public.conversations WHERE user_id = target_user_id;
        
        -- Delete from pipeline_runs
        DELETE FROM public.pipeline_runs WHERE user_id = target_user_id;
        
        -- Delete from run_otf_instructions related to pipeline_executions
        DELETE FROM public.run_otf_instructions 
        WHERE run_id IN (SELECT id FROM public.pipeline_executions WHERE user_id = target_user_id);
        
        -- Delete from phase_executions
        DELETE FROM public.phase_executions 
        WHERE run_id IN (SELECT id FROM public.pipeline_executions WHERE user_id = target_user_id);
        
        -- Delete from execution_events
        DELETE FROM public.execution_events 
        WHERE run_id IN (SELECT id FROM public.pipeline_executions WHERE user_id = target_user_id);
        
        -- Delete from pipeline_executions (canonical)
        DELETE FROM public.pipeline_executions WHERE user_id = target_user_id;
        
        -- Delete from deliverable_vectors
        DELETE FROM public.deliverable_vectors 
        WHERE deliverable_id IN (SELECT id FROM public.deliverables WHERE user_id = target_user_id);
        
        -- Delete from deliverable_items (legacy) if table exists
        IF EXISTS (
          SELECT 1 FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = 'deliverable_items'
        ) THEN
          DELETE FROM public.deliverable_items 
          WHERE deliverable_id IN (SELECT id FROM public.deliverables WHERE user_id = target_user_id);
        END IF;
        
        -- Delete from deliverables
        DELETE FROM public.deliverables WHERE user_id = target_user_id;
        
        -- Delete template data
        DELETE FROM public.user_template_preferences WHERE user_id = target_user_id;
        DELETE FROM public.deliverable_templates WHERE user_id = target_user_id;
        
        -- Delete from user_github_connections
        DELETE FROM public.user_github_connections WHERE user_id = target_user_id;
        
        -- Delete from vcs_repositories
        DELETE FROM public.vcs_repositories WHERE user_id = target_user_id;
        
        -- Delete from user_credit_usages
        DELETE FROM public.user_credit_usages WHERE user_id = target_user_id;
        
        -- Delete from user_credits
        DELETE FROM public.user_credits WHERE user_id = target_user_id;
        
        -- Delete from user_model_preferences
        DELETE FROM public.user_model_preferences WHERE user_id = target_user_id;
        
        -- Delete from user_connections
        DELETE FROM public.user_connections WHERE user_id = target_user_id;
        
        -- Delete from user_profiles
        DELETE FROM public.user_profiles WHERE id = target_user_id;
        
        -- Delete from auth.one_time_tokens
        DELETE FROM auth.one_time_tokens WHERE user_id = target_user_id;
        
        -- Delete from auth.mfa_amr_claims
        DELETE FROM auth.mfa_amr_claims 
        WHERE session_id IN (SELECT id FROM auth.sessions WHERE user_id = target_user_id);
        
        -- Delete from auth.refresh_tokens
        DELETE FROM auth.refresh_tokens 
        WHERE session_id IN (SELECT id FROM auth.sessions WHERE user_id = target_user_id);
        
        -- Delete from auth.mfa_challenges
        DELETE FROM auth.mfa_challenges 
        WHERE factor_id IN (SELECT id FROM auth.mfa_factors WHERE user_id = target_user_id);
        
        -- Delete from auth.mfa_factors
        DELETE FROM auth.mfa_factors WHERE user_id = target_user_id;
        
        -- Delete from auth.sessions
        DELETE FROM auth.sessions WHERE user_id = target_user_id;
        
        -- Delete from auth.identities
        DELETE FROM auth.identities WHERE user_id = target_user_id;
        
        -- Finally delete the user
        DELETE FROM auth.users WHERE id = target_user_id;
        
        RETURN 'Successfully deleted user: ' || deleted_user_record::text;
    EXCEPTION WHEN OTHERS THEN
        -- Rollback and return error
        RETURN 'Error deleting user: ' || SQLERRM;
    END;
END;
$$;

-- To delete a user by email address, call the function:
SELECT delete_user_by_email('garrettmaring@bitcode.dev');
